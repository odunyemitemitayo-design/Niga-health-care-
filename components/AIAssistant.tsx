
import React from 'https://esm.sh/react@^19.2.3';

interface AIAssistantProps {
  isSpeaking: boolean;
  text?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isSpeaking, text }) => {
  if (!isSpeaking) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] w-[90%] max-w-md animate-in slide-in-from-bottom-8 duration-500">
      <div className="glass-effect border border-teal-100 p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center">
        <div className="flex gap-1 mb-4 h-8 items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className="w-1.5 bg-teal-500 rounded-full animate-pulse" 
              style={{ 
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.6s'
              }} 
            />
          ))}
        </div>
        <p className="text-teal-900 font-medium text-sm leading-relaxed serif-heading">
          {text || "NaijaHealth Assistant is speaking..."}
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
