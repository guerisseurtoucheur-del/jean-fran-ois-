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
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
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
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const botMessageId = (Date.now() + 1).toString();
    const botMessagePlaceholder: Message = { 
      id: botMessageId, 
      text: '', 
      sender: 'healer', 
      timestamp: Date.now() 
    };
    
    setMessages(prev => [...prev, botMessagePlaceholder]);

    let fullResponse = '';
    try {
      // On passe l'historique complet pour permettre une vraie discussion
      await chatStreamWithJeanFrancois(updatedMessages, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
        ));
      });
    } catch (err) {
      console.error(err);
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId ? { ...msg, text: "Je suis désolé, la connexion énergétique a été interrompue. Pouvez-vous répéter ?" } : msg
      ));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 h-[88vh] flex flex-col page-fade">
      <div className="bg-white flex-grow flex flex-col md:flex-row rounded-[3rem] shadow-2xl border border-stone-100 overflow-hidden relative">
        
        {/* Background Aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/40 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50/40 blur-[120px] pointer-events-none"></div>

        {/* Barre latérale d'infos */}
        <div className="w-full md:w-80 bg-stone-50/50 p-8 border-b md:border-b-0 md:border-r border-stone-100 space-y-10 hidden md:block relative z-10">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-6">Praticien</h3>
            <div className="flex items-center gap-4 p-4 bg-white rounded-3xl shadow-sm border border-stone-100">
              <div className="w-14 h-14 bg-stone-900 rounded-2xl flex items-center justify-center text-white font-serif italic text-2xl">JF</div>
              <div>
                <p className="font-bold text-stone-800 text-lg">Jean-François</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-tight">Disponible</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Le Savoir-Faire</h3>
            <p className="text-sm text-stone-500 leading-relaxed italic bg-white p-5 rounded-3xl border border-stone-100 shadow-sm">
              "Mon don est un outil de soulagement. Je me connecte à votre énergie pour dénouer les blocages qui causent vos douleurs."
            </p>
          </div>

          <div className="pt-4">
            <button 
              onClick={onStartHealing}
              className="w-full p-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              Envoyer ma photo
            </button>
          </div>
        </div>

        {/* Zone de Chat principale */}
        <div className="flex-grow flex flex-col relative bg-transparent z-10">
          <div className="flex-grow overflow-y-auto p-6 md:p-12 space-y-10 scroll-smooth" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[90%] md:max-w-[75%] p-6 md:p-8 rounded-[2rem] text-[15px] md:text-base leading-relaxed shadow-sm transition-all ${
                  msg.sender === 'user' 
                  ? 'bg-stone-900 text-white rounded-tr-none' 
                  : 'bg-stone-50/80 text-stone-700 rounded-tl-none border border-stone-100 backdrop-blur-sm'
                }`}>
                  {msg.text || (isTyping && msg.sender === 'healer' ? (
                    <div className="flex gap-1.5 py-1">
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  ) : '')}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions flottantes */}
          {!isTyping && messages.length < 5 && (
            <div className="px-6 md:px-12 py-4 flex flex-wrap gap-2 animate-fade-in">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(s)}
                  className="px-5 py-2.5 bg-white hover:bg-indigo-50 hover:text-indigo-600 text-stone-500 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border border-stone-100 hover:border-indigo-100 shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Formulaire */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="p-6 md:p-12 pt-4"
          >
            <div className="relative group max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Racontez-moi votre besoin..."
                className="w-full bg-stone-50/50 hover:bg-stone-50 rounded-[2rem] px-8 py-6 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all border border-stone-200 pr-24 backdrop-blur-sm"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-stone-900 text-white px-6 py-3.5 rounded-full shadow-xl hover:bg-black active:scale-95 transition-all disabled:opacity-20 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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