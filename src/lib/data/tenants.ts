import { Tenant } from "../types";

export const mockTenants: Tenant[] = [
  {
    id: "tenant-siren-core",
    slug: "siren-core",
    name: "SirenCTF Platform Core",
    type: "ENTERPRISE",
    plan: "ENTERPRISE_CUSTOM",
    status: "ACTIVE",
    contactEmail: "admin@sirenctf.org",
    branding: {
      displayName: "SirenCTF Official",
      tagline: "The premier cybersecurity competition platform",
      primaryAccentColor: "#E31B2E"
    },
    quota: {
      maxActiveTournaments: 10,
      maxParticipantsPerEvent: 5000,
      dynamicContainersEnabled: true,
      customCertificatesEnabled: true
    },
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "tenant-nust-cyber",
    slug: "nust-cyber",
    name: "NUST Cyber Security Society",
    type: "UNIVERSITY",
    plan: "ACADEMIC_TIER",
    status: "ACTIVE",
    contactEmail: "cybersec@nust.edu.pk",
    branding: {
      displayName: "NUST CyberSec",
      tagline: "National University of Sciences & Technology Cyber Club",
      primaryAccentColor: "#00E5FF"
    },
    quota: {
      maxActiveTournaments: 3,
      maxParticipantsPerEvent: 1000,
      dynamicContainersEnabled: true,
      customCertificatesEnabled: true
    },
    createdAt: "2025-09-15T10:30:00Z"
  },
  {
    id: "tenant-fast-sec",
    slug: "fast-sec",
    name: "FAST NUCES Security Chapter",
    type: "UNIVERSITY",
    plan: "ACADEMIC_TIER",
    status: "ACTIVE",
    contactEmail: "security@fast.edu.pk",
    branding: {
      displayName: "FAST-Sec",
      tagline: "FAST National University Cybersecurity Chapter",
      primaryAccentColor: "#00FF66"
    },
    quota: {
      maxActiveTournaments: 2,
      maxParticipantsPerEvent: 800,
      dynamicContainersEnabled: true,
      customCertificatesEnabled: true
    },
    createdAt: "2025-11-20T14:00:00Z"
  },
  {
    id: "tenant-air-sec",
    slug: "air-sec",
    name: "Air University Cyber Alliance",
    type: "SOCIETY",
    plan: "FREE_COMMUNITY",
    status: "PROVISIONING",
    contactEmail: "info@airsec-society.org",
    branding: {
      displayName: "AirSec Society",
      tagline: "Student cybersecurity research group",
      primaryAccentColor: "#FFB000"
    },
    quota: {
      maxActiveTournaments: 1,
      maxParticipantsPerEvent: 300,
      dynamicContainersEnabled: false,
      customCertificatesEnabled: false
    },
    createdAt: "2026-02-05T09:15:00Z"
  }
];
