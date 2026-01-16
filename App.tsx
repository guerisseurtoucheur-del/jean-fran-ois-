
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
                
                {/* Rayons du soleil stylisés */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute top-1/2 left-1/2 h-[200%] w-[2px] bg-gradient-to-b from-transparent via-amber-300 to-transparent"
                      style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80 z-10"></div>
              
              <div className="relative z-20 max-w-6xl mx-auto px-6 text-white text-center space-y-8">
                <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-amber-200 text-sm font-semibold tracking-wide border border-white/20">
                  MAGNÉTISME • SOINS ÉNERGÉTIQUES • ALENÇON & DISTANCE
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-none drop-shadow-2xl">
                  Jean-François <br />
                  <span className="text-amber-400 italic">Magnétiseur à Alençon</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-100 leading-relaxed font-light drop-shadow-lg">
                  Coupeur de feu et guérisseur traditionnel. Je soulage vos maux : zona, eczéma, douleurs physiques et blocages énergétiques dans l'Orne, la Sarthe et la Mayenne.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('healing')}
                    className="px-8 py-4 bg-amber-500 text-slate-900 rounded-full font-bold shadow-2xl shadow-amber-500/30 hover:bg-amber-400 transition-all hover:translate-y-[-2px] active:scale-95"
                  >
                    Demander un soin sur photo
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
                <h2 className="text-4xl font-serif font-bold text-slate-800">Soins énergétiques et Magnétisme</h2>
                <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                <p className="text-slate-500 max-w-xl mx-auto">Intervention rapide pour apaiser vos souffrances à Alençon et partout en France à distance.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Douleurs Physiques",
                    desc: "Zona, eczéma, douleurs dentaires, migraines, douleurs dorsales, problèmes digestifs ou hémorroïdes. Le magnétisme apaise le feu et l'inflammation.",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z"
                  },
                  {
                    title: "Troubles Émotionnels",
                    desc: "Stress, anxiété, fatigue chronique ou burn-out. Harmonisation profonde des centres énergétiques pour retrouver la paix.",
                    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  },
                  {
                    title: "Accompagnement",
                    desc: "Un suivi bienveillant et une écoute sans jugement pour vous redonner la force de traverser les épreuves de la vie.",
                    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
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

            {/* Testimonials Simulation */}
            <section className="bg-slate-900 py-24 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 skew-x-12 translate-x-32"></div>
              <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
                <h2 className="text-4xl font-serif font-bold italic leading-tight">"L'énergie est comme la lumière du soleil : elle est partout, elle réchauffe et elle transforme l'ombre en clarté."</h2>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full border-2 border-amber-400 p-1.5 bg-slate-900 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-amber-500 flex items-center justify-center text-3xl font-serif font-bold text-slate-900">JF</div>
                  </div>
                  <div>
                    <p className="font-bold text-xl">Jean-François</p>
                    <p className="text-amber-400 text-sm font-medium tracking-widest uppercase">Magnétiseur • Guérisseur Alençon</p>
                  </div>
                </div>
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
