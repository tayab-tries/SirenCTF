import React from "react";
import Link from "next/link";
import { 
  Shield, 
  Trophy, 
  Award, 
  Users, 
  ArrowRight, 
  Radio, 
  Terminal, 
  CheckCircle2, 
  Sparkles, 
  Search,
  ExternalLink,
  Lock,
  Target,
  BookOpen,
  Check
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SignalGrid, HeroSignalVisual } from "@/components/ui/SignalGrid";
import { CompetitionCard } from "@/components/domain/CompetitionCard";
import { CategoryCard } from "@/components/domain/CategoryCard";
import { LeaderboardTable } from "@/components/domain/LeaderboardTable";
import { StatCard } from "@/components/domain/StatCard";
import { CTASection } from "@/components/domain/CTASection";

import { getCompetitions, getCategories, getFeaturedCompetition } from "@/lib/api/competitions";
import { getLeaderboard } from "@/lib/api/leaderboard";
import { getCommunityChannels, getPlatformStats } from "@/lib/api/winners";

export default async function HomePage() {
  const competitions = await getCompetitions();
  const featuredComp = await getFeaturedCompetition();
  const categories = await getCategories();
  const leaderboardPreview = await getLeaderboard(undefined, 5);
  const communityChannels = await getCommunityChannels();
  const stats = await getPlatformStats();

  const pastCompetitions = competitions.filter((c) => c.status === "ENDED");

  return (
    <div className="relative font-sans space-y-20 sm:space-y-28 pb-16 overflow-hidden">
      {/* ---------------------------------------------------- */}
      {/* 1. HERO SECTION (PHASE 2A)                           */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[80vh] flex items-center pt-8 pb-16 sm:py-24 overflow-hidden">
        <SignalGrid />

        <Container size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Brand Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
                <span>SIRENCTF // CYBERSECURITY COMPETITIONS</span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans uppercase leading-tight sm:leading-none space-y-1">
                  <span className="block">BREAK.</span>
                  <span className="block text-cyan-400">BUILD.</span>
                  <span className="block">DEFEND.</span>
                </h1>
              </div>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
                SirenCTF runs practical cybersecurity competitions where participants solve security challenges across multiple technical domains, compete with teams worldwide, learn real offensive and defensive techniques, and build a verifiable track record.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Button
                  href="/competitions"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  EXPLORE COMPETITIONS
                </Button>

                <Button
                  href="/community"
                  variant="outline"
                  size="lg"
                  icon={<Users className="h-4 w-4" />}
                >
                  JOIN THE COMMUNITY
                </Button>
              </div>

              {/* System Metadata Row */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 font-mono text-xs max-w-lg">
                <div>
                  <span className="text-cyan-400 font-bold text-base sm:text-lg block">01</span>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider block">COMPETITIONS</span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold text-base sm:text-lg block">08</span>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider block">CATEGORIES</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold text-base sm:text-lg block">VERIFIED</span>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider block">ACHIEVEMENTS</span>
                </div>
              </div>
            </div>

            {/* Right Column Visual: Abstract Signal Intelligence System */}
            <div className="lg:col-span-5 flex justify-center items-center relative py-6">
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                <HeroSignalVisual className="w-full h-full" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. UPCOMING COMPETITION SPOTLIGHT: SirenCTF #01      */}
      {/* ---------------------------------------------------- */}
      {featuredComp && (
        <section className="relative">
          <Container size="xl">
            <SectionHeading
              eyebrow="Flagship Event Spotlight"
              title="SirenCTF #01"
              description="Our premier upcoming cybersecurity competition open to security enthusiasts, students, researchers, and practitioner teams worldwide."
            />

            <div className="relative rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-6 sm:p-10 backdrop-blur-xl shadow-glow-cyan">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge status={featuredComp.status} size="md" />
                    <span className="font-mono text-xs px-3 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      Format: {featuredComp.format}
                    </span>
                    <span className="font-mono text-xs px-3 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                      Difficulty: {featuredComp.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {featuredComp.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed font-sans">
                      {featuredComp.description}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase block">Registration</span>
                      <span className="text-emerald-400 font-bold">OPEN SOON</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase block">Duration</span>
                      <span className="text-slate-200 font-bold">{featuredComp.durationHours} Hours</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase block">Team Size</span>
                      <span className="text-slate-200 font-bold">{featuredComp.teamSize}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase block">Prize Pool</span>
                      <span className="text-amber-400 font-bold">{featuredComp.prizePool}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      href={`/competitions/${featuredComp.slug}`}
                      variant="primary"
                      size="md"
                      icon={<ArrowRight className="h-4 w-4" />}
                    >
                      View Competition Details
                    </Button>
                    <span className="text-xs font-mono text-slate-400">
                      * Scoring handled via SirenCTF CTFd engine instance
                    </span>
                  </div>
                </div>

                {/* Right Breakdown Sidebar */}
                <div className="lg:col-span-4 p-6 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4 font-mono text-xs">
                  <div className="text-slate-200 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                    Event Specifications
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Challenges:</span>
                      <span className="text-cyan-400 font-bold">42 Custom Challenges</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Categories:</span>
                      <span className="text-slate-200">8 Domains</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Organizers:</span>
                      <span className="text-slate-200">Siren Community Core</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Certificate Eligible:</span>
                      <span className="text-emerald-400">Yes (Digitally Verified)</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-sans">
                    Participants who complete challenges or reach top leaderboard positions receive verifiable SirenCTF certificates.
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. COMPETITION CATEGORIES                             */}
      {/* ---------------------------------------------------- */}
      <section id="categories">
        <Container size="xl">
          <SectionHeading
            eyebrow="Technical Domains"
            title="Competition Categories"
            description="Challenges are designed by experienced security practitioners to mirror real-world vulnerability patterns and defensive tactics."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. WHY SIRENCTF (3 PRINCIPLES)                       */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-12">
        <Container size="xl">
          <SectionHeading
            align="center"
            eyebrow="Core Philosophy"
            title="Why SirenCTF"
            description="Built on three fundamental pillars designed for cybersecurity growth and verifiable recognition."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Principle 1: COMPETE */}
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all font-sans relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 font-mono font-bold text-lg mb-6 border border-cyan-500/30">
                01
              </div>
              <h3 className="font-mono text-xl font-bold text-white uppercase tracking-wider mb-2">
                COMPETE
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Practical cybersecurity competitions featuring Jeopardy and Attack-Defense challenges. Test your speed, analytical rigor, and exploit synthesis against top international teams.
              </p>
            </div>

            {/* Principle 2: LEARN */}
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500/40 transition-all font-sans relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 font-mono font-bold text-lg mb-6 border border-emerald-500/30">
                02
              </div>
              <h3 className="font-mono text-xl font-bold text-white uppercase tracking-wider mb-2">
                LEARN
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Challenges designed to build real security skills. Learn modern vulnerability classes, memory safety analysis, cryptanalysis primitives, and incident investigation methodologies.
              </p>
            </div>

            {/* Principle 3: PROVE */}
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-amber-500/40 transition-all font-sans relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950 text-amber-400 font-mono font-bold text-lg mb-6 border border-amber-500/30">
                03
              </div>
              <h3 className="font-mono text-xl font-bold text-white uppercase tracking-wider mb-2">
                PROVE
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Verifiable competition achievements and certificates. Receive tamper-proof digital certificates backed by public cryptographic verification to showcase your technical competence.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. LEADERBOARD PREVIEW                               */}
      {/* ---------------------------------------------------- */}
      <section>
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-6 bg-cyan-500 inline-block" />
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                  Competition Rankings
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Leaderboard Standings</h2>
            </div>

            <Button href="/leaderboard" variant="outline" size="sm" icon={<ArrowRight className="h-3.5 w-3.5" />}>
              View Full Leaderboard
            </Button>
          </div>

          <LeaderboardTable entries={leaderboardPreview} preview={true} />
        </Container>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. PREVIOUS COMPETITIONS                             */}
      {/* ---------------------------------------------------- */}
      {pastCompetitions.length > 0 && (
        <section>
          <Container size="xl">
            <SectionHeading
              eyebrow="Tournament History"
              title="Previous Competitions"
              description="Explore past SirenCTF events, challenge counts, final standings, and top winning teams."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastCompetitions.map((comp) => (
                <CompetitionCard key={comp.id} competition={comp} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ---------------------------------------------------- */}
      {/* 7. CERTIFICATES HIGHLIGHT                            */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-12">
        <Container size="xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-400">
                  <Award className="h-3.5 w-3.5" />
                  <span>Digital Achievement System</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold text-white">
                  Verifiable SirenCTF Certificates
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Participants who achieve eligible placements or category milestones in SirenCTF competitions receive digitally verifiable certificates. Every certificate features a unique cryptographic SHA-256 seal and a dedicated public verification portal.
                </p>

                {/* Verification Flow Steps */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px] text-slate-400 pt-2">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">01. ID</span>
                    <span>Certificate ID</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">02. VERIFY</span>
                    <span>Public Verification Page</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">03. DETAILS</span>
                    <span>Participant &amp; Event</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">04. SEAL</span>
                    <span>Cryptographic Hash</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-sans italic border-l-2 border-slate-700 pl-3">
                  Note: SirenCTF certificates verify specific competition placements and challenge solves. They are not professional industry certifications.
                </p>

                <div className="pt-2">
                  <Button
                    href="/certificates"
                    variant="primary"
                    size="md"
                    icon={<Search className="h-4 w-4" />}
                  >
                    Verify a Certificate
                  </Button>
                </div>
              </div>

              {/* Sample Certificate Graphic Preview */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm p-6 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs space-y-4 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-cyan-400" />
                      <span className="font-bold text-white">SirenCTF SEAL</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 uppercase">VALID</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-500 text-[10px] block">ISSUED TO</span>
                    <span className="text-white font-bold text-sm block">Alex Vance (nullbyte)</span>
                    <span className="text-amber-400 text-[11px] block">1st Place Winner - SirenCTF #00</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>ID: SRN-2025-8F92A</span>
                    <span className="text-cyan-400 underline">Verify Portal &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 8. COMMUNITY SECTION                                 */}
      {/* ---------------------------------------------------- */}
      <section>
        <Container size="xl">
          <SectionHeading
            eyebrow="Ecosystem"
            title="Siren Cybersecurity Community"
            description="SirenCTF is backed by an active community of security researchers, CTF competitors, and cybersecurity professionals."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityChannels.map((channel) => (
              <div
                key={channel.id}
                className="p-8 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all font-sans flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
                      {channel.platform}
                    </span>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {channel.memberCount}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {channel.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {channel.description}
                  </p>
                </div>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Join {channel.platform} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 9. BOTTOM CTA SECTION                                */}
      {/* ---------------------------------------------------- */}
      <CTASection />
    </div>
  );
}
