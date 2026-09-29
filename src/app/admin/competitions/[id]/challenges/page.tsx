import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Trophy, 
  ArrowLeft, 
  Server, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink,
  Shield,
  Binary
} from "lucide-react";
import { getCompetitionChallengesSummary } from "@/lib/api/admin";
import { Badge } from "@/components/ui/Badge";

export default async function CompetitionChallengesPage({
  params,
}: {
  params: { id: string };
}) {
  const summary = await getCompetitionChallengesSummary(params.id);

  if (!summary) {
    notFound();
  }

  const hasCtfd = Boolean(summary.ctfdUrl && summary.ctfdUrl.trim().length > 0);

  return (
    <div className="space-y-8 font-sans">
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/40 border border-red-900/60 text-red-400 font-mono text-xs font-bold mb-2">
            <Binary className="h-3.5 w-3.5 text-red-500" />
            <span>CHALLENGE DISTRIBUTION &amp; ENGINE MATRIX</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display uppercase">
            {summary.competitionName}
          </h1>
          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 mt-1">
            <span>ID: {summary.competitionId}</span>
            <span>•</span>
            <Badge status={summary.status} size="sm" />
          </div>
        </div>

        <Link
          href="/admin/competitions"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white bg-[#0d0d11] hover:bg-[#15151b] px-3.5 py-2 rounded-lg border border-zinc-800 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Competitions Table</span>
        </Link>
      </div>

      {/* Engine Status Card */}
      <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 font-mono text-xs">
          <span className="font-bold text-zinc-200 uppercase flex items-center gap-2">
            <Server className="h-4 w-4 text-[#E31B2E]" />
            <span>Scoring Engine Linkage State</span>
          </span>

          {hasCtfd ? (
            <span className="px-2.5 py-1 rounded border border-emerald-900/60 bg-emerald-950/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>ENGINE CONNECTED</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded border border-amber-900/60 bg-amber-950/40 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>INTERNAL SPECIFICATION (MOCK/PROVISIONAL)</span>
            </span>
          )}
        </div>

        {hasCtfd ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <div className="text-zinc-400">Target CTFd Instance:</div>
              <a
                href={summary.ctfdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-400 underline font-bold flex items-center gap-1"
              >
                <span>{summary.ctfdUrl}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <button className="px-3.5 py-2 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-2 self-start sm:self-auto transition-colors">
              <RefreshCw className="h-3.5 w-3.5 text-emerald-400" />
              <span>Test CTFd Sync Endpoint</span>
            </button>
          </div>
        ) : (
          <div className="font-sans text-xs text-zinc-400 space-y-1">
            <p>
              This tournament is currently running on the <strong className="text-zinc-200">Internal Specification Engine</strong>.
            </p>
            <p className="text-[11px] text-zinc-500 font-mono">
              Notice: Challenge counts are provisional until linked to an active CTFd instance URL in the competition settings.
            </p>
          </div>
        )}
      </div>

      {/* Category Challenge Distribution Grid */}
      <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4 font-mono text-xs">
          <div className="font-bold text-zinc-200 uppercase flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#E31B2E]" />
            <span>Category Distribution Matrix</span>
          </div>
          <div className="text-zinc-400">
            Total Target Challenges: <span className="font-bold text-white text-sm">{summary.totalChallenges}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {summary.categories.map((cat) => (
            <div
              key={cat.slug}
              className={`p-4 rounded-lg border transition-all ${
                cat.isAssigned
                  ? "bg-[#15151b] border-zinc-800 text-white"
                  : "bg-zinc-950/40 border-zinc-900/80 text-zinc-600 opacity-50"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase mb-2">
                <span>{cat.name}</span>
                <span className="text-[10px] text-zinc-500 font-normal">[{cat.slug}]</span>
              </div>

              <div className="flex items-baseline justify-between mt-4">
                <div className="text-2xl font-extrabold text-white">
                  {cat.count}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase">
                  {cat.isAssigned ? (
                    <span className="text-emerald-400 font-semibold">Active Category</span>
                  ) : (
                    <span>Not Included</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
