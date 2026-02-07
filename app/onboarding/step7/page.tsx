"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import OnboardingLayout from '@/app/components/onboarding/onboarding-layout';
import OnboardingCard from '@/app/components/onboarding/onboarding-card';
import OnboardingButtons from '@/app/components/onboarding/onboarding-buttons';

export default function OnboardingStep7() {
  const router = useRouter();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
    setData(savedData);
  }, []);

  const summaryItems = [
    { label: "Entreprise", value: data.companyName },
    { label: "Site Web", value: data.website },
    { label: "Taille", value: data.companySize },
    { label: "Secteur", value: data.sector },
    { label: "Objectif", value: data.mainGoal },
    { label: "Volume Leads", value: data.leadVolume },
    { label: "CRM", value: data.hasCrm === 'yes' ? data.crmName : 'Non' },
    { label: "Rôle", value: data.role },
  ];

  return (
    <OnboardingLayout step={7} progress={87.5}>
      {/* TITRE */}
      <div className="space-y-4">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Confirmation <span className="text-zinc-800">des datas_</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic">
          Vérification finale avant initialisation du profil.
        </p>
      </div>

      <OnboardingCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          {summaryItems.map((item, index) => (
            <div key={index} className="space-y-1 group">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 group-hover:text-purple-500 transition-colors italic">
                {item.label}
              </p>
              <p className="text-[11px] font-bold text-white uppercase tracking-widest truncate">
                {item.value || "—"}
              </p>
              {/* v4 FIX: h-[1px] -> h-px */}
              <div className="h-px w-full bg-white/5 group-hover:bg-purple-500/30 transition-colors" />
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex items-center gap-4 p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
          <CheckCircle2 size={18} className="text-purple-500 shrink-0" />
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
            Données vérifiées. Vous pourrez modifier ces paramètres ultérieurement dans votre console de gestion.
          </p>
        </div>
      </OnboardingCard>

      <OnboardingButtons 
        onNext={() => router.push('/onboarding/step8')} 
        onBack={() => router.back()} 
      />
    </OnboardingLayout>
  );
}