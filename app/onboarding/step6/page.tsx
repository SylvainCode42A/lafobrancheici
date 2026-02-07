"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import OnboardingLayout from '@/app/components/onboarding/onboarding-layout';
import OnboardingCard from '@/app/components/onboarding/onboarding-card';
import OnboardingButtons from '@/app/components/onboarding/onboarding-buttons';
import OnboardingTerminal from '@/app/components/onboarding/onboarding-terminal';

export default function OnboardingStep6() {
  const router = useRouter();

  const scriptCode = `<script>
(function(){
  fetch("https://api.leadsight.io/api/tracking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "ls_live_ABC123"
    }
  }).catch(() => {});
})();
</script>`;

  return (
    <OnboardingLayout step={6} progress={95}>
      <div className="space-y-4">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Installation <span className="text-zinc-800">(activation)_</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic">
          Injectez le protocole de tracking dans votre infrastructure.
        </p>
      </div>

      <OnboardingCard>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white italic">
              05. Intégration du script maître
            </p>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed">
              Copiez et collez ce fragment avant la balise fermante <code className="text-purple-500 font-black">{"</head>"}</code>.
            </p>
          </div>

          <OnboardingTerminal code={scriptCode} />

          <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-4 flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
             <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
               En attente du premier signal entrant...
             </p>
          </div>
        </div>
      </OnboardingCard>

      <OnboardingButtons 
        onNext={() => router.push('/onboarding/step7')} 
        onBack={() => router.back()} 
      />
    </OnboardingLayout>
  );
}