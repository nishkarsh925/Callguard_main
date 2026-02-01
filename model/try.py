"""
Audio Transcription with AI Translation & Speaker Labeling
Flow: Audio → AssemblyAI (Hindi) → Groq AI (Translate + Label) → Output
"""

import requests
import time
import json
import re
from pathlib import Path


ASSEMBLYAI_API_KEY = "28a3c03e7fb141fcaf0d0f231f3bf38e"
GROQ_API_KEY = "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"  # Get from https://console.groq.com

ASSEMBLYAI_BASE_URL = "https://api.assemblyai.com"
GROQ_BASE_URL = "https://api.groq.com/openai/v1"



def transcribe_audio_file(file_path, language_code=None):
    """
    Transcribe audio using AssemblyAI
    Returns: transcription result with detected language
    """
    print("\n" + "="*80)
    print("STEP 1: TRANSCRIPTION WITH ASSEMBLYAI")
    print("="*80)
    
    # Upload file
    print(f"\n📤 Uploading: {file_path}")
    headers = {"authorization": ASSEMBLYAI_API_KEY}
    
    with open(file_path, "rb") as f:
        upload_response = requests.post(
            f"{ASSEMBLYAI_BASE_URL}/v2/upload",
            headers=headers,
            data=f
        )
    
    if upload_response.status_code != 200:
        raise RuntimeError(f"Upload failed: {upload_response.json()}")
    
    audio_url = upload_response.json()["upload_url"]
    print("✓ Upload complete!")
    
    # Submit transcription
    print("\n🎯 Submitting transcription request...")
    
    data = {
        "audio_url": audio_url,
        "speaker_labels": True,
        "punctuate": True,
        "format_text": True,
    }
    
    # Either use language detection OR specify language (not both!)
    if language_code:
        data["language_code"] = language_code
    else:
        data["language_detection"] = True  # Auto-detect language
    
    response = requests.post(
        f"{ASSEMBLYAI_BASE_URL}/v2/transcript",
        json=data,
        headers=headers
    )
    
    if response.status_code != 200:
        raise RuntimeError(f"Transcription failed: {response.json()}")
    
    transcript_id = response.json()['id']
    print(f"✓ Transcription ID: {transcript_id}")
    
    # Poll for completion
    print("\n⏳ Waiting for transcription...")
    polling_url = f"{ASSEMBLYAI_BASE_URL}/v2/transcript/{transcript_id}"
    
    while True:
        result = requests.get(polling_url, headers=headers).json()
        status = result['status']
        
        if status == 'completed':
            print("✓ Transcription complete!")
            return result
        elif status == 'error':
            raise RuntimeError(f"Failed: {result.get('error', 'Unknown error')}")
        else:
            print(f"  Status: {status}...")
            time.sleep(3)

# =============================================================================
# STEP 2: LANGUAGE DETECTION
# =============================================================================

def check_language(transcription_result):
    """
    Check if audio is in English or another language
    Returns: (is_english, language_code)
    """
    print("\n" + "="*80)
    print("STEP 2: LANGUAGE DETECTION")
    print("="*80)
    
    detected_language = transcription_result.get('language_code', 'en').lower()
    is_english = detected_language == 'en'
    
    print(f"\n🌍 Detected Language: {detected_language.upper()}")
    
    if is_english:
        print("✓ Audio is in ENGLISH - Translation not needed!")
    else:
        print(f"✓ Audio is in {detected_language.upper()} - Will translate to English")
    
    return is_english, detected_language

# =============================================================================
# STEP 3: GROQ AI TRANSLATION (ONLY IF NOT ENGLISH)
# =============================================================================

def call_groq_ai(prompt, temperature=0.3, max_tokens=4096):
    """Call Groq AI API"""
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "llama-3.3-70b-versatile",  # Fast and accurate
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temperature,
        "max_tokens": max_tokens
    }
    
    try:
        response = requests.post(
            f"{GROQ_BASE_URL}/chat/completions",
            headers=headers,
            json=data,
            timeout=60
        )
        
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        else:
            print(f"❌ Groq API Error: {response.status_code}")
            print(response.text)
            return None
    except Exception as e:
        print(f"❌ Error calling Groq: {e}")
        return None

