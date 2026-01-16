
import React, { useEffect, useState } from 'react';
import { HealingSession } from '../types';

const Dashboard: React.FC = () => {
  const [sessions, setSessions] = useState<HealingSession[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('sessions');
    if (saved) {
      setSessions(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800">Suivi de vos énergies</h2>
          <p className="text-slate-500">Consultez l'état d'avancement des soins pratiqués par Jean-François.</p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-600 mb-2">Aucun soin en cours</h3>
          <p className="text-slate-400 mb-6">Vous n'avez pas encore déposé de demande de soin sur photo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map(session => (
            <div key={session.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl transition-all group">
              <div className="h-48 relative overflow-hidden">
                <img src={session.photoUrl || 'https://picsum.photos/400/300'} alt="Soin" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    session.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                    session.status === 'in_progress' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {session.status === 'pending' ? 'En attente' : 
                     session.status === 'in_progress' ? 'Soin actif' : 'Terminé'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-slate-800 mb-2 line-clamp-1">{session.problemDescription}</h4>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="text-slate-400 font-medium">Niveau vibratoire</span>
                    <span className="text-indigo-600 font-bold">{session.energyLevel}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse" 
                      style={{ width: `${session.energyLevel}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-4 border-t border-slate-50">
                  <span>Initié le {new Date(session.createdAt).toLocaleDateString()}</span>
                  <button className="text-indigo-600 font-semibold hover:underline">Détails du soin</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
