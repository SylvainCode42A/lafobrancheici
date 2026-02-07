"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/app/components/ui/progress";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step: number;
  progress: number;
}

export default function OnboardingLayout({ children, step, progress }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center p-6 selection:bg-purple-500/30 overflow-x-hidden relative">
      {/* Background Glow - Correction w, h et blur */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-purple-600/10 blur-3xl rounded-full -z-10" />
      
      <header className="absolute top-10 left-10">
        <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto object-contain brightness-110" />
      </header>

      {/* Progress Bar Container - Correction max-w */}
      <div className="w-full max-w-175 mt-24 space-y-4 relative z-10">
        <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
          <span>Phase_0{step}</span>
          <span className="text-purple-500 italic font-black">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1" />
      </div>

      <motion.main 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        // Correction max-w ici aussi
        className="w-full max-w-175 mt-16 space-y-10 relative z-10"
      >
        {children}
      </motion.main>
    </div>
  );
}