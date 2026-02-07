"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Power } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "./AuthModal";

// Settings a été retiré d'ici
const dashboardItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/inbound', label: 'Inbound' }, 
  { href: '/dashboard/credits', label: 'Credits' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const checkAuth = () => {
      const auth = localStorage.getItem("is_authenticated");
      setIsLoggedIn(auth === "true");
    };

    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleFullLogout = () => {
    localStorage.removeItem("is_authenticated");
    window.dispatchEvent(new Event("auth-change"));
    setIsProfileOpen(false);
    router.push("/");
  };

  const handleExitDashboard = () => {
    setIsProfileOpen(false);
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed top-0 inset-x-0 z-100 transition-all duration-500 px-6 ${isScrolled ? "py-4" : "py-8"}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`relative flex items-center justify-between px-6 py-2 rounded-full border transition-all duration-500 ${
            isScrolled || isDashboard ? "bg-[#111111]/90 border-white/10 backdrop-blur-xl shadow-2xl" : "bg-transparent border-transparent"
          }`}>
          
          <Link href="/" className="flex items-center group cursor-pointer">
            <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <img src="/assets/logo.png" alt="Logo" className="w-10 h-10 object-contain brightness-110" />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {!isDashboard ? (
              <>
                <Link href="/#tech" className="text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-colors tracking-widest italic">
                  Technologie
                </Link>
                <Link href="/network" className={`text-[10px] font-black uppercase tracking-widest transition-colors italic ${isActive('/network') ? 'text-purple-400' : 'text-zinc-500 hover:text-white'}`}>
                  Réseau
                </Link>
                <Link href="/pricing" className={`text-[10px] font-black uppercase tracking-widest transition-colors italic ${isActive('/pricing') ? 'text-purple-400' : 'text-zinc-500 hover:text-white'}`}>
                  Pricing
                </Link>
              </>
            ) : (
              dashboardItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className={`py-2 transition-all duration-300 ${isActive(item.href) ? 'text-purple-500 italic' : 'text-white/20 hover:text-white'}`}>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em]">{item.label}</span>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full border transition-all duration-500 ${
                    isProfileOpen ? 'bg-white border-white' : 'bg-white/3 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className={`text-[9px] font-black uppercase italic tracking-tighter ${isProfileOpen ? 'text-black' : 'text-purple-500'}`}>
                    Eric Garcia
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-black transition-colors ${
                    isProfileOpen ? 'bg-black text-white' : 'bg-white/10 text-white'
                  }`}>
                    EG
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 25, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute top-full right-0 w-48 bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-1.5 backdrop-blur-2xl"
                    >
                      <div className="space-y-1">
                        <Link href={isDashboard ? "/dashboard/settings" : "/dashboard"} onClick={() => setIsProfileOpen(false)} className="block w-full">
                          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 text-[9px] font-black uppercase italic text-white/40 hover:text-white transition-all text-left pl-6">
                            {isDashboard ? "Settings" : "Dashboard"}
                          </button>
                        </Link>
                        
                        <div className="h-px bg-white/5 mx-2 my-1" />

                        {isDashboard ? (
                          <button 
                            onClick={handleExitDashboard}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-[9px] font-black uppercase italic transition-all pl-6"
                          >
                            <LogOut size={14} /> Exit
                          </button>
                        ) : (
                          <button 
                            onClick={handleFullLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white text-[9px] font-black uppercase italic transition-all pl-6 group"
                          >
                            <Power size={14} className="group-hover:scale-110 transition-transform" /> Logout
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <AuthModal 
                  trigger={<button className="text-[10px] font-black uppercase tracking-widest text-white italic cursor-pointer">Login</button>} 
                />
                <button 
                  onClick={() => router.push("/onboarding/step1")} 
                  className="px-6 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all italic shadow-xl"
                >
                  Démarrer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}