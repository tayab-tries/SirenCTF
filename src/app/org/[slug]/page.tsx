import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Globe, 
  ShieldCheck, 
  Trophy, 
  Box, 
  Award, 
  ArrowRight,
  ExternalLink,
  AlertOctagon,
  Radio,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { getTenantBySlug } from "@/lib/api/tenants";
import { getCompetitions } from "@/lib/api/competitions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tenant = await getTenantBySlug(params.slug);

  if (!tenant || tenant.status === "SUSPENDED") {
    return {
      title: "Organization Not Found | SirenCTF Platform",
      description: "The requested organization portal could not be found or is inactive.",
    };
  }

  return {
    title: `${tenant.branding.displayName} | Organization Portal | SirenCTF`,
    description: tenant.branding.tagline,
  };
}

export default async function TenantPortalPage({
  params,
}: {
  params: { slug: string };
}) {
  const tenant = await getTenantBySlug(params.slug);

  // If tenant not found or status is SUSPENDED, render a styled technical 404 card
  if (!tenant || tenant.status === "SUSPENDED") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full p-8 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-6 text-center shadow-2xl">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-950/40 border border-red-900/60 flex items-center justify-center text-red-500">
            <AlertOctagon className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-red-950/40 border border-red-900/40 text-red-400 font-mono text-[10px] uppercase font-bold">
              TENANT UNRESOLVED // 404
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase font-display">
              ORGANIZATION INACTIVE
            </h1>
            <p className="text-xs text-zinc-400 font-sans">
              The organization portal <code className="text-red-400 bg-red-950/30 px-1 py-0.5 rounded font-mono">/org/{params.slug}</code> does not exist or has been suspended by SirenCTF platform security.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#15151b] hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs font-bold border border-zinc-700 transition-colors"
          >
            &larr; Return to SirenCTF Home
          </Link>
        </div>
      </div>
    );
  }

  // Fetch all competitions and filter for this tenant
  const allCompetitions = await getCompetitions();
  const tenantCompetitions = allCompetitions.filter((c) => {
    if (tenant.slug === "siren-core") return true;
    return (
      c.organizers.some(
        (o) =>
          o.toLowerCase().includes(tenant.name.toLowerCase()) ||
          o.toLowerCase().includes(tenant.slug.toLowerCase()) ||
          o.toLowerCase().includes(tenant.branding.displayName.toLowerCase())
      ) || c.id === "comp-01" // Include sample flagship event if university
    );
  });

  const accentColor = tenant.branding.primaryAccentColor || "#E31B2E";

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Header & Branding Banner */}
      <div 
        className="p-8 sm:p-10 rounded-2xl bg-[#0d0d11] border space-y-6 relative overflow-hidden transition-all shadow-xl"
        style={{ borderColor: `${accentColor}40`, boxShadow: `0 0 30px ${accentColor}15` }}
      >
        {/* Background Subtle Ambient Gradient */}
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {/* Type Badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 uppercase font-semibold">
                {tenant.type === "UNIVERSITY" && <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />}
                {tenant.type === "ENTERPRISE" && <Building2 className="h-3.5 w-3.5 text-red-400" />}
                {tenant.type === "SOCIETY" && <Users className="h-3.5 w-3.5 text-amber-400" />}
                {tenant.type === "COMMUNITY" && <Globe className="h-3.5 w-3.5 text-emerald-400" />}
                <span>{tenant.type} ORGANIZER</span>
              </span>

              {/* Plan Tier Chip */}
              <span className="px-2.5 py-1 rounded border border-zinc-800 bg-[#15151b] text-zinc-400 uppercase font-bold">
                {tenant.plan.replace("_", " ")}
              </span>

              {/* Operational Status */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-900/60 bg-emerald-950/40 text-emerald-400 uppercase font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>VERIFIED ORGANIZER</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display uppercase">
              {tenant.branding.displayName}
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 font-sans max-w-2xl">
              {tenant.branding.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#15151b] border border-zinc-800 space-y-1">
              <span className="text-zinc-500 uppercase text-[10px] block">ORGANIZATION CONTACT</span>
              <span className="text-zinc-200 font-bold block">{tenant.contactEmail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Public-Safe Quota & Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Event Participant Seat Quota</span>
            <Users className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white">
            {tenant.quota.maxParticipantsPerEvent.toLocaleString()}
          </div>
          <div className="text-[10px] text-zinc-500">Concurrent Team Capacity</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Dynamic Containers</span>
            <Box className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {tenant.quota.dynamicContainersEnabled ? "ENABLED" : "STATIC ONLY"}
          </div>
          <div className="text-[10px] text-zinc-500">Isolated Challenge Sandboxing</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Achievement Credentials</span>
            <Award className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-cyan-400">
            {tenant.quota.customCertificatesEnabled ? "VERIFIED" : "STANDARD"}
          </div>
          <div className="text-[10px] text-zinc-500">Digital Certificate Issuance</div>
        </div>
      </div>

      {/* Hosted Competitions Matrix */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 font-bold uppercase">
              <Trophy className="h-4 w-4 text-[#E31B2E]" />
              <span>HOSTED COMPETITION ARENAS</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-display uppercase mt-1">
              AFFILIATED TOURNAMENTS
            </h2>
          </div>
        </div>

        {tenantCompetitions.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-3 font-mono">
            <Radio className="h-8 w-8 text-zinc-600 mx-auto animate-pulse" />
            <div className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
              NO ACTIVE ARENAS // SCHEDULED TOURNAMENTS WILL APPEAR HERE
            </div>
            <p className="text-xs text-zinc-500 font-sans max-w-md mx-auto">
              This organization has not published any live or upcoming tournament schedules yet. Check back soon for official announcements.
            </p>
          </div>
        ) : (
          /* Tournament Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tenantCompetitions.map((comp) => (
              <div
                key={comp.id}
                className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 hover:border-zinc-700 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge status={comp.status} size="sm" />
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">
                      {comp.format}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      {comp.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans mt-1 line-clamp-2">
                      {comp.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                    <span>
                      {comp.isProvisional
                        ? "Target: Q4 2026"
                        : new Date(comp.startDate).toLocaleDateString()}
                    </span>
                  </div>

                  <Link
                    href={`/competitions/${comp.slug}`}
                    className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold transition-colors"
                  >
                    <span>View Arena</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
