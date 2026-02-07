"use client";
import React from 'react';
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import Collaborators from "../components/landing/Collaborators";
import { TypewriterText } from "../components/network/TypewriterText";
import { Counter } from "../components/network/Counter";
import { NetworkNodeCard } from "../components/network/NetworkNodeCard";

const nodes = [
  {
    name: "Zone_Alpha (Paris)",
    price: "4",
    unit: "ms",
    features: ["Bande passante 10Gbps", "Uptime 99.99%", "Node Type: Relay", "Status: Optimal"],
    color: "group-hover:border-white/20",
  },
  {
    name: "Zone_Delta (NYC)",
    price: "32",
    unit: "ms",
    features: ["Bande passante 5Gbps", "Uptime 99.95%", "Node Type: Endpoint", "Status: Warning"],
    popular: true,
    color: "group-hover:border-purple-500/50",
  },
  {
    name: "Zone_Omega (Tokyo)",
    price: "142",
    unit: "ms",
    features: ["Bande passante 2Gbps", "Uptime 99.99%", "Node Type: Relay", "Status: Optimal"],
    color: "group-hover:border-white/20",
  }
];

export default function NetworkPage() {
  return (
    <main className="bg-[#111111] relative antialiased selection:bg-white/10 overflow-x-hidden text-white min-h-screen">
      
      {/* Texture de fond - Identique à PricingPage */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Glow violet diffus centralisé */}
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-300 h-200 bg-purple-600/2 blur-[160px]" />
        
        {/* Grain Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* 1. HERO */}
        <section className="pt-60 pb-24 px-6 text-center">
          <div className="flex flex-col items-center space-y-10">
            <h1 className="text-7xl md:text-9xl font-black leading-none tracking-[-0.05em] uppercase italic text-white">
              NETWORK_
            </h1>
            <div className="h-px w-16 bg-white/10" />
            <div className="max-w-sm h-12">
              <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase tracking-widest italic">
                <TypewriterText 
                  text="Infrastructure globale à haute vélocité. Monitoring des flux en temps réel sur les segments de calcul Alpha." 
                  delay={600}
                />
              </p>
            </div>
          </div>
        </section>

        {/* 2. NODES GRID */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nodes.map((node, i) => <NetworkNodeCard key={i} node={node} />)}
          </div>
        </section>

        {/* 3. MONITORING SECTION */}
        <section className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <h2 className="text-6xl font-black leading-[0.9] tracking-tighter uppercase italic text-white">
                Live <br/>
                <span className="text-zinc-900 text-stroke">Monitoring.</span>
              </h2>
              <div className="h-px w-12 bg-white/10" />
              <p className="text-[11px] text-zinc-500 max-w-xs font-bold leading-relaxed uppercase tracking-widest italic">
                Analyse spectrale des flux de données. Perte de paquets critique inférieure à 0.002%.
              </p>
            </div>

            <div className="relative space-y-4">
              {[{ label: "Traffic_In", val: 842, unit: "Gb/s" }, { label: "Nodes_Active", val: 12, unit: "SYS" }].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-8 bg-white/2 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] group hover:border-white/20 transition-all duration-700">
                  <span className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.4em] italic">{item.label}</span>
                  <div className="text-4xl font-black italic text-white tracking-tighter group-hover:text-purple-500 transition-colors">
                    <Counter value={item.val} /> <span className="text-[10px] text-zinc-800">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. STATS INFRA */}
        <section className="max-w-7xl mx-auto px-6 py-32">
          <div className="bg-white/1 border border-white/5 rounded-[4rem] p-16 md:p-24 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {[
                { label: "Data_Throughput", value: 12.4, suffix: "M" },
                { label: "Mean_Latency", value: 42, suffix: "ms" },
                { label: "Acquisition_ROI", value: 3.8, prefix: "x" }
              ].map((stat, i) => (
                <div key={i} className="space-y-4 border-l border-white/5 pl-8 hover:border-purple-500/50 transition-colors duration-700">
                  <p className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.5em] italic">{stat.label}</p>
                  <div className="text-6xl font-black tracking-tighter italic text-white">
                    {stat.prefix}<Counter value={stat.value} />{stat.suffix}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Collaborators />
        <Footer />
      </div>

      <style jsx global>{`
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255,255,255,0.05);
        }
      `}</style>
    </main>
  );
}