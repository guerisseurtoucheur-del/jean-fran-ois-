
import React, { useState } from 'react';
import { analyzeHealingRequest } from '../services/geminiService';
import { HealingSession } from '../types';
import PaymentSection from './PaymentSection';

interface HealingRequestProps {
  onSuccess: (session: HealingSession) => void;
}

const HealingRequest: React.FC<HealingRequestProps> = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'analysis' | 'final'>('form');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await analyzeHealingRequest(description, photo || undefined);
      setAnalysis(result);
      setStep('analysis');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = () => {
    setStep('final');
    // Création d'une session fictive pour le dashboard
    const newSession: HealingSession = {
      id: Date.now().toString(),
      firstName,
      lastName,
      birthDate,
      email,
      phone: '',
      problemDescription: description,
      photoUrl: photo,
      status: 'pending',
      paymentStatus: 'paid',
      price: 50,
      energyLevel: 15,
      createdAt: Date.now()
    };
    const saved = JSON.parse(localStorage.getItem('sessions') || '[]');
    localStorage.setItem('sessions', JSON.stringify([...saved, newSession]));
  };

  if (step === 'final') {
    return (
      <div className="max-w-3xl mx-auto p-6 animate-fade-in text-center py-20">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-green-100">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-4 text-slate-800">Dossier reçu, Jean-François s'en occupe</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Merci pour votre confiance. Votre demande a bien été enregistrée. <br/>
            Jean-François va débuter son travail de magnétisme dans les prochaines heures.<br/>
            <span className="font-bold text-indigo-600">Un email de confirmation vous a été envoyé.</span>
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all"
          >
            RETOURNER À L'ACCUEIL
          </button>
        </div>
      </div>
    );
  }

  if (step === 'analysis' && analysis) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8 animate-fade-in">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-indigo-50">
          <h2 className="text-3xl font-serif font-bold mb-6 text-slate-800">Analyse de Jean-François</h2>
          <div className="prose prose-slate text-slate-600 italic bg-slate-50 p-8 rounded-[2rem] border-l-4 border-amber-400 mb-8 leading-relaxed">
            "{analysis}"
          </div>
          <PaymentSection onPaymentComplete={handlePaymentComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-24">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-serif font-bold text-slate-800 tracking-tight">Votre demande de soin sur photo</h2>
        <p className="text-slate-500 max-w-xl mx-auto">Chaque demande est étudiée avec soin avant de débuter le travail énergétique.</p>
        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-8 border border-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400 ml-4 tracking-widest">Prénom</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="Jean" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400 ml-4 tracking-widest">Nom</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="Dupont" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400 ml-4 tracking-widest">Date de Naissance</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-400 ml-4 tracking-widest">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="votre@email.com" required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-black text-slate-400 ml-4 tracking-widest">Description de votre besoin</label>
          <textarea 
            className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none h-40 resize-none"
            placeholder="Décrivez précisément votre zona, eczéma ou toute autre douleur..."
            value={description} onChange={(e) => setDescription(e.target.value)} required
          ></textarea>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase font-black text-slate-400 ml-4 tracking-widest">Votre Photo (Support énergétique)</label>
          <div className="relative group">
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className={`h-40 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all ${photo ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-slate-50 group-hover:border-indigo-400'}`}>
              {photo ? (
                <div className="flex flex-col items-center">
                   <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500 mb-2">
                     <img src={photo} className="w-full h-full object-cover" />
                   </div>
                   <span className="text-sm font-bold text-green-600">Photo chargée ✓</span>
                </div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Sélectionner une photo</span>
                </>
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit" disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-lg shadow-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyse en cours...
            </span>
          ) : 'Soumettre à Jean-François'}
        </button>
      </form>
    </div>
  );
};

export default HealingRequest;
