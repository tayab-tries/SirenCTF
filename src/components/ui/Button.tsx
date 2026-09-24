import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 font-mono text-xs tracking-wide disabled:opacity-50 disabled:pointer-events-none select-none";

  const variants = {
    primary:
      "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold border border-cyan-400/80 active:bg-cyan-600",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/80 active:bg-slate-850",
    outline:
      "bg-transparent hover:bg-slate-900/80 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/50 active:bg-slate-900",
    ghost:
      "bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent active:bg-slate-800",
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white border border-rose-500 active:bg-rose-700",
  };

  const sizes = {
    sm: "h-8 px-3 text-[11px] gap-1.5",
    md: "h-10 px-4 text-xs gap-2",
    lg: "h-12 px-6 text-sm gap-2.5",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0" aria-hidden="true">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
