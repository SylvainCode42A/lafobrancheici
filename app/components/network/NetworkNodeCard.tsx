"use client";
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Counter } from './Counter';

interface NodeProps {
  node: {
    name: string;
    price: string;
    unit: string;
    features: string[];
    popular?: boolean;
    color: string;
  };
}

export function NetworkNodeCard({ node }: NodeProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, { stiffness: 150, damping: 20 }), [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(useSpring(x, { stiffness: 150, damping: 20 }), [-0.5, 0.5], ["-6deg", "6deg"]);
  
  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative group h-full"
    >
      {/* Remplacement bg-white/[0.02] par bg-white/2 et rounded-[2.5rem] par rounded-4xl (ou équivalent) */}
      <div className={`relative h-full bg-white/2 backdrop-blur-3xl border border-white/5 rounded-3xl p-9 transition-all duration-700 overflow-hidden ${node.color}`}>
        <div className="relative z-10">
          <div className="mb-10 text-left">
            {/* Remplacement min-h-[24px] par min-h-6 */}
            <div className="flex justify-between items-center mb-8 min-h-6">
              {node.popular ? (
                <span className="text-[8px] font-black px-3 py-1 bg-white text-black uppercase tracking-tighter rounded-full">Main_Traffic</span>
              ) : <div />}
            </div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-2">{node.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black italic tracking-tighter text-white">
                <Counter value={parseInt(node.price)} />{node.unit}
              </span>
              <span className="text-zinc-800 font-bold text-[9px] uppercase tracking-[0.2em]">/latency</span>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            {node.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-1 h-1 rounded-full ${node.popular ? 'bg-purple-500' : 'bg-zinc-800'}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-300 transition-colors">{f}</span>
              </div>
            ))}
          </div>

          {/* Remplacement bg-white/[0.03] par bg-white/3 */}
          <button className="group/btn relative w-full h-12 rounded-xl overflow-hidden bg-white/3 border border-white/10 transition-all duration-300 active:scale-95">
            <span className="relative z-20 text-[9px] font-black uppercase tracking-[0.3em] text-white group-hover/btn:text-black transition-colors duration-500">
              Ping_Node
            </span>
            {/* Remplacement translate-y-[102%] par translate-y-full (standard v4) */}
            <div className="absolute inset-0 z-10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 bg-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}