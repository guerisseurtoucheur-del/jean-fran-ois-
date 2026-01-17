
import React, { useState, useRef, useEffect } from 'react';
import { chatWithJeanFrancois } from '../services/geminiService';
import { Message } from '../types';

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour, je suis Jean-François. En quoi puis-je vous aider aujourd'hui ? Que ce soit pour une question sur le magnétisme à Alençon ou un soin sur photo, je vous écoute.",
      sender: 'healer',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user', timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await chatWithJeanFrancois(input);
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: responseText || "Je suis désolé, je n'ai pas pu recevoir votre message énergétique. Réessayez dans un instant.", sender: 'healer', timestamp: Date.now() };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-[80vh] flex flex-col">
      <div className="bg-white flex-grow flex flex-col rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-serif text-xl border border-white/30">JF</div>
            <div>
              <h2 className="font-serif font-bold text-lg">Discussion avec Jean-François</h2>
              <p className="text-xs text-indigo-100 italic">Magnétiseur guérisseur en ligne</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-black/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Connexion Énergétique Active
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-8 space-y-6 bg-slate-50/30"
        >
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-slate-400 font-medium animate-pulse">
              Jean-François canalise une réponse...
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-50">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question à Jean-François..."
              className="flex-grow bg-slate-50 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border border-transparent focus:bg-white"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
