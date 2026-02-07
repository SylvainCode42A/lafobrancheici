export default function OnboardingSummaryItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1 group cursor-default">
      {/* Label avec tracking v4 et transition fluide */}
      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-purple-500 transition-colors duration-300 italic">
        {label}
      </p>
      
      {/* Valeur avec mise en avant au survol */}
      <p className="text-[11px] font-bold text-white uppercase tracking-widest truncate group-hover:translate-x-1 transition-transform duration-500">
        {value || "—"}
      </p>
      
      {/* Séparateur corrigé : w-full h-px au lieu de h-[1px] */}
      <div className="h-px w-full bg-white/5 group-hover:bg-purple-500/30 transition-colors duration-500" />
    </div>
  );
}