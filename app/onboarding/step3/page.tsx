"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import OnboardingLayout from '@/app/components/onboarding/onboarding-layout';
import OnboardingCard from '@/app/components/onboarding/onboarding-card';
import OnboardingButtons from '@/app/components/onboarding/onboarding-buttons';
import OnboardingInput from '@/app/components/onboarding/onboarding-input';

export default function OnboardingStep3() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const isComplete = Object.values(formData).every(val => val.length > 2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleNext = () => {
    if (isComplete) {
      const existingData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
      localStorage.setItem('onboarding_data', JSON.stringify({ ...existingData, ...formData }));
      router.push('/onboarding/step4'); 
    }
  };

  return (
    <OnboardingLayout step={3} progress={75}>
      <div className="space-y-4">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Finaliser votre <span className="text-zinc-800">profil_</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic">
          Accès sécurisés au terminal de commande.
        </p>
      </div>

      <OnboardingCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OnboardingInput 
            label="Prénom" id="firstName" placeholder="John" 
            onChange={handleChange} 
          />
          <OnboardingInput 
            label="Nom" id="lastName" placeholder="Doe" 
            onChange={handleChange} 
          />
        </div>

        <OnboardingInput 
          label="Email Professionnel" id="email" type="email" placeholder="john@leadsight.ai" 
          onChange={handleChange} 
        />

        <OnboardingInput 
          label="Mot de passe" id="password" placeholder="••••••••"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          rightElement={
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="text-zinc-600 hover:text-purple-500 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
      </OnboardingCard>

      <OnboardingButtons 
        onNext={handleNext} 
        onBack={() => router.back()} 
        disabled={!isComplete} 
      />
    </OnboardingLayout>
  );
}