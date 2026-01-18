
import React, { useState } from 'react';

interface PaymentSectionProps {
  onPaymentComplete: (price: number) => void;
}

const PAYPAL_USERNAME = "magnetiseur61"; 

const PaymentSection: React.FC<PaymentSectionProps> = ({ onPaymentComplete }) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const plans = [
    { id: 50, name: "Soin Énergétique Ponctuel", price: 50, desc: "Idéal pour une douleur ciblée ou un zona récent." },
    { id: 80, name: "Suivi & Harmonisation", price: 80, desc: "Pour les maux chroniques ou rééquilibrage complet." }
  ];

  const handlePaymentRedirect = () => {
    if (!selectedPlan) return;
    window.open(`https://www.paypal.com/paypalme/${PAYPAL_USERNAME}/${selectedPlan}`, '_blank');
    onPaymentComplete(selectedPlan);
  };

  return (
    <div className="space-y-6 pt-6 border-t border-slate-100">
      <div className="text-center">
        <h3 className="text-xl font-serif font-bold">Sélectionnez votre séance</h3>
        <p className="text-xs text-slate-500 italic">Paiement sécurisé via PayPal (magnetiseur61)</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {plans.map(plan => (
          <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${selectedPlan === plan.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'}`}>
            <div className="flex justify-between font-bold"><span>{plan.name}</span><span className="text-indigo-600">{plan.price}€</span></div>
            <p className="text-[10px] text-slate-500">{plan.desc}</p>
          </div>
        ))}
      </div>
      {selectedPlan && (
        <button onClick={handlePaymentRedirect} className="w-full bg-slate-900 text-white py-4 rounded-full font-bold shadow-lg hover:bg-slate-800 transition-all">
          RÉGLER {selectedPlan}€ SUR PAYPAL
        </button>
      )}
    </div>
  );
};

export default PaymentSection;
