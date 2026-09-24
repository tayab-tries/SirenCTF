import React from "react";
import Link from "next/link";
import { Shield, Radio, ExternalLink } from "lucide-react";
import { Container } from "./Container";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Competitions",
      links: [
        { name: "SirenCTF #01 (Coming Soon)", href: "/competitions/sirenctf-01" },
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
        { name: "Discord Server", href: "https://discord.gg/sirenctf", external: true },
        { name: "WhatsApp Community", href: "https://chat.whatsapp.com/sirenctf", external: true },
        { name: "GitHub Repository", href: "https://github.com/sirenctf", external: true },
        { name: "About SirenCTF", href: "/about" },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-800/80 bg-[#07090e] text-slate-400 font-sans relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" aria-hidden="true" />

      <Container size="xl" className="py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link 
              href="/" 
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md p-0.5 inline-flex"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 border border-slate-700/80 text-cyan-400">
                <Shield className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="font-mono text-lg font-bold tracking-tight text-white">
                Siren<span className="text-cyan-400 font-extrabold">CTF</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md font-sans">
              SirenCTF runs serious cybersecurity competitions and builds the community around them.
              Solving practical security challenges, competing globally, and earning verifiable digital achievements.
            </p>

            {/* System Status Ticker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300">All SirenCTF Systems Operational</span>
            </div>
          </div>

          {/* Grouped Links */}
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-slate-200 font-bold flex items-center gap-1.5">
                <Radio className="h-3 w-3 text-cyan-400" aria-hidden="true" />
                <span>{section.title}</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-sans">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link 
                        href={link.href} 
                        className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {currentYear} SirenCTF &amp; Siren Cybersecurity Community. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">sirenctf.com</span>
            <span className="text-slate-700" aria-hidden="true">|</span>
            <span className="text-slate-500">Public Platform V0</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
