import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [accompaniedCount, setAccompaniedCount] = useState(3842);

  useEffect(() => {
    const interval = setInterval(() => {
      setAccompaniedCount(prev => prev + (Math.random() > 0.9 ? 1 : 0));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="glass-nav sticky top-0 z-50 px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-white font-serif italic text-2xl shadow-lg">
            JF
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-stone-900 leading-none">Jean-François</h1>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mt-1">Magnétiseur • Alençon</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-widest text-stone-400">
            <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-indigo-600' : 'hover:text-stone-900 transition-colors'}>Accueil</button>
            <button onClick={() => setActiveTab('chat')} className={activeTab === 'chat' ? 'text-indigo-600' : 'hover:text-stone-900 transition-colors'}>Discussion</button>
            <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-indigo-600' : 'hover:text-stone-900 transition-colors'}>Suivi</button>
          </div>
          <button 
            onClick={() => setActiveTab('healing')} 
            className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
          >
            Soin sur Photo
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-stone-100 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <h3 className="text-stone-900 font-serif text-3xl font-bold italic">Jean-François</h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                Une pratique sérieuse et humble du magnétisme traditionnel. Près de 4000 personnes accompagnées avec bienveillance pour soulager les maux du quotidien.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{accompaniedCount.toLocaleString()} demandes traitées</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-stone-400 font-bold text-[10px] uppercase tracking-widest">Coordonnées</h4>
              <div className="space-y-3">
                <p className="text-stone-900 text-2xl font-bold">09.55.55.44.62</p>
                <p className="text-indigo-600 text-sm font-medium underline underline-offset-4">guerisseurtoucheur@gmail.com</p>
                <p className="text-stone-500 text-sm italic">Alençon (61000), Normandie</p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-stone-400 font-bold text-[10px] uppercase tracking-widest">Informations</h4>
              <div className="text-[11px] text-stone-400 leading-relaxed space-y-4">
                <p>© {new Date().getFullYear()} Jean-François • Guérisseur Magnétiseur</p>
                <p className="italic border-l-2 border-amber-200 pl-4 py-1">
                  Le magnétisme est une aide énergétique complémentaire. Il ne remplace pas une consultation médicale et ne doit pas interrompre vos traitements en cours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;