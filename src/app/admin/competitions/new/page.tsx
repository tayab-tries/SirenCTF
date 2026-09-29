"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  PlusCircle, 
  ArrowLeft, 
  ShieldAlert, 
  Server, 
  CheckSquare, 
  Square,
  Sparkles,
  Layers,
  HelpCircle
} from "lucide-react";
import { CompetitionFormat, CompetitionStatus, RegistrationStatus, CategorySlug } from "@/lib/types";
import { createCompetition } from "@/lib/api/admin";

const ALL_CATEGORIES: { slug: CategorySlug; label: string; desc: string }[] = [
  { slug: "web", label: "Web Exploitation", desc: "API security, SSRF, JWT, web protocol flaws" },
  { slug: "crypto", label: "Cryptography", desc: "RSA, ECC, lattice attacks, broken primitives" },
  { slug: "forensics", label: "Digital Forensics", desc: "Memory dumps, pcap analysis, disk artifacts" },
  { slug: "osint", label: "OSINT", desc: "Open-source intelligence & digital footprints" },
  { slug: "rev", label: "Reverse Engineering", desc: "Decompiling ELF/PE binaries, firmware reversing" },
  { slug: "pwn", label: "Binary Exploitation (Pwn)", desc: "Stack/heap overflows, ROP chain synthesis" },
  { slug: "linux", label: "Linux Security", desc: "Privilege escalation, container escapes" },
  { slug: "misc", label: "Miscellaneous", desc: "Esoteric languages, hardware, steganography" },
];

