"use client";

import React, { useState } from "react";
import { Search, Award, Shield, CheckCircle2, Hash, ArrowRight } from "lucide-react";
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
          title="SirenCTF Digital Certificates"
          description="Validate competition placement credentials, digital badges, and achievement records issued by SirenCTF."
        />

        {/* Certificate Search Box */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-8 sm:p-10 backdrop-blur-xl shadow-glow-cyan text-center space-y-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 mx-auto border border-cyan-500/30">
            <Award className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Public Certificate Verification</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Enter a SirenCTF Certificate ID to inspect issue details, recipient team, competition placement, and cryptographic signature seal.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="e.g. SRN-2025-8F92A"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 text-slate-100 font-mono text-sm px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-slate-500"
            />
            <Button type="submit" variant="primary" size="lg" icon={<Search className="h-4 w-4" />}>
              Verify Certificate
            </Button>
          </form>

          {/* Sample test buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <span>Try sample certificate IDs:</span>
            <button
              onClick={() => setQuery("SRN-2025-8F92A")}
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              SRN-2025-8F92A
            </button>
            <span>&bull;</span>
            <button
              onClick={() => setQuery("SRN-2025-7E14B")}
              className="text-cyan-400 underline hover:text-cyan-300"
            >
              SRN-2025-7E14B
            </button>
          </div>
        </div>

        {/* Verification Architecture Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3 font-sans">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold">
              <Hash className="h-4 w-4" />
              Cryptographic Integrity
            </div>
            <h3 className="font-bold text-white text-base">SHA-256 Hashing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every certificate incorporates a unique SHA-256 hash generated from recipient details, competition metrics, and event metadata.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3 font-sans">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold">
              <CheckCircle2 className="h-4 w-4" />
              Transparent Audit
            </div>
            <h3 className="font-bold text-white text-base">Public Verification Flow</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Anyone with a Certificate ID can inspect the public verification portal to validate authentic competition achievements without requiring login credentials.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3 font-sans">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
              <Shield className="h-4 w-4" />
              Clear Distinction
            </div>
            <h3 className="font-bold text-white text-base">Competition Achievement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Certificates document specific tournament rankings and challenge milestones. SirenCTF does not claim these represent professional industry certifications.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
