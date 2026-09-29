"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Trophy, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Radio, 
  Server,
  Layers,
  Settings,
  ArrowLeft,
  PlusCircle,
  Binary
} from "lucide-react";
import { Competition, CompetitionStatus } from "@/lib/types";
import { getCompetitions } from "@/lib/api/competitions";
import { updateCompetitionStatus } from "@/lib/api/admin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const ALL_STATUSES: CompetitionStatus[] = [
  "DRAFT",
  "ANNOUNCED",
  "REGISTRATION_OPEN",
  "LIVE",
  "ENDED",
  "ARCHIVED",
];

export default function AdminCompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const comps = await getCompetitions();
      setCompetitions(comps);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: CompetitionStatus) => {
    setUpdatingId(id);
    const success = await updateCompetitionStatus(id, newStatus);
    if (success) {
      setCompetitions((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      setSuccessMsg(`Competition ${id} updated to ${newStatus}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
    setUpdatingId(null);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/40 border border-red-900/60 text-red-400 font-mono text-xs font-bold mb-2">
            <Trophy className="h-3.5 w-3.5 text-red-500" />
            <span>LIFECYCLE CONTROL CONSOLE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display uppercase">
            TOURNAMENT MANAGEMENT
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            Control competition status states, CTFd engine pointers, and tournament registration parameters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/competitions/new"
            className="inline-flex items-center gap-2 text-xs font-mono text-white bg-[#E31B2E] hover:bg-red-600 px-3.5 py-2 rounded-lg font-bold transition-all shadow-[0_0_12px_rgba(227,27,46,0.3)] self-start sm:self-auto"
          >
            <PlusCircle className="h-4 w-4" />
            <span>+ New Competition</span>
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white bg-[#0d0d11] hover:bg-[#15151b] px-3.5 py-2 rounded-lg border border-zinc-800 transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Console Overview</span>
          </Link>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-lg text-emerald-400 font-mono text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Competitions Table Container */}
      <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase">
            <Layers className="h-4 w-4 text-[#E31B2E]" />
            <span>ALL TOURNAMENT LIFECYCLE RECORDS ({competitions.length})</span>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            Engine Mode: <span className="text-emerald-400 font-semibold">MOCK / DUAL-MODE</span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-zinc-400 font-mono text-xs flex items-center justify-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin text-red-500" />
            <span>Loading tournament telemetry records...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                  <th className="py-3 px-3">Tournament Identity</th>
                  <th className="py-3 px-3">Lifecycle State</th>
                  <th className="py-3 px-3">Registration State</th>
                  <th className="py-3 px-3">CTFd Engine Link</th>
                  <th className="py-3 px-3 text-right">Lifecycle Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {competitions.map((comp) => (
                  <tr key={comp.id} className="hover:bg-[#15151b] transition-colors">
                    {/* Tournament Identity */}
                    <td className="py-4 px-3">
                      <div className="font-bold text-white text-sm">{comp.name}</div>
                      <div className="text-[10px] text-zinc-500 font-sans mt-0.5">{comp.tagline}</div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-1 flex items-center gap-2">
                        <span className="text-zinc-600">ID: {comp.id}</span>
                        <span>•</span>
                        <span>{comp.format}</span>
                        {comp.isProvisional && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-950/40 border border-amber-900/40 text-amber-400 text-[9px]">
                            PROVISIONAL
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Lifecycle State Chip */}
                    <td className="py-4 px-3 align-top">
                      <Badge status={comp.status} size="md" />
                    </td>

                    {/* Registration State */}
                    <td className="py-4 px-3 align-top">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-800 bg-[#15151b] text-zinc-300 font-mono text-[10px] uppercase font-medium">
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          comp.registrationStatus === 'OPEN' ? 'bg-emerald-400 animate-pulse' :
                          comp.registrationStatus === 'OPENING_SOON' ? 'bg-amber-400' : 'bg-zinc-500'
                        }`} />
                        {comp.registrationStatus}
                      </span>
                    </td>

                    {/* CTFd Engine Linkage Indicator */}
                    <td className="py-4 px-3 align-top">
                      {comp.ctfdUrl ? (
                        <div className="space-y-1">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-emerald-900/60 bg-emerald-950/30 text-emerald-400 text-[10px] font-mono">
                            <Server className="h-3 w-3 shrink-0" />
                            <span>CTFd LINKED</span>
                          </div>
                          <a
                            href={comp.ctfdUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-[10px] text-zinc-400 hover:text-white underline truncate max-w-[160px] flex items-center gap-1"
                          >
                            <span>{comp.ctfdUrl.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                          </a>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-zinc-800 bg-[#15151b] text-zinc-500 text-[10px] font-mono">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>NOT LINKED</span>
                        </div>
                      )}
                    </td>

                    {/* Lifecycle Action Triggers */}
                    <td className="py-4 px-3 align-top text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-zinc-400 font-mono">Set State:</span>
                          <select
                            value={comp.status}
                            disabled={updatingId === comp.id}
                            onChange={(e) =>
                              handleStatusChange(comp.id, e.target.value as CompetitionStatus)
                            }
                            className="bg-[#15151b] border border-zinc-700 text-white text-[11px] rounded px-2 py-1 font-mono focus:outline-none focus:border-red-500 cursor-pointer disabled:opacity-50"
                          >
                            {ALL_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-3 mt-1">
                          <Link
                            href={`/admin/competitions/${comp.id}/challenges`}
                            className="text-[10px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                          >
                            <Binary className="h-3 w-3" />
                            <span>Challenges &amp; Distribution</span>
                          </Link>
                          <Link
                            href={`/competitions/${comp.slug}`}
                            className="text-[10px] text-zinc-400 hover:text-white underline flex items-center gap-1"
                          >
                            <span>Public View</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Informational Footer Card */}
      <div className="p-4 rounded-lg bg-[#0d0d11] border border-zinc-800/80 font-mono text-xs text-zinc-400 flex items-start gap-3">
        <Radio className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-zinc-200 uppercase">CTFd Engine Synchronization Note</span>
          <p className="text-[11px] text-zinc-400 font-sans mt-1">
            When a competition is transitioned to <code className="text-emerald-400 bg-emerald-950/40 px-1 py-0.5 rounded border border-emerald-900/60 font-mono">LIVE</code> status with an assigned CTFd instance URL, live scoreboards on the SirenCTF public interface will automatically pivot to reading real-time API feeds from the connected CTFd server.
          </p>
        </div>
      </div>
    </div>
  );
}
