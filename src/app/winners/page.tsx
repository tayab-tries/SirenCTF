import React from "react";
import { Metadata } from "next";
import { Trophy, Award, Calendar, Users, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getWinners } from "@/lib/api/winners";

export const metadata: Metadata = {
  title: "Wall of Fame & Winners Archive | SirenCTF",
  description: "Official hall of fame honoring champions, top 3 teams, and milestone placement holders from SirenCTF tournaments.",
};

export default async function WinnersPage() {
  const winnerArchives = await getWinners();

  return (
    <div className="py-12 sm:py-16 space-y-12 font-sans">
      <Container size="xl">
        <SectionHeading
          eyebrow="Hall of Fame"
          title="Tournament Champions &amp; Winners"
          description="Honoring top podium finishers and milestone placement holders across past SirenCTF cybersecurity competitions."
        />

        <div className="space-y-12">
          {winnerArchives.map((archive, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 backdrop-blur-xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-widest block">
                    {archive.date} Tournament
                  </span>
                  <h2 className="text-2xl font-bold text-white font-sans">
                    {archive.competitionName}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold">
                    Official Champions Archive
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 font-sans italic border-l-2 border-cyan-500 pl-3">
                {archive.highlight}
              </p>

              {/* Podium Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {archive.topTeams.map((team) => (
                  <div
                    key={team.rank}
                    className={`rounded-xl border p-6 space-y-4 font-mono text-xs relative ${
                      team.rank === 1
                        ? "bg-amber-950/20 border-amber-500/50 shadow-glow-amber"
                        : team.rank === 2
                        ? "bg-slate-900 border-slate-400/40"
                        : "bg-slate-900 border-amber-800/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-extrabold text-white flex items-center gap-2">
                        <Trophy className={`h-5 w-5 ${team.rank === 1 ? "text-amber-400" : team.rank === 2 ? "text-slate-300" : "text-amber-600"}`} />
                        #{team.rank} Place
                      </span>
                      <span className="text-amber-400 font-bold">{team.prize}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-base font-bold text-slate-100 font-sans">{team.teamName}</div>
                      <div className="text-cyan-400 text-[11px]">{team.score.toLocaleString()} Points</div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] text-slate-500 uppercase block mb-1">Roster:</span>
                      <div className="flex flex-wrap gap-1">
                        {team.members.map((member, mIdx) => (
                          <span key={mIdx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[11px]">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
