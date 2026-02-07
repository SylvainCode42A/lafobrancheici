"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';

const GlassCard = ({ children, className = "" }: any) => (
  /* MODIFICATION : bg-[#181818] -> bg-white/2 + backdrop-blur-xl */
  <div className={`relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/2 backdrop-blur-xl transition-all duration-500 ${className}`}>
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </div>
);

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');
  const [toggles, setToggles] = useState({ twoFactor: false, alerts: true });

  const tabs = [
    { id: 'profile', label: 'Profile_Node' },
    { id: 'security', label: 'Security_Protocols' },
    { id: 'billing', label: 'Billing_Ledger' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div 
            key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <GlassCard className="p-10">
              <div className="mb-10 border-l border-purple-500 pl-6">
                <h4 className="text-xl font-black italic uppercase tracking-tighter">Identity_Matrix</h4>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Modification des paramètres d'accès</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Full_Name</label>
                  <input type="text" placeholder="NOM COMPLET" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-[10px] font-black uppercase tracking-widest focus:border-purple-500/50 outline-none transition-all text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Comm_Channel</label>
                  <input type="email" placeholder="EMAIL DE CONTACT" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-[10px] font-black uppercase tracking-widest focus:border-purple-500/50 outline-none transition-all text-white" />
                </div>
              </div>
              <div className="mt-12 flex justify-end">
                <button className="flex items-center gap-3 px-8 py-3 rounded-full bg-purple-600 text-[9px] font-black uppercase tracking-[0.3em] text-white hover:bg-purple-500 transition-all cursor-pointer">
                  Sync_Changes <ChevronRight size={12} />
                </button>
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => setToggles(prev => ({ ...prev, twoFactor: !prev.twoFactor }))} className="w-full text-left cursor-pointer">
                <GlassCard className={`p-8 group hover:border-purple-500/20 ${toggles.twoFactor ? 'border-purple-500/30 bg-purple-500/[0.05]' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase italic text-white">2FA_Authentication</p>
                      <p className={`text-[8px] font-black uppercase tracking-widest ${toggles.twoFactor ? 'text-purple-500' : 'text-white/20'}`}>
                        {toggles.twoFactor ? 'ACTIVE' : 'OFF'}
                      </p>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative p-1 transition-all ${toggles.twoFactor ? 'bg-purple-600/20 border border-purple-500/50' : 'bg-white/5'}`}>
                      <div className={`w-3 h-3 rounded-full transition-all ${toggles.twoFactor ? 'bg-purple-500 ml-auto shadow-[0_0_8px_#a855f7]' : 'bg-white/20'}`} />
                    </div>
                  </div>
                </GlassCard>
              </button>

              <button onClick={() => setToggles(prev => ({ ...prev, alerts: !prev.alerts }))} className="w-full text-left cursor-pointer">
                <GlassCard className={`p-8 group hover:border-purple-500/20 ${toggles.alerts ? 'border-purple-500/30 bg-purple-500/[0.05]' : ''}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase italic text-white">Neural_Alerts</p>
                      <p className={`text-[8px] font-black uppercase tracking-widest ${toggles.alerts ? 'text-purple-500' : 'text-white/20'}`}>
                        {toggles.alerts ? 'ACTIVE' : 'OFF'}
                      </p>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative p-1 transition-all ${toggles.alerts ? 'bg-purple-600/20 border border-purple-500/50' : 'bg-white/5'}`}>
                      <div className={`w-3 h-3 rounded-full transition-all ${toggles.alerts ? 'bg-purple-500 ml-auto shadow-[0_0_8px_#a855f7]' : 'bg-white/20'}`} />
                    </div>
                  </div>
                </GlassCard>
              </button>
            </div>
          </motion.div>
        );
      case 'security':
        return (
          <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <GlassCard className="p-10">
              <div className="mb-10 border-l border-red-500 pl-6">
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-red-500">Access_Control</h4>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Security protocols and key management</p>
              </div>
              <button className="w-full bg-red-500/5 border border-red-500/20 rounded-2xl p-6 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all text-center cursor-pointer">
                Kill_All_Active_Sessions
              </button>
            </GlassCard>
          </motion.div>
        );
      case 'billing':
        return (
          <motion.div key="billing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <GlassCard className="p-10">
              <div className="mb-10 border-l border-white pl-6">
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-white">Billing_Ledger</h4>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Historique des transactions de l'unité</p>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-4 border border-white/5 rounded-2xl flex justify-between items-center text-[10px] font-mono hover:bg-white/[0.05] transition-colors bg-white/[0.02]">
                    <span className="text-white/40 tracking-widest">TRX_REF_00{i}_2026</span>
                    <span className="text-purple-500 font-black">49.00 EUR</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        );
    }
  };

  return (
    /* MODIFICATION : bg-[#111111] et min-h-screen déjà gérés par le Layout parent */
    <div className="max-w-[1400px] mx-auto space-y-16 text-white font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-12 gap-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Set<span className="ghost-title-white">tings</span></h1>
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">Config_ID: 0x992_Primary</p>
        </div>
        
        <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer ${
                activeTab === tab.id ? 'bg-white text-black italic shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'text-white/30 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-4">
          <GlassCard className="p-10 border-white/5">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-4xl font-black italic text-purple-500">JD</span>
              </div>
              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Jean_Dupont</h3>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] mt-1">Admin_Level_04</p>
              </div>
            </div>
            <div className="mt-12 space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">Node_Status</span>
                <span className="text-[10px] font-black text-purple-500 italic uppercase">Active</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">Neural_Sync</span>
                <span className="text-[10px] font-black text-purple-500 italic">99.8%</span>
              </div>
            </div>
          </GlassCard>
        </aside>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}