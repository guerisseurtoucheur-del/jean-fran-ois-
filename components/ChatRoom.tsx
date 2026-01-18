
import React, { useState, useRef, useEffect } from 'react';
import { chatStreamWithJeanFrancois } from '../services/geminiService';
import { Message } from '../types';

interface ChatRoomProps {
  onStartHealing?: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ onStartHealing }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour, c'est Jean-François. Je suis heureux de vous accueillir ici. Prenez le temps de me dire ce qui vous pèse ou ce que vous souhaiteriez apaiser. Je suis à votre écoute.",
      sender: 'healer',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "J'ai un zona très douloureux...",
    "Comment fonctionne le soin sur photo ?",
    "Pouvez-vous m'aider pour mon eczéma ?",
    "Je me sens très fatigué en ce moment."
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMessage: Message = { 
      id: Date.now().toString(), 
      text: textToSend, 
      sender: 'user', 
      timestamp: Date.now() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const botMessageId = (Date.now() + 1).toString();
    const botMessage: Message = { id: botMessageId, text: '', sender: 'healer', timestamp: Date.now() };
    setMessages(prev => [...prev, botMessage]);

    let fullResponse = '';
    try {
      await chatStreamWithJeanFrancois(textToSend, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
        ));
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 h-[80vh] flex flex-col">
      <div className="bg-white flex-grow flex flex-col rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden relative">
        {/* En-tête du Chat */}
        <div className="bg-indigo-600 p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white/20 shadow-inner">JF</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-indigo-600 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg leading-none">Jean-François</h2>
              <p className="text-[10px] text-indigo-100 uppercase tracking-widest mt-1 flex items-center gap-2">
                <span className="inline-block w-1 h-1 bg-green-400 rounded-full animate-ping"></span>
                En ligne • Écoute bienveillante
              </p>
            </div>
          </div>
          
          {onStartHealing && (
            <button 
              onClick={onStartHealing}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Démarrer mon soin sur photo
            </button>
          )}
        </div>

        {/* Zone des messages */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50"
        >
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm transition-all ${
                msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 border-l-4 border-l-amber-400'
              }`}>
                {msg.text || (isTyping && msg.sender === 'healer' ? '...' : '')}
                
                {msg.sender === 'healer' && !isTyping && msg.id !== '1' && msg.text.length > 50 && (
                  <div className="mt-4 pt-4 border-t border-slate-50 flex flex-col items-center gap-2">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Besoin d'un soin urgent ?</p>
                    <button 
                      onClick={onStartHealing}
                      className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors"
                    >
                      M'envoyer votre photo ici
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && messages[messages.length-1].text === '' && (
            <div className="flex gap-2 items-center text-xs text-slate-400 font-medium italic ml-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-150"></span>
              </span>
              Jean-François vous répond...
            </div>
          )}
        </div>

        {/* Suggestions de questions rapides */}
        {messages.length < 3 && !isTyping && (
          <div className="px-6 py-2 flex flex-wrap gap-2 bg-white">
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(s)}
                className="text-[10px] bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-600 px-3 py-1.5 rounded-full transition-all border border-slate-200 font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Formulaire d'envoi */}
        <form onSubmit={onSubmit} className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez ici votre message pour Jean-François..."
              className="flex-grow bg-slate-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border border-slate-100"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[8px] text-slate-300 mt-2 uppercase tracking-[0.2em] font-bold">Jean-François répond généralement en quelques secondes</p>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
