import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Radio } from "lucide-react";
import { Container } from "./Container";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Competitions",
      links: [
        { name: "SirenCTF #01 (Upcoming)", href: "/competitions/sirenctf-01" },
        { name: "Competitions Archive", href: "/competitions" },
        { name: "Rules & Fair Play", href: "/competitions/sirenctf-01#rules" },
        { name: "Categories Overview", href: "/#categories" },
      ],
    },
    {
      title: "Rankings & Certificates",
      links: [
        { name: "Global Leaderboard", href: "/leaderboard" },
        { name: "Wall of Fame / Winners", href: "/winners" },
        { name: "Certificate Portal", href: "/certificates" },
        { name: "Public Verification", href: "/certificates/verify/SRN-2025-8F92A" },
      ],
    },
    {
      title: "Organization & Ecosystem",
      links: [
        { name: "Community Hub", href: "/community" },
        { name: "Discord (Invite Pending)", href: "/community" },
        { name: "WhatsApp (Invite Pending)", href: "/community" },
        { name: "GitHub (Coming Soon)", href: "/community" },
        { name: "About SirenCTF", href: "/about" },
      ],
    },
  ];

  return (
    <footer className="border-t border-zinc-800/80 bg-[#050507] text-zinc-400 font-sans relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" aria-hidden="true" />

      <Container size="xl" className="py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link 
              href="/" 
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-md p-0.5 inline-flex"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#050507] border border-zinc-800 text-[#E31B2E] overflow-hidden shrink-0 shadow-[0_0_8px_rgba(227,27,46,0.3)]">
                <Image 
                  src="/siren-logo.png" 
                  alt="SirenCTF Official Logo" 
                  width={32} 
                  height={32} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-display text-lg font-extrabold tracking-wider text-[#F5F5F5]">
                SIREN<span className="text-[#E31B2E]">CTF</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md font-sans">
              SirenCTF runs cybersecurity competitions and builds an active community around challenge solving, skill development, and verifiable tournament achievements.
            </p>

            {/* System Status Ticker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0d0d11] border border-zinc-800 text-xs font-mono">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-zinc-300">SYSTEM STATUS // BUILDING</span>
            </div>
          </div>

          {/* Grouped Links */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-200 font-bold flex items-center gap-1.5">
                <Radio className="h-3 w-3 text-[#E31B2E]" aria-hidden="true" />
                <span>{section.title}</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-sans">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href} 
                      className="hover:text-[#FF3347] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; {currentYear} SIRENCTF // CYBERSECURITY COMPETITIONS. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">sirenctf.com</span>
            <span className="text-zinc-700" aria-hidden="true">|</span>
            <span className="text-zinc-500">Public Platform V0</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
