
import React, { useState, useRef, useEffect } from 'react';
import { chatWithJeanFrancois } from '../services/geminiService';
import { Message } from '../types';

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour, je suis Jean-François. Comment puis-je vous aider aujourd'hui ? Avez-vous une question sur une douleur, un blocage ou le magnétisme ?",
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

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await chatWithJeanFrancois(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText || "Je ressens une légère perturbation dans notre connexion. Pourriez-vous reformuler ?",
        sender: 'healer',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col h-[70vh]">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col flex-grow border border-slate-100">
        <div className="bg-indigo-600 p-4 text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center">
            <span className="font-bold">JF</span>
          </div>
          <div>
            <h2 className="font-semibold">Discussion avec Jean-François</h2>
            <p className="text-xs text-indigo-100">En ligne pour vous écouter</p>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/50"
        >
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question à Jean-François..."
            className="flex-grow px-4 py-2 bg-slate-900 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border border-slate-700"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:bg-slate-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
