
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">Jean-François</h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Magnétiseur Guérisseur</p>
          </div>
        </div>

        <div className="hidden md:flex gap-8">
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
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-500'}`}
          >
            Mes Soins
          </button>
        </div>

        <button 
          onClick={() => setActiveTab('healing')}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
        >
          Déposer une photo et votre demande
        </button>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-serif text-2xl mb-4">Jean-François</h3>
            <p className="text-sm leading-relaxed">
              Praticien en énergies subtiles depuis plus de 20 ans. Mon engagement est de vous aider à retrouver votre harmonie intérieure et votre vitalité naturelle.
            </p>
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
            <h4 className="text-white font-semibold mb-4">Avertissement</h4>
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
