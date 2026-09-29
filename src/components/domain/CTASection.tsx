import React from "react";
import { ArrowRight, Users, Shield } from "lucide-react";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  eyebrow = "ENTER THE SIGNAL",
  title = "READY TO BREAK IN?",
  description = "Explore upcoming SirenCTF competition details, familiarize yourself with our challenge domains, and join our community channels to follow official announcements as competition registration opens.",
  primaryButtonText = "EXPLORE COMPETITIONS",
  primaryButtonHref = "/competitions",
  secondaryButtonText = "JOIN THE COMMUNITY",
  secondaryButtonHref = "/community",
}) => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden font-sans" id="final-cta">
      {/* Decorative Subtle Background Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" 
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        <div className="relative rounded-2xl border border-zinc-800/90 bg-[#15151b]/90 p-8 sm:p-12 md:p-16 backdrop-blur-md shadow-2xl text-center max-w-4xl mx-auto overflow-hidden transition-colors hover:border-red-900/50">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#050507] border border-zinc-800 text-xs font-mono text-red-400 mb-6 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
            <span>{eyebrow}</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-mono uppercase leading-tight">
            {title}
          </h2>

          {/* Grounded Supporting Copy */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans">
            {description}
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-xs sm:max-w-none mx-auto">
            <Button
              href={primaryButtonHref}
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              {primaryButtonText}
            </Button>
            <Button
              href={secondaryButtonHref}
              variant="outline"
              size="lg"
              icon={<Users className="h-4 w-4" aria-hidden="true" />}
            >
              {secondaryButtonText}
            </Button>
          </div>

          {/* Technical Metadata Row */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-[#E31B2E]" aria-hidden="true" />
              <span>SIRENCTF // CYBERSECURITY COMPETITIONS</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
              <span>SYSTEM STATUS // BUILDING</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
