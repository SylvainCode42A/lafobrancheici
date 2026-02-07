"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingLayout from '@/app/components/onboarding/onboarding-layout';
import OnboardingButtons from '@/app/components/onboarding/onboarding-buttons';
import PricingCard from '@/app/components/onboarding/onboarding-pricing-card';

const packs = [
  {
    id: "infiltration",
    name: "Infiltration",
    price: "2,500",
    features: ["500 Leads / mois", "Export CRM Direct", "Support Standard"],
    popular: false
  },
  {
    id: "domination",
    name: "Domination",
    price: "7,500",
    features: ["2,500 Leads / mois", "IA Prédictive", "Priorité Flux"],
    popular: true
  },
  {
    id: "souverainete",
    name: "Souveraineté",
    price: "Custom",
    features: ["Volume Illimité", "Sécurité Militaire", "Expert Dédié"],
    popular: false
  }
];

export default function OnboardingStep5() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>("domination");

  const handleNext = () => {
    // 1. On récupère la data actuelle et on injecte le plan sélectionné
    const existingData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
    localStorage.setItem('onboarding_data', JSON.stringify({ ...existingData, plan: selectedPlan }));
    
    // 2. On envoie vers le terminal de paiement
    router.push('/onboarding/payment'); 
  };

  return (
    <OnboardingLayout step={5} progress={80}>
      <div className="space-y-4">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Stratégie <span className="text-zinc-800">d'attaque_</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic">
          Choisissez la puissance de frappe pour vos opérations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full py-4">
        {packs.map((pack) => (
          <PricingCard
            key={pack.id}
            pack={pack}
            isSelected={selectedPlan === pack.id}
            onSelect={() => setSelectedPlan(pack.id)}
          />
        ))}
      </div>

      <OnboardingButtons 
        onNext={handleNext} 
        onBack={() => router.back()} 
      />
    </OnboardingLayout>
  );
}