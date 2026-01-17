
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
    // Compteur d'âmes accompagnées
    const startDate = new Date('2024-10-01T00:00:00').getTime();
    const accompaniedBase = 3842;
    const dailyGrowth = 7.5; 
    
    const updateAccompanied = () => {
      const now = Date.now();
      const daysElapsed = (now - startDate) / (1000 * 60 * 60 * 24);
      setAccompaniedCount(Math.floor(accompaniedBase + (daysElapsed * dailyGrowth)));
    };

    updateAccompanied();
    const accompaniedInterval = setInterval(updateAccompanied, 3600000);

    // Compteur de visiteurs en direct
    const liveInterval = setInterval(() => {
      setLiveVisitors(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        if (next < 10) return 10;
        if (next > 28) return 28;
        return next;
      });
    }, 4000);

    return () => {
      clearInterval(accompaniedInterval);
      clearInterval(liveInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-indigo-950 text-white py-2 px-6 overflow-hidden relative border-b border-white/5 text-[10px] font-bold tracking-[0.2em] uppercase">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_5s_infinite] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Urgence Zona & Brûlures : Action prioritaire
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline flex items-center gap-2 text-indigo-300">Disponible 7j/7 sur photo</span>
          </div>
          <div className="flex items-center gap-3">
             <a href="tel:0955554462" className="bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors">09.55.55.44.62</a>
          </div>
        </div>
      </div>

      <nav className="glass sticky top-0 z-50 px-6 py-3 flex flex-col md:flex-row justify-between items-center shadow-sm gap-4">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-800 leading-none mb-1">Jean-François</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold leading-none">Magnétiseur Alençon • France Entière</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-8">
            <button onClick={() => setActiveTab('home')} className={`text-sm font-bold tracking-tight ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}>ACCUEIL</button>
            <button onClick={() => setActiveTab('chat')} className={`text-sm font-bold tracking-tight ${activeTab === 'chat' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}>DISCUTER</button>
            <button onClick={() => setActiveTab('dashboard')} className={`text-sm font-bold tracking-tight ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}>SUIVI</button>
          </div>
          <button onClick={() => setActiveTab('healing')} className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-black hover:bg-indigo-700 transition-all">SOIN SUR PHOTO</button>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-slate-950 text-slate-400 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-serif text-3xl mb-6 italic">Jean-François • Magnétiseur Guérisseur</h3>
            <p className="text-sm leading-relaxed mb-8 max-w-md">Plus de 20 ans d'expertise. Basé à Alençon (Orne), j'accompagne ceux qui souffrent partout en France grâce au soin sur photo.</p>
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 text-amber-500">
                  <span className="font-bold text-xl">09.55.55.44.62</span>
               </div>
               <div className="flex items-center gap-4 text-indigo-400">
                  <a href="mailto:guerisseurtoucheur@gmail.com" className="font-bold text-lg hover:underline">guerisseurtoucheur@gmail.com</a>
               </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-indigo-300">Soin à distance sérieux</h4>
            <ul className="text-sm space-y-4 mb-10">
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('healing')}>Magnétiseur Orne (61)</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('healing')}>Guérisseur zona à distance</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('healing')}>Traitement eczéma sur photo</li>
            </ul>

            <h4 className="text-white font-bold mb-4 text-[10px] uppercase tracking-widest text-slate-500">Zones d'intervention SEO</h4>
            <div className="text-[10px] leading-relaxed text-slate-600 max-w-xs">
              <p className="flex flex-wrap gap-x-2 gap-y-1">
                <span>Paris</span> • <span>Lyon</span> • <span>Marseille</span> • <span>Bordeaux</span> • <span>Lille</span> • <span>Nantes</span> • <span>Strasbourg</span> • <span>Toulouse</span> • <span>Nice</span> • <span>Normandie</span> • <span>Bretagne</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest text-indigo-300">Statistiques</h4>
            <div className="space-y-6 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">Âmes accompagnées</span>
                <span className="text-2xl font-serif text-white font-bold tabular-nums">{accompaniedCount.toLocaleString('fr-FR')}</span>
              </div>
              <div className="pt-2 flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">Visiteurs en ligne</span>
                <span className="text-2xl font-serif text-white font-bold tabular-nums">{liveVisitors}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-slate-600 text-center md:text-left">
          <span>&copy; {new Date().getFullYear()} Jean-François • Alençon (61) • Magnétiseur Guérisseur National</span>
          <span className="text-slate-700">Magnétiseur sérieux à distance • {accompaniedCount.toLocaleString()} témoignages de gratitude</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
