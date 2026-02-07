"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, Lock, ChevronRight } from 'lucide-react';
import OnboardingLayout from '@/app/components/onboarding/onboarding-layout';

export default function PaymentPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
    setPlan(data.plan || "domination");
  }, []);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation du traitement de transaction
    // Redirection vers le Step 6 comme demandé
    router.push('/onboarding/step6');
  };

  return (
    <OnboardingLayout step={6} progress={90}>
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
          Secure_<span className="text-purple-500">Checkout</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic">
          Finalisation du protocole d'acquisition.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl">
        {/* FORMULAIRE DE PAIEMENT */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
              <CreditCard className="text-purple-500" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Méthode de Crédit</span>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Numéro de Carte</label>
                <input required type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-[10px] font-black tracking-widest focus:border-purple-500/50 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Expiration</label>
                  <input required type="text" placeholder="MM/YY" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-[10px] font-black tracking-widest focus:border-purple-500/50 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">CVC</label>
                  <input required type="text" placeholder="***" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-[10px] font-black tracking-widest focus:border-purple-500/50 outline-none transition-all" />
                </div>
              </div>

              <button type="submit" className="w-full mt-8 flex items-center justify-center gap-3 py-4 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all italic shadow-2xl group">
                Initialiser le flux de paiement
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center gap-6 text-zinc-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} />
              <span className="text-[8px] font-black uppercase tracking-widest">SSL_ENCRYPTED</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={12} />
              <span className="text-[8px] font-black uppercase tracking-widest">PCI_COMPLIANT</span>
            </div>
          </div>
        </div>

        {/* RÉCAPITULATIF COMMANDES */}
        <div className="lg:col-span-5">
          <div className="bg-purple-600/5 border border-purple-500/20 rounded-[2.5rem] p-8 sticky top-24">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 mb-8 italic">Récapitulatif_Ordre</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Pack_Selectionné</p>
                  <p className="text-2xl font-black italic uppercase text-white tracking-tighter">{plan || "DOMINATION"}</p>
                </div>
                <p className="text-lg font-black italic text-white/90">
                  {plan === "infiltration" ? "2,500€" : plan === "souverainete" ? "Custom" : "7,500€"}
                </p>
              </div>

              <div className="h-px bg-white/5 w-full" />

              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                  <span className="text-white/30">Taxe_Opérationnelle (0%)</span>
                  <span>0.00€</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-purple-500 italic">
                  <span>Total_Acquisition</span>
                  <span className="text-xl">
                    {plan === "infiltration" ? "2,500€" : plan === "souverainete" ? "Custom" : "7,500€"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="text-[8px] font-mono text-white/20 uppercase leading-relaxed tracking-tight">
                En procédant au paiement, vous acceptez les protocoles de service et l'activation immédiate de votre node d'extraction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}