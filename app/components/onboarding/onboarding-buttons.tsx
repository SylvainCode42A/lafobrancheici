"use client";
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack?: () => void;
  disabled?: boolean;
}

export default function OnboardingButtons({ onNext, onBack, disabled }: Props) {
  return (
    <div className="w-full flex justify-between items-center mt-8">
      {onBack ? (
        <button onClick={onBack} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors cursor-pointer">
          <ChevronLeft size={14} /> Retour
        </button>
      ) : <div />}

      <button 
        disabled={disabled}
        onClick={onNext}
        className={`group relative h-12 px-8 rounded-2xl flex items-center gap-3 transition-all duration-500 cursor-pointer overflow-hidden
          ${disabled 
            ? "bg-white/5 border border-white/5 opacity-20 grayscale cursor-not-allowed" 
            : "bg-white border border-white hover:bg-purple-600 hover:border-purple-600 active:scale-95 shadow-xl hover:shadow-purple-500/20"
          }`}
      >
        <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${disabled ? "text-white/40" : "text-black group-hover:text-white"}`}>
          Suivant
        </span>
        <ChevronRight size={14} className={`transition-all duration-500 ${disabled ? "text-white/20" : "text-black group-hover:text-white group-hover:translate-x-1"}`} />
      </button>
    </div>
  );
}