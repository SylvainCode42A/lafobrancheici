"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingLayout from '@/app/components/onboarding/onboarding-layout';
import OnboardingCard from '@/app/components/onboarding/onboarding-card';
import OnboardingButtons from '@/app/components/onboarding/onboarding-buttons';
import OnboardingInput from '@/app/components/onboarding/onboarding-input';
import OnboardingSelect from '@/app/components/onboarding/onboarding-select';

export default function OnboardingStep4() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    mainGoal: "",
    leadVolume: "",
    hasCrm: "",
    crmName: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const isComplete = formData.mainGoal && formData.leadVolume && formData.hasCrm;

  const handleNext = () => {
    if (isComplete) {
      const existingData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
      localStorage.setItem('onboarding_data', JSON.stringify({ ...existingData, ...formData }));
      router.push('/onboarding/step5'); 
    }
  };

  return (
    <OnboardingLayout step={4} progress={85}>
      <div className="space-y-4">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Objectifs <span className="text-zinc-800">& Usages_</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic">
          Optimisation des paramètres de campagne.
        </p>
      </div>

      <OnboardingCard>
        <div className="space-y-6">
          <OnboardingInput 
            label="01. Objectif principal" 
            id="mainGoal" 
            placeholder="Ex: Augmenter les rendez-vous"
            onChange={handleChange}
          />
          
          <OnboardingInput 
            label="02. Volume de leads mensuel souhaité" 
            id="leadVolume" 
            placeholder="Ex: 50 - 100"
            onChange={handleChange}
          />

          <OnboardingSelect 
            label="03. Infrastructure existante" 
            id="hasCrm" 
            onChange={handleChange}
          >
            <option value="" className="bg-[#020202]">Utilisez-vous déjà un CRM ?</option>
            <option value="yes" className="bg-[#020202]">Oui, système actif</option>
            <option value="no" className="bg-[#020202]">Non, aucun pour le moment</option>
          </OnboardingSelect>

          <AnimatePresence>
            {formData.hasCrm === 'yes' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <OnboardingInput 
                  label="Nom du CRM" 
                  id="crmName" 
                  placeholder="Ex: HubSpot, Salesforce..."
                  onChange={handleChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </OnboardingCard>

      <OnboardingButtons 
        onNext={handleNext} 
        onBack={() => router.back()} 
        disabled={!isComplete} 
      />
    </OnboardingLayout>
  );
}