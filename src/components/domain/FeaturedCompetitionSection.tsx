import React from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  Trophy, 
  Shield, 
  ArrowRight, 
  Zap, 
  Radio, 
  Info 
} from "lucide-react";
import { Competition, Category } from "@/lib/types";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface FeaturedCompetitionSectionProps {
  competition: Competition;
  categories: Category[];
}

export const FeaturedCompetitionSection: React.FC<FeaturedCompetitionSectionProps> = ({
  competition,
  categories,
}) => {
  const compCategories = categories.filter((cat) =>
    competition.categories.includes(cat.slug)
  );

  return (
    <section className="relative py-12 sm:py-16 font-sans">
      <Container size="xl">
        <SectionHeading
          eyebrow="UPCOMING TOURNAMENT"
          title="FEATURED COMPETITION"
          description="SirenCTF #01 is our upcoming flagship competition. Official schedule, rules, and challenge specifications will be published prior to registration."
        />

        {/* Featured Competition Card Container */}
        <div className="relative rounded-2xl border border-zinc-800/90 bg-[#15151b]/90 p-6 sm:p-10 backdrop-blur-md shadow-xl overflow-hidden font-sans hover:border-red-900/50 transition-colors">
          {/* Top Status Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#E31B2E]" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge status={competition.status} size="md" />
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0d0d11] text-zinc-300 border border-zinc-800">
                  Format: {competition.format}
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#0d0d11] text-[#FF3347] border border-zinc-800 flex items-center gap-1 font-medium">
                  <Zap className="h-3.5 w-3.5 text-[#E31B2E]" aria-hidden="true" />
                  <span>{competition.difficulty}</span>
                </span>
              </div>

              {/* Event Title & Description */}
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                  {competition.name}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  {competition.description}
                </p>
              </div>

              {/* Technical Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#0d0d11] border border-zinc-800/90 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    Registration Status
                  </span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                    <span>
                      {competition.registrationStatus === "OPEN" 
                        ? "REGISTRATION OPEN" 
                        : competition.registrationStatus === "OPENING_SOON"
                        ? "OPENING SOON"
                        : competition.registrationStatus === "CLOSED"
                        ? "CLOSED"
                        : "ANNOUNCEMENT SOON"}
                    </span>
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    Target Date
                  </span>
                  <span className="text-zinc-200 font-bold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                    <span>{competition.isProvisional ? "Q4 2026 (Target: TBA)" : new Date(competition.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    Duration
                  </span>
                  <span className="text-zinc-200 font-bold flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                    <span>{competition.durationHours > 0 ? `${competition.durationHours} Hours ${competition.isProvisional ? "(Target)" : ""}` : "TBA"}</span>
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    Team Size
                  </span>
                  <span className="text-zinc-200 font-bold flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                    <span>{competition.teamSize}</span>
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    Challenges
                  </span>
                  <span className="text-zinc-200 font-bold flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                    <span>{competition.challengeCount > 0 && !competition.isProvisional ? `${competition.challengeCount} Challenges` : "TBA"}</span>
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mb-0.5">
                    Prize Pool
                  </span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Trophy className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                    <span>{competition.prizePool}</span>
                  </span>
                </div>
              </div>

              {/* Included Categories Badges */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block font-medium">
                  Planned Security Domains:
                </span>
                <div className="flex flex-wrap gap-2">
                  {compCategories.map((cat) => (
                    <span
                      key={cat.id}
                      className="px-2.5 py-1 rounded bg-[#0d0d11] border border-zinc-800 text-[11px] font-mono text-zinc-300"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {competition.status === "LIVE" && competition.ctfdUrl ? (
                  <Button
                    href={competition.ctfdUrl}
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    LAUNCH ARENA &rarr;
                  </Button>
                ) : competition.registrationStatus === "OPEN" ? (
                  <Button
                    href={competition.registrationUrl || `/competitions/${competition.slug}`}
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    REGISTER NOW
                  </Button>
                ) : competition.registrationStatus === "OPENING_SOON" ? (
                  <Button
                    href={`/competitions/${competition.slug}`}
                    variant="outline"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    REGISTRATION OPENS SOON
                  </Button>
                ) : (
                  <Button
                    href={`/competitions/${competition.slug}`}
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    VIEW COMPETITION DETAILS
                  </Button>
                )}

                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Info className="h-3.5 w-3.5 text-[#E31B2E]" aria-hidden="true" />
                  <span>Provisional event specifications &mdash; official schedule, challenge counts, and rules will be published prior to registration opening.</span>
                </span>
              </div>
            </div>

            {/* Right Specification Sidebar */}
            <div className="lg:col-span-4 p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-4 font-mono text-xs">
              <div className="text-zinc-200 font-bold uppercase tracking-wider border-b border-zinc-800 pb-2.5 flex items-center gap-2">
                <Radio className="h-4 w-4 text-[#E31B2E]" aria-hidden="true" />
                <span>Event Specification</span>
              </div>

              <div className="space-y-2.5 text-zinc-300">
                <div className="flex justify-between text-zinc-400">
                  <span>Engine:</span>
                  <span className="text-red-400 font-bold">CTFd Platform</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Scoring:</span>
                  <span className="text-zinc-200">Dynamic Scoreboard</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Domains:</span>
                  <span className="text-zinc-200">{compCategories.length} Planned</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Certificates:</span>
                  <span className="text-zinc-300 font-bold">Digital Achievements</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 font-sans leading-relaxed">
                Official registration dates and final challenge parameters for SirenCTF #01 will be published across our community channels prior to competition kickoff.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