def translate_conversation_with_groq(utterances, source_language="Hindi", output_format="english"):
    """
    Translate entire conversation using Groq AI in ONE API call for efficiency
    """
    print("\n" + "="*80)
    print("STEP 3: TRANSLATION WITH GROQ AI")
    print("="*80)
    
    # Prepare conversation text
    conversation_text = ""
    for i, utt in enumerate(utterances, 1):
        speaker = utt.get('speaker', 'Unknown')
        text = utt.get('text', '')
        conversation_text += f"[{i}] Speaker {speaker}: {text}\n"
    
    # Create translation prompt
    if output_format == "hinglish":
        prompt = f"""Convert the following {source_language} conversation to Hinglish (Hindi written in Roman/English script).
Use natural phonetic spelling. Keep speaker labels and numbers.

{source_language} Conversation:
{conversation_text}

Hinglish Conversation (keep [number] Speaker X: format):"""
    else:  # english
        prompt = f"""Translate the following {source_language} conversation to natural, fluent English.
Maintain conversational tone. Keep speaker labels and numbers.

{source_language} Conversation:
{conversation_text}

English Conversation (keep [number] Speaker X: format):"""
    
    print(f"\n🔄 Translating {len(utterances)} utterances to {output_format.upper()}...")
    
    translation = call_groq_ai(prompt)
    
    if not translation:
        print("❌ Translation failed!")
        return utterances
    
    # Parse translated conversation
    translated_lines = translation.strip().split('\n')
    
    # Match translated lines back to utterances
    for i, utt in enumerate(utterances):
        # Find corresponding line
        pattern = rf'\[{i+1}\]\s*Speaker\s*[A-Z]:\s*(.+)'
        for line in translated_lines:
            match = re.search(pattern, line, re.IGNORECASE)
            if match:
                utt['original_text'] = utt['text']
                utt['translated_text'] = match.group(1).strip()
                break
        
        # Fallback if pattern matching fails
        if 'translated_text' not in utt:
            utt['original_text'] = utt['text']
            utt['translated_text'] = utt['text']
    
    print(f"✓ Translation complete!")
    return utterances

# =============================================================================
# STEP 4: GROQ AI SPEAKER LABELING
# =============================================================================

def identify_speaker_roles_with_groq(utterances, use_translated=True):
    """
    Use Groq AI to identify speaker roles: Agent, Customer, IVR
    """
    print("\n" + "="*80)
    print("STEP 4: SPEAKER ROLE IDENTIFICATION WITH GROQ AI")
    print("="*80)
    
    # Prepare conversation for analysis
    conversation_text = ""
    for i, utt in enumerate(utterances, 1):
        speaker = utt.get('speaker', 'Unknown')
        # Use translated text if available, otherwise original
        text = utt.get('translated_text', utt.get('text', '')) if use_translated else utt.get('text', '')
        conversation_text += f"{i}. Speaker {speaker}: {text}\n"
    
    prompt = f"""Analyze this customer service conversation and identify each speaker's role.

Conversation:
{conversation_text}

Identify:
- AGENT: Customer service representative (professional, helpful, asks questions, offers solutions)
- CUSTOMER: Person calling with an issue/question (describes problems, asks for help)
- IVR: Automated voice system (robotic, scripted, menu options, press 1 for...)

Respond with ONLY a JSON object in this exact format:
{{
  "A": "Agent",
  "B": "Customer",
  "C": "IVR"
}}

Only include speakers that appear in the conversation. Possible roles: Agent, Customer, IVR"""
    
    print("\n🤖 Analyzing conversation with AI...")
    
    result = call_groq_ai(prompt, temperature=0.1)
    
    if result:
        try:
            # Extract JSON from response
            json_match = re.search(r'\{[^}]+\}', result, re.DOTALL)
            if json_match:
                speaker_roles = json.loads(json_match.group())
                print(f"✓ Speaker roles identified: {speaker_roles}")
                return speaker_roles
        except Exception as e:
            print(f"⚠️  Could not parse AI response: {e}")
    
    # Fallback: Simple heuristic
    print("⚠️  Using fallback speaker identification...")
    speakers = list(set([u.get('speaker', 'A') for u in utterances]))
    
    if len(speakers) == 1:
        return {speakers[0]: "Agent"}
    elif len(speakers) == 2:
        return {speakers[0]: "Agent", speakers[1]: "Customer"}
    else:
        return {speakers[0]: "Agent", speakers[1]: "IVR", speakers[2]: "Customer"}

# =============================================================================
# STEP 5: FORMAT OUTPUT
# =============================================================================

