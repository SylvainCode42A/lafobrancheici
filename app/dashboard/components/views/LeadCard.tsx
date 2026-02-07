import { motion } from "framer-motion";
import { Send, Linkedin } from "lucide-react";

interface LeadCardProps {
  lead: any;
  qual: { label: string; class: string };
}

export default function LeadCard({ lead, qual }: LeadCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      /* On garde le bg-white/2 avec un backdrop-blur pour l'unité visuelle */
      className="group bg-white/2 backdrop-blur-md border border-white/5 p-7 rounded-[2.5rem] hover:border-white/15 transition-all duration-500 shadow-2xl relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-xl font-black italic text-purple-500 group-hover:border-purple-500/30 transition-colors">
            {lead.company.substring(0, 1)}
          </div>
          <div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white leading-none group-hover:text-purple-400 transition-colors truncate max-w-40">
              {lead.company}
            </h3>
            <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-2">
              {lead.location || "Global_Node"}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[8px] font-black border transition-all ${qual.class}`}>
          {qual.label}
        </span>
      </div>

      {/* MODIFICATION : bg-black/40 supprimé pour bg-white/2 pour la transparence totale */}
      <div className="grid grid-cols-3 gap-2 mb-8 bg-white/2 p-5 rounded-2xl border border-white/5">
        <div className="text-center">
          <span className="block text-[7px] text-white/20 uppercase font-black mb-1">Visits</span>
          <span className="font-black italic text-base text-white">{lead.visits}</span>
        </div>
        <div className="text-center border-l border-white/5">
          <span className="block text-[7px] text-white/20 uppercase font-black mb-1">Contacts</span>
          <span className="font-black italic text-base text-purple-500">{lead.contactsCount}</span>
        </div>
        <div className="text-center border-l border-white/5">
          <span className="block text-[7px] text-white/20 uppercase font-black mb-1">Last</span>
          <span className="font-black italic text-[10px] text-white/60">
            {new Date(lead.last_visit).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <a href={`mailto:${lead.email}`} className="flex-1 flex justify-center items-center gap-2 py-4 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all">
          <Send size={12} /> Contact_Node
        </a>
        <a href={`https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(lead.company)}`} target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-purple-500/50 hover:text-purple-500 transition-all">
          <Linkedin size={14} />
        </a>
      </div>
    </motion.div>
  );
}