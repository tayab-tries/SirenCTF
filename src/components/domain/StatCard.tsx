import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, icon }) => {
  return (
    <div className="relative rounded-xl border border-zinc-800/80 bg-[#15151b]/80 p-5 transition-colors hover:border-red-900/50 font-sans">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 font-medium">
          {label}
        </span>
        {icon && <div className="text-red-400" aria-hidden="true">{icon}</div>}
      </div>

      <div className="mt-2 font-mono text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
        {value}
      </div>

      {subtext && (
        <p className="mt-1 text-xs text-zinc-400 font-sans">
          {subtext}
        </p>
      )}
    </div>
  );
};
