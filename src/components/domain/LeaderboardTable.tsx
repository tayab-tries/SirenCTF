import React from "react";
import Link from "next/link";
import { Trophy, TrendingUp, TrendingDown, Minus, CheckCircle, Flame } from "lucide-react";
import { LeaderboardEntry } from "@/lib/types";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  preview?: boolean;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  preview = false,
}) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40">
            01
          </div>
        );
      case 2:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-300/20 text-slate-200 font-bold border border-slate-300/40">
            02
          </div>
        );
      case 3:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-800/20 text-amber-500 font-bold border border-amber-800/40">
            03
          </div>
        );
      default:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-slate-400 font-mono text-xs">
            {rank < 10 ? `0${rank}` : rank}
          </div>
        );
    }
  };

  const getTrendIcon = (trend: LeaderboardEntry["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />;
      case "down":
        return <TrendingDown className="h-3.5 w-3.5 text-rose-400" />;
      default:
        return <Minus className="h-3.5 w-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80 backdrop-blur-md shadow-2xl font-sans">
      {/* Mock Data Banner */}
      <div className="bg-cyan-950/40 border-b border-cyan-500/30 px-4 py-2 text-xs font-mono text-cyan-300 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>[SYSTEM NOTICE] Demonstrative Leaderboard Architecture (Mock Competition Standings)</span>
        </span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest hidden sm:inline">
          Format: CTFd / SirenCTF Engine
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/60 font-mono text-[11px] uppercase tracking-wider text-slate-400">
              <th scope="col" className="py-3.5 px-4 w-16 text-center">Rank</th>
              <th scope="col" className="py-3.5 px-4">Team / Handle</th>
              {!preview && <th scope="col" className="py-3.5 px-4 hidden md:table-cell">Affiliation</th>}
              <th scope="col" className="py-3.5 px-4 text-center">Solves</th>
              <th scope="col" className="py-3.5 px-4 text-right">Score</th>
              {!preview && <th scope="col" className="py-3.5 px-4 text-right hidden sm:table-cell">Last Solve</th>}
              <th scope="col" className="py-3.5 px-4 text-center w-12">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {entries.map((entry) => (
              <tr
                key={entry.teamId}
                className="hover:bg-slate-900/60 transition-colors group font-mono text-xs"
              >
                {/* Rank */}
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center">{getRankBadge(entry.rank)}</div>
                </td>

                {/* Team Name */}
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {entry.teamName}
                      </span>
                      {entry.rank <= 3 && (
                        <Trophy className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      )}
                    </div>
                    {entry.affiliation && (
                      <span className="text-[10px] text-slate-400 md:hidden font-sans">
                        {entry.affiliation}
                      </span>
                    )}
                  </div>
                </td>

                {/* Affiliation */}
                {!preview && (
                  <td className="py-3 px-4 text-slate-400 hidden md:table-cell font-sans text-xs">
                    {entry.affiliation || "Independent"}
                  </td>
                )}

                {/* Solves */}
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    <CheckCircle className="h-3 w-3 text-emerald-400" />
                    {entry.solvesCount}
                  </span>
                </td>

                {/* Score */}
                <td className="py-3 px-4 text-right font-bold text-cyan-400 text-sm">
                  {entry.score.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">pts</span>
                </td>

                {/* Last Solve */}
                {!preview && (
                  <td className="py-3 px-4 text-right text-slate-400 hidden sm:table-cell text-[11px]">
                    {entry.lastSolveTime}
                  </td>
                )}

                {/* Trend */}
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center">{getTrendIcon(entry.trend)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
