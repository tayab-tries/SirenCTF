import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  Users, 
  Trophy, 
  Shield, 
  CheckCircle2, 
  FileText, 
  ArrowLeft,
  ExternalLink,
  Lock,
  Radio
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getCompetitionBySlug, getCategories } from "@/lib/api/competitions";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comp = await getCompetitionBySlug(params.slug);
  if (!comp) return { title: "Competition Not Found | SirenCTF" };
  return {
    title: `${comp.name} | SirenCTF`,
    description: comp.tagline,
  };
}

export default async function CompetitionDetailPage({ params }: Props) {
  const comp = await getCompetitionBySlug(params.slug);
  const categories = await getCategories();

  if (!comp) {
    notFound();
  }

  const compCategories = categories.filter((cat) => comp.categories.includes(cat.slug));

  return (
    <div className="py-12 space-y-12 font-sans">
      <Container size="xl">
        {/* Back navigation */}
        <Link
          href="/competitions"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Competitions Directory
        </Link>

        {/* Hero Banner Header */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge status={comp.status} size="md" />
            <span className="font-mono text-xs px-3 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
              Format: {comp.format}
            </span>
            <span className="font-mono text-xs px-3 py-1 rounded bg-slate-800 text-cyan-400 border border-slate-700">
              {comp.difficulty}
            </span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
              {comp.name}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {comp.tagline}
            </p>
          </div>

          <p className="text-sm text-slate-400 max-w-4xl leading-relaxed">
            {comp.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
            <div>
              <span className="text-slate-500 text-[10px] uppercase block mb-0.5">Start Time</span>
              <span className="text-slate-200 font-bold">{new Date(comp.startDate).toUTCString()}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase block mb-0.5">Duration</span>
              <span className="text-slate-200 font-bold">{comp.durationHours} Hours</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase block mb-0.5">Team Format</span>
              <span className="text-slate-200 font-bold">{comp.teamSize}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase block mb-0.5">Prize Pool</span>
              <span className="text-amber-400 font-bold">{comp.prizePool}</span>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {comp.status === "UPCOMING" ? (
              <Button variant="primary" size="lg" icon={<Radio className="h-4 w-4" />}>
                Registration Opening Soon
              </Button>
            ) : comp.status === "LIVE" ? (
              <Button variant="primary" size="lg" icon={<ExternalLink className="h-4 w-4" />}>
                Enter CTFd Competition Engine
              </Button>
            ) : (
              <Button href="/leaderboard" variant="secondary" size="lg" icon={<Trophy className="h-4 w-4 text-amber-400" />}>
                View Final Scoreboard Standings
              </Button>
            )}

            <span className="text-xs font-mono text-slate-400">
              Organized by {comp.organizers.join(", ")}
            </span>
          </div>
        </div>

        {/* Detailed Tabs / Sections */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-12">
            {/* Rules Section */}
            <div id="rules" className="space-y-4">
              <h3 className="font-mono text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                Competition Rules &amp; Fair Play Policy
              </h3>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 font-sans text-sm text-slate-300">
                {comp.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-cyan-400 mt-0.5">{`0${idx + 1}.`}</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Section */}
            {comp.schedule.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-mono text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cyan-400" />
                  Official Event Timeline
                </h3>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 font-mono text-xs space-y-4">
                  {comp.schedule.map((sch, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-800/80 last:border-0 last:pb-0">
                      <span className="text-cyan-400 font-bold">{sch.time}</span>
                      <span className="text-slate-200 font-sans text-sm">{sch.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Featured */}
            <div className="space-y-4">
              <h3 className="font-mono text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-400" />
                Included Challenge Categories ({compCategories.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {compCategories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-lg border border-slate-800 bg-slate-900/40 font-sans">
                    <h4 className="font-mono text-sm font-bold text-slate-100">{cat.name}</h4>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Prizes & Specs */}
          <div className="lg:col-span-4 space-y-6">
            {/* Prizes */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 font-sans">
              <h3 className="font-mono text-sm uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Prize Distribution
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {comp.prizes.map((p, idx) => (
                  <div key={idx} className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between font-bold text-slate-200">
                      <span>{p.rank}</span>
                      <span className="text-amber-400">{p.reward}</span>
                    </div>
                    {p.detail && <p className="text-[11px] text-slate-400 font-sans">{p.detail}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Notice */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400 space-y-2">
              <div className="text-cyan-400 font-bold">CTFd Engine Notice</div>
              <p className="text-[11px] font-sans leading-relaxed text-slate-400">
                During competition windows, challenge instances and scoring will run via SirenCTF&apos;s CTFd competition engine. Verified certificates will be automatically synced post-event.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
