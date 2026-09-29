import React from "react";
import { Certificate } from "@/lib/types";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { CertificateCard } from "./CertificateCard";
import { Button } from "../ui/Button";
import { Shield, ArrowRight } from "lucide-react";

interface CertificatesSectionProps {
  sampleCertificate: Certificate;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  sampleCertificate,
}) => {
  const steps = [
    { num: "01", title: "CERTIFICATE ISSUED", desc: "Generated post-event for verified tournament placements" },
    { num: "02", title: "UNIQUE ID", desc: "Assigned a unique identifier (e.g. SRN-2026-XXXXXX)" },
    { num: "03", title: "PUBLIC VERIFICATION", desc: "Searchable via our public certificate directory" },
    { num: "04", title: "ACHIEVEMENT CONFIRMED", desc: "Record authenticity confirmed via public directory reference" },
  ];

  return (
    <section className="relative py-12 sm:py-16 font-sans">
      <Container size="xl">
        <SectionHeading
          eyebrow="VERIFIABLE ACHIEVEMENTS"
          title="PROVE YOUR TOURNAMENT PERFORMANCE."
          description="SirenCTF provides verifiable digital achievement records for tournament performance, placement ranks, and event participation, backed by a public verification engine."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Sample Certificate Visual Preview */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest font-medium flex items-center justify-between">
              <span>DEMONSTRATIVE PREVIEW (SAMPLE RECORD)</span>
              <span className="text-red-400">SRN-2025-8F92A</span>
            </div>

            <CertificateCard
              certificate={sampleCertificate}
              interactive={false}
              isSamplePreview={true}
            />
          </div>

          {/* Right Column: Verification Architecture & Concept Flow */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl border border-zinc-800/90 bg-[#15151b]/80 space-y-5 font-sans">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase font-bold border-b border-zinc-800 pb-3">
                <Shield className="h-4 w-4" aria-hidden="true" />
                <span>Verification Concept Architecture</span>
              </div>

              {/* Concept Flow Steps */}
              <div className="space-y-3 font-mono text-xs">
                {steps.map((step, idx) => (
                  <div
                    key={step.num}
                    className="p-3 rounded bg-[#0d0d11] border border-zinc-800/80 space-y-1 relative"
                  >
                    <div className="flex items-center justify-between font-bold text-zinc-200">
                      <span className="flex items-center gap-2">
                        <span className="text-red-400 text-[10px]">{step.num}.</span>
                        <span>{step.title}</span>
                      </span>
                      {idx < steps.length - 1 && (
                        <span className="text-zinc-600 text-[10px]" aria-hidden="true">&darr;</span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 font-sans">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Terminology & Data Integrity Disclaimer */}
              <div className="p-3 rounded bg-[#050507] border border-zinc-800 text-[11px] text-zinc-400 font-sans leading-relaxed">
                <strong className="text-zinc-300 font-mono block mb-0.5">Record Classification:</strong>
                SirenCTF achievement records verify competitive tournament performance and participation. They are competition records, not professional industry certifications.
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Button
                  href="/certificates"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  LOOK UP ACHIEVEMENT RECORD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
