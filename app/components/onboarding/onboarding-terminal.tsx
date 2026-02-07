"use client";
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  code: string;
}

export default function OnboardingTerminal({ code }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {/* BOUTON COPIER */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={copyToClipboard}
          className={`
            flex items-center gap-2 text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border transition-all duration-300 cursor-pointer
            ${copied 
              ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
              : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:border-white/20"
            }
          `}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Injecté" : "Copier"}
        </button>
      </div>
      
      {/* FENÊTRE DE CODE */}
      <div className="bg-black/60 border border-white/5 rounded-2xl p-8 pt-12 overflow-x-auto font-mono text-[11px] leading-relaxed shadow-inner relative">
        {/* MacOS Style Dots */}
        <div className="absolute top-5 left-6 flex gap-1.5 opacity-30">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
        </div>

        <pre className="text-zinc-500">
          {/* On utilise ici une version simplifiée pour le rendu, 
              le code complet sera passé en prop mais affiché avec tes couleurs */}
          <span className="text-zinc-700">{"<"}</span>
          <span className="text-purple-500">script</span>
          <span className="text-zinc-700">{">"}</span>
          {"\n(function(){\n  fetch(\""}
          <span className="text-emerald-500 italic">https://api.leadsight.io/api/tracking</span>
          {"\", {\n    method: \""}
          <span className="text-purple-400 font-bold uppercase">POST</span>
          {"\",\n    headers: {\n      \"Content-Type\": \"application/json\",\n      \"X-API-KEY\": \""}
          <span className="text-orange-500 font-bold">ls_live_ABC123</span>
          {"\"\n    }\n  }).catch(() => {});\n})();\n"}
          <span className="text-zinc-700">{"</"}</span>
          <span className="text-purple-500">script</span>
          <span className="text-zinc-700">{">"}</span>
        </pre>
      </div>
    </div>
  );
}