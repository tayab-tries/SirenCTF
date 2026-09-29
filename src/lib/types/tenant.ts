export type TenantType = "UNIVERSITY" | "SOCIETY" | "ENTERPRISE" | "COMMUNITY";
export type TenantPlan = "FREE_COMMUNITY" | "ACADEMIC_TIER" | "ENTERPRISE_CUSTOM";
export type TenantStatus = "ACTIVE" | "PROVISIONING" | "SUSPENDED";

export interface TenantBranding {
  displayName: string;
  tagline: string;
  logoUrl?: string;
  primaryAccentColor?: string;
}

export interface TenantQuota {
  maxActiveTournaments: number;
  maxParticipantsPerEvent: number;
  dynamicContainersEnabled: boolean;
  customCertificatesEnabled: boolean;
}

export interface Tenant {
  id: string;
  slug: string; // e.g. "siren-core", "nust-cyber", "fast-sec"
  name: string;
  type: TenantType;
  plan: TenantPlan;
  status: TenantStatus;
  contactEmail: string;
  branding: TenantBranding;
  quota: TenantQuota;
  createdAt: string;
}
