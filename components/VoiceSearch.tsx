
import React, { useState, useEffect } from 'https://esm.sh/react@^19.2.3';

interface VoiceSearchProps {
  onResult: (text: string) => void;
  className?: string;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult, className }) => {
  const [isListening, setIsListening] = useState(false);
  const [hasSupport, setHasSupport] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setHasSupport(true);
    }
  }, []);

  const toggleListening = () => {
    if (!hasSupport) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-NG'; // Nigerian English context

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  if (!hasSupport) return null;

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`p-3 rounded-full transition-all duration-300 ${
        isListening 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-slate-100 text-slate-500 hover:bg-teal-50 hover:text-teal-600'
      } ${className}`}
      title={isListening ? "Stop listening" : "Search with voice"}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 013 3v5a3 3 0 01-3 3 3 3 0 01-3-3V6a3 3 0 013-3z" />
      </svg>
    </button>
  );
};

export default VoiceSearch;
