"use client";
import React from 'react';
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { TypewriterText } from "../components/network/TypewriterText";
import { SetupCard } from "../components/pricing/SetupCard";
import { CreditCard } from "../components/pricing/CreditCard";

// Données typées pour éviter les erreurs "Cannot find name"
const setupPacks = [
  { name: "Infiltration", price: "2,500", features: ["500 Leads/m", "Précision 92%", "Standard AI"], color: "group-hover:border-white/20" },
  { name: "Domination", price: "7,500", popular: true, features: ["2,500 Leads/m", "Précision 98%", "Predictive Intel"], color: "group-hover:border-purple-500/50" },
  { name: "Souveraineté", price: "15,000", features: ["7,500 Leads/m", "Military Grade", "Dedicated Node"], color: "group-hover:border-white/20" },
  { name: "Goliath", price: "Custom", features: ["Illimité", "On-Premise", "Liaison Directe"], color: "group-hover:border-white/30" },
];

const creditPacks = [
  { amount: 10, price: "450", label: "Starter" },
  { amount: 25, price: "950", label: "Pro" },
  { amount: 50, price: "1,750", label: "Elite" },
  { amount: 100, price: "3,000", label: "Apex" },
];

export default function PricingPage() {
  return (
    <main className="bg-[#111111] relative antialiased selection:bg-white/10 overflow-x-hidden text-white min-h-screen">
      
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Correction w-300 (1200px), h-200 (800px) et bg-purple-600/2 */}
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-300 h-200 bg-purple-600/2 blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* 1. HERO */}
        <section className="pt-60 pb-24 px-6 text-center">
          <div className="flex flex-col items-center space-y-10">
            <h1 className="text-7xl md:text-9xl font-black leading-none tracking-[-0.05em] uppercase italic text-white">
              PRICING_
            </h1>
            <div className="h-px w-16 bg-white/10" />
            <p className="text-[11px] text-zinc-500 max-w-sm font-bold leading-relaxed uppercase tracking-widest italic h-12">
              <TypewriterText 
                text="Sélectionnez le protocole d'acquisition adapté à votre infrastructure. Déploiement immédiat sur nodes dédiés." 
                delay={600}
              />
            </p>
          </div>
        </section>

        {/* 2. SETUP PACKS GRID */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {setupPacks.map((pack, i) => <SetupCard key={i} pack={pack} />)}
          </div>
        </section>

        {/* 3. REFILLS SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="relative bg-white/1 border border-white/5 rounded-5xl p-12 md:p-24 overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 border-l-2 border-white/5 pl-10">
                 <div className="space-y-2">
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Refills_</h2>
                    <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em]">Injection_Bande_Passante</p>
                 </div>
                 <div className="text-[9px] font-mono text-zinc-800 uppercase tracking-[0.3em] italic">Network_Status: Optimal</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Typage explicite (credit: any, i: number) pour corriger l'erreur 7006 */}
                {creditPacks.map((credit: any, i: number) => (
                  <CreditCard key={i} credit={credit} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. LARGE OPS CTA */}
        <section className="max-w-5xl mx-auto px-6 pb-40">
           <div className="bg-white/1 border border-white/5 rounded-6xl p-16 flex flex-col md:flex-row justify-between items-center gap-12 backdrop-blur-xl">
              <div className="space-y-6 text-center md:text-left">
                <h4 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-[0.8]">Infrastructure_ <br/><span className="text-zinc-900">Dédiée.</span></h4>
                <p className="text-[10px] text-zinc-700 italic max-w-sm font-black tracking-[0.2em] leading-relaxed uppercase">
                   Accès Gizer : Nodes isolés pour opérations haute-vélocité.
                </p>
              </div>
              <button className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-700 active:scale-95 shadow-2xl cursor-pointer">
                Contacter_Analyste
              </button>
           </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}