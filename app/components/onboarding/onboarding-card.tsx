"use client";
import React from 'react';

interface OnboardingCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function OnboardingCard({ children, className = "" }: OnboardingCardProps) {
  return (
    <div className={`
      relative overflow-hidden
      bg-white/2 border border-white/5 
      rounded-[2.5rem] p-8 md:p-12 
      backdrop-blur-3xl shadow-2xl 
      w-full space-y-12
      ${className}
    `}>
      {/* Effet de lueur interne subtil */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Contenu de la carte */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}