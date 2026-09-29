"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const RootAppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen bg-[#050507] text-[#F5F5F5]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#050507] text-[#F5F5F5] flex flex-col font-sans antialiased selection:bg-[#E31B2E] selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
