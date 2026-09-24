import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, icon }) => {
  return (
    <div className="relative rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 transition-colors hover:border-cyan-500/40 font-sans">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400 font-medium">
          {label}
        </span>
        {icon && <div className="text-cyan-400" aria-hidden="true">{icon}</div>}
      </div>

      <div className="mt-2 font-mono text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
        {value}
      </div>

      {subtext && (
        <p className="mt-1 text-xs text-slate-400 font-sans">
          {subtext}
        </p>
      )}
    </div>
  );
};
