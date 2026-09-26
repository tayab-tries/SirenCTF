import React from "react";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";

export const WhySirenSection: React.FC = () => {
  const pillars = [
    {
      number: "01",
      title: "COMPETE",
      badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30",
      description:
        "Participate in practical cybersecurity competitions featuring custom-crafted challenges. Solve security problems under timed competition conditions as an individual competitor or balanced team.",
      subtext: "Jeopardy & Attack-Defense competition formats",
    },
    {
      number: "02",
      title: "LEARN",
      badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30",
      description:
        "Develop hands-on offensive and defensive technical skills across Web, Cryptography, Forensics, OSINT, Pwn, and Reverse Engineering. Learn through challenge solving, writeup reviews, and community discussion.",
      subtext: "Skill development through practical experimentation",
    },
    {
      number: "03",
      title: "PROVE",
      badgeColor: "border-amber-500/40 text-amber-400 bg-amber-950/30",
      description:
        "Build a verifiable record of competition placements and achievement milestones. Receive digital SirenCTF participation and achievement certificates backed by public cryptographic verification.",
      subtext: "Verifiable tournament participation & placement records*",
    },
  ];

  return (
    <section className="relative py-12 sm:py-16">
      <Container size="xl">
        <SectionHeading
          align="center"
          eyebrow="WHY SIRENCTF"
          title="COMPETE. LEARN. PROVE."
          description="SirenCTF is built around practical cybersecurity competitions where participants solve security challenges, develop hands-on skills, and build a verifiable record of competition achievements."
        />

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.number}
              className="group relative rounded-xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 transition-colors hover:border-cyan-500/40 font-sans flex flex-col justify-between"
            >
              {/* Subtle Step Progression Accent for Desktop */}
              {idx < 2 && (
                <div 
                  className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-700 font-mono text-xs font-bold"
                  aria-hidden="true"
                >
                  &rarr;
                </div>
              )}

              <div className="space-y-4">
                {/* Number & Pillar Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center justify-center h-10 w-10 rounded-md border font-mono text-sm font-bold ${pillar.badgeColor}`}
                  >
                    {pillar.number}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    PILLAR {pillar.number}
                  </span>
                </div>

                <h3 className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Subtext */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 font-mono text-[11px] text-slate-400">
                {pillar.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Precise Certificate Disclaimer Note */}
        <p className="mt-6 text-center text-xs text-slate-500 font-sans italic max-w-2xl mx-auto">
          *Note: SirenCTF certificates document specific tournament achievements and participation records. They are competition certificates, not professional cybersecurity industry certifications.
        </p>
      </Container>
    </section>
  );
};
