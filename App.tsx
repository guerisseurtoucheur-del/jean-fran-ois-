
import React, { useState } from 'react';
import Layout from './components/Layout';
import ChatRoom from './components/ChatRoom';
import HealingRequest from './components/HealingRequest';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const cities = [
    { name: "Paris", top: "25%", left: "48%", delay: "0s" },
    { name: "Alençon", top: "28%", left: "35%", delay: "0.2s" },
    { name: "Lyon", top: "58%", left: "68%", delay: "0.5s" },
    { name: "Marseille", top: "85%", left: "72%", delay: "0.8s" },
    { name: "Bordeaux", top: "68%", left: "32%", delay: "0.3s" },
    { name: "Lille", top: "10%", left: "55%", delay: "1.1s" },
    { name: "Strasbourg", top: "32%", left: "88%", delay: "1.4s" },
    { name: "Nantes", top: "42%", left: "22%", delay: "0.6s" },
    { name: "Toulouse", top: "82%", left: "45%", delay: "0.9s" },
    { name: "Nice", top: "78%", left: "88%", delay: "1.2s" }
  ];

  const testimonials = [
    { name: "Marie L.", city: "Lyon", text: "Jean-François a sauvé mon fils d'un zona très douloureux en seulement deux séances sur photo. La douleur a disparu dès la première nuit.", tag: "Zona" },
    { name: "Thomas B.", city: "Paris", text: "Souffrant d'eczéma depuis l'enfance, j'ai tout essayé. Après 3 semaines de suivi énergétique, ma peau est enfin saine.", tag: "Eczéma" },
    { name: "Sophie D.", city: "Bordeaux", text: "Une bienveillance rare. On ressent une chaleur apaisante même à distance. Mon stress a totalement disparu.", tag: "Anxiété" },
    { name: "Michel R.", city: "Alençon", text: "Excellent coupeur de feu. Suite à une brûlure grave, l'action de Jean-François a été instantanée. Pas de cicatrice !", tag: "Brûlure" },
    { name: "Chloé M.", city: "Nantes", text: "Mes verrues plantaires, présentes depuis 2 ans, ont séché et sont tombées en 10 jours après l'envoi de la photo. Magique.", tag: "Verrues" },
    { name: "Jean P.", city: "Marseille", text: "J'étais sceptique sur le magnétisme à distance, mais les résultats sur mes douleurs de dos sont indiscutables.", tag: "Douleurs Dos" },
    { name: "Valérie H.", city: "Lille", text: "Un grand merci pour votre aide lors de ma radiothérapie. Les effets secondaires ont été très limités grâce à vous.", tag: "Accompagnement" },
    { name: "Lucas G.", city: "Toulouse", text: "Retrouvé un sommeil profond dès le premier soir. Jean-François dégage une force tranquille incroyable.", tag: "Sommeil" },
    { name: "Isabelle K.", city: "Strasbourg", text: "Psoriasis stabilisé après des années de calvaire. Le suivi est sérieux et l'écoute est réelle.", tag: "Psoriasis" },
    { name: "Franck V.", city: "Nice", text: "Une séance pour mon chien qui n'arrivait plus à marcher, il a retrouvé une vitalité surprenante en 48h.", tag: "Animaux" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatRoom />;
      case 'healing':
        return <HealingRequest onSuccess={() => setActiveTab('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
          <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center overflow-hidden bg-slate-950">
              <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-amber-500/20 rounded-full animate-[ping_10s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-500/30 rounded-full animate-[ping_7s_linear_infinite]"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-indigo-950/40 z-10"></div>
              <div className="relative z-20 max-w-6xl mx-auto px-6 text-white text-center space-y-8">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/20 backdrop-blur-xl rounded-full text-amber-300 text-xs font-bold tracking-[0.2em] border border-amber-500/30 uppercase">
                    Magnétiseur Alençon & France entière
                  </div>
                </div>
                <h1 className="text-5xl md:text-8xl font-serif font-bold leading-[0.9] drop-shadow-2xl">
                  L'<span className="pulse-energy">énergie</span> n'a pas <br />
                  <span className="text-amber-400 italic">de distance.</span>
                </h1>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <p className="text-xl text-slate-300 leading-relaxed font-light">
                    Jean-François, <span className="text-white font-bold">magnétiseur guérisseur à Alençon</span>, intervient <span className="text-white font-medium underline decoration-amber-500 underline-offset-4">sur photo</span> pour soulager vos maux partout en France.
                  </p>
                  <p className="text-sm md:text-base text-slate-400 italic font-light opacity-90 leading-relaxed">
                    "Nombreux sont ceux dont les souffrances entravent les déplacements ; sachez que ma pratique s'affranchit des contraintes physiques pour vous apporter soulagement et apaisement, précisément là où vous vous trouvez."
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 pt-6">
                  <button onClick={() => setActiveTab('healing')} className="px-10 py-5 bg-amber-500 text-slate-950 rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-all">
                    DÉMARRER UN SOIN SUR PHOTO
                  </button>
                  <button onClick={() => setActiveTab('chat')} className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-3">
                    Questions & Réponses
                  </button>
                </div>
              </div>
            </section>

            {/* SEO Section: Ancrage Géographique */}
            <section className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6 uppercase tracking-widest">Magnétiseur reconnu à Alençon et partout en France</h2>
              <div className="prose prose-slate mx-auto text-slate-500 leading-relaxed text-sm">
                <p>
                  Installé au cœur de la Normandie, Jean-François exerce en tant que <strong>magnétiseur à Alençon (61000)</strong> depuis plus de deux décennies. 
                  Sa réputation de guérisseur sérieux s'étend aujourd'hui au-delà de l'Orne grâce à son expertise unique dans le <strong>soin à distance sur photo</strong>. 
                  Que vous soyez à Paris, Lyon, Marseille ou dans le plus petit village de l'Hexagone, son énergie de guérison vous rejoint pour traiter vos pathologies cutanées (zona, eczéma) ou vos douleurs physiques chroniques.
                </p>
              </div>
            </section>

            {/* Pathologies Section */}
            <section className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-slate-800 tracking-tight">Magnétisme à distance sérieux : Mon Expertise</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full mt-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Coupeur de feu & Zona",
                    desc: "Urgence zona et brûlures. Action immédiate sur photo par votre magnétiseur guérisseur pour stopper le feu et la douleur.",
                    icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  },
                  {
                    title: "Peau : Eczéma & Psoriasis",
                    desc: "Traitement des verrues et problèmes cutanés par magnétisme traditionnel. Une aide précieuse sur photo pour retrouver une peau saine.",
                    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343"
                  },
                  {
                    title: "Énergies & Rééquilibrage",
                    desc: "Harmonisation complète. Libérez-vous du stress et des blocages avec un accompagnement énergétique sérieux et bienveillant.",
                    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-50 hover:shadow-2xl transition-all group">
                    <div className="w-16 h-16 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-slate-800">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-indigo-50 py-24">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-serif font-bold text-slate-800 tracking-tight">Vos Retours de Gratitude</h2>
                  <p className="text-slate-500 mt-4 italic">Des témoignages authentiques après chaque soin sur photo.</p>
                  <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full mt-4"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((t, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-indigo-100 flex flex-col h-full hover:-translate-y-1 transition-transform">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, star) => (
                            <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-bold uppercase tracking-widest">{t.tag}</span>
                      </div>
                      <p className="text-slate-600 text-sm italic leading-relaxed flex-grow mb-6">"{t.text}"</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                          {t.name.split(' ')[0][0]}{t.name.split(' ')[1][0]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{t.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Guérisseur Alençon • {t.city}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-16 text-center">
                   <button onClick={() => setActiveTab('healing')} className="text-indigo-600 font-bold hover:underline flex items-center gap-2 mx-auto">
                     Contactez votre magnétiseur pour un soin immédiat
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                   </button>
                </div>
              </div>
            </section>

            {/* Interactive Map Section */}
            <section className="bg-slate-900 py-32 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]"></div>
              
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
                <div className="space-y-8 text-center lg:text-left">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                    Une action <br />
                    <span className="text-amber-400 italic">sur toute la France.</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Mon magnétisme rayonne depuis l'Orne dans toute la France. La photo est le canal sacré qui me permet de vous rejoindre, que vous soyez à Paris, Marseille, Strasbourg ou dans un village reculé.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
                      <p className="text-amber-400 font-bold text-2xl">98%</p>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Satisfaction Guérison</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
                      <p className="text-indigo-400 font-bold text-2xl">24/7</p>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Urgence Zona Alençon</p>
                    </div>
                  </div>
                </div>

                {/* The Map Component */}
                <div className="relative aspect-[4/5] md:aspect-[1/1] bg-white/5 rounded-[3rem] p-12 border border-white/10 shadow-3xl">
                  {/* Simplified France SVG Base */}
                  <div className="absolute inset-0 p-8 flex items-center justify-center">
                    <svg className="france-map-svg w-full h-full text-slate-800/50" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M48,5 C55,8 60,12 65,15 C70,20 75,25 80,30 C85,35 90,40 92,45 C95,55 90,65 85,75 C80,85 70,90 60,95 C50,98 40,95 30,90 C20,85 10,75 5,65 C2,55 5,45 10,35 C15,25 25,15 35,10 C40,7 44,5 48,5 Z" />
                    </svg>
                  </div>
                  
                  {/* Pulsing Dots */}
                  {cities.map((city, i) => (
                    <div 
                      key={i} 
                      className="city-dot-container absolute z-30 cursor-pointer" 
                      style={{ top: city.top, left: city.left }}
                    >
                      <div 
                        className="map-dot w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)]" 
                        style={{ animationDelay: city.delay }}
                      ></div>
                      <div className="city-label absolute left-1/2 -translate-x-1/2 bottom-full mb-3 bg-white text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-2xl whitespace-nowrap">
                        Soin effectué à {city.name}
                      </div>
                    </div>
                  ))}

                  {/* Energy Lines Decoration */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.1" fill="none" strokeDasharray="1 2" />
                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.05" fill="none" />
                  </svg>
                </div>
              </div>
            </section>

            {/* FAQ SECTION Enrichie SEO */}
            <section className="bg-white py-24 border-y border-slate-100">
              <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-4xl font-serif font-bold text-slate-900">Questions fréquentes sur le magnétisme sérieux</h2>
                  <p className="text-slate-500 italic">Tout comprendre sur les soins énergétiques à Alençon et à distance</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      q: "Où se situe votre cabinet de magnétiseur ?",
                      a: "Jean-François est établi à Alençon, dans l'Orne (61). Bien qu'il reçoive localement, son expertise en magnétisme sur photo lui permet d'accompagner des patients dans toute la France avec la même rigueur et les mêmes résultats qu'en cabinet physique."
                    },
                    {
                      q: "Le magnétisme à distance est-il vraiment sérieux ?",
                      a: "Oui, c'est une pratique millénaire reconnue pour son efficacité. En tant que magnétiseur à distance sérieux, Jean-François utilise votre photo comme un support vibratoire unique. Son professionnalisme et ses 20 ans d'expérience garantissent une prise en charge éthique et efficace de vos douleurs."
                    },
                    {
                      q: "Comment fonctionne un coupeur de feu à distance ?",
                      a: "Pour le zona ou les brûlures, l'action est immédiate. En transmettant son fluide énergétique via votre photo, le guérisseur stoppe la sensation de brûlure. C'est une méthode d'urgence pratiquée couramment en accompagnement de traitements médicaux."
                    },
                    {
                      q: "Quelles informations dois-je fournir pour une séance ?",
                      a: "Pour une efficacité maximale, Jean-François a besoin d'une photo récente de vous, de votre prénom, nom, date de naissance et d'une description précise de vos maux. Cela constitue votre 'signature vibratoire'."
                    }
                  ].map((faq, i) => (
                    <details key={i} className="faq-details group bg-slate-50 rounded-3xl border border-transparent hover:border-indigo-100 transition-all">
                      <summary className="list-none p-8 cursor-pointer flex justify-between items-center font-bold text-slate-800 select-none">
                        <span>{faq.q}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-8 pb-8 text-slate-600 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
