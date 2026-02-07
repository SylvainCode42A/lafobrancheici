"use client";
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SetupPack {
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
  color: string;
}

export function SetupCard({ pack }: { pack: SetupPack }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, { stiffness: 100, damping: 30 }), [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(useSpring(x, { stiffness: 100, damping: 30 }), [-0.5, 0.5], ["-6deg", "6deg"]);
  
  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative group h-full"
    >
      {/* Correction bg-white/[0.02] -> bg-white/2 et rounded-[2.5rem] -> rounded-3xl */}
      <div className={`relative h-full bg-white/2 backdrop-blur-3xl border border-white/5 rounded-3xl p-9 transition-all duration-700 overflow-hidden ${pack.color}`}>
        
        {/* SHIMMER EFFECT - Correction v4 syntax: bg-linear-to-tr, via-white/1, et -translate-x-full */}
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/1 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <div className="relative z-10">
          <div className="mb-10">
            {/* Correction min-h-[24px] -> min-h-6 */}
            <div className="flex justify-between items-start mb-8 min-h-6">
              {pack.popular ? (
                <span className="text-[8px] font-black px-3 py-1 bg-white text-black uppercase tracking-tighter rounded-full">Top_Protocol</span>
              ) : <div />}
            </div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-2">{pack.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black italic tracking-tighter text-white">
                {pack.price === "Custom" ? "Contact" : `${pack.price}`}
              </span>
              {pack.price !== "Custom" && <span className="text-zinc-800 font-bold text-[9px] uppercase tracking-[0.2em]">/ EUR</span>}
            </div>
          </div>

          <div className="space-y-4 mb-12">
            {pack.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-1 h-1 rounded-full ${pack.popular ? 'bg-purple-500' : 'bg-zinc-800'}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-300 transition-colors">{f}</span>
              </div>
            ))}
          </div>

          {/* Correction bg-white/[0.03] -> bg-white/3 et translate-y-[102%] -> translate-y-full */}
          <button className="group/btn relative w-full h-12 rounded-xl overflow-hidden bg-white/3 border border-white/10 transition-all duration-300 active:scale-95">
            <span className="relative z-20 text-[9px] font-black uppercase tracking-[0.3em] text-white group-hover/btn:text-black transition-colors duration-500">
              Initialiser
            </span>
            <div className="absolute inset-0 z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 bg-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}