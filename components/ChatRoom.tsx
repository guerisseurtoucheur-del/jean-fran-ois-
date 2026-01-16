
import React, { useState, useRef, useEffect } from 'react';
import { chatWithJeanFrancois } from '../services/geminiService';
import { Message } from '../types';

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour, je suis Jean-François. Posez-moi vos questions en toute confiance. Que ce soit pour une douleur physique ou un besoin d'apaisement, je vous écoute.",
      sender: 'healer',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    setError(null);
    const currentInput = input;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Simulation d'un temps de connexion pour le ressenti énergétique
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const responseText = await chatWithJeanFrancois(currentInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText || "Je n'arrive pas à formuler mon ressenti pour l'instant. Pouvez-vous me redonner quelques détails ?",
        sender: 'healer',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setError("Le lien énergétique est temporairement perturbé. Veuillez réessayer dans quelques instants.");
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Désolé, la connexion est difficile en ce moment. N'hésitez pas à me contacter directement par email ou téléphone si votre demande est urgente.",
        sender: 'healer',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col h-[75vh]">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col flex-grow border border-slate-100">
        <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-indigo-400 border-2 border-white/20 flex items-center justify-center text-xl font-serif">
                JF
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-indigo-600 rounded-full"></div>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Jean-François</h2>
              <p className="text-xs text-indigo-100 opacity-80 italic">À votre écoute bienveillante</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-[10px] uppercase tracking-widest font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Session Sécurisée
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/30"
        >
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] px-6 py-4 rounded-[1.8rem] shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">{msg.text}</p>
                <div className={`flex items-center gap-2 mt-2 ${msg.sender === 'user' ? 'justify-end text-indigo-200' : 'text-slate-400'}`}>
                  <span className="text-[9px] font-medium">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-6 py-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1.5 items-center">
                <span className="text-xs text-slate-400 italic mr-2">Jean-François se connecte...</span>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          {error && (
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-xs rounded-full font-medium border border-red-100">
                {error}
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Décrivez votre besoin ici..."
              className="w-full pl-6 pr-14 py-4 bg-slate-100 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner border-transparent"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 disabled:bg-slate-200 disabled:scale-100 shadow-lg"
              title="Envoyer votre message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-3 italic">
            Vos échanges avec Jean-François sont confidentiels et protégés par le secret professionnel.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
