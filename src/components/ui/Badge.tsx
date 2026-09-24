import React from "react";
import { CompetitionStatus } from "@/lib/types";

interface BadgeProps {
  children?: React.ReactNode;
  variant?: "cyan" | "emerald" | "amber" | "rose" | "slate" | "purple" | "teal";
  status?: CompetitionStatus;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "cyan",
  status,
  size = "sm",
  className = "",
  dot = true,
}) => {
  let resolvedVariant = variant;
  let label = children;

  if (status) {
    switch (status) {
      case "LIVE":
        resolvedVariant = "emerald";
        label = label || "LIVE";
        break;
      case "UPCOMING":
        resolvedVariant = "cyan";
        label = label || "COMING SOON";
        break;
      case "ENDED":
        resolvedVariant = "slate";
        label = label || "ENDED";
        break;
      case "ARCHIVED":
        resolvedVariant = "slate";
        label = label || "ARCHIVED";
        break;
    }
  }

  const variantStyles = {
    cyan: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
    emerald: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
    amber: "border-amber-500/40 text-amber-400 bg-amber-950/30",
    rose: "border-rose-500/40 text-rose-400 bg-rose-950/30",
    purple: "border-purple-500/40 text-purple-400 bg-purple-950/30",
    teal: "border-teal-500/40 text-teal-400 bg-teal-950/30",
    slate: "border-slate-700/80 text-slate-400 bg-slate-900/60",
  };

  const dotColors = {
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400 animate-pulse",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
    purple: "bg-purple-400",
    teal: "bg-teal-400",
    slate: "bg-slate-500",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] font-mono tracking-wider",
    md: "px-2.5 py-1 text-[11px] font-mono tracking-wider",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border font-mono font-medium uppercase tracking-wider ${variantStyles[resolvedVariant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[resolvedVariant]}`}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
};
