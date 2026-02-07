"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function HeroTitan() {
  return (
    <section className="relative min-h-screen w-full bg-transparent flex items-center justify-center overflow-hidden">
      
      {/* AMBIANCE : Lueur diffuse optimisée v4 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* v4 FIX: w-200 (800px) / h-100 (400px) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-purple-950/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl px-6 w-full flex flex-col items-center">
        
        {/* TITRE : bg-linear-to-b (v4) */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-[8.5rem] font-black leading-[0.8] tracking-[-0.06em] text-white uppercase italic"
          >
            Own your <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-b from-white to-white/40">
              Market Data.
            </span>
          </motion.h1>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-14 min-h-12 flex items-center justify-center">
          <p className="text-zinc-500 font-medium text-sm md:text-base tracking-wide text-center max-w-2xl italic">
            <TypewriterText text="Interception des signaux d'intention avant leur matérialisation." />
          </p>
        </div>

        {/* BOUTONS MARÉE AGITÉE */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          
          {/* BOUTON 1 : bg-white/3 (v4) */}
          <button className="group relative w-64 h-14 rounded-2xl overflow-hidden bg-white/3 border border-white/10 transition-all duration-300 active:scale-95 backdrop-blur-sm cursor-pointer">
            <span className="relative z-20 text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500">
              Selection_Init
            </span>
            
            <div className="absolute inset-0 z-10 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
              {/* w-[400%] pour la vague fluide */}
              <svg className="absolute bottom-[98%] left-0 w-[400%] h-12 fill-zinc-300 animate-[wave_4s_linear_infinite]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,60 C100,60 100,0 200,0 C300,0 300,60 400,60 C500,60 500,0 600,0 C700,0 700,60 800,60 C900,60 900,0 1000,0 C1100,0 1100,60 1200,60 V120 H0 Z" />
              </svg>
              <div className="w-full h-full bg-zinc-300" />
            </div>
          </button>

          {/* BOUTON 2 : bg-white/1 (v4) */}
          <button className="group relative w-64 h-14 rounded-2xl overflow-hidden bg-white/1 border border-white/5 transition-all duration-300 active:scale-95 backdrop-blur-sm cursor-pointer">
            <span className="relative z-20 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors duration-500">
              Protocol_Read
            </span>
            
            <div className="absolute inset-0 z-10 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
              <svg className="absolute bottom-[98%] left-0 w-[400%] h-12 fill-purple-900 animate-[wave_6s_linear_infinite]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,60 C100,60 100,0 200,0 C300,0 300,60 400,60 C500,60 500,0 600,0 C700,0 700,60 800,60 C900,60 900,0 1000,0 C1100,0 1100,60 1200,60 V120 H0 Z" />
              </svg>
              <div className="w-full h-full bg-purple-900" />
            </div>
          </button>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}