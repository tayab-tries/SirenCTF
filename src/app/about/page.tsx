import React from "react";
import { Metadata } from "next";
import { Shield, Radio, Terminal, Cpu, Layers, Award, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoadmapTimeline } from "@/components/domain/RoadmapTimeline";
import { getRoadmap } from "@/lib/api/winners";

export const metadata: Metadata = {
  title: "About SirenCTF & Evolution Roadmap | SirenCTF",
  description: "Learn about SirenCTF's mission, organizational principles, and future evolution into a CTF-as-a-Service platform.",
};

export default async function AboutPage() {
  const roadmap = await getRoadmap();

  return (
    <div className="py-12 sm:py-16 space-y-16 font-sans">
      <Container size="xl">
        <SectionHeading
          eyebrow="Organization & Platform"
          title="About SirenCTF"
          description="SirenCTF is a cybersecurity competition and community organization evolving into a multi-tenant CTF-as-a-Service platform."
        />

        {/* Mission Statement Banner */}
        <div className="rounded-2xl border border-zinc-800 bg-[#0d0d11] p-8 sm:p-12 backdrop-blur-xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-950 text-red-400 border border-red-900/60 shadow-[0_0_12px_rgba(227,27,46,0.3)]">
              <Shield className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold">
              MISSION STATEMENT
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display uppercase">
            Advancing Technical Cybersecurity Through Rigorous Competition
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl font-sans">
            SirenCTF was founded with a singular purpose: to run serious cybersecurity competitions that challenge security practitioners with realistic, hands-on vulnerability scenarios and build an inclusive global community around them.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80 font-mono text-xs text-zinc-400">
            <div>
              <span className="text-red-400 font-bold block uppercase">Brand Name</span>
              <span className="text-zinc-200">SirenCTF / Siren Cybersecurity</span>
            </div>
            <div>
              <span className="text-red-400 font-bold block uppercase">Platform Core</span>
              <span className="text-zinc-200">sirenctf.org</span>
            </div>
            <div>
              <span className="text-red-400 font-bold block uppercase">Tournament Series</span>
              <span className="text-zinc-200">SirenCTF #01, SirenCTF #00 Beta</span>
            </div>
          </div>
        </div>

        {/* Technical Architecture & SaaS Evolution Roadmap */}
        <div className="space-y-8 pt-6">
          <SectionHeading
            eyebrow="Strategic Roadmap"
            title="Platform Architecture Evolution (V0 &rarr; V6)"
            description="We are building a clean, decoupled architectural foundation that begins with our branded public platform and evolves step-by-step into a multi-tenant CTF-as-a-Service cloud."
          />

          <RoadmapTimeline phases={roadmap} />
        </div>
      </Container>
    </div>
  );
}
