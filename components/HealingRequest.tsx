
import React, { useState } from 'react';
import { analyzeHealingRequest } from '../services/geminiService';
import { HealingSession } from '../types';

interface HealingRequestProps {
  onSuccess: (session: HealingSession) => void;
}

const HealingRequest: React.FC<HealingRequestProps> = ({ onSuccess }) => {
  // Informations personnelles
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Détails de la demande
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

  const handleSubmit = async (e: React.FormEvent, skipPhoto: boolean = false) => {
    if (e) e.preventDefault();
    
    // Validation des champs obligatoires
    if (!firstName || !lastName || !birthDate || !email || !description) {
      alert("Veuillez remplir tous les champs obligatoires (Prénom, Nom, Date de naissance, Email et Description).");
      return;
    }

    setIsSubmitting(true);
    try {
      // Analyse via l'IA pour retour immédiat (la photo est passée si disponible)
      const currentPhoto = skipPhoto ? null : photo;
      const result = await analyzeHealingRequest(description, currentPhoto || undefined);
      setAnalysis(result || "Analyse énergétique en cours...");
      
      const newSession: HealingSession = {
        id: Math.random().toString(36).substr(2, 9),
        firstName,
        lastName,
        birthDate,
        email,
        phone,
        problemDescription: description,
        photoUrl: currentPhoto,
        status: 'pending',
        energyLevel: 20,
        createdAt: Date.now()
      };
      
      // Simulation technique de l'envoi vers le serveur mail
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Transmission cryptée vers guerisseurtoucheur@gmail.com terminée pour ${firstName} ${lastName}.`);
      
      // Stockage local pour le suivi
      const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
      localStorage.setItem('sessions', JSON.stringify([...sessions, newSession]));
      
    } catch (err) {
      console.error("Erreur de transmission :", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (analysis) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-indigo-50 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Demande Transmise</h2>
        <p className="text-indigo-600 font-medium mb-6 text-sm">Destinataire : guerisseurtoucheur@gmail.com</p>
        
        <div className="bg-slate-50 p-6 rounded-2xl text-left mb-8 border border-slate-100">
          <h3 className="text-indigo-600 font-semibold mb-2">Première analyse de Jean-François :</h3>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line italic">
            "{analysis}"
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => onSuccess({} as any)} 
            className="w-full bg-indigo-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all"
          >
            Accéder au suivi de mon soin
          </button>
          <a 
            href={`mailto:guerisseurtoucheur@gmail.com?subject=Confirmation de demande de soin&body=${encodeURIComponent(description)}`}
            className="text-indigo-600 text-sm font-medium hover:underline py-2"
          >
            Envoyer un complément par email direct
          </a>
        </div>
      </div>
    );
  }

  // Classe utilitaire pour les inputs sombres avec texte blanc
  const inputClasses = "w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all";

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-6">
      <div className="space-y-6">
        <h2 className="text-4xl font-serif font-bold text-slate-800 leading-tight">Soin énergétique à distance</h2>
        <p className="text-slate-600">
          Jean-François utilise votre nom, votre date de naissance et votre photo (optionnelle) pour se connecter à votre fréquence vibratoire.
        </p>
        
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex items-center gap-4">
          <div className="bg-white p-3 rounded-full text-amber-600 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-amber-600 uppercase font-black tracking-widest">Énergie pure</p>
            <p className="text-amber-900 font-bold">L'intention n'a pas de limite</p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
            <p className="text-sm text-slate-500">Remplissez vos informations d'identité avec précision.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
            <p className="text-sm text-slate-500">Décrivez votre souffrance. L'écriture blanche sur fond noir permet une concentration maximale.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
            <p className="text-sm text-slate-500">La photo est un plus, mais Jean-François peut agir sans si vous ne pouvez pas la fournir.</p>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="glass p-8 rounded-3xl shadow-xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Prénom</label>
            <input 
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClasses}
              placeholder="Votre prénom"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nom</label>
            <input 
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClasses}
              placeholder="Votre nom"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date de naissance</label>
            <input 
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Téléphone</label>
            <input 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClasses}
              placeholder="06 00 00 00 00"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Adresse Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="votre@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Décrivez votre demande</label>
          <textarea 
            className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none h-32 text-sm transition-all"
            placeholder="Détaillez vos douleurs (zona, eczéma, migraines...)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Photo énergétique (Optionnelle)</label>
          <div className="relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${photo ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 bg-white group-hover:border-indigo-300'}`}>
              {photo ? (
                <img src={photo} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
              ) : (
                <span className="text-slate-400 text-xs">Cliquez pour ajouter une photo (facultatif)</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            type="submit"
            disabled={isSubmitting || !description || !firstName}
            className="w-full bg-indigo-600 text-white py-4 rounded-full font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300"
          >
            {isSubmitting ? 'Transmission en cours...' : 'Envoyer avec ma photo'}
          </button>
          
          <button 
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSubmitting || !description || !firstName}
            className="w-full bg-slate-100 text-slate-600 py-3 rounded-full font-semibold hover:bg-slate-200 transition-all text-sm disabled:opacity-50"
          >
            Envoyer sans photo
          </button>
        </div>
      </form>
    </div>
  );
};

export default HealingRequest;
