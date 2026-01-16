
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
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold leading-none mb-1">Magnétiseur Guérisseur National</p>
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
            Cabinet à <span className="font-bold text-slate-800">Alençon</span>. Soins sur photo dans <span className="font-bold text-slate-800">toute la France</span>.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-6">
            <button onClick={() => setActiveTab('home')} className={`text-sm font-medium ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-600'}`}>Accueil</button>
            <button onClick={() => setActiveTab('chat')} className={`text-sm font-medium ${activeTab === 'chat' ? 'text-indigo-600' : 'text-slate-600'}`}>Discuter</button>
            <button onClick={() => setActiveTab('healing')} className={`text-sm font-medium ${activeTab === 'healing' ? 'text-indigo-600' : 'text-slate-600'}`}>Soin à Distance</button>
          </div>
          <button onClick={() => setActiveTab('healing')} className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:bg-indigo-700 transition-all active:scale-95">Demande de soin</button>
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
              Praticien en énergies subtiles depuis plus de 20 ans. Magnétiseur à Alençon et guérisseur à distance sur photo partout en France.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services Nationaux</h4>
            <p className="text-sm leading-relaxed mb-4 italic">
              "La distance n'existe pas dans le monde des énergies. Je travaille sur votre photo avec la même intensité que si vous étiez au cabinet."
            </p>
            <ul className="text-xs space-y-1">
              <li>• Magnétiseur Paris & IDF</li>
              <li>• Guérisseur Lyon & Rhône</li>
              <li>• Soin énergétique Bordeaux & Gironde</li>
              <li>• Coupeur de feu Marseille & PACA</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact direct</h4>
            <div className="space-y-3">
              <a href="mailto:guerisseurtoucheur@gmail.com" className="flex items-center gap-3 text-indigo-400 hover:text-indigo-300">
                <span className="text-sm">guerisseurtoucheur@gmail.com</span>
              </a>
              <a href="tel:0955554462" className="flex items-center gap-3 text-indigo-400 hover:text-indigo-300">
                <span className="text-sm font-bold">09.55.55.44.62</span>
              </a>
            </div>
          </div>
        </div>

        {/* SECTION CACHÉE SEO POUR LES MOTEURS DE RECHERCHE */}
        <div className="sr-only-seo" aria-hidden="true">
          <h2>Magnétiseur guérisseur à distance France entière</h2>
          <p>Jean-François intervient en tant que magnétiseur à Paris, Lyon, Marseille, Toulouse, Nice, Nantes, Montpellier, Strasbourg, Bordeaux, Lille, Rennes, Reims, Saint-Étienne, Le Havre, Toulon, Grenoble, Dijon, Angers, Nîmes, Villeurbanne, Clermont-Ferrand, Le Mans, Aix-en-Provence, Brest, Tours, Amiens, Limoges, Annecy, Perpignan, Boulogne-Billancourt, Metz, Besançon, Orléans, Saint-Denis, Argenteuil, Rouen, Mulhouse, Montreuil, Caen, Nancy, Nanterre, Tourcoing, Vitry-sur-Seine, Créteil, Avignon, Poitiers, Courbevoie, Versailles, Colombes, Aubervilliers, Aulnay-sous-Bois, Saint-Pierre, Cherbourg-en-Cotentin, Pau, Rueil-Malmaison, Champigny-sur-Marne, Antibes, Béziers, La Rochelle, Saint-Maur-des-Fossés, Cannes, Fort-de-France, Saint-Nazaire, Mérignac, Drancy, Colmar, Ajaccio, Issy-les-Moulineaux, Levallois-Perret, Évry-Courcouronnes, Quimper, Neuilly-sur-Seine, Bourges, Noisy-le-Grand, Cayenne, Sarcelles, Niort, Lorient, Pessac, Vénissieux, Chambéry, Beauvais, Cergy, Valence, Cholet, Saint-Quentin, Hyères, Cayenne, Troyes, Sarcelles, Niort, Lorient, Pessac, Vénissieux, Chambéry, Beauvais, Cergy, Valence, Cholet, Saint-Quentin, Hyères, Pantin, Maisons-Alfort, Ivry-sur-Seine, Fontaine, Saint-Brieuc, Saint-Malo, Blois, Tarbes, Albi, Carcassonne, Martigues, Narbonne, Châteauroux, Évreux, Laval, Belfort, Brive-la-Gaillarde, Castres, Gap.</p>
          <p>Soin énergétique zona distance, eczéma traitement naturel magnétisme, coupeur de feu radiothérapie, brûlures, verrues, psoriasis, douleurs articulaires, stress et anxiété.</p>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} Jean-François Magnétiseur. Rayonnement national.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
