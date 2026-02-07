"use client";
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Loader2, Eye, EyeOff, Activity, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        setDisplayText(text.substring(0, i));
        i++;
        if (i > text.length) clearInterval(timer);
      }, 30);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <span>{displayText}</span>;
};

export function AuthModal({ trigger }: { trigger: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    const toastBase = "flex items-center gap-3 w-full font-mono text-[10px] uppercase tracking-[0.2em] bg-[#0A0A0A] border p-4 rounded-full shadow-2xl text-white";
    const toastId = toast.loading("INITIALIZING_CORE_HANDSHAKE...", {
      unstyled: true,
      className: `${toastBase} border-white/10`
    });
    
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("is_authenticated", "true");
      window.dispatchEvent(new Event("auth-change"));
      toast.dismiss(toastId);
      toast.success("ACCESS_GRANTED", {
        unstyled: true,
        duration: 2500,
        className: `${toastBase} border-purple-500/50 text-purple-400`
      });
      setTimeout(() => { window.location.href = "/dashboard"; }, 800);
    }, 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger} 
      </DialogTrigger>

      {/* Fix canonical class sm:max-w-100 */}
      <DialogContent className="sm:max-w-100 bg-[#070707]/98 border-none p-0 overflow-hidden rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] outline-none">
        
        {/* Fix canonical class animate-scan */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-scan" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-10 md:p-14 z-10"
        >
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

          <DialogHeader className="mb-12">
            <div className="flex justify-center mb-6">
               <ShieldAlert className="text-purple-500/50 animate-pulse" size={24} />
            </div>
            <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter text-white text-center">
              CORE_<span className="text-purple-500">GATEWAY</span>
            </DialogTitle>
            <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-[0.3em] text-center mt-4 h-4 italic">
              <TypewriterText text="Connexion au terminal sécurisé requise." delay={600} />
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="group space-y-2">
              <Label className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-4 group-focus-within:text-purple-400 transition-colors italic">Agent_ID</Label>
              <Input 
                placeholder="UID-XXXX-CORE" 
                className="bg-white/5 border-white/5 h-12 rounded-full text-white placeholder:text-zinc-800 focus:border-purple-500/30 px-6 transition-all duration-500 outline-none italic font-mono text-[10px]" 
              />
            </div>
            
            <div className="group space-y-2">
              <Label className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-4 group-focus-within:text-purple-400 transition-colors italic">Access_Cipher</Label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="bg-white/5 border-white/5 h-12 rounded-full text-white placeholder:text-zinc-800 focus:border-purple-500/30 px-6 transition-all duration-500 outline-none font-mono text-[10px]" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button 
              onClick={handleLogin} 
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-purple-600 text-black hover:text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 cursor-pointer italic mt-4 shadow-2xl active:scale-95 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 className="animate-spin w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    EXECUTE_UPLINK
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            <div className="flex flex-col items-center pt-6 opacity-30">
               <div className="h-px w-8 bg-white/10 mb-4" />
               <Activity className="text-white animate-pulse" size={14} />
            </div>
          </div>
        </motion.div>

        {/* Définition de l'animation pour que Tailwind la reconnaisse comme canonique */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scan {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(500px); opacity: 0; }
          }
          .animate-scan {
            animation: scan 4s linear infinite;
          }
        `}} />
      </DialogContent>
    </Dialog>
  );
}