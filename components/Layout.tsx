
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [visitorCount, setVisitorCount] = useState(14582);
  const [onlineCount, setOnlineCount] = useState(12);

  useEffect(() => {
    const startDate = new Date('2024-01-01').getTime();
    const now = Date.now();
    const daysElapsed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    
    const baseCount = 14582;
    const dailyGrowth = 14; 
    const calculatedTotal = baseCount + (daysElapsed * dailyGrowth);

    if (!sessionStorage.getItem('session_counted')) {
      const finalCount = calculatedTotal + 1;
      setVisitorCount(finalCount);
      sessionStorage.setItem('session_counted', 'true');
      localStorage.setItem('last_calculated_count', finalCount.toString());
    } else {
      const saved = localStorage.getItem('last_calculated_count');
      setVisitorCount(saved ? parseInt(saved) : calculatedTotal);
    }

    const interval = setInterval(() => {
      setOnlineCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        const next = prev + change;
        return next > 3 ? (next < 25 ? next : 24) : 4;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
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
            <div className="flex items-center gap-3 mt-1">
              <a 
                href="tel:0955554462" 
                className="text-[11px] text-indigo-600 font-bold hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                09.55.55.44.62
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 py-2 bg-amber-50 rounded-2xl border border-amber-100 max-w-xl shadow-inner text-center">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <p className="text-[11px] md:text-xs text-amber-900 leading-tight">
              Soin sur photo <span className="font-bold">disponible partout en France</span>.
            </p>
          </div>
          <div className="hidden md:block w-px h-4 bg-amber-200"></div>
          <p className="text-[10px] text-amber-700 font-medium">Cabinet Alençon & Distance</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-8">
            <button onClick={() => setActiveTab('home')} className={`text-sm font-bold tracking-tight transition-all ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}>ACCUEIL</button>
            <button onClick={() => setActiveTab('chat')} className={`text-sm font-bold tracking-tight transition-all ${activeTab === 'chat' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}>DISCUTER</button>
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
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Soin à distance sérieux</h4>
            <ul className="text-sm space-y-4">
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('healing')}>Magnétiseur Orne (61)</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('healing')}>Guérisseur zona à distance</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('healing')}>Traitement eczéma sur photo</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('dashboard')}>Suivi de ma séance</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Localisation</h4>
            <div className="space-y-4 text-sm">
              <p>Secteur Alençon (61000)</p>
              <p>Orne, Basse-Normandie</p>
              <div className="pt-4 flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Visiteurs</span>
                <span className="text-2xl font-serif text-white font-bold">{visitorCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-slate-600">
          <span>&copy; {new Date().getFullYear()} Jean-François • Alençon (61) • Magnétiseur Guérisseur National</span>
          <span className="text-slate-700">Magnétiseur sérieux à distance • {visitorCount.toLocaleString()} âmes accompagnées</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
