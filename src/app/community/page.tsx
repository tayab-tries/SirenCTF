import React from "react";
import { Metadata } from "next";
import { MessageSquare, Users, ExternalLink, Github, Calendar, ShieldCheck, Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCommunityChannels } from "@/lib/api/winners";

export const metadata: Metadata = {
  title: "Siren Cybersecurity Community | SirenCTF",
  description: "Connect with thousands of cybersecurity researchers, CTF players, writeup authors, and security practitioners.",
};

export default async function CommunityPage() {
  const channels = await getCommunityChannels();

  return (
    <div className="py-12 sm:py-16 space-y-16 font-sans">
      <Container size="xl">
        <SectionHeading
          eyebrow="Community & Ecosystem"
          title="Siren Cybersecurity Community"
          description="SirenCTF is built around a vibrant global community of ethical hackers, security researchers, students, and practitioners."
        />

        {/* Community Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="p-8 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all font-sans flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                    {channel.platform}
                  </span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {channel.memberCount}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {channel.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {channel.description}
                </p>
              </div>

              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pt-2"
              >
                Join {channel.platform} Channel <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Community Initiatives */}
        <div className="pt-8">
          <SectionHeading
            eyebrow="Community Initiatives"
            title="What We Do Together"
            description="Our community goes beyond competition weekend to foster ongoing learning and collaborative research."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
              <MessageSquare className="h-6 w-6 text-cyan-400" />
              <h4 className="font-mono text-base font-bold text-white">Post-CTF Writeups</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detailed solution writeups published after every competition to share techniques and exploit strategies.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
              <Users className="h-6 w-6 text-emerald-400" />
              <h4 className="font-mono text-base font-bold text-white">Team Matchmaking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Looking for teammates for SirenCTF #01? Connect with solo competitors and form balanced teams.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
              <Calendar className="h-6 w-6 text-amber-400" />
              <h4 className="font-mono text-base font-bold text-white">Community Study Sessions</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Regular weekend workshops on heap exploitation, reverse engineering obfuscation, and cloud security.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
              <ShieldCheck className="h-6 w-6 text-purple-400" />
              <h4 className="font-mono text-base font-bold text-white">Ethical Code of Conduct</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strict adherence to responsible disclosure, fair play, mutual respect, and legal security research boundaries.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
