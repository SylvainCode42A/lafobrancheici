"use client";
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightElement?: React.ReactNode;
}

export default function OnboardingInput({ label, rightElement, ...props }: Props) {
  return (
    <div className="space-y-2 w-full">
      <label className="text-[9px] font-black uppercase text-zinc-500 ml-2 tracking-[0.2em] italic">
        {label}
      </label>
      <div className="relative">
        <input 
          {...props}
          className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-[11px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all placeholder:text-zinc-700 outline-none"
        />
        {rightElement && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}