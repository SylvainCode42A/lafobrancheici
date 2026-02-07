"use client";
import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="relative pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Lueur de fond chirurgicale - Se fond sur le fond de page existant */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/3 blur-[120px] rounded-full pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          
          {/* LOGO */}
          <div className="md:col-span-1">
            <div className="relative w-32 h-10">
              <Image 
                src="/assets/logo.png" 
                alt="Leadsight Logo" 
                fill 
                className="object-contain object-left filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

          {/* COLONNES DE LIENS */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-zinc-800">Solution</h4>
            <ul className="space-y-4 text-sm text-zinc-600 font-medium italic">
              <li className="hover:text-purple-400 transition-colors cursor-pointer duration-300">Neural Engine</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer duration-300">Signal Intercept</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer duration-300">Live Dashboard</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-zinc-800">Société</h4>
            <ul className="space-y-4 text-sm text-zinc-600 font-medium italic">
              <li className="hover:text-purple-400 transition-colors cursor-pointer duration-300">Prestige Club</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer duration-300">Privacy Protocol</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer duration-300">Contact_Direct</li>
            </ul>
          </div>

          {/* NEWSLETTER PRESTIGE */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800">Intercept_Digest</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-xs text-white italic placeholder:text-zinc-800 focus:outline-none focus:border-purple-500/30 transition-all duration-500"
              />
              <button className="absolute right-2 top-1.5 px-3 py-1.5 bg-white text-black text-[9px] font-black uppercase rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer">
                Join
              </button>
            </div>
            <p className="text-[9px] text-zinc-800 font-mono leading-tight uppercase tracking-tighter">
              PROTOCOLE DE TRANSMISSION LEADSIGHT_V2
            </p>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-widest">
            © 2026 LEADSIGHT_CORP.
          </div>
          
          <div className="flex gap-12 text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em] italic">
            <span className="hover:text-white transition-colors cursor-pointer duration-300">Termes_Service</span>
            <span className="hover:text-white transition-colors cursor-pointer duration-300">Data_Vault</span>
            <span className="hover:text-white transition-colors cursor-pointer duration-300">System_Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;