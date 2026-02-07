"use client";
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface PricingPack {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface PricingCardProps {
  pack: PricingPack;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PricingCard({ pack, isSelected, onSelect }: PricingCardProps) {
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
      onClick={onSelect}
      className="relative group h-full cursor-pointer"
    >
      <div className={`
        relative h-full transition-all duration-700 rounded-3xl p-8 overflow-hidden border
        ${isSelected 
          ? `bg-white/5 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.15)]` 
          : `bg-white/2 border-white/5 hover:border-white/20`
        }
      `}>
        {/* SHIMMER EFFECT - Correction v4 syntax: bg-linear-to-tr et -translate-x-full */}
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-8">
            {/* Correction min-h-[20px] -> min-h-5 */}
            <div className="flex justify-between items-start mb-6 min-h-5">
              {pack.popular && (
                <span className="text-[8px] font-black px-3 py-1 bg-purple-600 text-white uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  Top_Protocol
                </span>
              )}
            </div>
            
            <h3 className={`text-lg font-black uppercase italic tracking-tighter mb-1 transition-colors ${isSelected ? 'text-purple-400' : 'text-white'}`}>
              {pack.name}
            </h3>
            
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black italic tracking-tighter text-white">
                {pack.price === "Custom" ? "Contact" : `${pack.price}`}
              </span>
              {pack.price !== "Custom" && (
                <span className="text-zinc-600 font-bold text-[8px] uppercase tracking-widest">/ EUR</span>
              )}
            </div>
          </div>

          {/* Correction flex-grow -> grow */}
          <div className="space-y-4 mb-10 grow">
            {pack.features.map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-1 h-1 rounded-full transition-colors ${isSelected ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-zinc-800'}`} />
                <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className={`h-1 w-full rounded-full transition-all duration-700 ${isSelected ? 'bg-purple-500 shadow-[0_0_15px_#a855f7]' : 'bg-white/5'}`} />
        </div>
      </div>
    </motion.div>
  );
}