
import React, { useState } from 'react';
import Layout from './components/Layout';
import ChatRoom from './components/ChatRoom';
import HealingRequest from './components/HealingRequest';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatRoom />;
      case 'healing':
        return <HealingRequest onSuccess={() => setActiveTab('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
          <div className="space-y-20 pb-20">
            {/* Hero Section with Radiant Sun */}
            <section className="relative h-[85vh] flex items-center overflow-hidden bg-slate-900">
              {/* Grand Soleil Radiant */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] bg-amber-500 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-yellow-400 rounded-full blur-[80px] opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-white rounded-full blur-[40px] opacity-80"></div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80 z-10"></div>
              
              <div className="relative z-20 max-w-6xl mx-auto px-6 text-white text-center space-y-8">
                <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-amber-200 text-sm font-semibold tracking-wide border border-white/20 uppercase">
                  SOINS ÉNERGÉTIQUES SUR PHOTO • DISPONIBLE PARTOUT EN FRANCE
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-none drop-shadow-2xl">
                  Jean-François <br />
                  <span className="text-amber-400 italic">Magnétiseur National</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-100 leading-relaxed font-light drop-shadow-lg">
                  Coupeur de feu et guérisseur traditionnel. Je soulage vos maux (zona, eczéma, douleurs) au cabinet à Alençon ou à distance sur photo <span className="font-semibold text-amber-300">partout en France</span>.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('healing')}
                    className="px-8 py-4 bg-amber-500 text-slate-900 rounded-full font-bold shadow-2xl shadow-amber-500/30 hover:bg-amber-400 transition-all hover:translate-y-[-2px] active:scale-95"
                  >
                    Demander un soin à distance
                  </button>
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all"
                  >
                    Questions & Réponses
                  </button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-serif font-bold text-slate-800">Le Magnétisme sans frontières</h2>
                <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                <p className="text-slate-500 max-w-xl mx-auto">Que vous soyez à Paris, Lyon, Marseille ou dans un petit village, mon énergie vous accompagne sur simple photo.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Soin sur Photo",
                    desc: "La photo est le support vibratoire qui me permet de vous envoyer de l'énergie où que vous soyez en France. Idéal pour le zona et les urgences.",
                    icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  },
                  {
                    title: "Coupeur de Feu",
                    desc: "Brûlures, zona, radiothérapie. J'interviens immédiatement à distance pour 'couper' la douleur et favoriser la cicatrisation.",
                    icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  },
                  {
                    title: "Harmonisation",
                    desc: "Rééquilibrage complet de vos chakras et de votre aura pour retrouver vitalité et sérénité émotionnelle au quotidien.",
                    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"
                  }
                ].map((item, i) => (
                  <div key={i} className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-amber-50 transition-all">
                    <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-3 text-slate-800">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
