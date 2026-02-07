"use client";
import { useEffect, useRef } from "react";

export default function NeuralProtocol() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const pointRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
          } else {
            entry.target.classList.remove("is-active");
          }
        });
      },
      { threshold: 0.6 }
    );

    stepsRef.current.forEach((step) => step && observer.observe(step));

    const onScroll = () => {
      if (!lineRef.current || !pointRef.current || !progressRef.current) return;
      const rect = lineRef.current.getBoundingClientRect();
      const center = window.innerHeight / 2;
      
      if (center >= rect.top && center <= rect.bottom) {
        const progress = (center - rect.top) / rect.height;
        const yPos = progress * rect.height;
        
        pointRef.current.style.opacity = "1";
        pointRef.current.style.transform = `translate(-50%, ${yPos}px)`;
        progressRef.current.style.height = `${yPos}px`;
      } else {
        pointRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const steps = [
    { 
      title: "Identification", 
      desc: "Capture immédiate de l'identité des visiteurs anonymes sur vos actifs numériques.",
      btnLabel: "Déployer_Le_Scan",
      code: "SCAN_ID_01"
    },
    { 
      title: "Qualification", 
      desc: "Filtrage haute performance des leads selon vos critères de rentabilité.",
      btnLabel: "Activer_Le_Filtre",
      code: "FLTR_AUTH_02"
    },
    { 
      title: "Conversion", 
      desc: "Livraison des opportunités prêtes à l'achat directement à vos équipes.",
      btnLabel: "Générer_Le_Flux",
      code: "FLUX_OUT_03"
    }
  ];

  return (
    <section className="relative py-48 bg-transparent text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        
        <div className="mb-44 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold text-zinc-500 tracking-[0.5em] uppercase mb-6">
            Workflow_Internal
          </span>
          <h2 className="text-6xl md:text-8xl font-black tracking-[-0.05em] uppercase italic leading-none">
            VOTRE <span className="text-zinc-800 italic">CROISSANCE.</span>
          </h2>
        </div>

        <div className="relative">
          {/* AXE CENTRAL */}
          <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/5" />
          
          {/* TRAÎNÉE VIOLETTE */}
          <div ref={progressRef} className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-linear-to-b from-purple-600 to-purple-400 transition-opacity duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

          {/* POINT LASER */}
          <div ref={pointRef} className="absolute left-1/2 top-0 z-30 opacity-0 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
             <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-500/20 animate-ping" />
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_white,0_0_20px_rgba(168,85,247,1)]" />
             </div>
          </div>

          <div className="relative flex flex-col gap-40">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { stepsRef.current[i] = el; }}
                className={`group relative w-full flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'} 
                           transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                           opacity-0 [&.is-active]:opacity-100 [&.is-active]:translate-y-0 translate-y-20`}
              >
                {/* CASE STYLE CREDITCARD / METRICS */}
                <div className="relative max-w-sm w-full">
                  <div className="relative p-10 bg-white/1 border border-white/5 rounded-[2.5rem] flex flex-col items-start text-left transition-all duration-700 hover:bg-white/3 hover:border-white/20 backdrop-blur-sm">
                    
                    {/* Header de case technique */}
                    <div className="flex items-center justify-between w-full mb-8 border-l-2 border-purple-500/50 pl-5">
                      <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.3em] italic">
                        Phase_{step.code}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-pulse" />
                    </div>

                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter italic leading-none text-white group-hover:text-purple-500 transition-colors duration-500">
                      {step.title}
                    </h3>
                    
                    <p className="text-zinc-600 text-[11px] leading-relaxed font-bold uppercase tracking-tight italic mb-10">
                      {step.desc}
                    </p>
                    
                    {/* BOUTON TECHNIQUE ÉPURÉ */}
                    <button className="w-full py-4 bg-white/2 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-black transition-all duration-500 cursor-pointer active:scale-95 italic">
                      {step.btnLabel}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}