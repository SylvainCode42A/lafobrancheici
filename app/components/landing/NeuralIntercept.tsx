"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const timeout = setTimeout(() => {
        const timer = setInterval(() => {
          setDisplayText(text.substring(0, i));
          i++;
          if (i > text.length) clearInterval(timer);
        }, 20);
        return () => clearInterval(timer);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, text, delay]);

  return <span ref={ref}>{displayText}</span>;
};

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function NeuralIntercept() {
  const profiles = [
    { 
      user: "D. Vasseur", 
      co: "Airbus", 
      score: 98, 
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
    },
    { 
      user: "L. Moreno", 
      co: "Santander", 
      score: 87, 
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
    }
  ];

  return (
    <section id="tech" className="relative max-w-7xl mx-auto px-6 py-40">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        
        {/* TEXTE DE GAUCHE */}
        <div className="space-y-10 text-left">
          <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-0.04em] uppercase italic text-white">
            Visez <br/>
            <span className="text-purple-500">Juste.</span>
          </h2>
          
          <div className="h-px w-12 bg-purple-500/40" />
          
          <p className="text-[11px] text-zinc-500 max-w-sm font-bold leading-relaxed uppercase tracking-widest italic">
            <TypewriterText 
              text="Leadsight traite des milliards de signaux pour isoler le candidat idéal avant son entrée sur le marché." 
              delay={400}
            />
          </p>
        </div>

        {/* VISUEL DE DROITE : CASE UNIQUE COMPACTE */}
        <div className="relative bg-white/1 border border-white/5 rounded-[3rem] px-8 py-10 overflow-hidden group hover:border-white/10 transition-all duration-1000 backdrop-blur-sm">
          
          {/* Header minimaliste de la case */}
          <div className="flex justify-between items-center mb-10 border-l-2 border-purple-500/50 pl-6">
             <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Neural_Intercept</h3>
             <div className="text-[8px] font-mono text-zinc-800 uppercase tracking-[0.3em]">Live_Stream</div>
          </div>

          <div className="space-y-3">
            {profiles.map((profile, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl transition-all duration-500 hover:bg-white/[0.04] group/item"
              >
                <div className="flex items-center gap-5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover/item:border-purple-500/50 transition-colors">
                    <img 
                      src={profile.img} 
                      alt={profile.user}
                      className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  
                  <div>
                    <div className="text-[10px] font-black uppercase text-white tracking-widest">{profile.user}</div>
                    <div className="text-[8px] text-zinc-700 font-bold uppercase tracking-[0.2em]">{profile.co}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-black italic text-white group-hover/item:text-purple-500 transition-colors tracking-tighter">
                    <Counter value={profile.score} />%
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}