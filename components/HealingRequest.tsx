
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

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`Demande de soin énergétique - ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `Bonjour Jean-François,\n\n` +
      `Voici ma demande de soin énergétique :\n\n` +
      `NOM : ${lastName.toUpperCase()}\n` +
      `PRÉNOM : ${firstName}\n` +
      `DATE DE NAISSANCE : ${birthDate}\n` +
      `EMAIL : ${email}\n` +
      `TÉLÉPHONE : ${phone || 'Non renseigné'}\n\n` +
      `DESCRIPTION DU PROBLÈME :\n${description}\n\n` +
      `---\n` +
      `Note : Si j'ai joint une photo sur le site, je pense à l'attacher également à cet email pour votre analyse.`
    );
    return `mailto:guerisseurtoucheur@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent, skipPhoto: boolean = false) => {
    if (e) e.preventDefault();
    
    if (!firstName || !lastName || !birthDate || !email || !description) {
      alert("Veuillez remplir tous les champs obligatoires (Prénom, Nom, Date de naissance, Email et Description).");
      return;
    }

    setIsSubmitting(true);
    try {
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
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Analyse Terminée</h2>
        <p className="text-amber-600 font-bold mb-6 text-sm flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Dernière étape : Cliquez sur le bouton ci-dessous pour m'envoyer votre dossier.
        </p>
        
        <div className="bg-slate-50 p-6 rounded-2xl text-left mb-8 border border-slate-100">
          <h3 className="text-indigo-600 font-semibold mb-2">Mon premier ressenti pour vous :</h3>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line italic">
            "{analysis}"
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <a 
            href={generateMailtoLink()}
            className="w-full bg-amber-500 text-slate-950 px-8 py-5 rounded-full font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            ENVOYER MON DOSSIER PAR EMAIL
          </a>

          <button 
            onClick={() => onSuccess({} as any)} 
            className="text-slate-400 text-xs font-medium hover:underline py-2"
          >
            Accéder au tableau de bord (Optionnel)
          </button>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all";

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-6">
      <div className="space-y-6">
        <h2 className="text-4xl font-serif font-bold text-slate-800 leading-tight">Demande de soin sur photo</h2>
        <p className="text-slate-600">
          Complétez ce formulaire pour que je puisse me connecter à votre énergie. Une fois l'analyse terminée, vous pourrez m'envoyer votre dossier complet par email en un clic.
        </p>
        
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex items-center gap-4">
          <div className="bg-white p-3 rounded-full text-amber-600 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-amber-600 uppercase font-black tracking-widest">Canal Direct</p>
            <p className="text-amber-900 font-bold">Réception sur guerisseurtoucheur@gmail.com</p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
            <p className="text-sm text-slate-500">Renseignez vos informations (Nom, Prénom, Naissance).</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
            <p className="text-sm text-slate-500">Décrivez vos douleurs avec précision.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
            <p className="text-sm text-slate-500">Cliquez sur envoyer pour générer votre email de demande.</p>
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
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Description de vos maux</label>
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
            <div className={`h-24 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${photo ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 bg-white group-hover:border-indigo-300'}`}>
              {photo ? (
                <img src={photo} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
              ) : (
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Choisir une photo</span>
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting || !description || !firstName}
          className="w-full bg-indigo-600 text-white py-4 rounded-full font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connexion énergétique...
            </>
          ) : 'Analyser ma demande'}
        </button>
      </form>
    </div>
  );
};

export default HealingRequest;
