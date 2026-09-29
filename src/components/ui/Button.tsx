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
    "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507] font-mono text-xs tracking-wide disabled:opacity-50 disabled:pointer-events-none select-none";

  const variants = {
    primary:
      "bg-[#E31B2E] hover:bg-[#FF3347] text-[#F5F5F5] font-semibold border border-red-500/80 active:bg-[#C1121F] shadow-sm shadow-red-950/50",
    secondary:
      "bg-[#15151B] hover:bg-zinc-800 text-[#F5F5F5] border border-zinc-700/80 active:bg-zinc-900",
    outline:
      "bg-transparent hover:bg-[#15151B]/80 text-zinc-200 hover:text-white border border-zinc-700 hover:border-[#E31B2E]/60 active:bg-zinc-900",
    ghost:
      "bg-transparent hover:bg-zinc-800/60 text-zinc-300 hover:text-white border border-transparent active:bg-zinc-800",
    danger:
      "bg-rose-700 hover:bg-rose-600 text-white border border-rose-600 active:bg-rose-800",
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
