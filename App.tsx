
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
          <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center overflow-hidden bg-slate-950">
              <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-amber-500/20 rounded-full animate-[ping_10s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-500/30 rounded-full animate-[ping_7s_linear_infinite]"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-indigo-950/40 z-10"></div>
              <div className="relative z-20 max-w-6xl mx-auto px-6 text-white text-center space-y-10">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/20 backdrop-blur-xl rounded-full text-amber-300 text-xs font-bold tracking-[0.2em] border border-amber-500/30 uppercase">
                    Efficacité garantie partout en France
                  </div>
                </div>
                <h1 className="text-5xl md:text-8xl font-serif font-bold leading-[0.9] drop-shadow-2xl">
                  L'<span className="pulse-energy">énergie</span> n'a pas <br />
                  <span className="text-amber-400 italic">de distance.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-slate-300 leading-relaxed font-light">
                  Jean-François, magnétiseur guérisseur, intervient <span className="text-white font-medium underline decoration-amber-500 underline-offset-4">sur photo</span> pour soulager vos maux partout en France.
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-6">
                  <button onClick={() => setActiveTab('healing')} className="px-10 py-5 bg-amber-500 text-slate-950 rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-all">
                    DÉMARRER UN SOIN SUR PHOTO
                  </button>
                  <button onClick={() => setActiveTab('chat')} className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-3">
                    Questions & Réponses
                  </button>
                </div>
              </div>
            </section>

            {/* Pathologies Section (Images optimisées SEO par leurs titres) */}
            <section className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-slate-800 tracking-tight">Expertise en Magnétisme Curatif</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full mt-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Magnétiseur Zona & Brûlures",
                    desc: "Soin d'urgence pour couper le feu. Action immédiate sur photo pour calmer l'inflammation et stopper la douleur.",
                    icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  },
                  {
                    title: "Guérisseur Eczéma & Peau",
                    desc: "Traitement énergétique des problèmes de peau chroniques (eczéma, psoriasis, verrues) par rééquilibrage vibratoire.",
                    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343"
                  },
                  {
                    title: "Soins Énergétiques & Stress",
                    desc: "Libération des blocages émotionnels, fatigue chronique et harmonisation des chakras à distance.",
                    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50 hover:shadow-2xl transition-all group">
                    <div className="w-16 h-16 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-slate-800">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* NEW FAQ SECTION - SEO Semantic Goldmine */}
            <section className="bg-white py-24 border-y border-slate-100">
              <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-4xl font-serif font-bold text-slate-900">Questions fréquentes sur le magnétisme</h2>
                  <p className="text-slate-500 italic">Tout comprendre sur les soins énergétiques à distance</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      q: "Comment fonctionne un magnétiseur à distance ?",
                      a: "Le magnétisme ne dépend pas de la présence physique mais de l'intention et de la résonance vibratoire. À l'aide de votre photo, Jean-François agit sur votre corps éthérique pour dénouer les blocages énergétiques, exactement comme si vous étiez face à lui."
                    },
                    {
                      q: "Le soin sur photo est-il efficace pour le zona ?",
                      a: "Oui, c'est l'une des spécialités de Jean-François. En tant que coupeur de feu, il intervient sur photo pour stopper la douleur cuisante et limiter l'éruption cutanée dès les premiers symptômes."
                    },
                    {
                      q: "Quelles informations dois-je fournir pour une séance ?",
                      a: "Pour une efficacité maximale, Jean-François a besoin d'une photo récente de vous, de votre prénom, nom, date de naissance et d'une description précise de vos maux. Cela constitue votre 'signature vibratoire'."
                    },
                    {
                      q: "Peut-on magnétiser un enfant ou un animal ?",
                      a: "Absolument. Les enfants et les animaux sont souvent très réceptifs au magnétisme car ils n'ont pas de barrières mentales. Les soins sur photo fonctionnent parfaitement pour eux."
                    }
                  ].map((faq, i) => (
                    <details key={i} className="faq-details group bg-slate-50 rounded-3xl border border-transparent hover:border-indigo-100 transition-all">
                      <summary className="list-none p-8 cursor-pointer flex justify-between items-center font-bold text-slate-800 select-none">
                        <span>{faq.q}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-8 pb-8 text-slate-600 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* Section Rayonnement National */}
            <section className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8 italic">Rayonnement National & International</h2>
              <p className="text-slate-500 max-w-2xl mx-auto mb-12">
                Bien que basé à Alençon, mon énergie voyage là où l'on m'appelle. J'accompagne quotidiennement des personnes à Paris, Lyon, Bordeaux et dans toute la francophonie.
              </p>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <span className="font-serif italic text-xl">Île-de-France</span>
                <span className="font-serif italic text-xl">Auvergne-Rhône-Alpes</span>
                <span className="font-serif italic text-xl">Nouvelle-Aquitaine</span>
                <span className="font-serif italic text-xl">Provence-Alpes-Côte d'Azur</span>
                <span className="font-serif italic text-xl">Hauts-de-France</span>
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
