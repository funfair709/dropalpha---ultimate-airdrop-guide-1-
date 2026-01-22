
import React, { useState, useRef } from 'react';
import { Mic, X, Loader2, Search, Volume2 } from 'lucide-react';
import { transcribeAudio } from '../services/gemini';

interface VoiceAssistantProps {
  onTranscribed: (text: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onTranscribed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setIsProcessing(true);
          const text = await transcribeAudio(base64Audio, 'audio/webm');
          setTranscription(text);
          onTranscribed(text);
          setIsProcessing(false);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing mic:", err);
      alert("Please allow microphone access to use voice search.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-600/40 hover:scale-110 active:scale-95 transition-all z-40 border border-white/10"
      >
        <Mic className="text-white w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative glass w-full max-w-md rounded-3xl p-8 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${isRecording ? 'bg-rose-500 animate-pulse scale-110 shadow-lg shadow-rose-500/40' : 'bg-indigo-600 shadow-lg shadow-indigo-500/40'}`}>
                {isRecording ? <Volume2 className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                {isRecording ? "Listening..." : isProcessing ? "Transcribing..." : "Voice Search"}
              </h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Ask about specific chains, project names, or potential values.
              </p>

              <div className="min-h-[60px] bg-black/40 rounded-2xl p-4 mb-8 border border-white/5 flex items-center justify-center italic text-gray-300">
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    Analyzing audio...
                  </div>
                ) : transcription || "Your speech will appear here..."}
              </div>

              <div className="flex flex-col gap-3">
                {!isRecording && !isProcessing && (
                  <button 
                    onClick={startRecording}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    Start Recording
                  </button>
                )}
                {isRecording && (
                  <button 
                    onClick={stopRecording}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl font-bold transition-all"
                  >
                    Stop & Transcribe
                  </button>
                )}
                {transcription && (
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" /> Close & Filter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
