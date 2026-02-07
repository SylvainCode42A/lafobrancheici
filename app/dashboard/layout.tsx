"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from "@/app/components/landing/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#111111] text-white selection:bg-white/10 font-sans flex flex-col relative overflow-x-hidden">
      
      {/* Texture de fond synchronisée - Identique Landing Page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Glow violet diffus centralisé (w-300 h-200 purple/2) */}
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-300 h-200 bg-purple-600/2 blur-[160px]" />
        
        {/* Grain Noise Overlay (opacity-0.03 mix-blend-soft-light) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
      </div>

      {/* Styles globaux spécifiques au dashboard */}
      <style dangerouslySetInnerHTML={{ __html: `
        .ghost-title { -webkit-text-stroke: 1px rgba(255,255,255,0.05); color: transparent; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #181818; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #a855f7; }
        body { -webkit-font-smoothing: antialiased; }
      `}} />

      {/* Navbar relative z-50 */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Zone de contenu - Z-Index 10 pour passer au dessus du fond */}
      <motion.main 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex-1 pt-32 pb-20 px-6 md:px-10"
      >
        <div className="max-w-[1400px] mx-auto">
           {children}
        </div>
      </motion.main>
    </div>
  );
}