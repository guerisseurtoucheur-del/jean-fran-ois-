import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ChatRoom from './components/ChatRoom';
import HealingRequest from './components/HealingRequest';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'chat': return <ChatRoom onStartHealing={() => setActiveTab('healing')} />;
      case 'healing': return <HealingRequest onSuccess={() => setActiveTab('dashboard')} />;
      case 'dashboard': return <Dashboard />;
      default:
        return (
          <div className="page-fade">
            {/* Hero Section Zen */}
            <section className="relative min-h-[85vh] flex items-center px-6 overflow-hidden bg-white">
              {/* Sphères d'énergie décoratives */}
              <div className="energy-field w-96 h-96 bg-indigo-100 -top-20 -left-20"></div>
              <div className="energy-field w-[500px] h-[500px] bg-amber-50 -bottom-40 -right-20" style={{ animationDelay: '2s' }}></div>

              <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-stone-50 border border-stone-100 rounded-full">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">Pratique réelle • Alençon & France</span>
                  </div>

                  <h1 className="text-7xl md:text-[100px] font-serif font-bold text-stone-900 leading-[0.85] tracking-tight">
                    Le soin par <br/>
                    <span className="text-indigo-600 italic font-normal">le souffle</span><br/>
                    et les mains.
                  </h1>

                  <p className="text-xl text-stone-600 font-light max-w-lg leading-relaxed">
                    Jean-François, magnétiseur guérisseur. <br/>
                    Une aide précieuse pour apaiser vos maux physiques et retrouver votre harmonie intérieure, même à distance.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5 pt-4">
                    <button 
                      onClick={() => setActiveTab('chat')}
                      className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all btn-glow flex items-center justify-center gap-3 group"
                    >
                      <span>Me poser une question</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setActiveTab('healing')}
                      className="px-10 py-5 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all"
                    >
                      Soin sur photo
                    </button>
                  </div>
                </div>

                <div className="relative hidden md:block">
                  <div className="aspect-[4/5] bg-stone-100 rounded-[5rem] overflow-hidden shadow-inner relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1515377666659-8132a41d4d7f?auto=format&fit=crop&q=80&w=800" 
                      alt="Bien-être"
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl">
                      <p className="text-stone-400 text-[10px] uppercase font-bold tracking-widest mb-2">Engagement</p>
                      <h3 className="text-2xl font-serif font-bold text-stone-800 italic leading-snug">
                        "Ma mission est de vous transmettre l'énergie nécessaire pour que votre corps se répare."
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Services plus aérée */}
            <section className="py-32 bg-stone-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-16">
                  <div className="space-y-6">
                    <div className="text-4xl">🧬</div>
                    <h3 className="text-3xl font-serif font-bold text-stone-900">Maux de peau</h3>
                    <p className="text-stone-500 leading-relaxed">Zona, eczéma, psoriasis, verrues ou brûlures. Le magnétisme apaise instantanément le feu et aide à la régénération saine de l'épiderme.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="text-4xl">⚡</div>
                    <h3 className="text-3xl font-serif font-bold text-stone-900">Douleurs Physiques</h3>
                    <p className="text-stone-500 leading-relaxed">Problèmes de dos, articulations, migraines ou inflammations. Je travaille sur les blocages pour libérer la circulation des fluides vitaux.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="text-4xl">🌊</div>
                    <h3 className="text-3xl font-serif font-bold text-stone-900">Apaisement Émotionnel</h3>
                    <p className="text-stone-500 leading-relaxed">Stress profond, anxiété, insomnies ou fatigue inexpliquée. Retrouvez votre vitalité et un sommeil réparateur naturellement.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Info Alençon */}
            <section className="py-24 border-y border-stone-100 bg-white">
              <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                <h2 className="text-4xl font-serif font-bold italic text-stone-800">Intervention à Alençon et partout en France</h2>
                <p className="text-lg text-stone-500 leading-relaxed">
                  Je reçois sur rendez-vous à Alençon pour ceux qui peuvent se déplacer. Pour les autres, mon travail sur photo est tout aussi puissant. L'énergie n'a aucune frontière physique.
                </p>
                <div className="pt-4">
                  <a href="tel:0955554462" className="text-3xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">09.55.55.44.62</a>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return <Layout activeTab={activeTab} setActiveTab={setActiveTab}>{renderContent()}</Layout>;
};

export default App;