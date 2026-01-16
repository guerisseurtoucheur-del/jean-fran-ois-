
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
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-indigo-900/40 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920" 
                alt="Zen Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-20 max-w-6xl mx-auto px-6 text-white space-y-8">
                <div className="inline-block px-4 py-1.5 bg-indigo-500/20 backdrop-blur-md rounded-full text-indigo-300 text-sm font-semibold tracking-wide border border-indigo-400/20">
                  ÉNERGIE • BIEN-ÊTRE • HARMONIE
                </div>
                <h1 className="text-6xl md:text-8xl font-serif font-bold leading-none">
                  Retrouvez votre <br />
                  <span className="text-indigo-400 italic">équilibre vital</span>
                </h1>
                <p className="max-w-xl text-lg text-slate-300 leading-relaxed font-light">
                  Je m'appelle Jean-François. À travers le magnétisme et les soins sur photo, je vous aide à libérer vos blocages énergétiques et à soulager vos maux physiques et émotionnels.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('healing')}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:translate-y-[-2px] active:scale-95"
                  >
                    Demander un soin à distance
                  </button>
                  <button 
                    onClick={() => setActiveTab('chat')}
                    className="px-8 py-4 glass text-white rounded-full font-bold hover:bg-white/20 transition-all"
                  >
                    Me poser une question
                  </button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl font-serif font-bold text-slate-800">Comment puis-je vous aider ?</h2>
                <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Douleurs Physiques",
                    desc: "Migraines, douleurs dorsales, problèmes de peau ou digestifs. Le magnétisme apaise l'inflammation.",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z"
                  },
                  {
                    title: "Troubles Émotionnels",
                    desc: "Stress, anxiété, fatigue chronique ou burn-out. Harmonisation profonde des centres énergétiques.",
                    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  },
                  {
                    title: "Accompagnement",
                    desc: "Un suivi bienveillant pour vous redonner la force de traverser les épreuves de la vie.",
                    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  }
                ].map((item, i) => (
                  <div key={i} className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-50 transition-all">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
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
            <section className="bg-indigo-900 py-24 text-white">
              <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                <h2 className="text-4xl font-serif font-bold italic">"L'énergie ne connaît pas de frontières. Un soin sur photo agit avec la même puissance qu'une séance en cabinet."</h2>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full border-2 border-indigo-400 p-1">
                    <img src="https://picsum.photos/id/64/200/200" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Jean-François</p>
                    <p className="text-indigo-400 text-sm">Votre Guide Énergétique</p>
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
