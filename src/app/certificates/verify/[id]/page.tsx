import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldAlert, Award, Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CertificateCard } from "@/components/domain/CertificateCard";
import { getCertificateById } from "@/lib/api/certificates";
import { Button } from "@/components/ui/Button";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cert = await getCertificateById(params.id);
  if (!cert) return { title: "Certificate Verification | SirenCTF" };
  return {
    title: `Verify Certificate ${cert.id} | SirenCTF`,
    description: `Official digital certificate verification for ${cert.participantName} (${cert.achievement} - ${cert.competitionName}).`,
  };
}

export default async function CertificateVerifyPage({ params }: Props) {
  const cert = await getCertificateById(params.id);

  return (
    <div className="py-12 sm:py-16 font-sans space-y-8">
      <Container size="lg">
        {/* Back button */}
        <Link
          href="/certificates"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Certificate Portal
        </Link>

        {cert ? (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>[VERIFICATION SUCCESS] Certificate Record Found in SirenCTF Registry</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase hidden sm:inline">
                Status: Authentic &amp; Valid
              </span>
            </div>

            <CertificateCard certificate={cert} interactive={true} />
          </div>
        ) : (
          <div className="rounded-2xl border border-rose-500/40 bg-slate-900/90 p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-950 text-rose-400 mx-auto border border-rose-500/30">
              <ShieldAlert className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white font-mono">Certificate Not Found</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-sans">
                No certificate matching ID <span className="font-mono text-cyan-400 font-bold">[{params.id}]</span> could be located in the SirenCTF verification database.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 text-left space-y-2">
              <div className="text-slate-200 font-bold">Troubleshooting Suggestions:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Verify spelling and formatting (e.g. format: <span className="text-cyan-400">SRN-2025-8F92A</span>)</li>
                <li>Certificates are issued 24-48 hours after official competition conclusion</li>
                <li>Try searching with sample ID: <span className="text-cyan-400">SRN-2025-8F92A</span></li>
              </ul>
            </div>

            <div className="pt-2">
              <Button href="/certificates" variant="outline" size="md" icon={<Search className="h-4 w-4" />}>
                Try Another Certificate ID
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
