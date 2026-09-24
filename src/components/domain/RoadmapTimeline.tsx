import React from "react";
import { CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import { RoadmapPhase } from "@/lib/types";

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ phases }) => {
  return (
    <div className="relative space-y-8 font-sans">
      {/* Timeline Bar */}
      <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-800 hidden sm:block" />

      {phases.map((phase) => {
        const isCurrent = phase.status === "CURRENT";
        const isPlanned = phase.status === "PLANNED";

        return (
          <div
            key={phase.phase}
            className={`relative flex flex-col sm:flex-row gap-6 p-6 rounded-xl border transition-all ${
              isCurrent
                ? "bg-slate-900/90 border-cyan-500/50 shadow-glow-cyan"
                : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
            }`}
          >
            {/* Phase Node Indicator */}
            <div className="flex items-center gap-3 sm:block shrink-0">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl font-mono font-bold text-sm border ${
                  isCurrent
                    ? "bg-cyan-950 text-cyan-400 border-cyan-500 shadow-glow-cyan"
                    : isPlanned
                    ? "bg-slate-900 text-slate-300 border-slate-700"
                    : "bg-slate-950 text-slate-500 border-slate-800"
                }`}
              >
                {phase.phase}
              </div>
              <div className="sm:hidden font-mono text-xs font-semibold uppercase tracking-wider">
                {phase.status === "CURRENT" ? (
                  <span className="text-cyan-400">Current Sprint</span>
                ) : (
                  <span className="text-slate-400">{phase.status}</span>
                )}
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  {phase.title}
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                      <Sparkles className="h-3 w-3" /> ACTIVE VERSION
                    </span>
                  )}
                </h3>

                <span className="hidden sm:inline-block font-mono text-xs text-slate-400 uppercase tracking-widest">
                  {phase.status}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {phase.description}
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                  Key Capabilities:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                  {phase.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 mt-0.5 ${
                          isCurrent ? "text-cyan-400" : "text-slate-500"
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
