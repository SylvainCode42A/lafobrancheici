"use client";
import React from 'react';
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import Collaborators from "./components/landing/Collaborators";
import NeuralIntercept from "./components/landing/NeuralIntercept";
import StatsSection from "./components/landing/StatsSection";
import HowItWorks from "./components/landing/HowItWorks";
import Pricing from "./components/landing/Pricing";
import ChoiceSection from "./components/landing/ChoiceSection";
import Footer from "./components/landing/Footer";

export default function Home() {
  return (
    <main className="bg-[#111111] relative antialiased selection:bg-white/10 overflow-x-hidden text-white min-h-screen">
      
      {/* RETOUR DU FOND LANDING (Glow violet + Grain) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Glow violet diffus centralisé */}
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-300 h-200 bg-purple-600/2 blur-[160px]" />
        
        {/* Grain Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section id="home">
          <Hero />
        </section>
        
        <div className="relative py-12 bg-transparent">
          <Collaborators />
        </div>

        <NeuralIntercept />
        <StatsSection />
        <HowItWorks />
        <Pricing />
        <ChoiceSection />
        <Footer />
      </div>
      
    </main>
  );
}