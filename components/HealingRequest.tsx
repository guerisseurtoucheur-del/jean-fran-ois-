
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
      `*** IMPORTANT : MERCI D'ATTACHER MA PHOTO À CET EMAIL AVANT L'ENVOI ***\n\n` +
      `Bonjour Jean-François,\n\n` +
      `Voici ma demande de soin énergétique complète :\n\n` +
      `NOM : ${lastName.toUpperCase()}\n` +
      `PRÉNOM : ${firstName}\n` +
      `DATE DE NAISSANCE : ${birthDate}\n` +
      `EMAIL : ${email}\n` +
      `TÉLÉPHONE : ${phone || 'Non renseigné'}\n\n` +
      `DESCRIPTION DES MAUX :\n${description}\n\n` +
      `---\n` +
      `Analyse préliminaire du site : ${analysis?.substring(0, 200)}...\n\n` +
      `J'attache ma photo à ce message pour votre travail à distance.`
    );
    return `mailto:guerisseurtoucheur@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent, skipPhoto: boolean = false) => {
    if (e) e.preventDefault();
    
    if (!firstName || !lastName || !birthDate || !email || !description) {
      alert("Veuillez remplir tous les champs obligatoires.");
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
      console.error("Erreur :", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (analysis) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-indigo-50 animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Dossier prêt à l'envoi</h2>
          <p className="text-slate-500 text-sm mb-6 italic">L'analyse énergétique a été intégrée à votre demande.</p>
        </div>

        {photo && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl animate-pulse">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                <img src={photo} alt="Votre photo" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-red-700 font-black text-sm uppercase">Action Requise :</p>
                <p className="text-red-600 text-xs font-bold leading-tight">
                  N'oubliez pas d'attacher cette photo manuellement dans l'email qui va s'ouvrir !
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-50 p-6 rounded-2xl text-left mb-8 border border-slate-100 max-h-48 overflow-y-auto">
          <h3 className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-2">Ressenti de Jean-François :</h3>
          <p className="text-slate-600 text-sm leading-relaxed italic">
            "{analysis}"
          </p>
        </div>

        <div className="space-y-4">
          <a 
            href={generateMailtoLink()}
            className="w-full bg-amber-500 text-slate-950 px-8 py-5 rounded-full font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center leading-none"
          >
            <span className="text-lg">VALIDER ET ENVOYER L'EMAIL</span>
            <span className="text-[10px] uppercase tracking-widest mt-2 opacity-70">Ouvre votre messagerie automatiquement</span>
          </a>

          <div className="flex justify-between items-center px-4">
             <button 
                onClick={() => setAnalysis(null)} 
                className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-indigo-600"
              >
                ← Modifier mes infos
              </button>
              <button 
                onClick={() => onSuccess({} as any)} 
                className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-indigo-600"
              >
                Voir mon tableau de bord
              </button>
          </div>
        </div>
        
        <p className="mt-8 text-[10px] text-slate-400 text-center leading-relaxed">
          Si votre logiciel de messagerie ne s'ouvre pas, envoyez directement les informations et votre photo à : <br/>
          <strong className="text-indigo-600 select-all">guerisseurtoucheur@gmail.com</strong>
        </p>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all";

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-6">
      <div className="space-y-6">
        <h2 className="text-4xl font-serif font-bold text-slate-800 leading-tight">Demande de soin sur photo</h2>
        <p className="text-slate-600">
          Pour une action à distance efficace, Jean-François a besoin de vos informations exactes. 
          L'envoi final se fait <span className="font-bold underline">par votre propre boîte mail</span> pour garantir la sécurité et la réception de votre photo.
        </p>
        
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex items-center gap-4">
          <div className="bg-white p-3 rounded-full text-amber-600 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-amber-600 uppercase font-black tracking-widest">Réception Directe</p>
            <p className="text-amber-900 font-bold">guerisseurtoucheur@gmail.com</p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
            <p className="text-sm text-slate-500">Remplissez le formulaire ci-contre.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
            <p className="text-sm text-slate-500">Choisissez une photo claire de vous ou de la zone à traiter.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
            <p className="text-sm text-slate-800 font-bold">L'email s'ouvrira : n'oubliez pas d'y joindre votre photo avant d'envoyer.</p>
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
            placeholder="Détaillez vos douleurs avec précision..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Photo énergétique (Fortement recommandée)</label>
          <div className="relative group">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`h-28 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${photo ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 bg-white group-hover:border-indigo-300'}`}>
              {photo ? (
                <div className="relative h-full w-full">
                  <img src={photo} alt="Preview" className="h-full w-full object-cover rounded-2xl opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-indigo-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">Changer la photo</span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Cliquer pour choisir votre photo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting || !description || !firstName}
          className="w-full bg-indigo-600 text-white py-5 rounded-full font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 uppercase tracking-widest text-sm"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connexion en cours...
            </>
          ) : 'Préparer mon dossier'}
        </button>
      </form>
    </div>
  );
};

export default HealingRequest;
