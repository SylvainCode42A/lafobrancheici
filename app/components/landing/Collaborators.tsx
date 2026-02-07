"use client";
import React from 'react';

const partners = [
  "LVMH", "AIRBUS", "SANTANDER", "BYTEDANCE", "NIKE", "TESLA", "GOLDMAN SACHS", "NETFLIX"
];

export default function Collaborators() {
  return (
    <div className="relative py-14 bg-transparent overflow-hidden border-y border-white/5">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-wrapper {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite;
        }
        .marquee-item {
          color: rgba(255,255,255,0.1);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          padding: 0 5rem;
        }
        .marquee-item:hover {
          color: rgba(255,255,255,0.8);
          filter: drop-shadow(0 0 15px rgba(255,255,255,0.2));
        }
      `}} />

      {/* Overlays de fondu : Utilisation de masques progressifs pour plus de flexibilité */}
      <div className="absolute inset-y-0 left-0 w-48 md:w-72 bg-linear-to-r from-[#111111] via-[#111111]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 md:w-72 bg-linear-to-l from-[#111111] via-[#111111]/80 to-transparent z-10 pointer-events-none" />

      <div className="marquee-wrapper group">
        {/* Double itération pour le défilement infini */}
        {[...partners, ...partners].map((name, i) => (
          <div key={i} className="marquee-item">
            <span className="text-4xl md:text-5xl font-black tracking-[-0.08em] uppercase italic select-none">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}