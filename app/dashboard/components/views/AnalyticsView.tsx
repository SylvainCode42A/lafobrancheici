"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Zap, Activity, Shield, RefreshCw, ArrowUpRight } from "lucide-react";

import StatCard from "@/app/dashboard/components/views/StatCard";
import LeadCard from "@/app/dashboard/components/views/LeadCard";

interface Lead {
  id: string;
  company: string;
  domain: string;
  email: string;
  location: string;
  visits: number;
  last_visit: string;
  contactsCount: number;
}

const API_BASE = "http://localhost:4000";

const getQualification = (hits: number) => {
  if (hits >= 10) return { label: "CRITICAL", class: "border-red-500/50 text-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]" };
  if (hits >= 4) return { label: "HOT", class: "border-orange-500/50 text-orange-500 bg-orange-500/10" };
  return { label: "SEED", class: "border-white/10 text-white/40 bg-white/5" };
};

export default function AnalyticsView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [mode, setMode] = useState<"visits" | "leads">("visits");
  const [timeframe, setTimeframe] = useState<"24H" | "7D" | "30D">("7D");
  const [search, setSearch] = useState("");
  const hasFetched = useRef(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/analytics/leads`);
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const fetchChart = async () => {
    try {
      setLoadingChart(true);
      const res = await fetch(`${API_BASE}/api/analytics/chart?timeframe=${timeframe}&mode=${mode}`);
      const data = await res.json();
      setChartData(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); } finally { setLoadingChart(false); }
  };

  useEffect(() => {
    if (!hasFetched.current) { fetchLeads(); hasFetched.current = true; }
  }, []);

  useEffect(() => { fetchChart(); }, [timeframe, mode]);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => (l.company || "").toLowerCase().includes(search.toLowerCase()));
  }, [leads, search]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      /* NETTOYAGE : bg-[#111111] et min-h-screen supprimés */
      className="max-w-[1400px] mx-auto space-y-16 pt-10 pb-20 px-6 text-white font-sans"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .ghost-title-white { -webkit-text-stroke: 1px rgba(255,255,255,0.4); color: transparent; }
      `}} />

      {/* HEADER TACTIQUE */}
      <header className="relative flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
            Analy<span className="ghost-title-white">tics</span>
          </h1>
          <div className="flex items-center gap-3 pl-1">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${loading ? 'bg-orange-500' : 'bg-purple-500 shadow-[0_0_8px_#a855f7]'}`} />
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.5em]">System_Sync_Active</p>
          </div>
        </div>
        
        <div className="flex gap-12">
            <div className="text-right">
              <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mb-1">Live_Capture</p>
              <p className="text-3xl font-black italic text-white tabular-nums tracking-tighter uppercase">{leads.length} Leads</p>
            </div>
            <div className="text-right border-l border-white/10 pl-12">
              <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mb-1">Latency</p>
              <p className="text-3xl font-black italic text-purple-500 tabular-nums tracking-tighter">14MS</p>
            </div>
        </div>
      </header>

      {/* RECHERCHE ET FILTRES */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-500 transition-colors" size={14} />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH_SIGNAL..." 
            className="w-full bg-transparent border-b border-white/10 py-4 pl-8 pr-6 text-[10px] font-black tracking-[0.3em] text-white focus:border-purple-500/50 transition-all outline-none uppercase placeholder:text-white/20" 
          />
        </div>
        <div className="flex gap-6 items-center">
            <div className="flex gap-4 mr-4">
              {["24H", "7D", "30D"].map((t) => (
                <button 
                  key={t} onClick={() => setTimeframe(t as any)}
                  className={`text-[9px] font-black uppercase tracking-widest transition-all ${timeframe === t ? 'text-purple-500 italic' : 'text-white/20'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="h-4 w-px bg-white/10" />
            <button className="text-[9px] font-black uppercase tracking-widest text-white italic hover:text-purple-500 transition-all flex items-center gap-2">
               EXPORT_DATA <ArrowUpRight size={14} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Global_Nodes" value="Stable" icon={Globe} />
        <StatCard label="Process_Power" value="Optimal" icon={Zap} isPurple />
        <StatCard label="Flux_State" value="Interception" icon={Activity} />
      </div>

      {/* CHART SECTION */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 italic">Flux_Capture_Monitor</p>
           <div className="flex gap-6">
              {["visits", "leads"].map((m) => (
                <button key={m} onClick={() => setMode(m as any)} className={`text-[9px] font-black uppercase tracking-widest ${mode === m ? 'text-purple-500 italic' : 'text-white/20'}`}>{m}</button>
              ))}
           </div>
        </div>
        {/* NETTOYAGE : bg-[#181818] remplacé par bg-white/2 + backdrop-blur */}
        <div className="h-80 w-full border border-white/5 bg-white/2 backdrop-blur-xl rounded-4xl p-10 shadow-2xl relative overflow-hidden">
            {loadingChart && <RefreshCw className="absolute top-10 right-10 animate-spin text-purple-500/40" size={16} />}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#a855f7" strokeWidth={2} fill="url(#pGrad)" />
              </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* DATA FEED */}
      <div className="space-y-4 relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 italic flex items-center gap-2 pl-4 mb-8">
           <Shield size={12} className="text-white/40" /> Signal_Interceptions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
          <AnimatePresence mode="popLayout">
            {filteredLeads.map((lead: Lead) => (
              <LeadCard 
                key={lead.id} 
                lead={lead} 
                qual={getQualification(lead.visits || 0)} 
              />
            ))}
          </AnimatePresence>
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