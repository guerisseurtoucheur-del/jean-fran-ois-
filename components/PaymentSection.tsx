
import React, { useState } from 'react';

interface PaymentSectionProps {
  onPaymentComplete: (price: number) => void;
}

// Identifiant PayPal configuré avec le lien fourni : paypal.me/magnetiseur61
const PAYPAL_USERNAME = "magnetiseur61"; 

const PaymentSection: React.FC<PaymentSectionProps> = ({ onPaymentComplete }) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const plans = [
    {
      id: 50,
      name: "Soin Énergétique Ponctuel",
      price: 50,
      desc: "Idéal pour une douleur ciblée ou un zona récent.",
      features: ["Analyse sur photo", "1 Séance de magnétisme", "Suivi par email"]
    },
    {
      id: 80,
      name: "Suivi & Harmonisation",
      price: 80,
      desc: "Pour les maux chroniques ou rééquilibrage complet.",
      features: ["Analyse approfondie", "2 Séances de soin", "Suivi prioritaire", "Bilan énergétique"]
    }
  ];

  const handlePaymentRedirect = () => {
    if (!selectedPlan) return;

    // Construction de l'URL PayPal.me : https://www.paypal.com/paypalme/magnetiseur61/50 ou 80
    const paypalUrl = `https://www.paypal.com/paypalme/${PAYPAL_USERNAME}/${selectedPlan}`;
    
    // Ouvre PayPal dans un nouvel onglet
    window.open(paypalUrl, '_blank');
    
    // On notifie le composant parent pour passer à l'étape finale d'envoi du dossier
    onPaymentComplete(selectedPlan);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-serif font-bold text-slate-800">Choisissez votre séance</h3>
        <p className="text-slate-500 text-sm italic">Paiement sécurisé via votre compte PayPal</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`cursor-pointer p-6 rounded-3xl border-2 transition-all ${
              selectedPlan === plan.id 
              ? 'border-indigo-600 bg-indigo-50/50 shadow-lg scale-[1.01]' 
              : 'border-slate-100 bg-white hover:border-indigo-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-slate-800 leading-tight">{plan.name}</h4>
              <span className="text-xl font-black text-indigo-600">{plan.price}€</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-4">{plan.desc}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-1.5 text-[9px] font-bold text-slate-600 uppercase tracking-wider">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-4">
            <p className="text-[10px] text-amber-800 leading-relaxed italic">
              En cliquant ci-dessous, vous allez être redirigé vers votre espace <strong>PayPal (magnetiseur61)</strong> pour régler vos {selectedPlan}€. 
              Revenez ensuite sur cette page pour m'envoyer votre dossier complet par email.
            </p>
          </div>
          
          <button 
            onClick={handlePaymentRedirect}
            className="w-full bg-slate-900 text-white py-5 rounded-full font-black shadow-xl hover:bg-slate-800 transition-all flex flex-col items-center justify-center leading-none"
          >
            <span className="text-lg">RÉGLER {selectedPlan}€ SUR PAYPAL</span>
            <span className="text-[10px] uppercase tracking-widest mt-2 opacity-60">Redirection sécurisée vers PayPal.me</span>
          </button>
          
          <div className="flex justify-center items-center gap-4 opacity-50">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
             <div className="w-px h-3 bg-slate-300"></div>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Paiement sécurisé</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
