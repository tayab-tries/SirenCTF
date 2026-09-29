import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, CheckCircle2, Search, Fingerprint, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CertificateCard } from "@/components/domain/CertificateCard";
import { verifyCertificateRecord } from "@/lib/api/certificates";
import { Button } from "@/components/ui/Button";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await verifyCertificateRecord(params.id);
  if (!result.record) return { title: "Achievement Record Lookup | SirenCTF" };
  const cert = result.record;
  return {
    title: `Verify Achievement Record ${cert.id} | SirenCTF`,
    description: `Official SirenCTF tournament achievement record verification for ${cert.participantName} (${cert.achievementTitle} - ${cert.competitionName}).`,
  };
}

export default async function CertificateVerifyPage({ params }: Props) {
  const verification = await verifyCertificateRecord(params.id);
  const cert = verification.record;

  return (
    <div className="py-12 sm:py-16 font-sans space-y-8">
      <Container size="lg">
        {/* Back navigation */}
        <Link
          href="/certificates"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#FF3347] transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Achievement Portal
        </Link>

        {verification.status === "VALID" && cert ? (
          <div className="space-y-6">
            {/* Status Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>[VERIFICATION SUCCESS] Tournament Achievement Record Authenticated</span>
              </span>
              <span className="text-[10px] text-zinc-400 uppercase">
                Status: Valid Record
              </span>
            </div>

            {/* Demo Notice Banner */}
            {verification.isDemo && (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-900/60 text-amber-300 font-mono text-xs flex items-center gap-2">
                <Info className="h-4 w-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span>SAMPLE RECORD // PLATFORM VERIFICATION PREVIEW &mdash; This is a demonstration achievement record for platform testing.</span>
              </div>
            )}

            {/* Certificate Card View */}
            <CertificateCard certificate={cert} interactive={true} />

            {/* Fingerprint & Verification Metadata Box */}
            <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-3 font-mono text-xs">
              <div className="text-zinc-200 font-bold uppercase tracking-wider flex items-center gap-2">
                <Fingerprint className="h-4 w-4 text-[#E31B2E]" />
                <span>Cryptographic Record Fingerprint</span>
              </div>
              <div className="p-3 rounded bg-[#15151b] border border-zinc-800 text-red-400 text-[11px] break-all select-all font-mono">
                {cert.verificationHash}
              </div>
              <div className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Issuer: <span className="text-zinc-200 font-mono">{cert.issuer}</span> &bull; Verified At: <span className="text-zinc-200 font-mono">{new Date(verification.checkedAt).toUTCString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-red-900/60 bg-[#0d0d11] p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto shadow-2xl font-sans">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-950 text-red-400 mx-auto border border-red-900/60">
              <ShieldAlert className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white font-mono uppercase tracking-wider">Record Not Found</h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-sans">
                No SirenCTF achievement record matching identifier <span className="font-mono text-[#FF3347] font-bold">[{params.id}]</span> could be located in the verification registry.
              </p>
            </div>

            {/* Direct Re-search Input */}
            <form action="/certificates" method="GET" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="text"
                name="id"
                placeholder="Enter Record ID (e.g. SRN-2025-8F92A)"
                defaultValue={params.id}
                className="flex-1 bg-[#15151b] border border-zinc-800 text-zinc-100 text-xs font-mono px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 placeholder:text-zinc-500"
              />
              <Button type="submit" variant="primary" size="md" icon={<Search className="h-3.5 w-3.5" />}>
                Verify
              </Button>
            </form>

            <div className="p-4 rounded-xl bg-[#15151b] border border-zinc-800 text-xs font-mono text-zinc-400 text-left space-y-2">
              <div className="text-zinc-200 font-bold">Verification Guidance:</div>
              <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[11px]">
                <li>Verify spelling and hyphenation (e.g. format: <span className="text-[#FF3347]">SRN-2025-8F92A</span>)</li>
                <li>Official tournament achievement records are issued following result verification</li>
                <li>Try testing with sample record ID: <span className="text-[#FF3347]">SRN-2025-8F92A</span></li>
              </ul>
            </div>
          </div>
        )}

        {/* Legal Scope Disclaimer Notice */}
        <div className="mt-8 pt-4 border-t border-zinc-800/80 text-center text-[11px] font-mono text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          SirenCTF achievement records verify competitive tournament performance and participation. They are not professional licenses or third-party certifications.
        </div>
      </Container>
    </div>
  );
}
