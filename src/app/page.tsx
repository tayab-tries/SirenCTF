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
import { FeaturedCompetitionSection } from "@/components/domain/FeaturedCompetitionSection";
import { WhySirenSection } from "@/components/domain/WhySirenSection";
import { CertificatesSection } from "@/components/domain/CertificatesSection";
import { CommunitySection } from "@/components/domain/CommunitySection";

import { getCompetitions, getCategories, getFeaturedCompetition } from "@/lib/api/competitions";
import { getLeaderboard } from "@/lib/api/leaderboard";
import { getCommunityChannels, getPlatformStats } from "@/lib/api/winners";
import { getCertificateById } from "@/lib/api/certificates";

export default async function HomePage() {
  const competitions = await getCompetitions();
  const featuredComp = await getFeaturedCompetition();
  const categories = await getCategories();
  const leaderboardPreview = await getLeaderboard(undefined, 5);
  const communityChannels = await getCommunityChannels();
  const stats = await getPlatformStats();
  const sampleCertificate = await getCertificateById("SRN-2025-8F92A");

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
        <FeaturedCompetitionSection
          competition={featuredComp}
          categories={categories}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. COMPETITION CATEGORIES (PHASE 2C)                 */}
      {/* ---------------------------------------------------- */}
      <section id="categories" className="relative py-12">
        <Container size="xl">
          <SectionHeading
            eyebrow="CHALLENGE DOMAINS"
            title="WHERE WILL YOU BREAK IN?"
            description="SirenCTF competitions span multiple cybersecurity disciplines designed around practical problem solving, vulnerability discovery, and defensive analysis."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. WHY SIRENCTF (PHASE 2D)                           */}
      {/* ---------------------------------------------------- */}
      <WhySirenSection />

      {/* ---------------------------------------------------- */}
      {/* 5. LEADERBOARD PREVIEW (PHASE 2E)                    */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-12">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <SectionHeading
              eyebrow="SAMPLE STANDINGS"
              title="THE BOARD DOESN'T LIE."
              description="Competition performance is reflected through rankings, total scores, and category solve metrics."
              className="mb-0"
            />

            <div className="shrink-0 pt-2 md:pt-0">
              <Button href="/leaderboard" variant="outline" size="md" icon={<ArrowRight className="h-3.5 w-3.5" />}>
                VIEW FULL LEADERBOARD
              </Button>
            </div>
          </div>

          <LeaderboardTable entries={leaderboardPreview} preview={true} />
        </Container>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. COMPETITION ARCHIVE (PHASE 2F)                    */}
      {/* ---------------------------------------------------- */}
      <section className="relative py-12">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <SectionHeading
              eyebrow="COMPETITION ARCHIVE"
              title="BUILT THROUGH COMPETITION."
              description="This archive will document SirenCTF tournaments, solve records, and historical standings as our platform grows. SirenCTF #01 will mark our inaugural official competition entry."
              className="mb-0"
            />

            <div className="shrink-0 pt-2 md:pt-0">
              <Button href="/competitions" variant="outline" size="md" icon={<ArrowRight className="h-3.5 w-3.5" />}>
                VIEW ALL COMPETITIONS
              </Button>
            </div>
          </div>

          {/* Inaugural Tournament Timeline State Banner */}
          <div className="mb-8 p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
              <span className="font-bold text-white uppercase">THE ARCHIVE STARTS HERE.</span>
            </div>
            <div className="text-slate-400 text-[11px] font-sans">
              SirenCTF #01 is our flagship upcoming event and will become the inaugural entry in the official competition archive upon conclusion.
            </div>
          </div>

          {/* Sample Historical Records (Explicitly tagged as Sample Archives) */}
          {pastCompetitions.length > 0 && (
            <div className="space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-medium">
                Demonstrative Historical Record Schema (Sample Archives):
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pastCompetitions.map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. CERTIFICATES & VERIFICATION (PHASE 2G)            */}
      {/* ---------------------------------------------------- */}
      {sampleCertificate && (
        <CertificatesSection sampleCertificate={sampleCertificate} />
      )}

      {/* ---------------------------------------------------- */}
      {/* 8. COMMUNITY SECTION (PHASE 2H)                      */}
      {/* ---------------------------------------------------- */}
      <CommunitySection channels={communityChannels} />

      {/* ---------------------------------------------------- */}
      {/* 9. BOTTOM CTA SECTION                                */}
      {/* ---------------------------------------------------- */}
      <CTASection />
    </div>
  );
}
