
import React, { useState } from 'react';
import { analyzeHealingRequest } from '../services/geminiService';
import { HealingSession } from '../types';

interface HealingRequestProps {
  onSuccess: (session: HealingSession) => void;
}

const HealingRequest: React.FC<HealingRequestProps> = ({ onSuccess }) => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !photo) return;

    setIsSubmitting(true);
    try {
      const result = await analyzeHealingRequest(description, photo);
      setAnalysis(result || "Analyse en cours...");
      
      const newSession: HealingSession = {
        id: Math.random().toString(36).substr(2, 9),
        userName: "Utilisateur", // Mock
        problemDescription: description,
        photoUrl: photo,
        status: 'pending',
        energyLevel: 20,
        createdAt: Date.now()
      };
      
      // Store locally for demo
      const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
      localStorage.setItem('sessions', JSON.stringify([...sessions, newSession]));
      
      setTimeout(() => {
        onSuccess(newSession);
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      // Keep analysis visible briefly then success
    }
  };

  if (analysis) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-indigo-50 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">Transmission Réussie</h2>
        <div className="bg-slate-50 p-6 rounded-2xl text-left mb-8">
          <h3 className="text-indigo-600 font-semibold mb-2">Message de Jean-François :</h3>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line italic">
            "{analysis}"
          </p>
        </div>
        <p className="text-slate-500 text-sm mb-6">
          Jean-François travaille maintenant sur votre flux énergétique. Vous pouvez suivre l'évolution dans votre tableau de bord.
        </p>
        <button 
          onClick={() => window.location.reload()} // Simplified navigation back
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition-all"
        >
          Voir mes soins
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-6">
      <div className="space-y-6">
        <h2 className="text-4xl font-serif font-bold text-slate-800 leading-tight">Soin à distance sur photo</h2>
        <p className="text-slate-600">
          La distance n'est pas un obstacle pour l'énergie. En me transmettant votre photo et la nature de votre souffrance, je peux établir un lien vibratoire pour débloquer vos centres d'énergie.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">1</div>
            <p className="text-sm text-slate-500">Choisissez une photo où vous êtes seul(e), de face, et récente (moins de 6 mois).</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">2</div>
            <p className="text-sm text-slate-500">Décrivez précisément votre problème : douleur physique, stress, fatigue chronique, ou blocage émotionnel.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">3</div>
            <p className="text-sm text-slate-500">Jean-François effectuera une première passe de rééquilibrage dès réception.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl shadow-xl space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Votre photo énergétique</label>
          <div className="relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              required
            />
            <div className={`h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${photo ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 bg-white group-hover:border-indigo-300'}`}>
              {photo ? (
                <img src={photo} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-500 text-sm">Cliquez pour ajouter une photo</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Décrivez votre besoin</label>
          <textarea 
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none h-32 text-sm"
            placeholder="Ex: Je souffre de migraines chroniques depuis 2 semaines..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting || !photo || !description}
          className="w-full bg-indigo-600 text-white py-4 rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Connexion énergétique...
            </>
          ) : (
            <>
              Transmettre l'énergie
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default HealingRequest;
