"use client";

import React from "react";
import { Certificate } from "@/lib/types";
import { CheckCircle2, Award, ExternalLink, Printer } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface CertificateCardProps {
  certificate: Certificate;
  interactive?: boolean;
  isSamplePreview?: boolean;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  interactive = true,
  isSamplePreview = false,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900/90 to-slate-950/95 p-6 sm:p-8 shadow-2xl overflow-hidden font-sans text-slate-100">
      {/* Background Decorative Watermark */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Decorative Technical Corner Elements */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400" aria-hidden="true" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400" aria-hidden="true" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400" aria-hidden="true" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400" aria-hidden="true" />

      {/* Header Seal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Award className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-semibold block">
              Digital Achievement Record
            </span>
            <h3 className="font-mono text-lg font-bold tracking-tight text-white">
              Siren<span className="text-cyan-400">CTF</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSamplePreview ? (
            <Badge variant="cyan" size="md">
              SAMPLE CERTIFICATE PREVIEW
            </Badge>
          ) : (
            <Badge variant="emerald" size="md">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 inline mr-1" aria-hidden="true" />
              DIGITALLY VERIFIED
            </Badge>
          )}
        </div>
      </div>

      {/* Certificate Content */}
      <div className="py-6 text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block">
          This documents competition achievement for
        </span>

        <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          {certificate.participantName}
        </h4>

        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          Team <span className="font-semibold text-cyan-400 font-mono">[{certificate.teamName}]</span>
        </p>

        <div className="inline-block my-1 px-5 py-2 rounded-lg bg-slate-950 border border-amber-500/40 text-amber-400 font-mono font-bold text-base sm:text-lg">
          {certificate.achievement}
        </div>

        <p className="text-xs text-slate-400 font-sans">
          Event: <span className="text-slate-200 font-semibold">{certificate.competitionName}</span>
        </p>
      </div>

      {/* Certificate Technical Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-slate-400 my-4">
        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Record ID</span>
          <span className="text-cyan-400 font-bold">{certificate.id}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Issue Date</span>
          <span className="text-slate-200">{certificate.issueDate}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Tournament Rank</span>
          <span className="text-slate-200">
            {certificate.placementRank ? `#${certificate.placementRank} of ${certificate.totalTeams} Teams` : "Participant"}
          </span>
        </div>
      </div>

      {/* Neutral Fingerprint / Reference Tag (NO SHA-256 Signature Claims) */}
      <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80 font-mono text-[10px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <span className="flex items-center gap-1.5 shrink-0 text-slate-400">
          <span>VERIFICATION REF //</span>
          <span className="text-cyan-400 font-bold">{certificate.id}</span>
        </span>
        <span className="text-slate-500 font-mono text-[10px]">
          FINGERPRINT // PREVIEW ONLY
        </span>
      </div>

      {/* Action Footer */}
      {interactive && (
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] font-mono text-slate-500">
            Issuer: {certificate.issuer}
          </span>

          <div className="flex items-center gap-2">
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
              Verify Record
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
