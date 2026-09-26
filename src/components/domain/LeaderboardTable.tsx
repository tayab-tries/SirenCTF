import React from "react";
import { Trophy, TrendingUp, TrendingDown, Minus, CheckCircle, Radio } from "lucide-react";
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
          <div className="flex h-6 w-6 items-center justify-center rounded bg-cyan-950 text-cyan-400 font-bold border border-cyan-500/40 text-xs">
            01
          </div>
        );
      case 2:
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-slate-200 font-bold border border-slate-700 text-xs">
            02
          </div>
        );
      case 3:
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-slate-300 font-bold border border-slate-800 text-xs">
            03
          </div>
        );
      default:
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-950 text-slate-500 font-mono text-xs">
            {rank < 10 ? `0${rank}` : rank}
          </div>
        );
    }
  };

  const getTrendIcon = (trend: LeaderboardEntry["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />;
      case "down":
        return <TrendingDown className="h-3.5 w-3.5 text-rose-400" aria-hidden="true" />;
      default:
        return <Minus className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />;
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-md shadow-2xl font-sans">
      {/* Sample Data Notice Banner */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
          <span>[NOTICE] DEMO DATA // PREVIEW STANDINGS</span>
        </span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest hidden sm:inline">
          ENGINE // SIREN-CTF &bull; STATUS // SAMPLE
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-slate-900/40 font-mono text-[11px] uppercase tracking-wider text-slate-400">
              <th scope="col" className="py-3 px-4 w-14 text-center">Rank</th>
              <th scope="col" className="py-3 px-4">Team / Handle</th>
              {!preview && <th scope="col" className="py-3 px-4 hidden md:table-cell">Affiliation</th>}
              <th scope="col" className="py-3 px-4 text-center">Solves</th>
              <th scope="col" className="py-3 px-4 text-right">Score</th>
              {!preview && <th scope="col" className="py-3 px-4 text-right hidden sm:table-cell">Last Solve</th>}
              <th scope="col" className="py-3 px-4 text-center w-12">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {entries.map((entry) => (
              <tr
                key={entry.teamId}
                className={`hover:bg-slate-900/60 transition-colors group font-mono text-xs ${
                  entry.rank === 1 ? "bg-cyan-950/20" : ""
                }`}
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
                      {entry.rank === 1 && (
                        <Trophy className="h-3.5 w-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
                      )}
                    </div>
                    {entry.affiliation && (
                      <span className="text-[10px] text-slate-500 md:hidden font-sans">
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
                    <CheckCircle className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                    <span>{entry.solvesCount}</span>
                  </span>
                </td>

                {/* Score */}
                <td className="py-3 px-4 text-right font-bold text-cyan-400 text-xs sm:text-sm">
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
