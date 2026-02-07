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

export default function HRStatsNeural() {
  const stats = [
    { value: 24, suffix: "k", label: "Talent Pool" },
    { value: 98, suffix: "%", label: "Retention" },
    { value: 4, prefix: "x", label: "Velocity" }
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">
      
      {/* TEXTE DÉPORTÉ AU-DESSUS */}
      <div className="mb-12 space-y-6">
        <div className="h-px w-12 bg-purple-500/40" />
        <p className="text-[11px] text-zinc-500 max-w-sm font-bold leading-relaxed uppercase tracking-widest italic">
          <TypewriterText 
            text="Mesures de performance temps réel. Analyse des flux de candidats et optimisation des cycles d'acquisition." 
            delay={200}
          />
        </p>
      </div>

      {/* CASE UNIQUE COMPACTE */}
      <div className="relative bg-white/1 border border-white/5 rounded-[3rem] px-10 py-12 md:px-16 overflow-hidden group hover:border-white/10 transition-all duration-1000 backdrop-blur-sm">
        <div className="relative z-10">
          
          {/* Header minimaliste */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-l-2 border-white/5 pl-8">
             <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Metrics_</h2>
             <div className="text-[8px] font-mono text-zinc-800 uppercase tracking-[0.3em] italic">Database_Status: Optimal</div>
          </div>

          {/* Grille des stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {stats.map((stat, i) => (
              <div key={i} className="group/item">
                <p className="text-[8px] font-black text-zinc-800 uppercase mb-4 tracking-[0.4em] italic group-hover/item:text-zinc-500 transition-colors">
                  {stat.label}
                </p>
                
                <div className="flex items-baseline gap-1">
                  <div className="text-5xl md:text-6xl font-black italic text-white group-hover/item:text-purple-500 transition-colors duration-500 tracking-tighter leading-none">
                    {stat.prefix && <span className="text-2xl not-italic mr-1 opacity-20">{stat.prefix}</span>}
                    <Counter value={stat.value} />
                    <span className="text-zinc-900 font-bold text-[10px] tracking-widest uppercase ml-2 italic">
                      {stat.suffix}
                    </span>
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