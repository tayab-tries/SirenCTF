import React from "react";
import { Trophy, TrendingUp, TrendingDown, Minus, CheckCircle } from "lucide-react";
import { LeaderboardEntry } from "@/lib/types";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  preview?: boolean;
  isLive?: boolean;
  source?: "ctfd" | "mock";
  lastUpdated?: string;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  preview = false,
  isLive = false,
  source = "mock",
}) => {
  const isRealLive = isLive || source === "ctfd";

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-red-950 text-[#FF3347] font-bold border border-red-900/60 text-xs">
            01
          </div>
        );
      case 2:
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#15151b] text-zinc-200 font-bold border border-zinc-700 text-xs">
            02
          </div>
        );
      case 3:
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#15151b] text-zinc-300 font-bold border border-zinc-800 text-xs">
            03
          </div>
        );
      default:
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#0d0d11] text-zinc-500 font-mono text-xs">
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
        return <Minus className="h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />;
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-800/90 bg-[#050507] backdrop-blur-md shadow-xl font-sans">
      {/* Telemetry Source Banner */}
      <div className={`px-4 py-2 text-[11px] font-mono flex flex-wrap items-center justify-between gap-2 ${
        isRealLive 
          ? "bg-red-950/30 border-b border-red-900/60 text-red-400" 
          : "bg-[#0d0d11] border-b border-zinc-800 text-zinc-400"
      }`}>
        <span className="flex items-center gap-2 font-bold">
          <span className={`h-1.5 w-1.5 rounded-full ${isRealLive ? "bg-red-500 animate-pulse" : "bg-zinc-500"}`} aria-hidden="true" />
          <span>{isRealLive ? "LIVE SCOREBOARD // OFFICIAL FEED" : "PREVIEW STANDINGS // DEMO DATA"}</span>
        </span>
        <span className={`text-[10px] uppercase tracking-widest hidden sm:inline ${isRealLive ? "text-red-400 font-semibold" : "text-zinc-500"}`}>
          {isRealLive ? "CTFD ENGINE SYNCED" : "SAMPLE DATA \u2022 PARTICIPANT PREVIEW"}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-[#0d0d11]/80 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              <th scope="col" className="py-3 px-4 w-14 text-center">Rank</th>
              <th scope="col" className="py-3 px-4">Team / Handle</th>
              {!preview && <th scope="col" className="py-3 px-4 hidden md:table-cell">Affiliation</th>}
              <th scope="col" className="py-3 px-4 text-center hidden sm:table-cell">Solves</th>
              <th scope="col" className="py-3 px-4 text-right">Score</th>
              {!preview && <th scope="col" className="py-3 px-4 text-right hidden sm:table-cell">Last Solve</th>}
              <th scope="col" className="py-3 px-4 text-center w-12 hidden sm:table-cell">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {entries.map((entry, idx) => (
              <tr
                key={entry.teamId}
                className={`hover:bg-[#15151b]/80 transition-colors group font-mono text-xs ${
                  entry.rank === 1 ? "bg-red-950/20" : ""
                } ${idx >= 5 ? "hidden sm:table-row" : ""}`}
              >
                {/* Rank */}
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center">{getRankBadge(entry.rank)}</div>
                </td>

                {/* Team Name */}
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-100 group-hover:text-[#FF3347] transition-colors">
                        {entry.teamName}
                      </span>
                      {entry.rank === 1 && (
                        <Trophy className="h-3.5 w-3.5 text-[#E31B2E] shrink-0" aria-hidden="true" />
                      )}
                    </div>
                    {entry.affiliation && (
                      <span className="text-[10px] text-zinc-500 md:hidden font-sans">
                        {entry.affiliation}
                      </span>
                    )}
                  </div>
                </td>

                {/* Affiliation */}
                {!preview && (
                  <td className="py-3 px-4 text-zinc-400 hidden md:table-cell font-sans text-xs">
                    {entry.affiliation || "Independent"}
                  </td>
                )}

                {/* Solves */}
                <td className="py-3 px-4 text-center hidden sm:table-cell">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0d0d11] text-zinc-300 border border-zinc-800">
                    <CheckCircle className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                    <span>{entry.solvesCount}</span>
                  </span>
                </td>

                {/* Score */}
                <td className="py-3 px-4 text-right font-bold text-red-400 text-xs sm:text-sm">
                  {entry.score.toLocaleString()} <span className="text-[10px] text-zinc-500 font-normal">pts</span>
                </td>

                {/* Last Solve */}
                {!preview && (
                  <td className="py-3 px-4 text-right text-zinc-400 hidden sm:table-cell text-[11px]">
                    {entry.lastSolveTime}
                  </td>
                )}

                {/* Trend */}
                <td className="py-3 px-4 text-center hidden sm:table-cell">
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
