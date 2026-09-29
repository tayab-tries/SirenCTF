import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompetitionCard } from "@/components/domain/CompetitionCard";
import { getCompetitions } from "@/lib/api/competitions";

export const metadata: Metadata = {
  title: "Competitions Directory | SirenCTF",
  description: "Browse upcoming, active, and past SirenCTF cybersecurity competitions.",
};

export default async function CompetitionsPage() {
  const competitions = await getCompetitions();

  const upcoming = competitions.filter((c) => c.status === "ANNOUNCED" || c.status === "REGISTRATION_OPEN" || (c.status as string) === "UPCOMING");
  const live = competitions.filter((c) => c.status === "LIVE");
  const ended = competitions.filter((c) => c.status === "ENDED" || c.status === "ARCHIVED");

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="xl">
        <SectionHeading
          eyebrow="Tournament Directory"
          title="SirenCTF Competitions"
          description="Explore upcoming tournaments, live challenges, and past competition archives. Filtered by status and domain difficulty."
        />

        {/* Live Competitions (if any) */}
        {live.length > 0 && (
          <div className="space-y-6 mb-12">
            <h3 className="font-mono text-sm uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Live Active Competitions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {live.map((comp) => (
                <CompetitionCard key={comp.id} competition={comp} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Competitions */}
        <div className="space-y-6 mb-12">
          <h3 className="font-mono text-sm uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Upcoming Competitions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcoming.map((comp) => (
              <CompetitionCard key={comp.id} competition={comp} featured={comp.slug === "sirenctf-01"} />
            ))}
          </div>
        </div>

        {/* Past Competitions Archive */}
        <div className="space-y-6">
          <h3 className="font-mono text-sm uppercase tracking-widest text-slate-400 font-bold">
            Concluded Competitions Archive
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ended.map((comp) => (
              <CompetitionCard key={comp.id} competition={comp} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
