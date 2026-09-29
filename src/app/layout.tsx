import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SirenCTF | Cybersecurity Competitions & Community",
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
    title: "SirenCTF | Cybersecurity Competitions & Community",
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
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}>
      <body className="min-h-screen bg-[#050507] text-[#F5F5F5] flex flex-col font-sans antialiased selection:bg-[#E31B2E] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
