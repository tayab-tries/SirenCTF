import React from "react";
import { Metadata } from "next";
import { Trophy } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeaderboardTable } from "@/components/domain/LeaderboardTable";
import { getLeaderboardWithMeta } from "@/lib/api/leaderboard";
import { getCompetitions } from "@/lib/api/competitions";

export const metadata: Metadata = {
  title: "Leaderboard & Rankings | SirenCTF",
  description: "Global team rankings, total solves, points breakdown, and competition standings.",
};

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardWithMeta();
  const competitions = await getCompetitions();

  return (
    <div className="py-12 sm:py-16 space-y-12 font-sans">
      <Container size="xl">
        <SectionHeading
          eyebrow="Global Standings"
          title="Competition Leaderboard"
          description="Official team rankings, solve counts, total score metrics, and category performance breakdown."
        />

        {/* Filter Toolbar */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-[#0d0d11] font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-zinc-300">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>Target Tournament:</span>
            <select className="bg-[#15151b] border border-zinc-800 text-zinc-100 px-3 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500">
              <option value="all">SirenCTF #00 Beta (Latest Completed)</option>
              {competitions.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="text-zinc-400 text-[11px] font-mono">
            Showing Top {leaderboardData.entries.length} Teams &bull; {leaderboardData.isLive ? "CTFd Live Sync" : "Sample Standings Data"}
          </div>
        </div>

        {/* Leaderboard Table */}
        <LeaderboardTable 
          entries={leaderboardData.entries} 
          preview={false} 
          isLive={leaderboardData.isLive}
          source={leaderboardData.source}
        />
      </Container>
    </div>
  );
}
