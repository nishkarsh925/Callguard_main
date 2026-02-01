import torch
import torchaudio
from faster_whisper import WhisperModel
from pyannote.audio import Pipeline
import config
import os

class STTService:
    def __init__(self):
        print(f"Loading Whisper model ({config.WHISPER_MODEL_SIZE})...")
        self.model = WhisperModel(config.WHISPER_MODEL_SIZE, device=config.DEVICE, compute_type="float32")
        
        self.diarization_pipeline = None
        if config.HF_TOKEN:
            try:
                print("Loading Pyannote diarization pipeline...")
                self.diarization_pipeline = Pipeline.from_pretrained(
                    "pyannote/speaker-diarization-3.1",
                    token=config.HF_TOKEN
                )
                if config.DEVICE == "cuda":
                    self.diarization_pipeline.to(torch.device("cuda"))
            except Exception as e:
                print(f"Error loading diarization pipeline: {e}")
        else:
            print("HF_TOKEN not found. Diarization will be skipped.")

    def transcribe(self, audio_path: str):
        """
        Transcribes audio and translates to English if task="translate" is used.
        In this case, we use task="translate" to handle Hindi/Hinglish to English.
        """
        print(f"Transcribing {audio_path}...")
        segments, info = self.model.transcribe(audio_path, task="translate", beam_size=5)
        
        results = []
        for segment in segments:
            results.append({
                "start": segment.start,
                "end": segment.end,
                "text": segment.text.strip(),
                "speaker": "Unknown"
            })
        
        return results, info

    def diarize(self, audio_path: str):
        """
        Performs speaker diarization.
        """
        if not self.diarization_pipeline:
            return None
        
        print(f"Diarizing {audio_path}...")
        
        # Load audio in-memory to avoid torchcodec dependency issues on Windows
        waveform, sample_rate = torchaudio.load(audio_path)
        
        # Ensure waveform is on the correct device
        if config.DEVICE == "cuda":
            waveform = waveform.to(torch.device("cuda"))
        
        # Pass as a dictionary to skip built-in decoding
        diarization = self.diarization_pipeline({"waveform": waveform, "sample_rate": sample_rate})
        
        # Handle pyannote.audio 4.x API changes
        if hasattr(diarization, "speaker_diarization"):
            diarization = diarization.speaker_diarization
            
        speakers = []
        for turn, _, speaker in diarization.itertracks(yield_label=True):
            speakers.append({
                "start": turn.start,
                "end": turn.end,
                "speaker": speaker
            })
        return speakers

    def process_call(self, audio_path: str):
        """
        Combines transcription and diarization.
        """
        transcription, info = self.transcribe(audio_path)
        diarization = self.diarize(audio_path)
        
        if diarization:
            # Simple alignment logic: assign speaker based on start time overlap
            for segment in transcription:
                mid_point = (segment["start"] + segment["end"]) / 2
                for speaker_turn in diarization:
                    if speaker_turn["start"] <= mid_point <= speaker_turn["end"]:
                        segment["speaker"] = speaker_turn["speaker"]
                        break
        
        return transcription, info
