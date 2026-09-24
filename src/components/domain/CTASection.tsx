import React from "react";
import { ArrowRight, MessageSquare, Trophy, Shield } from "lucide-react";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Test Your Security Skills?",
  description = "Join SirenCTF #01 coming soon or connect with thousands of cybersecurity researchers, CTF players, and security engineers in our global community.",
  primaryButtonText = "Explore Competitions",
  primaryButtonHref = "/competitions",
  secondaryButtonText = "Join the Community",
  secondaryButtonHref = "/community",
}) => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <Container size="lg">
        <div className="relative rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-8 sm:p-14 backdrop-blur-xl shadow-2xl text-center max-w-4xl mx-auto overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-6">
            <Shield className="h-3.5 w-3.5" />
            <span>SirenCTF Platform &amp; Community</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            {title}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            {description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={primaryButtonHref}
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {primaryButtonText}
            </Button>
            <Button
              href={secondaryButtonHref}
              variant="outline"
              size="lg"
              icon={<MessageSquare className="h-4 w-4" />}
            >
              {secondaryButtonText}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
