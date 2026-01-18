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
      text: "Bonjour, je suis Jean-François. Que ce soit pour un zona, un eczéma qui vous fait souffrir, ou simplement pour retrouver un peu d'énergie, je suis là pour vous écouter. Que puis-je faire pour vous ?",
      sender: 'healer',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "J'ai un zona très douloureux",
    "Est-ce que vous aidez pour l'eczéma ?",
    "Comment envoyer ma photo ?",
    "Quels sont vos tarifs ?"
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

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 h-[85vh] flex flex-col">
      <div className="bg-white flex-grow flex flex-col md:flex-row rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden">
        
        {/* Barre latérale d'infos */}
        <div className="w-full md:w-72 bg-stone-50 p-8 border-b md:border-b-0 md:border-r border-stone-100 space-y-8 hidden md:block">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Votre Magnétiseur</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-serif italic text-xl">JF</div>
              <div>
                <p className="font-bold text-stone-800">Jean-François</p>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">Disponible maintenant</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Conseils</h3>
            <div className="text-sm text-stone-500 leading-relaxed italic">
              "Prenez quelques grandes inspirations avant de m'écrire. Le calme est le premier pas vers le soulagement."
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={onStartHealing}
              className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-amber-100 transition-all"
            >
              Envoyer une photo
            </button>
          </div>
        </div>

        {/* Zone de Chat principale */}
        <div className="flex-grow flex flex-col relative bg-white">
          <div className="flex-grow overflow-y-auto p-6 md:p-10 space-y-8" ref={scrollRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[90%] md:max-w-[75%] p-6 rounded-3xl text-base leading-relaxed ${
                  msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 rounded-tr-none' 
                  : 'bg-stone-50 text-stone-700 rounded-tl-none border border-stone-100'
                }`}>
                  {msg.text || (isTyping && msg.sender === 'healer' ? <div className="flex gap-1"><span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-75"></span><span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-150"></span></div> : '')}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions flottantes */}
          {!isTyping && messages.length < 3 && (
            <div className="px-6 md:px-10 py-4 flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(s)}
                  className="px-4 py-2 bg-stone-100 hover:bg-indigo-50 hover:text-indigo-600 text-stone-500 rounded-full text-xs font-medium transition-all border border-transparent hover:border-indigo-100"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Formulaire */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="p-6 md:p-10 pt-0"
          >
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Racontez-moi ce qui vous arrive..."
                className="w-full bg-stone-50 rounded-[2rem] px-8 py-6 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border border-stone-100 pr-20"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;