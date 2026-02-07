import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  isPurple?: boolean;
}

export default function StatCard({ label, value, icon: Icon, isPurple }: StatCardProps) {
  return (
    <div className="bg-white/2 p-7 rounded-3xl border border-white/5 flex items-center justify-between shadow-2xl group hover:border-purple-500/20 transition-colors">
      <div>
        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-3xl font-black italic uppercase tracking-tighter ${isPurple ? 'text-purple-500' : 'text-white'}`}>
          {value}
        </p>
      </div>
      <Icon size={20} className="text-white/10 group-hover:text-purple-500/40 transition-colors" />
    </div>
  );
}