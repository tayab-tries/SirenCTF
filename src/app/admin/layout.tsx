"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Trophy, ArrowLeft, Shield, Radio, Terminal } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Competitions", href: "/admin/competitions", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-[#F5F5F5] font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0d0d11] border-b md:border-b-0 md:border-r border-zinc-800 shrink-0 p-4 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header Brand */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#050507] border border-red-900/60 overflow-hidden shrink-0 shadow-[0_0_10px_rgba(227,27,46,0.3)]">
              <Image 
                src="/siren-logo.png" 
                alt="SirenCTF Official Logo" 
                width={32} 
                height={32} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-extrabold tracking-wider text-[#F5F5F5] leading-none">
                SIREN<span className="text-[#E31B2E]">CTF</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-red-400 uppercase mt-0.5 font-bold">
                OPERATING CONSOLE
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 font-mono text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-red-950/40 text-[#FF3347] border border-red-900/60 font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-[#15151b]"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#E31B2E]" : "text-zinc-500"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Link Back to Public Site */}
        <div className="pt-4 border-t border-zinc-800/80 mt-6 md:mt-0 font-mono text-xs space-y-3">
          <div className="px-2 py-1 bg-[#15151b] rounded border border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-1.5">
            <Radio className="h-3 w-3 text-red-400 animate-pulse" />
            <span>CONSOLE // v0.1-PREVIEW</span>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-zinc-400 hover:text-white hover:bg-[#15151b] rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
