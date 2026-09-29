import React from "react";
import Image from "next/image";

export const SignalGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-10" />
      
      {/* Subtle Crimson Atmospheric Glow as per visual specification */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(227,27,46,0.12),transparent_45%),radial-gradient(circle_at_20%_60%,rgba(112,9,20,0.15),transparent_50%),#050507]" 
      />

      {/* Subtle Red Vector Signal Wave Lines */}
      <svg
        className="absolute top-0 right-0 w-full h-full opacity-10 text-[#E31B2E]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1440 900"
      >
        <path
          d="M-100,200 Q300,50 700,250 T1500,150"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path
          d="M-100,400 Q400,250 800,450 T1600,300"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <path
          d="M-100,600 Q200,450 600,650 T1400,500"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export const HeroSignalVisual: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div 
      className={`relative flex items-center justify-center select-none w-full aspect-square max-w-[380px] sm:max-w-[460px] ${className}`} 
      aria-hidden="true"
    >
      {/* Deep Atmospheric Red Glow Behind Official Logo Centerpiece */}
      <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full bg-[#E31B2E]/20 blur-3xl pointer-events-none siren-glow-pulse" />

      {/* 3D Siren Signal Beacon Container */}
      <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] flex items-center justify-center siren-3d-beacon">
        
        {/* Outer 3D Crimson Energy Ring 1 */}
        <div 
          className="absolute inset-0 rounded-full border border-[#E31B2E]/30 siren-ring-spin" 
          style={{ transform: "rotateX(68deg) rotateY(-18deg)" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#FF3347] shadow-[0_0_12px_#FF3347]" />
        </div>

        {/* Outer 3D Energy Ring 2 */}
        <div 
          className="absolute inset-5 sm:inset-7 rounded-full border border-[#C1121F]/40 siren-ring-spin" 
          style={{ transform: "rotateX(-58deg) rotateY(32deg)", animationDirection: "reverse", animationDuration: "18s" }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#E31B2E] shadow-[0_0_10px_#E31B2E]" />
        </div>

        {/* Main 3D Metallic/Glass Circular Frame holding the Official SirenCTF Logo PNG with Rounded Borders */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center rounded-full bg-[#050507] border border-red-900/60 shadow-[0_0_40px_rgba(112,9,20,0.7)] backdrop-blur-md overflow-hidden p-2 group transition-all hover:border-red-500/80">
          {/* Subtle Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050507]/80 via-transparent to-[#FF3347]/10 pointer-events-none rounded-full" />

          {/* Official SirenCTF Logo Image with Rounded Borders */}
          <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden">
            <Image
              src="/siren-logo.png"
              alt="SirenCTF Official Brand Logo"
              width={256}
              height={256}
              className="w-full h-full object-cover rounded-full filter drop-shadow-[0_0_20px_rgba(227,27,46,0.6)]"
              priority
            />
          </div>

          {/* Geometric Axis Lines */}
          <div className="absolute w-full h-[1px] bg-[#E31B2E]/20 pointer-events-none" />
          <div className="absolute h-full w-[1px] bg-[#E31B2E]/20 pointer-events-none" />
        </div>

        {/* Floating Signal Particles */}
        <div className="absolute top-4 right-8 w-1.5 h-1.5 rounded-full bg-[#FF3347] shadow-[0_0_8px_#FF3347]" />
        <div className="absolute bottom-6 left-10 w-1.5 h-1.5 rounded-full bg-[#E31B2E] shadow-[0_0_6px_#E31B2E]" />

        {/* Single Sleek Technical Label */}
        <div className="absolute -bottom-8 flex items-center gap-2 font-mono text-[9px] text-zinc-400 bg-[#0d0d11]/90 border border-zinc-800 px-3.5 py-1 rounded-full shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E31B2E] animate-pulse" />
          <span className="tracking-widest uppercase text-zinc-300">SIREN SIGNAL // EMBLEM</span>
        </div>
      </div>
    </div>
  );
};

export const RadarWaveGraphic = HeroSignalVisual;
