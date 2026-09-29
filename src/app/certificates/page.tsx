"use client";

import React, { useState } from "react";
import { Search, Award, ShieldCheck, CheckCircle2, Hash, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function CertificatesOverviewPage() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/certificates/verify/${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <div className="py-12 sm:py-16 space-y-16 font-sans">
      <Container size="xl">
        <SectionHeading
          eyebrow="Verification Portal"
          title="Tournament Achievement Records"
          description="Validate competition placement credentials, verified badges, and tournament achievement records issued by SirenCTF."
        />

        {/* Certificate Search Box */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-red-900/50 bg-[#0d0d11] p-8 sm:p-10 backdrop-blur-xl shadow-[0_0_30px_rgba(227,27,46,0.15)] text-center space-y-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-950 text-[#FF3347] mx-auto border border-red-900/60 shadow-[0_0_15px_rgba(227,27,46,0.3)]">
            <Award className="h-6 w-6" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-950/40 border border-red-900/40 text-red-400 font-mono text-[10px] uppercase font-bold mb-2">
              PUBLIC VERIFICATION ENGINE
            </div>
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight font-display">
              Public Record Verification
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans max-w-lg mx-auto">
              Enter a SirenCTF Tournament Record ID to inspect issue details, recipient team, competition placement, and cryptographic signature seal.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="e.g. SRN-2025-8F92A"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-[#15151b] border border-zinc-700 text-white font-mono text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#E31B2E] focus:ring-1 focus:ring-[#E31B2E] placeholder:text-zinc-500 transition-all"
            />
            <Button type="submit" variant="primary" size="lg" icon={<Search className="h-4 w-4" />}>
              Verify Record
            </Button>
          </form>

          {/* Sample test buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-zinc-400">
            <span>Try sample record IDs:</span>
            <button
              type="button"
              onClick={() => setQuery("SRN-2025-8F92A")}
              className="text-red-400 underline hover:text-red-300 transition-colors font-bold"
            >
              SRN-2025-8F92A
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => setQuery("SRN-2025-7E14B")}
              className="text-red-400 underline hover:text-red-300 transition-colors font-bold"
            >
              SRN-2025-7E14B
            </button>
          </div>
        </div>

        {/* Verification Architecture Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="p-6 rounded-xl border border-zinc-800 bg-[#0d0d11] space-y-3 font-sans">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase font-bold">
              <Hash className="h-4 w-4" />
              Cryptographic Integrity
            </div>
            <h3 className="font-bold text-white text-base font-display">SHA-256 Fingerprint</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every tournament achievement record incorporates a unique SHA-256 fingerprint generated from recipient details, competition metrics, and event metadata.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-[#0d0d11] space-y-3 font-sans">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold">
              <CheckCircle2 className="h-4 w-4" />
              Transparent Audit
            </div>
            <h3 className="font-bold text-white text-base font-display">Public Verification Flow</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Anyone with a Record ID can inspect the public verification portal to validate authentic competition achievements without requiring login credentials.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-[#0d0d11] space-y-3 font-sans">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
              <ShieldCheck className="h-4 w-4" />
              Tournament Achievement Record
            </div>
            <h3 className="font-bold text-white text-base font-display">Honest Framing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Records explicitly document specific tournament rankings and challenge milestones. SirenCTF does not claim these represent professional accredited certifications.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
