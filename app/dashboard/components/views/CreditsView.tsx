"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Zap, Shield } from 'lucide-react';

const simpleData = [
  { v: 100 }, { v: 120 }, { v: 110 }, { v: 140 }, { v: 130 }, { v: 160 }, { v: 150 }, { v: 190 }
];

const creditPacks = [
  { amount: 10, price: "450", label: "Starter" },
  { amount: 25, price: "950", label: "Pro" },
  { amount: 50, price: "1,750", label: "Elite" },
  { amount: 100, price: "3,000", label: "Apex" },
];

const Typewriter = ({ text }: { text: string }) => {
  const [currentText, setCurrentText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{currentText}</span>;
};

export default function CreditsView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      /* NETTOYAGE : bg-[#111111] et min-h-screen supprimés pour la transparence */
      className="max-w-[1400px] mx-auto space-y-16 pt-10 pb-20 px-6 text-white font-sans selection:bg-purple-500"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .ghost-title-white { -webkit-text-stroke: 1px rgba(255,255,255,0.4); color: transparent; }
        .neon-glow { box-shadow: 0 0 15px rgba(168, 85, 247, 0.4); }
      `}} />

      {/* HEADER TACTIQUE */}
      <header className="relative flex justify-between items-center border-b border-white/10 pb-12">
        <div className="space-y-1">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
            Cre<span className="ghost-title-white">dits</span>
          </h1>
          <div className="flex items-center gap-3 pl-1">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#a855f7]" />
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.5em]">Auth_Node: 0x771_Active</p>
          </div>
        </div>
        
        <div className="flex gap-12">
            <div className="text-right">
              <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mb-1">Live_Balance</p>
              <p className="text-4xl font-black italic text-purple-500 tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                1,240 U
              </p>
            </div>
            <div className="text-right border-l border-white/10 pl-12">
              <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mb-1">Sync_Rate</p>
              <p className="text-4xl font-black italic text-white tabular-nums tracking-tighter">99.8%</p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* MONITORING SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          {/* NETTOYAGE : bg-[#181818] -> bg-white/2 + backdrop-blur */}
          <div className="relative group p-10 h-130 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-xl flex flex-col justify-between hover:border-white/20 transition-all duration-500 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-4">Usage_Flow</p>
              <h3 className="text-3xl font-black italic tracking-tighter uppercase group-hover:text-purple-400 transition-colors">Extraction</h3>
              
              <div className="mt-10 h-32 w-full opacity-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={simpleData}>
                    <Line type="stepAfter" dataKey="v" stroke="#a855f7" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-5 bg-black/40 border border-white/5 rounded-xl min-h-20">
                <p className="text-[10px] font-mono text-white/40 leading-relaxed italic">
                  <span className="text-purple-500 font-bold mr-2">//</span>
                  <Typewriter text="Initialisation du flux séquentiel... Scan des nœuds terminé. Bande passante synchronisée." />
                </p>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Efficiency_Rate</p>
                   <p className="text-2xl font-black italic text-purple-500">OPTIMAL</p>
                </div>
                <Zap size={14} className="text-white/10 mb-2" />
              </div>
            </div>
          </div>
        </div>

        {/* REFILLS SECTION */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex flex-col gap-2 border-l border-white/10 pl-8 mb-12">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">Refills_</h2>
            <div className="flex justify-between items-center">
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">Injection_Bande_Passante</p>
              <span className="text-[8px] font-mono text-purple-500/50 italic font-bold flex items-center gap-2">
                <Shield size={10} /> Network_Status: Optimal
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {creditPacks.map((pack) => (
              <div 
                key={pack.label} 
                /* NETTOYAGE : bg-[#181818] -> bg-white/2 + backdrop-blur */
                className="group/pack relative p-10 rounded-2xl border border-white/5 bg-white/2 backdrop-blur-xl hover:border-purple-500/30 hover:translate-x-2 transition-all duration-500"
              >
                <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-purple-600 opacity-0 group-hover/pack:opacity-100 transition-opacity neon-glow" />
                
                <div className="flex justify-between items-start mb-16">
                   <div>
                      <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-3 italic">{pack.label}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-black italic tracking-tighter text-white group-hover/pack:text-purple-500 transition-colors duration-500">
                          +{pack.amount}
                        </span>
                        <span className="text-[10px] font-black text-white/10 uppercase">GB</span>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-black italic text-white/80 transition-colors group-hover/pack:text-white">€{pack.price}</p>
                   </div>
                </div>

                <div className="flex justify-end">
                  <button className="flex items-center gap-4 px-8 py-3 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 cursor-pointer group-hover/pack:translate-x-1">
                    EXECUTE_REFILL
                    <ArrowUpRight size={14} className="opacity-40" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-12 rounded-2xl border border-dashed border-white/10 flex flex-col items-center gap-6 group hover:border-purple-500/50 transition-all duration-700">
             <button className="px-10 py-4 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white group-hover:bg-purple-600 group-hover:border-purple-500 transition-all cursor-pointer">
               Upgrade_To_Dedicated_Protocol
             </button>
          </div>
        </div>
      </div>

      {/* FOOTER SYSTEM */}
      <footer className="flex justify-between items-center border-t border-white/10 pt-12">
         <div className="flex items-center gap-6 text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">
            <p>NODE_STATUS: ACTIVE</p>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <p>NEURAL_ENCRYPTION: AES_256</p>
         </div>
         <div className="flex items-center gap-3">
            <span className="text-[8px] font-black uppercase tracking-widest italic text-white/30">SYSTEM_STABLE</span>
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
         </div>
      </footer>
    </motion.div>
  );
}