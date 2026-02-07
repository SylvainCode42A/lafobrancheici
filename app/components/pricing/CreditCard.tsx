"use client";
import React from 'react';

interface CreditPack {
  amount: number;
  price: string;
  label: string;
}

interface CreditCardProps {
  credit: CreditPack;
}

export function CreditCard({ credit }: CreditCardProps) {
  return (
    <div className="group p-10 bg-white/1 border border-white/5 rounded-3xl hover:border-white/20 transition-all duration-700 hover:bg-white/3">
      <p className="text-[9px] font-black text-zinc-800 uppercase mb-8 tracking-[0.3em] italic">
        {credit.label}
      </p>
      
      <div className="flex items-baseline gap-2 mb-8">
        <p className="text-6xl font-black italic text-white group-hover:text-purple-500 transition-colors duration-500">
          +{credit.amount}
        </p>
        <span className="text-zinc-900 font-bold text-[10px] tracking-widest uppercase">
          GB
        </span>
      </div>
      
      <p className="text-sm font-black italic text-zinc-700 mb-10">
        €{credit.price}
      </p>
      
      <button className="w-full py-4 bg-white/2 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-black transition-all duration-500 cursor-pointer active:scale-95">
        Charger
      </button>
    </div>
  );
}