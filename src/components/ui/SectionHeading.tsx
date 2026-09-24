import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) => {
  return (
    <div className={`mb-8 sm:mb-10 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-2">
          <span className="h-px w-6 bg-cyan-500/60 inline-block" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-100 font-sans">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          {description}
        </p>
      )}
    </div>
  );
};
