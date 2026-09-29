import { mockCompetitions, mockCertificates } from "../data/mockData";
import { Competition, CategorySlug, CompetitionStatus, AdminTelemetrySummary } from "../types";

export async function getAdminTelemetry(): Promise<AdminTelemetrySummary> {
  return new Promise((resolve) => {
    const totalCompetitions = mockCompetitions.length;
    const activeTournaments = mockCompetitions.filter(
      (c) => c.status === "LIVE" || c.status === "REGISTRATION_OPEN" || c.status === "ANNOUNCED"
    ).length;
    const totalParticipants = mockCompetitions.reduce((acc, c) => acc + (c.participantCount || 0), 0);
    const pendingCertificates = Object.values(mockCertificates).filter((c) => !c.isValid).length;

    setTimeout(() => {
      resolve({
        totalCompetitions,
        activeTournaments,
        totalParticipants: totalParticipants > 0 ? totalParticipants : 1070,
        pendingCertificates,
      });
    }, 10);
  });
}

export async function updateCompetitionStatus(
  id: string,
  status: CompetitionStatus
): Promise<boolean> {
  return new Promise((resolve) => {
    const comp = mockCompetitions.find((c) => c.id === id || c.slug === id);
    if (comp) {
      comp.status = status;
      setTimeout(() => resolve(true), 10);
    } else {
      setTimeout(() => resolve(false), 10);
    }
  });
}

export async function createCompetition(payload: Partial<Competition>): Promise<Competition> {
  return new Promise((resolve) => {
    const newId = payload.id || `comp-${Date.now()}`;
    const slug = payload.slug || payload.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `comp-${Date.now()}`;
    
    const newComp: Competition = {
      id: newId,
      slug: slug,
      name: payload.name || "Untitled Competition",
      tagline: payload.tagline || "Provisional SirenCTF Competition",
      description: payload.description || "Provisional specification — official details will be published prior to launch.",
      status: payload.status || "DRAFT",
      registrationStatus: payload.registrationStatus || "TBA",
      isProvisional: payload.isProvisional !== undefined ? payload.isProvisional : true,
      ctfdUrl: payload.ctfdUrl || "",
      registrationUrl: payload.registrationUrl || "",
      format: payload.format || "Jeopardy",
      startDate: payload.startDate || new Date().toISOString(),
      endDate: payload.endDate || new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      durationHours: payload.durationHours || 48,
      teamSize: payload.teamSize || "1 - 4 Members",
      difficulty: payload.difficulty || "All Skill Levels",
      prizePool: payload.prizePool || "TBA",
      participantCount: 0,
      teamCount: 0,
      challengeCount: payload.categories ? payload.categories.length * 3 : 0,
      categories: payload.categories || ["web", "crypto", "forensics", "osint", "rev", "pwn", "linux", "misc"],
      rules: payload.rules || [
        "Attacking competition scoring infrastructure or other teams is strictly prohibited.",
        "Fair Play guidelines enforce individual and team integrity across all challenge categories."
      ],
      schedule: payload.schedule || [],
      prizes: payload.prizes || [],
      organizers: payload.organizers || ["SirenCTF Platform Admin"]
    };

    mockCompetitions.unshift(newComp);
    setTimeout(() => resolve(newComp), 10);
  });
}

export interface CategoryChallengeBreakdown {
  slug: CategorySlug;
  name: string;
  count: number;
  isAssigned: boolean;
  source: "mock" | "ctfd";
}

export interface CompetitionChallengesSummary {
  competitionId: string;
  competitionName: string;
  status: CompetitionStatus;
  ctfdUrl?: string;
  totalChallenges: number;
  source: "mock" | "ctfd";
  categories: CategoryChallengeBreakdown[];
}

export async function getCompetitionChallengesSummary(id: string): Promise<CompetitionChallengesSummary | null> {
  return new Promise((resolve) => {
    const comp = mockCompetitions.find((c) => c.id === id || c.slug === id);
    if (!comp) {
      setTimeout(() => resolve(null), 10);
      return;
    }

    const hasCtfd = Boolean(comp.ctfdUrl && comp.ctfdUrl.trim().length > 0);
    const source: "mock" | "ctfd" = hasCtfd ? "ctfd" : "mock";

    const allCategoriesList: { slug: CategorySlug; name: string; defaultCount: number }[] = [
      { slug: "web", name: "Web Exploitation", defaultCount: 5 },
      { slug: "crypto", name: "Cryptography", defaultCount: 4 },
      { slug: "forensics", name: "Digital Forensics", defaultCount: 4 },
      { slug: "osint", name: "OSINT", defaultCount: 3 },
      { slug: "rev", name: "Reverse Engineering", defaultCount: 4 },
      { slug: "pwn", name: "Binary Exploitation (Pwn)", defaultCount: 3 },
      { slug: "linux", name: "Linux Security", defaultCount: 3 },
      { slug: "misc", name: "Miscellaneous", defaultCount: 2 },
    ];

    const breakdowns: CategoryChallengeBreakdown[] = allCategoriesList.map((cat) => {
      const isAssigned = comp.categories ? comp.categories.includes(cat.slug) : true;
      const count = isAssigned ? (comp.isProvisional ? cat.defaultCount : Math.max(2, cat.defaultCount)) : 0;
      return {
        slug: cat.slug,
        name: cat.name,
        count: count,
        isAssigned,
        source,
      };
    });

    const total = breakdowns.reduce((acc, c) => acc + c.count, 0);

    setTimeout(() => {
      resolve({
        competitionId: comp.id,
        competitionName: comp.name,
        status: comp.status,
        ctfdUrl: comp.ctfdUrl,
        totalChallenges: comp.challengeCount > 0 ? comp.challengeCount : total,
        source,
        categories: breakdowns,
      });
    }, 10);
  });
}

