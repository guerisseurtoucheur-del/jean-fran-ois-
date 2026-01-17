
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [accompaniedCount, setAccompaniedCount] = useState(3842);
  const [liveVisitors, setLiveVisitors] = useState(18);

  useEffect(() => {
    // 1. Logique du compteur d'âmes accompagnées (Base 3800+, +7.5 par jour)
    const startDate = new Date('2024-10-01T00:00:00').getTime();
    const accompaniedBase = 3842;
    const dailyGrowth = 7.5; 
    
    const updateAccompanied = () => {
      const now = Date.now();
      const daysElapsed = (now - startDate) / (1000 * 60 * 60 * 24);
      setAccompaniedCount(Math.floor(accompaniedBase + (daysElapsed * dailyGrowth)));
    };

    updateAccompanied();
    const accompaniedInterval = setInterval(updateAccompanied, 3600000); // Mise à jour toutes les heures

    // 2. Logique du compteur de visiteurs en direct (Fluctuant entre 10 et 28)
    const liveInterval = setInterval(() => {
      setLiveVisitors(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        if (next < 10) return 10;
        if (next > 28) return 28;
        return next;
      });
    }, 4000); // Fluctuation toutes les 4 secondes

    return () => {
      clearInterval(accompaniedInterval);
      clearInterval(liveInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <nav className="glass sticky top-0 z-50 px-6 py-3 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveTab('home')}
        >
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-800 leading-none mb-1">Jean-François</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold leading-none mb-1">Magnétiseur Alençon • France Entière</p>
            <a 
              href="tel:0955554462" 
              className="text-[11px] text-indigo-600 font-bold hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              09.55.55.44.62
            </a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-8">
            <button onClick={() => setActiveTab('home')} className={`text-sm font-bold tracking-tight transition-all ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}>ACCUEIL</button>
            <button onClick={() => setActiveTab('chat')} className={`text-sm font-bold tracking-tight transition-all ${activeTab === 'chat' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}>DISCUTER</button>
            <button onClick={() => setActiveTab('dashboard')} className={`text-sm font-bold tracking-tight transition-all ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}>SUIVI</button>
          </div>
          <button 
            onClick={() => setActiveTab('healing')} 
            className={`px-6 py-2.5 rounded-full text-sm font-black tracking-wide transition-all active:scale-95 shadow-lg ${
              activeTab === 'healing' 
              ? 'bg-amber-500 text-slate-950' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            SOIN SUR PHOTO
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Floating Chat Bot Bubble */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
        {activeTab !== 'chat' && (
          <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 text-xs font-bold text-slate-700 pointer-events-auto animate-bounce mb-1">
            Besoin d'aide ? Discutez avec moi
          </div>
        )}
        <button 
          onClick={() => setActiveTab('chat')}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-90 pointer-events-auto group ${
            activeTab === 'chat' ? 'bg-amber-500 text-slate-900' : 'bg-indigo-600 text-white hover:scale-110'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>

      <footer className="bg-slate-950 text-slate-400 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-serif text-3xl mb-6 italic">Jean-François • Magnétiseur Guérisseur</h3>
            <p className="text-sm leading-relaxed mb-8 max-w-md">
              Plus de 20 ans d'expertise en magnétisme et soins énergétiques. Basé à Alençon (Orne), j'accompagne ceux qui souffrent partout en France grâce à la force du soin sur photo.
            </p>
            <div className="flex flex-col gap-6">
               <div className="flex items-center gap-4 text-amber-500">
                  <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xl">09.55.55.44.62</span>
               </div>
               <div className="flex items-center gap-4 text-indigo-400">
                  <div className="w-10 h-10 rounded-full border border-indigo-400/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <a href="mailto:guerisseurtoucheur@gmail.com" className="font-bold text-lg hover:underline decoration-indigo-500 underline-offset-4">guerisseurtoucheur@gmail.com</a>
               </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-indigo-300">Soin à distance sérieux</h4>
            <ul className="text-sm space-y-4">
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('healing')}>Magnétiseur Orne (61)</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('healing')}>Guérisseur zona à distance</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('healing')}>Traitement eczéma sur photo</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-indigo-300">Statistiques</h4>
            <div className="space-y-6 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
                  Âmes accompagnées
                </span>
                <span className="text-2xl font-serif text-white font-bold tabular-nums">
                  {accompaniedCount.toLocaleString('fr-FR')}
                </span>
                <p className="text-[9px] text-slate-600 italic">+7-8 nouveaux soins chaque jour</p>
              </div>

              <div className="pt-2 flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Visiteurs en ligne
                </span>
                <span className="text-2xl font-serif text-white font-bold tabular-nums transition-all duration-1000">
                  {liveVisitors}
                </span>
                <p className="text-[9px] text-slate-600 italic">Personnes parcourant le site actuellement</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-slate-600">
          <span>&copy; {new Date().getFullYear()} Jean-François • Alençon (61) • Magnétiseur Guérisseur National</span>
          <span className="text-slate-700">Magnétiseur sérieux à distance • {accompaniedCount.toLocaleString()} témoignages de gratitude</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
