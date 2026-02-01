import json
import os
from typing import List, Dict, Any, Optional
from datetime import datetime
from collections import defaultdict
import config

class DBService:
    def __init__(self, db_path: str = "data/calls.json"):
        self.db_path = db_path
        self.ensure_db_exists()

    def ensure_db_exists(self):
        """Ensure the JSON database file and its directory exist."""
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        if not os.path.exists(self.db_path):
            with open(self.db_path, "w") as f:
                json.dump([], f)

    def load_calls(self) -> List[Dict]:
        """Load all calls from the JSON database."""
        try:
            with open(self.db_path, "r") as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []

    def save_call(self, call_data: Dict[str, Any]):
        """Save a new call record to the database."""
        calls = self.load_calls()
        
        # Add timestamp if not present
        if "timestamp" not in call_data:
            call_data["timestamp"] = datetime.now().isoformat()
            
        calls.append(call_data)
        
        with open(self.db_path, "w") as f:
            json.dump(calls, f, indent=2)

    def get_calls(self, region: Optional[str] = None, user_id: Optional[str] = None) -> List[Dict]:
        """Get calls, optionally filtered by region and/or user_id."""
        calls = self.load_calls()
        if region:
            calls = [c for c in calls if c.get("metadata", {}).get("region") == region]
        if user_id:
            calls = [c for c in calls if c.get("user_id") == user_id]
        return calls

    def get_call(self, call_id: str) -> Optional[Dict]:
        """Get a specific call by ID."""
        calls = self.load_calls()
        for call in calls:
            if call.get("call_id") == call_id:
                return call
        return None

    def get_aggregated_insights(self, region: Optional[str] = None) -> Dict[str, Any]:
        """
        Generate aggregated insights from stored calls.
        If region is provided, filters data for that region.
        """
        calls = self.get_calls(region)
        
        if not calls:
            return {
                "total_calls": 0,
                "average_score": 0,
                "sop_pass_rate": 0,
                "common_sop_failures": [],
                "recent_calls_summary": [],
                "region": region if region else "All Regions"
            }

        total_calls = len(calls)
        total_score = 0
        passed_sop_count = 0
        failed_sops = defaultdict(int)
        sentiment_scores = []
        
        for call in calls:
            evaluation = call.get("evaluation", {})
            scoring = evaluation.get("scoring", {})
            
            # Score
            score = scoring.get("final_score", 0) or 0
            if isinstance(score, str):
                try:
                    score = float(score.replace('%', ''))
                except ValueError:
                    score = 0
            total_score += score
            
            # SOP Adherence
            sop_results = evaluation.get("sop_adherence", {})
            # If it's a list (old format), iterate directly. If dict (new format), iterate values then steps.
            all_passed = True
            
            if isinstance(sop_results, list):
                # Old/Simple list format
                for sop in sop_results:
                    if isinstance(sop, dict) and sop.get("status") == "FAIL":
                        all_passed = False
                        step_name = sop.get("step", "Unknown Step")
                        failed_sops[step_name] += 1
            elif isinstance(sop_results, dict):
                # New Section-based format
                for section_name, section_data in sop_results.items():
                    # Check if section_data has 'steps' list
                    if isinstance(section_data, dict):
                        steps = section_data.get("steps", [])
                        if isinstance(steps, list):
                            for step in steps:
                                if isinstance(step, dict) and step.get("status") == "FAIL":
                                    all_passed = False
                                    step_name = step.get("step", "Unknown Step")
                                    failed_sops[step_name] += 1
            
            if all_passed:
                passed_sop_count += 1
                
            # Sentiment (taking average of trajectory if available, or just end sentiment)
            # This is a simplification; a real system might process the trajectory more deeply.
            # Assuming we can derive a simple sentiment metric here or just track count.
            
        avg_score = total_score / total_calls if total_calls > 0 else 0
        sop_pass_rate = (passed_sop_count / total_calls * 100) if total_calls > 0 else 0
        
        # Sort common issues
        sorted_issues = sorted(failed_sops.items(), key=lambda x: x[1], reverse=True)
        
        insights = {
            "region": region if region else "All Regions",
            "total_calls": total_calls,
            "average_score": round(avg_score, 2),
            "sop_pass_rate": round(sop_pass_rate, 2),
            "common_sop_failures": [
                {"step": k, "count": v, "percentage": round(v/total_calls*100, 1)} 
                for k, v in sorted_issues[:5]
            ],
            "recent_calls_summary": [
                 {
                     "call_id": c.get("call_id"),
                     "score": c.get("evaluation", {}).get("scoring", {}).get("final_score"),
                     "date": c.get("timestamp")
                 } for c in calls[-5:] # Last 5 calls
            ]
        }
        
        return insights

    def get_coaching_needs(self) -> List[Dict]:
        """
        Identify calls that need coaching and format them for the dashboard.
        Criteria: Critical Risks OR Score < 75 OR Any SOP Failures
        """
        calls = self.load_calls()
        needs = []
        
        print(f"DEBUG: Processing {len(calls)} calls for coaching needs")
        
        for call in calls:
            eval_data = call.get("evaluation", {})
            scoring = eval_data.get("scoring", {})
            
            # Robust score parsing
            score = scoring.get("final_score", 0)
            if score is None: score = 0
            if isinstance(score, str):
                try:
                    score = float(score.replace('%', ''))
                except ValueError:
                    score = 0
            
            risks = eval_data.get("risks_detected", [])
            sop_data = eval_data.get("sop_adherence", {})
            
            problem_title = ""
            tags = []
            
            # 1. Check for Risks (High Priority)
            if risks:
                problem_title = f"Risk Detected: {risks[0]}"
                tags.append("Critical Risk")
            
            # 2. Check for Low Score
            elif score < 75:
                problem_title = f"Low Performance ({int(score)}%)"
                tags.append("Performance")
                
            # 3. Check for specific SOP failures
            else:
                failures = []
                # Handle both dict (new) and list (old) format
                if isinstance(sop_data, dict):
                    for section, data in sop_data.items():
                        if isinstance(data, dict):
                            for step in data.get("steps", []):
                                if step.get("status") == "FAIL":
                                    failures.append(step.get("step"))
                elif isinstance(sop_data, list):
                    for step in sop_data:
                        if step.get("status") == "FAIL":
                            failures.append(step.get("step"))
                
                if failures:
                    problem_title = f"SOP Violation: {failures[0]}"
                    if len(failures) > 1:
                        problem_title += f" (+{len(failures)-1} more)"
                    tags.append("SOP Violation")
            
            # If any issue found, add to list
            if problem_title:
                needs.append({
                    "call_id": call.get("call_id"),
                    "date": call.get("timestamp"),
                    "problem_title": problem_title,
                    "score": score,
                    "region": call.get("metadata", {}).get("region", "Unknown"),
                    "duration": call.get("metadata", {}).get("duration", 0),
                    "tags": tags
                })
        
        print(f"DEBUG: Found {len(needs)} calls needing coaching")
        # Sort by date (newest first)
        needs.sort(key=lambda x: x.get("date", ""), reverse=True)
        return needs
