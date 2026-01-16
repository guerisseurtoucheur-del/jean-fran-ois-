
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
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
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold leading-none mb-1">Magnétiseur Guérisseur</p>
            <div className="flex items-center gap-3 mt-1">
              <a 
                href="tel:0955554462" 
                className="text-[11px] text-indigo-600 font-bold hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                09.55.55.44.62
              </a>
            </div>
          </div>
        </div>

        {/* Info Localisation au centre */}
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="text-[11px] md:text-xs text-slate-600 leading-tight">
            Je reçois sur <span className="font-bold text-slate-800">Alençon (Orne)</span>. Je me déplace à <span className="font-bold text-slate-800">50 km autour</span> (Orne, Sarthe, Mayenne).
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
            >
              Accueil
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`text-sm font-medium transition-colors ${activeTab === 'chat' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
            >
              Discuter
            </button>
            <button 
              onClick={() => setActiveTab('healing')}
              className={`text-sm font-medium transition-colors ${activeTab === 'healing' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
            >
              Soin à Distance
            </button>
          </div>

          <button 
            onClick={() => setActiveTab('healing')}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 whitespace-nowrap"
          >
            Demande de soin
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-serif text-2xl mb-4">Jean-François</h3>
            <p className="text-sm leading-relaxed mb-6">
              Praticien en énergies subtiles depuis plus de 20 ans. Basé à Alençon, j'interviens sur place ou à distance pour votre mieux-être.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:guerisseurtoucheur@gmail.com" className="text-sm hover:underline font-medium">guerisseurtoucheur@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:0955554462" className="text-sm hover:underline font-medium">09.55.55.44.62</a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Accueil</button></li>
              <li><button onClick={() => setActiveTab('chat')} className="hover:text-white transition-colors">Questions & Réponses</button></li>
              <li><button onClick={() => setActiveTab('healing')} className="hover:text-white transition-colors">Demande de soin</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Secteur d'intervention</h4>
            <p className="text-sm leading-relaxed mb-4">
              Cabinet à Alençon. Déplacements dans l'Orne, la Sarthe et la Mayenne (radius de 50 km).
            </p>
            <p className="text-xs leading-relaxed italic">
              Le magnétisme est un complément aux traitements médicaux conventionnels. Il ne remplace en aucun cas l'avis d'un médecin ou un traitement prescrit.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} Jean-François Magnétiseur. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
