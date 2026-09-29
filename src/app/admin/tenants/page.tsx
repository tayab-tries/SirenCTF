import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Shield, 
  Box,
  Globe,
  ExternalLink
} from "lucide-react";
import { getTenants } from "@/lib/api/tenants";

export const metadata: Metadata = {
  title: "Tenant Fleet Management | SirenCTF Admin",
  description: "Multi-tenant organization fleet telemetry, academic tiers, and platform quota provisioning.",
};

export default async function AdminTenantsPage() {
  const tenants = await getTenants();

  const totalTenants = tenants.length;
  const academicCount = tenants.filter((t) => t.type === "UNIVERSITY").length;
  const totalCapacity = tenants.reduce((acc, t) => acc + t.quota.maxParticipantsPerEvent, 0);
  const provisioningCount = tenants.filter((t) => t.status === "PROVISIONING").length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/40 border border-red-900/60 text-red-400 font-mono text-xs font-bold mb-2">
            <Building2 className="h-3.5 w-3.5 text-red-500" />
            <span>MULTI-TENANT ORCHESTRATION</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display uppercase">
            TENANT FLEET // ORGANIZATIONS &amp; SOCIETIES
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            Registered universities, cybersecurity societies, enterprise instances, and quota allocations.
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white bg-[#0d0d11] hover:bg-[#15151b] px-3.5 py-2 rounded-lg border border-zinc-800 transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Console Overview</span>
        </Link>
      </div>

      {/* 4 Telemetry Strip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Tenants</span>
            <Building2 className="h-4 w-4 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">{totalTenants}</div>
          <div className="text-[10px] text-zinc-500">Active Organization Fleets</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Academic Institutions</span>
            <GraduationCap className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-cyan-400">{academicCount}</div>
          <div className="text-[10px] text-zinc-500">University Chapters</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Active Quota Capacity</span>
            <Users className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-amber-400">{totalCapacity.toLocaleString()}</div>
          <div className="text-[10px] text-zinc-500">Max Participant Seats</div>
        </div>

        <div className="p-5 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Provisioning Queues</span>
            <Clock className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-purple-400">{provisioningCount}</div>
          <div className="text-[10px] text-zinc-500">Pending Setup Verification</div>
        </div>
      </div>

      {/* Tenant Registry Table */}
      <div className="p-6 rounded-xl bg-[#0d0d11] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 font-mono text-xs">
          <span className="font-bold text-zinc-200 uppercase flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#E31B2E]" />
            <span>Organization Fleet Registry</span>
          </span>
          <span className="text-zinc-500">Multi-Tenant Sub-domain Ready</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                <th className="py-3 px-3">Organization Identity</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Plan Tier</th>
                <th className="py-3 px-3">Quota Allocations</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-[#15151b] transition-colors">
                  {/* Identity */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-[10px] text-zinc-400 font-sans mt-0.5">{t.branding.tagline}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-1 flex items-center gap-2">
                      <span className="text-red-400 font-bold">slug: {t.slug}</span>
                      <span>•</span>
                      <span>{t.contactEmail}</span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-3 align-top">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 font-mono text-[10px] uppercase font-semibold">
                      {t.type === "UNIVERSITY" && <GraduationCap className="h-3 w-3 text-cyan-400" />}
                      {t.type === "ENTERPRISE" && <Building2 className="h-3 w-3 text-red-400" />}
                      {t.type === "SOCIETY" && <Users className="h-3 w-3 text-amber-400" />}
                      {t.type === "COMMUNITY" && <Globe className="h-3 w-3 text-emerald-400" />}
                      <span>{t.type}</span>
                    </span>
                  </td>

                  {/* Plan Tier */}
                  <td className="py-4 px-3 align-top">
                    {t.plan === "ENTERPRISE_CUSTOM" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-red-900/60 bg-red-950/40 text-red-400 font-mono text-[10px] uppercase font-bold">
                        ENTERPRISE CUSTOM
                      </span>
                    )}
                    {t.plan === "ACADEMIC_TIER" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-cyan-900/60 bg-cyan-950/40 text-cyan-400 font-mono text-[10px] uppercase font-bold">
                        ACADEMIC TIER
                      </span>
                    )}
                    {t.plan === "FREE_COMMUNITY" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-800 bg-[#15151b] text-zinc-400 font-mono text-[10px] uppercase font-medium">
                        FREE COMMUNITY
                      </span>
                    )}
                  </td>

                  {/* Quota Allocations */}
                  <td className="py-4 px-3 align-top">
                    <div className="space-y-0.5">
                      <div className="font-bold text-white text-[11px]">
                        Max {t.quota.maxParticipantsPerEvent} Seats • {t.quota.maxActiveTournaments} Tournaments
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-2">
                        {t.quota.dynamicContainersEnabled ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <Box className="h-2.5 w-2.5" /> Docker Active
                          </span>
                        ) : (
                          <span className="text-zinc-500">Static Artifacts Only</span>
                        )}
                        <span>•</span>
                        {t.quota.customCertificatesEnabled ? (
                          <span className="text-cyan-400">Cert Engine On</span>
                        ) : (
                          <span className="text-zinc-500">Standard Certs</span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Status & Actions */}
                  <td className="py-4 px-3 align-top text-right space-y-2">
                    <div>
                      {t.status === "ACTIVE" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-900/60 bg-emerald-950/40 text-emerald-400 font-mono text-[10px] uppercase font-bold">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>ACTIVE</span>
                        </span>
                      )}
                      {t.status === "PROVISIONING" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-purple-900/60 bg-purple-950/40 text-purple-400 font-mono text-[10px] uppercase font-bold">
                          <Clock className="h-3 w-3 animate-pulse" />
                          <span>PROVISIONING</span>
                        </span>
                      )}
                      {t.status === "SUSPENDED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-rose-900/60 bg-rose-950/40 text-rose-400 font-mono text-[10px] uppercase font-bold">
                          <AlertCircle className="h-3 w-3" />
                          <span>SUSPENDED</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <Link
                        href={`/org/${t.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300 font-bold underline font-mono"
                      >
                        <span>View Portal</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
