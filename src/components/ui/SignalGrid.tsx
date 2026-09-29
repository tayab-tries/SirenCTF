import React from "react";
import Image from "next/image";

export const SignalGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-10" />
      
      {/* Smooth Radial Glow Atmosphere blending softly into #050507 */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(227,27,46,0.14),transparent_45%),radial-gradient(circle_at_20%_60%,rgba(112,9,20,0.15),transparent_50%),#050507]" 
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
      className={`relative flex items-center justify-center select-none w-full aspect-square max-w-[220px] sm:max-w-[380px] md:max-w-[500px] ${className}`} 
      aria-hidden="true"
    >
      {/* Smooth Soft Radial Glow Fade Behind Centerpiece - Blends softly into #050507 background without hard border edges */}
      <div className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] md:w-[440px] md:h-[440px] rounded-full bg-[radial-gradient(circle_at_center,rgba(227,27,46,0.28)_0%,rgba(112,9,20,0.12)_45%,transparent_70%)] blur-2xl pointer-events-none siren-glow-pulse" />

      {/* 3D Siren Signal Beacon Container */}
      <div className="relative w-[190px] h-[190px] sm:w-[300px] sm:h-[300px] md:w-[420px] md:h-[420px] flex items-center justify-center siren-3d-beacon">
        
        {/* Outer 3D Crimson Energy Ring 1 */}
        <div 
          className="absolute inset-0 rounded-full border border-[#E31B2E]/35 siren-ring-spin" 
          style={{ transform: "rotateX(68deg) rotateY(-18deg)" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#FF3347] shadow-[0_0_15px_#FF3347]" />
        </div>

        {/* Outer 3D Energy Ring 2 */}
        <div 
          className="absolute inset-4 sm:inset-8 rounded-full border border-[#C1121F]/45 siren-ring-spin" 
          style={{ transform: "rotateX(-58deg) rotateY(32deg)", animationDirection: "reverse", animationDuration: "18s" }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#E31B2E] shadow-[0_0_12px_#E31B2E]" />
        </div>

        {/* Main Official SirenCTF Logo Container - Soft radial edge transition blending into #050507 */}
        <div className="relative w-36 h-36 sm:w-60 sm:h-60 md:w-80 md:h-80 flex items-center justify-center rounded-full bg-[#050507] shadow-[0_0_50px_rgba(227,27,46,0.5)] overflow-hidden p-1 group transition-transform duration-300 hover:scale-105">
          {/* Official SirenCTF Logo Image (Source of Truth Asset) */}
          <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden">
            <Image
              src="/siren-logo.png"
              alt="SirenCTF Official Hero Logo"
              width={340}
              height={340}
              className="w-full h-full object-cover rounded-full filter drop-shadow-[0_0_30px_rgba(227,27,46,0.85)]"
              priority
            />
          </div>
        </div>

        {/* Floating Crimson Signal Particles */}
        <div className="absolute top-2 right-6 w-2 h-2 rounded-full bg-[#FF3347] shadow-[0_0_10px_#FF3347]" />
        <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-[#E31B2E] shadow-[0_0_8px_#E31B2E]" />
      </div>
    </div>
  );
};

export const RadarWaveGraphic = HeroSignalVisual;
