"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Trophy, 
  Users, 
  Info, 
  Menu, 
  X, 
  ChevronRight,
  Radio
} from "lucide-react";
import { Container } from "./Container";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [certQuery, setCertQuery] = useState("");
  const pathname = usePathname();

  const navLinks = [
    { name: "Competitions", href: "/competitions", icon: Trophy },
    { name: "Leaderboard", href: "/leaderboard", icon: Radio },
    { name: "Community", href: "/community", icon: Users },
    { name: "About", href: "/about", icon: Info },
  ];

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certQuery.trim()) {
      window.location.href = `/certificates/verify/${encodeURIComponent(certQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#050507]/90 backdrop-blur-md">
      <Container size="xl">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Brand Logo with Official SirenCTF Logo PNG in Rounded Circular Frame */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-md p-1"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#050507] border border-red-900/60 group-hover:border-red-500/80 transition-colors overflow-hidden shrink-0 shadow-[0_0_10px_rgba(227,27,46,0.3)]">
              <Image 
                src="/siren-logo.png" 
                alt="SirenCTF Official Logo" 
                width={32} 
                height={32} 
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-extrabold tracking-wider text-[#F5F5F5] leading-none">
                SIREN<span className="text-[#E31B2E]">CTF</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">
                Security Competitions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    isActive
                      ? "text-[#FF3347] bg-red-950/40 border border-red-900/50 font-semibold"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900/60 border border-transparent"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#E31B2E]" : "text-zinc-400"}`} aria-hidden="true" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={handleVerifySubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Certificate ID (e.g. SRN-2025-8F92A)"
                  value={certQuery}
                  onChange={(e) => setCertQuery(e.target.value)}
                  autoFocus
                  className="w-60 bg-[#0d0d11] border border-red-500/80 text-zinc-100 text-xs font-mono px-3 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 text-[#E31B2E] hover:text-[#FF3347] p-0.5"
                  title="Verify Certificate"
                  aria-label="Submit Certificate ID"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 text-zinc-400 hover:text-zinc-200 p-0.5"
                  aria-label="Close certificate search"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:underline px-2 py-1"
                title="Verify Certificate"
              >
                Verify Cert
              </button>
            )}

            <Button href="/competitions" variant="primary" size="sm" icon={<ChevronRight className="h-3.5 w-3.5" />}>
              SirenCTF #01
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#050507] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-mono ${
                  isActive
                    ? "text-[#FF3347] bg-red-950/40 border border-red-900/50 font-semibold"
                    : "text-zinc-300 hover:bg-zinc-900"
                }`}
              >
                <Icon className="h-4 w-4 text-[#E31B2E]" aria-hidden="true" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-zinc-800 space-y-3">
            <form onSubmit={handleVerifySubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Certificate ID"
                value={certQuery}
                onChange={(e) => setCertQuery(e.target.value)}
                className="w-full bg-[#0d0d11] border border-zinc-800 text-zinc-100 text-xs font-mono px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <Button type="submit" variant="outline" size="sm">
                Verify
              </Button>
            </form>
            <Button href="/competitions" variant="primary" size="md" className="w-full">
              Explore Competitions
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
