"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingLayout from '@/app/components/onboarding/onboarding-layout';
import OnboardingButtons from '@/app/components/onboarding/onboarding-buttons';

export default function OnboardingStep2() {
  const router = useRouter();
  const [targetCompanies, setTargetCompanies] = useState("");
  const [personaTitle, setPersonaTitle] = useState("");

  const isComplete = targetCompanies.length > 3 && personaTitle.length > 2;

  const handleNext = () => {
    if (isComplete) {
      const existingData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
      localStorage.setItem('onboarding_data', JSON.stringify({ 
        ...existingData, 
        targetCompanies, 
        personaTitle 
      }));
      router.push('/onboarding/step3');
    }
  };

  return (
    <OnboardingLayout step={2} progress={50}>
      {/* TITRE DE LA PAGE */}
      <div className="space-y-4">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Ciblage <span className="text-zinc-800">de l'audience_</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-xl italic">
          Précisez votre public pour calibrer l'intelligence artificielle.
        </p>
      </div>

      {/* LE CONTENU (Tes infos qui avaient disparu) */}
      <div className="bg-white/2 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl w-full space-y-12">
        <div className="space-y-4">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">
            03. Références cibles (3 entreprises)
          </label>
          <input 
            type="text"
            value={targetCompanies}
            onChange={(e) => setTargetCompanies(e.target.value)}
            placeholder="Ex: Amazon, Stripe, Tesla"
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-[11px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all placeholder:text-zinc-700 outline-none"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">
            04. Intitulé du poste de votre persona
          </label>
          <input 
            type="text"
            value={personaTitle}
            onChange={(e) => setPersonaTitle(e.target.value)}
            placeholder="Ex: Head of Sales"
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-[11px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all placeholder:text-zinc-700 outline-none"
          />
        </div>
      </div>

      {/* LES BOUTONS (Retour et Suivant) */}
      <OnboardingButtons 
        onNext={handleNext} 
        onBack={() => router.back()} 
        disabled={!isComplete} 
      />
    </OnboardingLayout>
  );
}