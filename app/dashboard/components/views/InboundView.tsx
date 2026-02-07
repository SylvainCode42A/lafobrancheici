"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, Search, Linkedin, 
  ArrowUpRight, Filter
} from 'lucide-react';

const INITIAL_LEADS = [
  { id: 1, name: "Jean Dupont", co: "Airbus", email: "j.dupont@airbus.com", loc: "Toulouse, FR", score: 92, status: "Hot", comment: "Interested in neural sync", time: "2m ago" },
  { id: 2, name: "Sarah Connor", co: "Cyberdyne", email: "s.connor@sky.net", loc: "LA, US", score: 98, status: "Critical", comment: "Target identified - avoid AI future talk", time: "14m ago" },
  { id: 3, name: "Marc Lévy", co: "Santander", email: "m.levy@santander.es", loc: "Madrid, ES", score: 45, status: "Warm", comment: "Looking for export protocols", time: "1h ago" },
];

export default function InboundView() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-[1400px] mx-auto space-y-16 pt-10 pb-20 px-6 text-white font-sans"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .ghost-title-white { -webkit-text-stroke: 1px rgba(255,255,255,0.4); color: transparent; }
        .neon-glow { box-shadow: 0 0 15px rgba(168, 85, 247, 0.4); }
      `}} />

      {/* HEADER TACTIQUE */}
      <header className="relative flex justify-between items-center border-b border-white/5 pb-12">
        <div className="space-y-1">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
            In<span className="ghost-title-white">bound</span>
          </h1>
          <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.5em] pl-1">Target_Capture_Protocol</p>
        </div>
        
        <div className="flex gap-12">
            <div className="text-right">
              <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mb-1">Pipeline</p>
              <p className="text-3xl font-black italic text-white tabular-nums tracking-tighter">18,450 EUR</p>
            </div>
            <div className="text-right border-l border-white/10 pl-12">
              <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mb-1">Accuracy</p>
              <p className="text-3xl font-black italic text-purple-500 tabular-nums tracking-tighter shadow-purple-500/20">96.4%</p>
            </div>
        </div>
      </header>

      {/* RECHERCHE ET FILTRES */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-500 transition-colors" size={14} />
          <input 
            placeholder="SEARCH_NODE..." 
            className="w-full bg-white/2 border-b border-white/10 py-4 pl-8 pr-6 text-[10px] font-black tracking-[0.3em] text-white focus:border-purple-500/50 transition-all outline-none uppercase placeholder:text-white/20 backdrop-blur-sm" 
          />
        </div>
        <div className="flex gap-6 items-center">
            <button className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all flex items-center gap-2 cursor-pointer">
               <Filter size={12} /> FILTER_NODES
            </button>
            <div className="h-4 w-px bg-white/10" />
            <button className="text-[9px] font-black uppercase tracking-widest text-white italic hover:text-purple-500 transition-all flex items-center gap-2 cursor-pointer">
               EXPORT_ALL <ArrowUpRight size={14} />
            </button>
        </div>
      </div>

      {/* LISTE DES LEADS */}
      <div className="relative">
        {/* Ligne latérale décorative */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/50 via-white/5 to-transparent" />
        
        <div className="space-y-4 pl-4">
          <AnimatePresence mode="popLayout">
            {leads.map((lead) => {
              const isSelected = selectedLeads.includes(lead.id);
              return (
                <motion.div 
                  layout
                  key={lead.id} 
                  onClick={() => setSelectedLeads(prev => prev.includes(lead.id) ? prev.filter(i => i !== lead.id) : [...prev, lead.id])}
                  className={`group relative flex flex-col lg:flex-row items-start lg:items-center justify-between p-8 cursor-crosshair transition-all duration-500 rounded-2xl border backdrop-blur-xl ${
                    isSelected 
                    ? 'bg-purple-600/10 border-purple-500/40 translate-x-4 shadow-[0_0_30px_rgba(168,85,247,0.1)]' 
                    : 'bg-white/2 border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  {/* Indicateur d'état néon */}
                  <div className={`absolute left-0 top-4 bottom-4 w-0.5 transition-all duration-500 ${isSelected ? 'bg-purple-500 neon-glow' : 'bg-white/10 opacity-0 group-hover:opacity-100'}`} />

                  <div className="flex items-center gap-12 flex-1 w-full lg:w-auto">
                    <div className="min-w-[60px] hidden sm:block">
                      <p className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-1">Score</p>
                      <span className={`text-3xl font-black italic tracking-tighter ${isSelected ? 'text-purple-500' : 'text-white/30'} transition-colors`}>
                          {lead.score}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2 transition-colors group-hover:text-purple-400">
                        {lead.name}
                      </h3>
                      <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em]">
                        <span className="text-purple-500/80">{lead.co}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-white/40 italic">{lead.loc}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 hidden xl:block max-w-sm px-10">
                    <p className="text-[10px] font-mono text-white/30 italic leading-relaxed group-hover:text-white/70 transition-colors border-l border-white/5 pl-4">
                      // {lead.comment || "ENTRY_STABLE"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-10 w-full lg:w-auto mt-6 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5">
                     <div className="text-right">
                        <div className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-lg border transition-all duration-500 ${
                          lead.status === 'Critical' 
                          ? 'border-red-500/50 text-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                          : isSelected ? 'border-purple-500 text-white bg-purple-600' : 'border-white/10 text-white/40'
                        }`}>
                          {lead.status}
                        </div>
                        <span className="block text-[8px] font-mono text-white/20 uppercase italic mt-2 tracking-widest">{lead.time}</span>
                     </div>
                     
                     <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 hover:border-purple-500/50 transition-all hover:bg-purple-500/20 bg-white/5 cursor-pointer">
                          <Linkedin size={14} className="text-white/40 group-hover:text-white" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setLeads(leads.filter(l => l.id !== lead.id)); }}
                          className="w-10 h-10 flex items-center justify-center text-white/10 hover:text-red-500 transition-all hover:bg-red-500/10 rounded-xl cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER SYSTEM */}
      <footer className="flex justify-between items-center border-t border-white/10 pt-12">
         <div className="flex items-center gap-6 text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">
            <p className="flex items-center gap-2">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> 
              NODE_STATUS: ACTIVE
            </p>
            <div className="hidden sm:block w-1 h-1 bg-white/10 rounded-full" />
            <p className="hidden sm:block text-purple-500/40">NEURAL_ENCRYPTION: AES_256</p>
         </div>
         <div className="flex items-center gap-3">
            <span className="text-[8px] font-black uppercase tracking-widest italic text-white/30">SYSTEM_STABLE</span>
            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
         </div>
      </footer>
    </motion.div>
  );
}