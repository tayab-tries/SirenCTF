import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "SirenCTF | Serious Cybersecurity Competitions & Community",
  description:
    "SirenCTF runs serious cybersecurity competitions and builds the community around them. Solve practical security challenges, compete globally, learn, and earn verifiable achievements.",
  keywords: [
    "SirenCTF",
    "Cybersecurity Competition",
    "CTF",
    "Capture The Flag",
    "Ethical Hacking",
    "Web Exploitation",
    "Reverse Engineering",
    "Binary Exploitation",
    "Cryptography",
    "Digital Forensics",
    "Security Community",
  ],
  openGraph: {
    title: "SirenCTF | Serious Cybersecurity Competitions & Community",
    description: "Break. Build. Defend. SirenCTF runs serious cybersecurity competitions and builds the community around them.",
    url: "https://sirenctf.com",
    siteName: "SirenCTF",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
