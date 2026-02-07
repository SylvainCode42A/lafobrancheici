"use client";
import React from 'react';
import Navbar from "@/app/components/landing/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white selection:bg-purple-500 font-sans flex flex-col relative overflow-hidden">
      {/* GRILLE ET GLOW : C'est ici que tout se joue */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* La Grille tactique */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Le Glow radial qui donne de la profondeur */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(168,85,247,0.15),transparent_100%)]" />
      </div>
      
      <Navbar />

      <main className="relative z-10 flex-1 pt-24 pb-20 px-6 md:px-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}