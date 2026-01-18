
import React, { useState } from 'react';
import Layout from './components/Layout';
import ChatRoom from './components/ChatRoom';
import HealingRequest from './components/HealingRequest';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat': return <ChatRoom onStartHealing={() => setActiveTab('healing')} />;
      case 'healing': return <HealingRequest onSuccess={() => setActiveTab('dashboard')} />;
      case 'dashboard': return <Dashboard />;
      default:
        return (
          <div className="space-y-24 pb-24">
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white text-center px-6">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
              <div className="relative z-10 max-w-4xl space-y-8">
                <div className="inline-block px-4 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-[10px] font-bold tracking-widest uppercase">Magnétiseur Alençon & France Entière</div>
                <h1 className="text-5xl md:text-8xl font-serif font-bold leading-none">L'<span className="pulse-energy">énergie</span> n'a pas <br/><span className="text-amber-400 italic">de distance.</span></h1>
                <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto">Jean-François, magnétiseur guérisseur, intervient sur photo pour soulager vos maux où que vous soyez.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button onClick={() => setActiveTab('healing')} className="px-10 py-5 bg-amber-500 text-slate-950 rounded-full font-black text-lg shadow-xl hover:scale-105 transition-all">DÉMARRER UN SOIN SUR PHOTO</button>
                  <button onClick={() => setActiveTab('chat')} className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all">POSER UNE QUESTION</button>
                </div>
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="p-8 bg-white rounded-3xl shadow-lg border border-slate-50">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6">🔥</div>
                <h3 className="text-xl font-serif font-bold mb-3">Zona & Brûlures</h3>
                <p className="text-sm text-slate-500">Action rapide de coupeur de feu sur photo pour stopper la douleur immédiatement.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-lg border border-slate-50">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6">✨</div>
                <h3 className="text-xl font-serif font-bold mb-3">Eczéma & Peau</h3>
                <p className="text-sm text-slate-500">Magnétisme traditionnel pour apaiser le psoriasis, les verrues et les problèmes cutanés.</p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-lg border border-slate-50">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6">🌿</div>
                <h3 className="text-xl font-serif font-bold mb-3">Rééquilibrage</h3>
                <p className="text-sm text-slate-500">Retrouvez votre vitalité et libérez-vous du stress grâce à un suivi énergétique sérieux.</p>
              </div>
            </section>
          </div>
        );
    }
  };

  return <Layout activeTab={activeTab} setActiveTab={setActiveTab}>{renderContent()}</Layout>;
};

export default App;
