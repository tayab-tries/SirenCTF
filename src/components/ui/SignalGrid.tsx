import React from "react";

export const SignalGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-15" />
      
      {/* Radial vignette fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07090e_85%)]" />

      {/* Subtle signal wave lines */}
      <svg
        className="absolute top-0 right-0 w-full h-full opacity-10 text-cyan-500"
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
    <div className={`relative flex items-center justify-center select-none ${className}`} aria-hidden="true">
      {/* Localized subtle radial background glow */}
      <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Outer concentric radar/signal rings */}
      <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-slate-800 flex items-center justify-center">
        {/* Ring 2 */}
        <div className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border border-slate-800/90 flex items-center justify-center">
          {/* Ring 3 */}
          <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-cyan-500/20 flex items-center justify-center animate-pulse-slow">
            {/* Ring 4 */}
            <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full border border-cyan-400/30 flex items-center justify-center">
              {/* Central Signal Core */}
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
            </div>
          </div>
        </div>

        {/* Rotating subtle radar sweep */}
        <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full bg-radar-sweep animate-radar-spin opacity-25" />

        {/* Crosshair vector axes */}
        <div className="absolute h-full w-px bg-slate-800/80" />
        <div className="absolute w-full h-px bg-slate-800/80" />
        <div className="absolute h-[70%] w-px bg-cyan-500/20 stroke-dasharray" />
        <div className="absolute w-[70%] h-px bg-cyan-500/20 stroke-dasharray" />

        {/* Decorative Platform Telemetry Labels */}
        <div className="absolute top-12 left-16 flex items-center gap-1.5 font-mono text-[9px] text-cyan-400 bg-slate-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>PLATFORM: ONLINE</span>
        </div>

        <div className="absolute bottom-14 right-12 flex items-center gap-1.5 font-mono text-[9px] text-slate-400 bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>ENGINE: SIREN-CTF</span>
        </div>

        <div className="absolute top-20 right-10 flex items-center gap-1 font-mono text-[9px] text-slate-500 bg-slate-950/60 border border-slate-800 px-1.5 py-0.5 rounded">
          <span>FLAG_SCHEME: SRN&#123;...&#125;</span>
        </div>

        <div className="absolute bottom-20 left-10 flex items-center gap-1 font-mono text-[9px] text-slate-500 bg-slate-950/60 border border-slate-800 px-1.5 py-0.5 rounded">
          <span>MODE: JEOPARDY</span>
        </div>
      </div>
    </div>
  );
};

export const RadarWaveGraphic = HeroSignalVisual;
