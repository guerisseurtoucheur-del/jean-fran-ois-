
import React, { useState } from 'react';
import { analyzeHealingRequest } from '../services/geminiService';
import { HealingSession } from '../types';
import PaymentSection from './PaymentSection';

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
  const [paymentPrice, setPaymentPrice] = useState<number | null>(null);

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
    const subject = encodeURIComponent(`PAIEMENT PAYPAL EFFECTUÉ - Soin ${firstName} ${lastName} (${paymentPrice}€)`);
    const body = encodeURIComponent(
      `*** DOSSIER PAYÉ VIA PAYPAL (${paymentPrice}€) ***\n` +
      `*** IMPORTANT : MERCI D'ATTACHER MA PHOTO À CET EMAIL ***\n\n` +
      `Bonjour Jean-François,\n\n` +
      `Je viens de régler ma séance de ${paymentPrice}€ via votre lien PayPal.\n\n` +
      `MES INFORMATIONS :\n` +
      `------------------\n` +
      `NOM : ${lastName.toUpperCase()}\n` +
      `PRÉNOM : ${firstName}\n` +
      `DATE DE NAISSANCE : ${birthDate}\n` +
      `EMAIL : ${email}\n` +
      `TÉLÉPHONE : ${phone || 'Non renseigné'}\n\n` +
      `MA DEMANDE :\n` +
      `------------\n` +
      `${description}\n\n` +
      `---\n` +
      `J'ai bien joint ma photo à cet email pour votre travail de magnétisme.`
    );
    return `mailto:guerisseurtoucheur@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!firstName || !lastName || !birthDate || !email || !description) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await analyzeHealingRequest(description, photo || undefined);
      setAnalysis(result || "Analyse énergétique en cours...");
    } catch (err) {
      console.error("Erreur :", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = (price: number) => {
    setPaymentPrice(price);
    
    // Sauvegarde en local pour le dashboard
    const newSession: HealingSession = {
      id: Math.random().toString(36).substr(2, 9),
      firstName,
      lastName,
      birthDate,
      email,
      phone,
      problemDescription: description,
      photoUrl: photo,
      status: 'pending',
      paymentStatus: 'paid',
      price: price,
      energyLevel: 30,
      createdAt: Date.now()
    };
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    localStorage.setItem('sessions', JSON.stringify([...sessions, newSession]));
  };

  // Étape 3 : Confirmation Finale (Après redirection PayPal)
  if (paymentPrice) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-[3rem] shadow-2xl border border-green-50 animate-fade-in text-center">
        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Paiement Initié</h2>
        <p className="text-slate-500 mb-8 italic">Si votre paiement a bien été validé sur PayPal, envoyez-moi maintenant votre dossier.</p>

        {photo && (
          <div className="mb-8 p-6 bg-red-50 border-2 border-dashed border-red-200 rounded-[2rem] animate-pulse">
             <div className="flex flex-col items-center gap-3">
                <img src={photo} className="w-24 h-24 object-cover rounded-2xl border-4 border-white shadow-md" alt="Preview" />
                <p className="text-red-700 font-black text-xs uppercase tracking-widest">⚠️ Joindre cette photo dans l'email !</p>
             </div>
          </div>
        )}

        <div className="space-y-4">
          <a 
            href={generateMailtoLink()}
            className="w-full bg-amber-500 text-slate-950 px-8 py-5 rounded-full font-black shadow-xl hover:scale-105 transition-all flex flex-col items-center justify-center"
          >
            <span className="text-lg uppercase">ENVOYER MON DOSSIER PAR EMAIL</span>
            <span className="text-[10px] mt-1 opacity-70">Ouvre votre application mail</span>
          </a>
          
          <button onClick={() => setPaymentPrice(null)} className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-600">
            Revenir au choix du forfait
          </button>
        </div>
      </div>
    );
  }

  // Étape 2 : Analyse + Paiement
  if (analysis) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-[3rem] shadow-2xl border border-indigo-50 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">Analyse de Jean-François</h2>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-6">
              <p className="text-slate-600 text-sm leading-relaxed italic whitespace-pre-line">
                "{analysis}"
              </p>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black leading-relaxed">
              Pour entamer ce travail énergétique, merci de régler votre séance sécurisée via PayPal.
            </p>
          </div>

          <PaymentSection onPaymentComplete={handlePaymentComplete} />
        </div>
      </div>
    );
  }

  // Étape 1 : Formulaire de base
  const inputClasses = "w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all shadow-sm";

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 p-6">
      <div className="space-y-8">
        <h2 className="text-5xl font-serif font-bold text-slate-800 leading-tight">Soin à distance <br/><span className="text-amber-500 italic">sur photo.</span></h2>
        <p className="text-slate-500 text-lg">
          Jean-François étudiera votre demande et votre photo avant de procéder au soin. Votre règlement sécurise votre séance.
        </p>
        
        <div className="space-y-4">
          {[
            { t: "Données Sécurisées", d: "Vos photos et informations restent confidentielles.", i: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { t: "Paiement PayPal", d: "Réglez en toute sécurité avec votre compte ou CB.", i: "M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" }
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feat.i} />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-800">{feat.t}</p>
                <p className="text-[11px] text-slate-500">{feat.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
            className={inputClasses} placeholder="Prénom" required
          />
          <input 
            type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
            className={inputClasses} placeholder="Nom" required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
             <label className="text-[10px] uppercase font-black text-slate-400 ml-2">Naissance</label>
             <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className={inputClasses} required />
          </div>
          <div className="space-y-1">
             <label className="text-[10px] uppercase font-black text-slate-400 ml-2">Téléphone</label>
             <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} placeholder="06..." />
          </div>
        </div>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} placeholder="Votre adresse email" required />

        <textarea 
          className="w-full px-6 py-4 rounded-[2rem] border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none h-40 text-sm transition-all"
          placeholder="Décrivez précisément ce dont vous souffrez..."
          value={description} onChange={(e) => setDescription(e.target.value)} required
        ></textarea>

        <div className="relative group">
          <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <div className={`h-24 border-2 border-dashed rounded-3xl flex items-center justify-center transition-all ${photo ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-slate-50'}`}>
            {photo ? (
              <span className="text-green-600 font-bold text-xs uppercase">Photo enregistrée ✓</span>
            ) : (
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest text-center px-4">Ajouter ma photo pour le soin</span>
            )}
          </div>
        </div>

        <button 
          type="submit" disabled={isSubmitting || !description || !firstName}
          className="w-full bg-indigo-600 text-white py-5 rounded-full font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:bg-slate-200 uppercase tracking-[0.2em] text-xs"
        >
          {isSubmitting ? 'Connexion...' : 'Analyser ma demande'}
        </button>
      </form>
    </div>
  );
};

export default HealingRequest;