export default function NewCompetitionPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState<CompetitionFormat>("Jeopardy");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced" | "All Skill Levels">("All Skill Levels");
  const [status, setStatus] = useState<CompetitionStatus>("DRAFT");
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>("OPENING_SOON");
  const [startDate, setStartDate] = useState("2026-11-01");
  const [durationHours, setDurationHours] = useState<number>(48);
  const [isProvisional, setIsProvisional] = useState(true);
  const [ctfdUrl, setCtfdUrl] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>([
    "web", "crypto", "forensics", "osint", "rev", "pwn", "linux", "misc"
  ]);

  // Handle title change and auto-slug generation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!slug || slug === val.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, -1)) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const toggleCategory = (catSlug: CategorySlug) => {
    setSelectedCategories((prev) =>
      prev.includes(catSlug) ? prev.filter((c) => c !== catSlug) : [...prev, catSlug]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    await createCompetition({
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tagline: tagline || "Official SirenCTF Tournament",
      description: description || "Provisional competition details — subject to official release schedule.",
      format,
      difficulty,
      status,
      registrationStatus,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(new Date(startDate).getTime() + durationHours * 3600 * 1000).toISOString(),
      durationHours,
      isProvisional,
      ctfdUrl: ctfdUrl.trim(),
      categories: selectedCategories,
    });

    router.push("/admin/competitions");
  };

  return (
    <div className="max-w-4xl space-y-8 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/40 border border-red-900/60 text-red-400 font-mono text-xs font-bold mb-2">
            <PlusCircle className="h-3.5 w-3.5 text-red-500" />
            <span>AUTHORING STUDIO</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display uppercase">
            CREATE COMPETITION
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            Provision new tournament records, specify target dates, format, and domain challenge distributions.
          </p>
        </div>

        <Link
          href="/admin/competitions"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white bg-[#0d0d11] hover:bg-[#15151b] px-3.5 py-2 rounded-lg border border-zinc-800 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Cancel &amp; Return</span>
        </Link>
      </div>

      {/* Main Authoring Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 font-mono text-xs font-bold text-white uppercase tracking-wider">
            <Layers className="h-4 w-4 text-[#E31B2E]" />
            <span>1. Basic Tournament Information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                Tournament Title <span className="text-[#E31B2E]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. SirenCTF #02 Global"
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 font-sans text-sm focus:outline-none focus:border-[#E31B2E] focus:ring-1 focus:ring-[#E31B2E] transition-all"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                URL Identifier / Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. sirenctf-02-global"
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 font-mono text-xs focus:outline-none focus:border-[#E31B2E] focus:ring-1 focus:ring-[#E31B2E] transition-all"
              />
            </div>

            {/* Tagline */}
            <div className="md:col-span-2 space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                Tagline / Brief Summary
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. The premier collegiate security championship."
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 font-sans text-sm focus:outline-none focus:border-[#E31B2E] focus:ring-1 focus:ring-[#E31B2E] transition-all"
              />
            </div>

            {/* Format */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                Competition Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as CompetitionFormat)}
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3 py-2.5 font-mono text-xs focus:outline-none focus:border-[#E31B2E] cursor-pointer"
              >
                <option value="Jeopardy">Jeopardy</option>
                <option value="Attack-Defense">Attack-Defense</option>
                <option value="King of the Hill">King of the Hill</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                Target Skill Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3 py-2.5 font-mono text-xs focus:outline-none focus:border-[#E31B2E] cursor-pointer"
              >
                <option value="All Skill Levels">All Skill Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Lifecycle & Target Schedule */}
        <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 font-mono text-xs font-bold text-white uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-[#E31B2E]" />
            <span>2. Lifecycle Status &amp; Schedule Parameters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Initial Lifecycle Status */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                Initial Lifecycle Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CompetitionStatus)}
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3 py-2.5 font-mono text-xs focus:outline-none focus:border-[#E31B2E] cursor-pointer"
              >
                <option value="DRAFT">DRAFT (Internal Only)</option>
                <option value="ANNOUNCED">ANNOUNCED (Public Calendar)</option>
                <option value="REGISTRATION_OPEN">REGISTRATION_OPEN</option>
                <option value="LIVE">LIVE (Tournament Underway)</option>
              </select>
            </div>

            {/* Registration Status */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                Registration State
              </label>
              <select
                value={registrationStatus}
                onChange={(e) => setRegistrationStatus(e.target.value as RegistrationStatus)}
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3 py-2.5 font-mono text-xs focus:outline-none focus:border-[#E31B2E] cursor-pointer"
              >
                <option value="TBA">TBA</option>
                <option value="OPENING_SOON">OPENING_SOON</option>
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            {/* Target Start Date */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                Target Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3 py-2 font-mono text-xs focus:outline-none focus:border-[#E31B2E]"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                Tournament Duration (Hours)
              </label>
              <input
                type="number"
                min={1}
                max={168}
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3 py-2 font-mono text-xs focus:outline-none focus:border-[#E31B2E]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Safeguards & CTFd Engine Linkage */}
        <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 font-mono text-xs font-bold text-white uppercase tracking-wider">
            <Server className="h-4 w-4 text-[#E31B2E]" />
            <span>3. Safeguards &amp; CTFd Engine Linkage</span>
          </div>

          <div className="space-y-4">
            {/* Provisional Flag */}
            <label className="flex items-start gap-3 p-3 rounded bg-[#15151b] border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
              <input
                type="checkbox"
                checked={isProvisional}
                onChange={(e) => setIsProvisional(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-red-600 rounded bg-zinc-900 border-zinc-700"
              />
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-bold text-white uppercase block">
                  Provisional Event Specification Notice
                </span>
                <span className="text-xs text-zinc-400 font-sans block">
                  When enabled, public competition cards render disclaimers stating that schedule dates, prizes, and challenge counts are provisional pending final registration announcement.
                </span>
              </div>
            </label>

            {/* CTFd URL Input */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-300 uppercase">
                CTFd Base Instance URL (Optional)
              </label>
              <input
                type="url"
                value={ctfdUrl}
                onChange={(e) => setCtfdUrl(e.target.value)}
                placeholder="https://ctf.sirenctf.org"
                className="w-full bg-[#15151b] border border-zinc-700 text-white rounded-lg px-3.5 py-2.5 font-mono text-xs focus:outline-none focus:border-[#E31B2E]"
              />
              <p className="text-[11px] text-zinc-500 font-mono">
                When provided, live scoreboards and challenge feeds will link directly to this CTFd engine API.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Domain Categories Distribution */}
        <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 font-mono text-xs font-bold text-white uppercase tracking-wider">
            <CheckSquare className="h-4 w-4 text-[#E31B2E]" />
            <span>4. Challenge Domain Distribution</span>
          </div>

          <p className="text-xs text-zinc-400 font-sans">
            Select the domain categories active for this competition tournament:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            {ALL_CATEGORIES.map((cat) => {
              const isChecked = selectedCategories.includes(cat.slug);
              return (
                <div
                  key={cat.slug}
                  onClick={() => toggleCategory(cat.slug)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? "bg-red-950/20 border-red-900/60 text-white"
                      : "bg-[#15151b] border-zinc-800 text-zinc-400 opacity-60 hover:opacity-100"
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  ) : (
                    <Square className="h-4 w-4 text-zinc-600 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <div className="font-bold text-xs">{cat.label}</div>
                    <div className="text-[10px] text-zinc-400 font-sans mt-0.5">{cat.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Controls */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 font-mono">
          <Link
            href="/admin/competitions"
            className="px-4 py-2.5 rounded-lg border border-zinc-700 bg-[#15151b] text-zinc-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting || !name.trim()}
            className="px-6 py-2.5 rounded-lg bg-[#E31B2E] hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(227,27,46,0.4)]"
          >
            {submitting ? "Provisioning..." : "Create Competition (Draft)"}
          </button>
        </div>
      </form>
    </div>
  );
}
