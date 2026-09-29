import React from "react";
import { CompetitionStatus } from "@/lib/types";

interface BadgeProps {
  children?: React.ReactNode;
  variant?: "cyan" | "emerald" | "amber" | "rose" | "slate" | "purple" | "teal" | "red";
  status?: CompetitionStatus;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "slate",
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
      case "REGISTRATION_OPEN":
        resolvedVariant = "amber";
        label = label || "REGISTRATION OPEN";
        break;
      case "ANNOUNCED":
        resolvedVariant = "red";
        label = label || "ANNOUNCED";
        break;
      case "DRAFT":
        resolvedVariant = "slate";
        label = label || "DRAFT";
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
    red: "border-red-900/60 text-red-400 bg-red-950/40",
    cyan: "border-zinc-800 text-zinc-300 bg-zinc-900/80",
    emerald: "border-emerald-900/60 text-emerald-400 bg-emerald-950/40",
    amber: "border-amber-900/60 text-amber-400 bg-amber-950/40",
    rose: "border-rose-900/60 text-rose-400 bg-rose-950/40",
    purple: "border-purple-900/60 text-purple-400 bg-purple-950/40",
    teal: "border-teal-900/60 text-teal-400 bg-teal-950/40",
    slate: "border-zinc-800 text-zinc-300 bg-zinc-900/80",
  };

  const dotColors = {
    red: "bg-red-500 animate-pulse",
    cyan: "bg-zinc-400",
    emerald: "bg-emerald-400 animate-pulse",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
    purple: "bg-purple-400",
    teal: "bg-teal-400",
    slate: "bg-zinc-500",
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
