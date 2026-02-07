"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const packs = [
  {
    name: "Infiltration",
    price: "2,500",
    features: ["500 Leads / mois", "Précision 92%", "Export CRM Direct", "Support Standard"],
    note: "Acquisition_Init",
    btnLabel: "Selection_Init",
  },
  {
    name: "Domination",
    price: "7,500",
    features: ["2,500 Leads / mois", "Précision 98%", "Intelligence Prédictive", "Account Manager"],
    popular: true,
    note: "Performance_High",
    btnLabel: "Protocol_Read",
  },
  {
    name: "Souveraineté",
    price: "Custom",
    features: ["Volume Illimité", "Latence < 2ms", "On-premise Deployment", "Sécurité Militaire"],
    note: "Global_Infra",
    btnLabel: "Contact_Analyst",
  }
];

function PricingCard({ pack, index }: { pack: typeof packs[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { damping: 40, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 40, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative h-full"
    >
      <div className="relative h-full bg-white/1 border border-white/5 rounded-[3rem] p-10 flex flex-col hover:border-white/20 transition-all duration-700 backdrop-blur-sm group/item">
        
        {/* Header technique de la case */}
        <div className="flex justify-between items-center mb-10 border-l-2 border-purple-500/50 pl-5">
           <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.3em] italic">
             Tier_0{index + 1} // {pack.note}
           </span>
           {pack.popular && (
             <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
           )}
        </div>

        {/* Prix et Nom */}
        <div className="mb-12">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-500 mb-2">{pack.name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black italic tracking-tighter text-white group-hover/item:text-purple-500 transition-colors duration-500">
              {pack.price}
            </span>
            {pack.price !== "Custom" && <span className="text-zinc-900 font-bold text-[10px] italic">/EUR</span>}
          </div>
        </div>

        {/* Liste des features */}
        <div className="space-y-4 mb-12 grow">
          {pack.features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1 h-px bg-zinc-800 group-hover/item:bg-purple-500 transition-colors" />
              <span className="text-[10px] font-bold uppercase italic tracking-tight text-zinc-600 group-hover/item:text-zinc-300 transition-colors">
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* Bouton épuré */}
        <button className="w-full py-4 bg-white/2 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-black transition-all duration-500 cursor-pointer active:scale-95 italic">
          {pack.btnLabel}
        </button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-40 bg-transparent">
      
      <div className="mb-24 flex flex-col items-start gap-4 text-left">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-purple-500/40 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase italic">System_Selection</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-white">
           PLANS <br/> <span className="text-zinc-900 italic">D'INVESTISSEMENT.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ perspective: "2000px" }}>
        {packs.map((pack, i) => (
          <PricingCard key={i} pack={pack} index={i} />
        ))}
      </div>

    </section>
  );
}