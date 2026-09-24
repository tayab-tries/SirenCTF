"use client";

import React from "react";
import { Certificate } from "@/lib/types";
import { Shield, CheckCircle2, Award, Calendar, Hash, ExternalLink, Printer } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface CertificateCardProps {
  certificate: Certificate;
  interactive?: boolean;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  interactive = true,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900/90 to-slate-950/95 p-6 sm:p-10 shadow-2xl overflow-hidden font-sans text-slate-100">
      {/* Background Decorative Guilloche & Watermark */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Technical Borders */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

      {/* Header Seal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold block">
              Official Verifiable Certificate
            </span>
            <h3 className="font-mono text-xl font-bold tracking-tight text-white">
              Siren<span className="text-cyan-400">CTF</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="md">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 inline mr-1" />
            DIGITALLY VERIFIED
          </Badge>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="py-8 text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
          This is to certify that
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
          {certificate.participantName}
        </h2>

        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          of team <span className="font-semibold text-cyan-400 font-mono">[{certificate.teamName}]</span> has successfully achieved
        </p>

        <div className="inline-block my-2 px-6 py-2.5 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-400 font-mono font-bold text-lg sm:text-xl shadow-glow-amber">
          {certificate.achievement}
        </div>

        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          in the competition <span className="text-slate-200 font-semibold">{certificate.competitionName}</span>.
        </p>
      </div>

      {/* Certificate Technical Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-400 my-6">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Certificate ID</span>
          <span className="text-cyan-400 font-bold">{certificate.id}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Issue Date</span>
          <span className="text-slate-200">{certificate.issueDate}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Placement Rank</span>
          <span className="text-slate-200">
            {certificate.placementRank ? `#${certificate.placementRank} of ${certificate.totalTeams} Teams` : "Eligible Competitor"}
          </span>
        </div>
      </div>

      {/* Verification Cryptographic Hash Preview */}
      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 font-mono text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 shrink-0 text-slate-500">
          <Hash className="h-3.5 w-3.5 text-cyan-400" />
          SHA-256 Seal:
        </span>
        <span className="truncate text-slate-400 font-mono select-all">
          {certificate.verificationHash}
        </span>
      </div>

      {/* Action Footer */}
      {interactive && (
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono text-slate-500">
            Issued by {certificate.issuer}
          </span>

          <div className="flex items-center gap-3">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              icon={<Printer className="h-3.5 w-3.5" />}
            >
              Print / Save PDF
            </Button>
            <Button
              href={`/certificates/verify/${certificate.id}`}
              variant="primary"
              size="sm"
              icon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              Public Verification Link
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