def format_output(transcription_result, utterances, speaker_roles, is_english, output_format):
    """
    Format final output with all information
    """
    print("\n" + "="*80)
    print("FINAL RESULTS")
    print("="*80)
    
    detected_language = transcription_result.get('language_code', 'en').upper()
    duration = transcription_result.get('audio_duration', 0)
    confidence = transcription_result.get('confidence', 0)
    
    print(f"\n📊 Summary:")
    print(f"   Language: {detected_language}")
    print(f"   Duration: {duration}s ({duration//60}m {duration%60}s)")
    print(f"   Confidence: {confidence*100:.2f}%")
    print(f"   Translation: {'Not needed (English)' if is_english else f'Translated to {output_format.upper()}'}")
    print()
    
    # Speaker roles
    print("👥 SPEAKER ROLES:")
    print("-"*80)
    for speaker, role in sorted(speaker_roles.items()):
        print(f"   Speaker {speaker} → {role}")
    print()
    
    # Original transcript (if not English)
    if not is_english:
        original_text = transcription_result.get('text', '')
        print(f"📝 ORIGINAL TRANSCRIPT ({detected_language}):")
        print("-"*80)
        print(original_text)
        print()
    
    # Final transcript (translated or original)
    if is_english:
        print("📝 TRANSCRIPT:")
    else:
        print(f"📝 TRANSLATED TRANSCRIPT ({output_format.upper()}):")
    print("-"*80)
    
    full_transcript = ""
    for utt in utterances:
        text = utt.get('translated_text', utt.get('text', ''))
        full_transcript += text + " "
    print(full_transcript.strip())
    print()
    
    # Conversation with labels
    print("💬 CONVERSATION WITH SPEAKER LABELS:")
    print("-"*80)
    
    for i, utt in enumerate(utterances, 1):
        speaker = utt.get('speaker', 'Unknown')
        role = speaker_roles.get(speaker, 'Unknown')
        start = utt.get('start', 0) / 1000
        end = utt.get('end', 0) / 1000
        
        print(f"\n{i}. [{start:.1f}s - {end:.1f}s] {role} (Speaker {speaker}):")
        
        if not is_english and 'original_text' in utt:
            print(f"   {detected_language}: {utt['original_text']}")
            print(f"   {output_format.title()}: {utt.get('translated_text', utt['text'])}")
        else:
            print(f"   {utt.get('translated_text', utt.get('text', ''))}")
    
    print("\n" + "="*80)
    
    # Return structured data
    return {
        'language': detected_language,
        'is_english': is_english,
        'duration': duration,
        'confidence': confidence,
        'speaker_roles': speaker_roles,
        'original_transcript': transcription_result.get('text', '') if not is_english else None,
        'translated_transcript': full_transcript.strip(),
        'utterances': utterances,
        'output_format': output_format if not is_english else 'original'
    }

# =============================================================================
# MAIN WORKFLOW
# =============================================================================

def process_audio(audio_file_path, output_format="english", language_code=None):
    """
    Complete workflow:
    Audio → AssemblyAI → Detect Language → 
    (If not English) → Groq Translate + Label → Output
    
    Args:
        audio_file_path: Path to audio file
        output_format: "english" or "hinglish"
        language_code: Optional (e.g., "hi" for Hindi)
    """
    
    print("\n" + "="*80)
    print("AI-POWERED AUDIO PROCESSING PIPELINE")
    print("="*80)
    
    try:
        # STEP 1: Transcribe with AssemblyAI
        transcription_result = transcribe_audio_file(audio_file_path, language_code)
        
        # STEP 2: Check language
        is_english, detected_language = check_language(transcription_result)
        
        utterances = transcription_result.get('utterances', [])
        
        # STEP 3: Translate if not English
        if not is_english:
            utterances = translate_conversation_with_groq(
                utterances,
                source_language=detected_language,
                output_format=output_format
            )
        else:
            # Add translated_text field even for English (same as original)
            for utt in utterances:
                utt['translated_text'] = utt['text']
        
        # STEP 4: Identify speaker roles with Groq AI
        speaker_roles = identify_speaker_roles_with_groq(utterances, use_translated=(not is_english))
        
        # STEP 5: Format and display output
        results = format_output(
            transcription_result,
            utterances,
            speaker_roles,
            is_english,
            output_format
        )
        
        # Save to JSON
        output_file = "transcription_output.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
        print(f"\n💾 Results saved to: {output_file}")
        
        print("\n✅ PROCESSING COMPLETE!")
        
        return results
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        raise

# =============================================================================
# RUN
# =============================================================================

if __name__ == "__main__":
    
    # CONFIGURATION
    audio_file_path = r"D:\Keshav\Hackathon Keshav\Hacksmart\speech_test\jyoti_srv_saraviconsultants_co_in__Driver_and_Partner_Support__342__168624416__7248888738__2026-01-29_13-43-09.mp3"
    
    # Choose output format: "english" or "hinglish"
    output_format = "english"
    
    # Optional: Specify language if known (speeds up processing)
    # Use None for auto-detection
    language_code = "hi"  # "hi" for Hindi, "en" for English, None for auto-detect
    
    # PROCESS
    results = process_audio(
        audio_file_path=audio_file_path,
        output_format=output_format,
        language_code=language_code
    )