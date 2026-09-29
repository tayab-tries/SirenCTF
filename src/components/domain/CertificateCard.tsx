"use client";

import React from "react";
import { Certificate } from "@/lib/types";
import { Award, ExternalLink, Printer } from "lucide-react";
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
    <div className="relative rounded-2xl border border-zinc-800/90 bg-[#15151b] p-6 sm:p-8 shadow-2xl overflow-hidden font-sans text-zinc-100">
      {/* Background Decorative Atmosphere */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#E31B2E]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#700914]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Decorative Technical Corner Elements */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#E31B2E]" aria-hidden="true" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#E31B2E]" aria-hidden="true" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#E31B2E]" aria-hidden="true" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#E31B2E]" aria-hidden="true" />

      {/* Header Seal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-950/60 border border-red-900/60 text-[#FF3347]">
            <Award className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF3347] font-semibold block">
              Digital Achievement Record
            </span>
            <h3 className="font-mono text-lg font-bold tracking-tight text-white">
              SIREN<span className="text-[#E31B2E]">CTF</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSamplePreview ? (
            <Badge variant="red" size="md">
              SAMPLE CERTIFICATE PREVIEW
            </Badge>
          ) : (
            <Badge variant="slate" size="md">
              VERIFICATION ENGINE PLANNED
            </Badge>
          )}
        </div>
      </div>

      {/* Certificate Content */}
      <div className="py-6 text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block">
          This documents competition achievement for
        </span>

        <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          {certificate.participantName}
        </h4>

        <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
          Team <span className="font-semibold text-red-400 font-mono">[{certificate.teamName}]</span>
        </p>

        <div className="inline-block my-1 px-5 py-2 rounded-lg bg-[#0d0d11] border border-amber-500/40 text-amber-400 font-mono font-bold text-base sm:text-lg">
          {certificate.achievement}
        </div>

        <p className="text-xs text-zinc-400 font-sans">
          Event: <span className="text-zinc-200 font-semibold">{certificate.competitionName}</span>
        </p>
      </div>

      {/* Certificate Technical Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0d0d11] border border-zinc-800 font-mono text-xs text-zinc-400 my-4">
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Record ID</span>
          <span className="text-red-400 font-bold">{certificate.id}</span>
        </div>

        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Issue Date</span>
          <span className="text-zinc-200">{certificate.issueDate}</span>
        </div>

        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Tournament Rank</span>
          <span className="text-zinc-200">
            {certificate.placementRank ? `#${certificate.placementRank} of ${certificate.totalTeams} Teams` : "Participant"}
          </span>
        </div>
      </div>

      {/* Neutral Fingerprint / Reference Tag */}
      <div className="p-2.5 rounded bg-[#050507] border border-zinc-800 font-mono text-[10px] text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <span className="flex items-center gap-1.5 shrink-0 text-zinc-400">
          <span>VERIFICATION REF //</span>
          <span className="text-red-400 font-bold">{certificate.id}</span>
        </span>
        <span className="text-zinc-500 font-mono text-[10px]">
          FINGERPRINT // PREVIEW ONLY
        </span>
      </div>

      {/* Action Footer */}
      {interactive && (
        <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] font-mono text-zinc-500">
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
