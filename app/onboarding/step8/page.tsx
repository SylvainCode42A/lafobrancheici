"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import OnboardingLayout from '@/app/components/onboarding/onboarding-layout';

export default function OnboardingFinal() {
  const router = useRouter();

  const handleGoToDashboard = () => {
    localStorage.setItem('run_dashboard_tour', 'true');
    localStorage.setItem('is_authenticated', 'true');
    window.dispatchEvent(new Event("auth-change"));
    router.push('/dashboard');
  };

  return (
    <OnboardingLayout step={8} progress={100}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center space-y-12 py-12"
      >
        {/* TITRE IMPACTANT */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">
            Protocole <br />
            <span className="text-zinc-800">Initialisé_</span>
          </h1>
          <p className="text-purple-500 text-[10px] font-black uppercase tracking-[0.4em] italic">
            Votre infrastructure est prête pour l'acquisition.
          </p>
        </div>

        {/* BOUTON D'ACTION FINAL */}
        <div className="flex flex-col items-center gap-8 w-full max-w-sm">
          <button 
            onClick={handleGoToDashboard}
            className="group relative w-full h-16 bg-white rounded-2xl flex items-center justify-center gap-4 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)] cursor-pointer overflow-hidden"
          >
            {/* Effet de brillance : v4 fix bg-linear-to-r */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-purple-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              Accéder au Dashboard
            </span>
            <ArrowRight size={18} className="relative z-10 text-black group-hover:translate-x-2 transition-transform duration-500" />
          </button>

          {/* v4 fix: max-w-70 (280px) */}
          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-70">
            Toutes les fonctions système sont désormais déverrouillées.
          </p>
        </div>
      </motion.div>

      {/* DÉCO DE FOND : v4 fix h-75 (300px) */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full h-75 bg-purple-600/5 blur-[120px] rounded-full -z-10" />
    </OnboardingLayout>
  );
}