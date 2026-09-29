import React from "react";
import { MessageSquare, Radio, Github, ExternalLink, Check, Users, ShieldCheck } from "lucide-react";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { CommunityChannel } from "@/lib/types";

interface CommunitySectionProps {
  channels: CommunityChannel[];
}

interface StructuredPurpose {
  label: string;
  cta: string;
  purposes: string[];
  icon: React.ReactNode;
  colorClass: string;
}

// Purpose definitions aligned with SirenCTF community architecture
const CHANNEL_PURPOSE_MAP: Record<string, StructuredPurpose> = {
  Discord: {
    label: "DISCORD",
    cta: "JOIN DISCORD",
    colorClass: "text-[#FF3347] border-red-900/60 bg-red-950/40",
    icon: <MessageSquare className="h-5 w-5 text-[#E31B2E]" aria-hidden="true" />,
    purposes: [
      "Competition discussion",
      "Challenge hints",
      "Writeups",
      "Team finding",
      "Category discussions",
      "Announcements",
    ],
  },
  WhatsApp: {
    label: "WHATSAPP COMMUNITY",
    cta: "JOIN WHATSAPP",
    colorClass: "text-zinc-300 border-zinc-800 bg-zinc-900/80",
    icon: <Radio className="h-5 w-5 text-zinc-400" aria-hidden="true" />,
    purposes: [
      "Major announcements",
      "Competition reminders",
      "Registration notifications",
      "Important SirenCTF updates",
    ],
  },
  GitHub: {
    label: "GITHUB",
    cta: "VIEW GITHUB",
    colorClass: "text-zinc-300 border-zinc-800 bg-zinc-900/80",
    icon: <Github className="h-5 w-5 text-zinc-400" aria-hidden="true" />,
    purposes: [
      "Open-source toolkits",
      "Challenge archives",
      "Post-CTF writeups",
      "Infrastructure code",
    ],
  },
};

const INTENDED_TOPICS = [
  { code: "01", name: "CHALLENGE DISCUSSION", detail: "Domain-specific hints, problem approaches, and post-competition challenge breakdowns." },
  { code: "02", name: "WRITEUPS", detail: "Community-submitted challenge solutions, code walkthroughs, and security research." },
  { code: "03", name: "TEAM FINDING", detail: "Connect with solo competitors, match skill sets, and form teams for SirenCTF competitions." },
  { code: "04", name: "SECURITY LEARNING", detail: "Share educational resources, technical articles, and offensive/defensive security topics." },
  { code: "05", name: "ANNOUNCEMENTS", detail: "Official competition updates, registration notices, schedule releases, and platform news." },
  { code: "06", name: "EVENTS", detail: "Stay informed about upcoming SirenCTF tournaments, beta tests, and community sessions." },
];

export const CommunitySection: React.FC<CommunitySectionProps> = ({ channels }) => {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden font-sans" id="community">
      <Container size="xl">
        {/* Section Heading with Eyebrow, Title & Supporting Copy */}
        <SectionHeading
          eyebrow="THE COMMUNITY"
          title="DON'T COMPETE ALONE."
          description="SirenCTF brings cybersecurity learners and competitors together to discuss challenges, share knowledge, find teammates, publish writeups, and follow upcoming competitions."
        />

        {/* Conceptual Community Signal Status Panel */}
        <div className="mb-10 p-4 sm:p-5 rounded-xl border border-zinc-800/90 bg-[#15151b]/90 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-white font-bold tracking-wider uppercase">
              COMMUNITY SIGNAL // OPEN INVITATION
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-[11px]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#050507] border border-zinc-800 text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              OFFICIAL HUB BUILDING
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#050507] border border-zinc-800 text-zinc-300">
              <ShieldCheck className="h-3 w-3 text-red-400" aria-hidden="true" />
              RESPONSIBLE COMMUNITY
            </span>
          </div>
        </div>

        {/* Primary Community Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {channels.map((channel) => {
            const isConfigured = Boolean(channel.url && channel.url.trim() !== "" && channel.url !== "#");
            const mappedInfo = CHANNEL_PURPOSE_MAP[channel.platform] || {
              label: channel.platform.toUpperCase(),
              cta: `JOIN ${channel.platform.toUpperCase()}`,
              colorClass: "text-zinc-300 border-zinc-800 bg-zinc-900/80",
              icon: <Users className="h-5 w-5 text-zinc-400" aria-hidden="true" />,
              purposes: [channel.description],
            };

            return (
              <div
                key={channel.id}
                className="group relative rounded-xl border border-zinc-800/90 bg-[#15151b]/80 p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-red-900/50"
              >
                <div className="space-y-6">
                  {/* Card Header Tag & Platform Indicator */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border font-mono text-[11px] font-bold uppercase tracking-wider ${mappedInfo.colorClass}`}>
                      {mappedInfo.icon}
                      <span>{mappedInfo.label}</span>
                    </span>

                    <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#050507] border border-zinc-800 text-zinc-400 font-medium">
                      {channel.memberCount}
                    </span>
                  </div>

                  {/* Channel Title */}
                  <div>
                    <h3 className="text-xl font-bold text-white font-mono group-hover:text-[#FF3347] transition-colors">
                      {channel.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                      {channel.description}
                    </p>
                  </div>

                  {/* Channel Purpose Bullet List */}
                  <div className="space-y-2.5 pt-2 border-t border-zinc-800/80 font-sans">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                      CHANNEL PURPOSE:
                    </div>
                    <ul className="space-y-2">
                      {mappedInfo.purposes.map((purpose, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{purpose}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call-to-Action */}
                <div className="pt-6 mt-6 border-t border-zinc-800/80">
                  {isConfigured ? (
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#0d0d11] border border-red-900/60 text-red-400 hover:bg-red-950/40 hover:border-red-500 font-mono text-xs font-bold tracking-wider uppercase transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#050507]"
                    >
                      <span>{mappedInfo.cta}</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-2" aria-hidden="true" />
                    </a>
                  ) : (
                    <div
                      className="inline-flex items-center justify-center w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#050507] border border-zinc-800 text-zinc-500 font-mono text-xs font-medium tracking-wider uppercase cursor-not-allowed select-none"
                      aria-disabled="true"
                    >
                      <span>INVITE PENDING // COMING SOON</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Intended Community Activities / Topics Grid */}
        <div className="rounded-2xl border border-zinc-800/90 bg-[#15151b]/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-zinc-800 gap-3">
            <div>
              <span className="font-mono text-xs text-red-400 uppercase tracking-widest font-semibold block">
                COMMUNITY STRUCTURE
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono mt-1">
                INTENDED COMMUNITY SPACES
              </h3>
            </div>
            <span className="font-mono text-[11px] text-zinc-500">
              6 CORE CHANNELS & TOPIC AREAS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTENDED_TOPICS.map((topic) => (
              <div
                key={topic.code}
                className="p-4 rounded-lg bg-[#050507]/80 border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-red-400">
                    {`${topic.code} //`}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">
                    CHANNEL AREA
                  </span>
                </div>
                <div className="font-mono text-sm font-bold text-white">
                  {topic.name}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {topic.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/60 text-center sm:text-left">
            <p className="text-xs text-zinc-500 font-sans italic">
              *Note: These represent intended community channels and focus areas established around SirenCTF competition events and ongoing cybersecurity learning.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
