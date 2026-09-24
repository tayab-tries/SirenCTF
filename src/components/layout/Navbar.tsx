"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  Trophy, 
  Award, 
  Users, 
  Info, 
  Menu, 
  X, 
  Search,
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
    { name: "Winners", href: "/winners", icon: Trophy },
    { name: "Certificates", href: "/certificates", icon: Award },
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#07090e]/90 backdrop-blur-md">
      <Container size="xl">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md p-1"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 border border-slate-700/80 group-hover:border-cyan-500/80 transition-colors">
              <Shield className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-base font-bold tracking-tight text-white leading-none">
                Siren<span className="text-cyan-400 font-extrabold">CTF</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? "text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} aria-hidden="true" />
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
                  className="w-60 bg-slate-900 border border-cyan-500 text-slate-100 text-xs font-mono px-3 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 text-cyan-400 hover:text-cyan-300 p-0.5"
                  title="Verify Certificate"
                  aria-label="Submit Certificate ID"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 text-slate-400 hover:text-slate-200 p-0.5"
                  aria-label="Close certificate search"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-cyan-400 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                title="Verify Certificate"
              >
                <Search className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                <span>Verify Cert</span>
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
              className="p-2 text-slate-300 hover:text-slate-100 hover:bg-slate-900 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
        <div className="md:hidden border-b border-slate-800 bg-[#07090e] px-4 pt-3 pb-6 space-y-2">
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
                    ? "text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 font-semibold"
                    : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                <Icon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800/80 space-y-3">
            <form onSubmit={handleVerifySubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Certificate ID"
                value={certQuery}
                onChange={(e) => setCertQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400"
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
