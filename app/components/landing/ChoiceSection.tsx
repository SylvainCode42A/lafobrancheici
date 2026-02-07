"use client";
import React from 'react';

export default function ChoiceSection() {
  const options = [
    {
      id: "01",
      name: "Entreprise",
      desc: "Souveraineté totale des données pour les structures à haute exigence de gouvernance.",
      label: "Internal_System_Preview",
      btn: "Déployer_Privé",
      glow: "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]"
    },
    {
      id: "02",
      name: "Public",
      desc: "Capture universelle des signaux web à l'échelle mondiale sans friction technique.",
      label: "Global_Network_Preview",
      btn: "Lancer_Global",
      glow: "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)]"
    }
  ];

  return (
    <section className="relative py-48 bg-transparent text-white">
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Minimaliste */}
        <div className="mb-24 flex flex-col items-center text-center">
          <span className="text-[10px] font-black text-zinc-600 tracking-[0.5em] uppercase mb-6">
            Configuration_Selection
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-[-0.05em] uppercase italic leading-none text-white">
            DEUX <span className="text-zinc-900 italic">MODÈLES.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {options.map((opt, i) => (
            <div key={i} className="group relative flex flex-col bg-white/1 border border-white/5 p-10 rounded-[3rem] transition-all duration-1000 hover:border-white/20 backdrop-blur-sm">
              
              {/* Header de case technique */}
              <div className="flex justify-between items-center mb-8 border-l-2 border-purple-500/50 pl-6">
                <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.3em] italic">Config_{opt.id}</span>
                <div className="text-[8px] font-mono text-zinc-800 uppercase">Status: Available</div>
              </div>

              {/* SLOT VIDÉO / APERÇU */}
              <div className="relative aspect-video w-full bg-zinc-900/40 mb-10 rounded-2xl border border-white/5 overflow-hidden group-hover:border-white/10 transition-colors">
                <div className={`absolute inset-0 flex items-center justify-center ${opt.glow}`}>
                  <span className="text-[9px] font-black text-zinc-700 tracking-[0.4em] uppercase italic group-hover:text-zinc-500 transition-colors">
                    {opt.label}
                  </span>
                </div>
              </div>

              <div className="space-y-6 flex flex-col items-center text-center">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white group-hover:text-purple-500 transition-colors duration-500">
                  {opt.name}
                </h3>
                <p className="text-[11px] text-zinc-600 font-bold leading-relaxed max-w-xs uppercase italic tracking-tight mb-4">
                  {opt.desc}
                </p>

                {/* BOUTON TECHNIQUE ÉPURÉ */}
                <button className="w-full py-4 bg-white/2 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-black transition-all duration-500 cursor-pointer active:scale-95 italic">
                  {opt.btn}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}