"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Progress } from "@/app/components/ui/progress";
import { ChevronRight } from 'lucide-react';

export default function OnboardingStep1() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);

  const roles = ["SDR ou BDR", "Chef des ventes", "Succès client", "Spécialiste marketing", "Responsable des opérations", "Autre"];
  const sources = ["Facebook", "Podcast", "Instagram", "Reddit", "LinkedIn", "ChatGPT", "YouTube", "Google", "Ami", "Autre"];

  const isComplete = role && source;

  const handleNext = () => {
    if (isComplete) {
      localStorage.setItem('onboarding_data', JSON.stringify({ role, source }));
      router.push('/onboarding/step2');
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center p-6 selection:bg-purple-500/30 overflow-x-hidden relative">
      {/* Background Decor : v4 fix (w-125 = 500px) */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-purple-600/10 blur-[120px] rounded-full -z-10" />
      
      <header className="absolute top-10 left-10">
        <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto object-contain brightness-110" />
      </header>

      {/* PROGRESS BAR : v4 fix (max-w-175 = 700px) */}
      <div className="w-full max-w-175 mt-24 space-y-4">
        <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
          <span>Phase_01</span>
          <span className="text-purple-500 italic">25%</span>
        </div>
        <Progress value={25} className="h-1" />
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-175 mt-16 space-y-10"
      >
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Initialisation <span className="text-zinc-800">du profil_</span>
        </h1>

        {/* v4 fix: bg-white/2 */}
        <div className="bg-white/2 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl space-y-12">
          {/* Question 1 */}
          <div>
            <p className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">01. Quel est votre segment d'opération ?</p>
            <div className="flex flex-wrap gap-3">
              {roles.map((item) => (
                <button
                  key={item}
                  onClick={() => setRole(item)}
                  className={`px-6 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    role === item ? "bg-white text-black border-white" : "bg-white/5 border-white/5 text-zinc-500 hover:border-white/20"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <p className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">02. Source d'acquisition du signal ?</p>
            <div className="flex flex-wrap gap-3">
              {sources.map((item) => (
                <button
                  key={item}
                  onClick={() => setSource(item)}
                  className={`px-6 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    source === item ? "bg-purple-600 text-white border-purple-500" : "bg-white/5 border-white/5 text-zinc-500 hover:border-white/20"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NAVIGATION BUTTON */}
        <div className="w-full flex justify-end">
          <button 
            disabled={!isComplete}
            onClick={handleNext}
            className={`
              group relative h-12 px-8 rounded-2xl flex items-center gap-3 transition-all duration-500 cursor-pointer overflow-hidden
              ${!isComplete 
                ? "bg-white/5 border border-white/5 opacity-20 grayscale cursor-not-allowed" 
                : "bg-white border border-white hover:bg-purple-600 hover:border-purple-600 active:scale-95 shadow-xl hover:shadow-purple-500/20"
              }
            `}
          >
            <span className={`
              text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500
              ${!isComplete ? "text-white/40" : "text-black group-hover:text-white"}
            `}>
              Suivant
            </span>
            <ChevronRight 
              size={14} 
              className={`
                transition-all duration-500 
                ${!isComplete ? "text-white/20" : "text-black group-hover:text-white group-hover:translate-x-1"}
              `} 
            />
          </button>
        </div>
      </motion.main>
    </div>
  );
}