import React from "react";
import Link from "next/link";
import { Calendar, Users, Trophy, Shield, Clock, ArrowRight, Zap } from "lucide-react";
import { Competition } from "@/lib/types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface CompetitionCardProps {
  competition: Competition;
  featured?: boolean;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({
  competition,
  featured = false,
}) => {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className={`relative rounded-xl border transition-all duration-200 overflow-hidden font-sans ${
        featured
          ? "bg-slate-900/90 border-cyan-500/50"
          : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
      }`}
    >
      {/* Top Accent Status Line */}
      <div
        className={`h-1 w-full ${
          competition.status === "LIVE"
            ? "bg-emerald-500"
            : competition.status === "UPCOMING"
            ? "bg-cyan-500"
            : "bg-slate-700"
        }`}
        aria-hidden="true"
      />

      <div className="p-6 sm:p-7">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Badge status={competition.status} size="md" />
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
              {competition.format}
            </span>
          </div>

          <span className="font-mono text-xs text-cyan-400 flex items-center gap-1 font-medium">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{competition.difficulty}</span>
          </span>
        </div>

        {/* Competition Name & Tagline */}
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
          <Link href={`/competitions/${competition.slug}`} className="hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm">
            {competition.name}
          </Link>
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-sans">
          {competition.tagline}
        </p>

        {/* Metadata Details Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 font-mono text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
              Duration
            </span>
            <span className="text-slate-200 flex items-center gap-1 font-medium">
              <Clock className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              <span>{competition.durationHours}h</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
              Team Size
            </span>
            <span className="text-slate-200 flex items-center gap-1 font-medium">
              <Users className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              <span>{competition.teamSize}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
              Prize Pool
            </span>
            <span className="text-amber-400 flex items-center gap-1 font-medium">
              <Trophy className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              <span>{competition.prizePool}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
              Start Date
            </span>
            <span className="text-slate-200 flex items-center gap-1 font-medium">
              <Calendar className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              <span>{formatDate(competition.startDate)}</span>
            </span>
          </div>
        </div>

        {/* Winner display if completed */}
        {competition.winner && (
          <div className="mt-4 p-3 rounded bg-slate-950/80 border border-slate-800 flex items-center justify-between font-mono text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              Winner:
            </span>
            <span className="font-bold text-slate-100 flex items-center gap-2">
              <span className="text-cyan-400">{competition.winner.teamName}</span>
              <span className="text-slate-400 text-[10px]">({competition.winner.score} pts)</span>
            </span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
            <Shield className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            <span>{competition.challengeCount} Challenges</span>
          </div>

          <Button
            href={`/competitions/${competition.slug}`}
            variant={competition.status === "UPCOMING" ? "primary" : "outline"}
            size="sm"
            icon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            {competition.status === "UPCOMING" ? "View Competition" : "Details & Standings"}
          </Button>
        </div>
      </div>
    </div>
  );
};
