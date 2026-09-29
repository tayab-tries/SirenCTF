import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Server, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Radio, 
  Layers, 
  Box, 
  Download,
  Terminal,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileCode
} from "lucide-react";
import { getChallengeRecords } from "@/lib/api/challenges";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Challenge Infrastructure & Container Matrix | SirenCTF Admin",
  description: "Dynamic container deployment specs, resource quotas, and static artifact distribution telemetry.",
};

export default async function AdminChallengesPage() {
  const challenges = await getChallengeRecords();

  const totalCount = challenges.length;
  const containerCount = challenges.filter((c) => c.type === "DYNAMIC_CONTAINER").length;
  const artifactCount = challenges.filter((c) => c.type === "STATIC_ARTIFACT").length;
  const isolatedCount = challenges.filter((c) => c.isIsolated).length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/40 border border-red-900/60 text-red-400 font-mono text-xs font-bold mb-2">
            <Server className="h-3.5 w-3.5 text-red-500 animate-pulse" />
            <span>INFRASTRUCTURE &amp; CONTAINER MANAGEMENT</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display uppercase">
            CHALLENGE INFRASTRUCTURE // CONTAINER MATRIX
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            Dockerized challenge instance specs, memory limits, network isolation, and static file assets.
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white bg-[#0d0d11] hover:bg-[#15151b] px-3.5 py-2 rounded-lg border border-zinc-800 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Console Overview</span>
        </Link>
      </div>

      {/* 4 Telemetry Strip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Challenges</span>
            <Layers className="h-4 w-4 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">{totalCount}</div>
          <div className="text-[10px] text-zinc-500">Registered Platform Tasks</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Dynamic Containers</span>
            <Box className="h-4 w-4 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-red-400">{containerCount}</div>
          <div className="text-[10px] text-zinc-500">Dockerized Microservices</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Static Artifacts</span>
            <Download className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-cyan-400">{artifactCount}</div>
          <div className="text-[10px] text-zinc-500">CDN Download Files</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Isolated Networks</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">{isolatedCount}</div>
          <div className="text-[10px] text-zinc-500">Filtered Egress Sandbox</div>
        </div>
      </div>

      {/* Challenge Infrastructure Table */}
      <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 font-mono text-xs">
          <span className="font-bold text-zinc-200 uppercase flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#E31B2E]" />
            <span>Infrastructure Deployment Registry</span>
          </span>
          <span className="text-zinc-500">Docker Swarm / K8s Ready</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                <th className="py-3 px-3">Challenge Identity</th>
                <th className="py-3 px-3">Deployment Type</th>
                <th className="py-3 px-3">Resource Quota</th>
                <th className="py-3 px-3">Isolation Mode</th>
                <th className="py-3 px-3 text-right">Status State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {challenges.map((chal) => {
                const isContainer = chal.type === "DYNAMIC_CONTAINER";
                return (
                  <tr key={chal.id} className="hover:bg-[#15151b] transition-colors">
                    {/* Identity */}
                    <td className="py-4 px-3">
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{chal.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                          {chal.points} pts
                        </span>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-1 flex items-center gap-2">
                        <span className="uppercase text-red-400 font-bold">{chal.category}</span>
                        <span>•</span>
                        <span>{chal.difficulty}</span>
                        <span>•</span>
                        <span className="text-zinc-500">Author: {chal.author}</span>
                      </div>
                    </td>

                    {/* Deployment Type */}
                    <td className="py-4 px-3 align-top">
                      {isContainer ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-red-900/60 bg-red-950/40 text-[#FF3347] font-mono text-[10px] uppercase font-bold">
                          <Box className="h-3 w-3" />
                          <span>CONTAINER</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 font-mono text-[10px] uppercase font-medium">
                          <FileCode className="h-3 w-3" />
                          <span>STATIC ARTIFACT</span>
                        </span>
                      )}
                    </td>

                    {/* Resource Quota */}
                    <td className="py-4 px-3 align-top">
                      {isContainer && chal.containerSpec ? (
                        <div className="space-y-0.5">
                          <div className="font-bold text-white text-[11px] flex items-center gap-1.5">
                            <Cpu className="h-3 w-3 text-red-400" />
                            <span>{chal.containerSpec.memoryLimit} / {chal.containerSpec.cpuLimit} CPU</span>
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono truncate max-w-[180px]">
                            {chal.containerSpec.image}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <div className="font-semibold text-cyan-400 text-[11px] flex items-center gap-1.5">
                            <Download className="h-3 w-3" />
                            <span>Artifact CDN</span>
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono truncate max-w-[180px]">
                            {chal.artifactUrl || "Static File Asset"}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Isolation Mode */}
                    <td className="py-4 px-3 align-top">
                      {chal.isIsolated ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-900/60 bg-emerald-950/30 text-emerald-400 text-[10px] font-mono font-medium">
                          <ShieldCheck className="h-3 w-3" />
                          <span>{chal.containerSpec?.networkIsolation || "ISOLATED"}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-800 bg-[#15151b] text-zinc-400 text-[10px] font-mono">
                          <span>UNFILTERED CDN</span>
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-3 align-top text-right">
                      {chal.status === "DEPLOYED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-900/60 bg-emerald-950/40 text-emerald-400 font-mono text-[10px] uppercase font-bold">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>DEPLOYED</span>
                        </span>
                      )}
                      {chal.status === "STANDBY" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-amber-900/60 bg-amber-950/40 text-amber-400 font-mono text-[10px] uppercase font-bold">
                          <Clock className="h-3 w-3" />
                          <span>STANDBY</span>
                        </span>
                      )}
                      {chal.status === "DRAFT" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-800 bg-[#15151b] text-zinc-400 font-mono text-[10px] uppercase font-medium">
                          <span>DRAFT</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
