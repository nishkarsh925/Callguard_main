# Battery Smart Auto-QA & Coaching System

![Project Banner](public/logo.png) *<!-- Add a project banner or logo here if available -->*

## 🚀 Overview

The **Battery Smart Auto-QA & Coaching System** is an advanced AI-driven platform designed to automate the quality assurance process for customer support calls. By leveraging state-of-the-art Speech-to-Text (STT), Natural Language Processing (NLP), and Large Language Models (LLM), the system analyzes audio recordings to evaluate agent performance against Standard Operating Procedures (SOPs), detect compliance risks, and generate actionable coaching insights.

This solution transforms subjective manual reviews into objective, data-driven performance metrics, enabling supervisors to focus on high-impact coaching and ensuring consistent service quality across the board.

## ✨ Key Features

- **Automated Call Analysis**: uploads and processes audio files (WAV, MP3) to generate transcripts and evaluation scores.
- **SOP Adherence Tracking**: Checks agent compliance against customizable SOP rules and checklists using AI.
- **Sentiment Analysis**: Tracks customer sentiment trajectory throughout the call (Positive, Neutral, Negative).
- **Risk Detection**: Automatically flags high-risk calls (e.g., litigation threats, abusive language, compliance breaches).
- **Long Call Optimization**: Specialized handling for long recordings with smart silence trimming to reduce processing time and costs.
- **Actionable Coaching Insights**: Generates personalized feedback for agents based on performance gaps.
- **Supervisor Dashboard**: Aggregates insights by region or city to identify systemic trends and training needs.
- **Region-Based Metadata**: Supports filtering and analysis by geographic segments.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Animations**: Framer Motion / ScrollReveal

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Server**: Uvicorn
- **AI/ML**:
    - **Speech-to-Text**: `faster-whisper`, `pyannote.audio` (Diarization)
    - **LLM Integration**: Google Gemini (via `google-genai` SDK) / OpenAI (configurable)
    - **NLP**: `sentence-transformers`, `scikit-learn`, `spacy`
- **Audio Processing**: `ffmpeg`, `librosa`
- **Database**: Firebase Firestore (Metadata & Users)

### Infrastructure
- **Cloud Provider**: AWS
- **Frontend Hosting**: AWS S3 (Static Website Hosting)
- **Backend Compute**: AWS EC2 (t3.medium or larger recommended)

## 🏗️ Architecture

```mermaid
graph TD
    Client[React Frontend] -->|Upload Audio| API[FastAPI Backend]
    API -->|Trim Silence| AudioProc[Audio Processor]
    AudioProc -->|Transcribe & Diarize| STT[Whisper + Pyannote]
    STT -->|Transcript| NLP[NLP Processor]
    NLP -->|Text Segments| SOP[SOP Engine]
    SOP -->|Evaluate Rules| LLM[LLM Service (Gemini)]
    LLM -->|Scoring & Insights| DB[(Firebase Firestore)]
    DB -->|Dashboard Data| Client
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- FFmpeg installed and added to system PATH.
- AWS Account (for deployment)
- Firebase Project Credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/battery-smart-auto-qa.git
   cd battery-smart-auto-qa
   ```

2. **Frontend Setup**
   ```bash
   npm install
   ```

3. **Backend Setup**
   ```bash
   cd model
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   - Create a `.env` file in the `model/` directory with your API keys:
     ```env
     GEMINI_API_KEY=your_gemini_key
     OPENAI_API_KEY=your_openai_key_optional
     FIREBASE_CREDENTIALS=path/to/firebase.json
     ```

### Running Locally

1. **Start the Backend**
   ```bash
   cd model
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   The API will be available at `http://localhost:8000`.

2. **Start the Frontend**
   ```bash
   # In the root directory
   npm run dev
   ```
   The app will run at `http://localhost:5173`.

## 🚀 Deployment

### Backend (AWS EC2)

1. Launch an Ubuntu EC2 instance (`t3.medium` recommended suitable for ML workloads).
2. Install dependencies:
   ```bash
   sudo apt update && sudo apt install ffmpeg python3-pip python3-venv
   ```
3. Copy the `model/` directory to the server.
4. Install Python requirements and run with Uvicorn (or Gunicorn/Systemd for production).

### Frontend (AWS S3)

1. Build the react app:
   ```bash
   npm run build
   ```
2. Upload the `dist/` folder to an S3 bucket configured for Static Website Hosting.
3. Ensure the bucket policy allows public read access (`s3:GetObject`).

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built for the Hackathon 2026*
