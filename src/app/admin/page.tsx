import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Trophy, Users, Shield, Award, ArrowRight, Zap, Radio } from "lucide-react";
import { getAdminTelemetry } from "@/lib/api/admin";
import { getCompetitions } from "@/lib/api/competitions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Admin Operating Console | SirenCTF",
  description: "Administrative telemetry dashboard and tournament lifecycle management.",
};

export default async function AdminOverviewPage() {
  const telemetry = await getAdminTelemetry();
  const competitions = await getCompetitions();

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/40 border border-red-900/60 text-red-400 font-mono text-xs font-bold mb-2">
            <Radio className="h-3.5 w-3.5 text-red-500 animate-pulse" />
            <span>ADMINISTRATIVE ACCESS (PREVIEW)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display uppercase">
            SIREN // OPERATING CONSOLE
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            Tournament lifecycle status, telemetry summary, and platform engine pointers.
          </p>
        </div>

        <Button href="/admin/competitions" variant="primary" size="md" icon={<ArrowRight className="h-4 w-4" />}>
          Manage Competitions
        </Button>
      </div>

      {/* 4 Summary Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Competitions</span>
            <Trophy className="h-4 w-4 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">{telemetry.totalCompetitions}</div>
          <div className="text-[10px] text-zinc-500">Scheduled &amp; Concluded Events</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Active Arenas</span>
            <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">{telemetry.activeTournaments}</div>
          <div className="text-[10px] text-zinc-500">Live / Announced Tournaments</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Registered Teams</span>
            <Users className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-amber-400">{telemetry.totalParticipants}</div>
          <div className="text-[10px] text-zinc-500">Estimated Total Participants</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Pending Records</span>
            <Award className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-3xl font-bold text-zinc-300">{telemetry.pendingCertificates}</div>
          <div className="text-[10px] text-zinc-500">Unissued Achievement Credentials</div>
        </div>
      </div>

      {/* Managed Competitions Quick Table */}
      <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 font-mono text-xs">
          <span className="font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#E31B2E]" />
            <span>Managed Competition Overview</span>
          </span>
          <Link href="/admin/competitions" className="text-red-400 hover:text-red-300 transition-colors">
            View All Lifecycle States &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Tournament</th>
                <th className="py-2.5 px-3">Lifecycle Status</th>
                <th className="py-2.5 px-3">Format</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {competitions.map((comp) => (
                <tr key={comp.id} className="hover:bg-[#15151b] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{comp.name}</div>
                    <div className="text-[10px] text-zinc-500 font-sans">{comp.tagline}</div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge status={comp.status} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-zinc-300">{comp.format}</td>
                  <td className="py-3 px-3 text-zinc-400">
                    {comp.isProvisional ? "Q4 2026 (Target)" : new Date(comp.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/competitions/${comp.slug}`}
                      className="text-xs text-zinc-400 hover:text-white underline mr-3"
                    >
                      View Public
                    </Link>
                    <Link
                      href="/admin/competitions"
                      className="text-xs text-red-400 hover:text-red-300 font-bold"
                    >
                      Control State
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
