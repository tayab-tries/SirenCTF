export type CompetitionStatus = 
  | "DRAFT" 
  | "ANNOUNCED" 
  | "REGISTRATION_OPEN" 
  | "LIVE" 
  | "ENDED" 
  | "ARCHIVED";

export type RegistrationStatus = 
  | "TBA" 
  | "OPENING_SOON" 
  | "OPEN" 
  | "CLOSED";

export type CompetitionFormat = "Jeopardy" | "Attack-Defense" | "King of the Hill" | "Mixed";

export type CategorySlug = 
  | "web" 
  | "crypto" 
  | "forensics" 
  | "osint" 
  | "rev" 
  | "pwn" 
  | "linux" 
  | "misc";

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  challengeCount: number;
  iconName: string;
  colorBadge: string;
  isProvisional?: boolean;
}

export interface ChallengeSummary {
  id: string;
  title: string;
  category: CategorySlug;
  points: number;
  solves: number;
  isProvisional?: boolean;
}

export interface Competition {
  id: string;
  slug: string;
  name: string; // e.g. "SirenCTF #01", "SirenCTF #00 Beta"
  tagline: string;
  description: string;
  status: CompetitionStatus;
  registrationStatus: RegistrationStatus;
  isProvisional?: boolean;
  ctfdUrl?: string;          // Pointer for future CTFd engine integration
  registrationUrl?: string;  // External/internal registration link when live
  format: CompetitionFormat;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  durationHours: number;
  teamSize: string;  // e.g. "1 - 4 Members"
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Skill Levels";
  prizePool: string; // e.g. "$2,500 + Badges & Certificates" or "TBA"
  participantCount: number;
  teamCount: number;
  challengeCount: number;
  categories: CategorySlug[];
  bannerUrl?: string;
  winner?: {
    teamName: string;
    score: number;
    countryCode?: string;
  };
  rules: string[];
  schedule: { time: string; event: string }[];
  prizes: { rank: string; reward: string; detail?: string }[];
  organizers: string[];
}

export interface LeaderboardEntry {
  rank: number;
  teamId: string;
  teamName: string;
  affiliation?: string;
  countryCode: string;
  score: number;
  solvesCount: number;
  lastSolveTime: string;
  categoryBreakdown: Record<CategorySlug, number>;
  trend: "up" | "down" | "steady";
}

export type AchievementType = "WINNER" | "PODIUM" | "TOP_TEN" | "PARTICIPATION" | "HONORABLE_MENTION";

export interface Certificate {
  id: string; // e.g. "SRN-2025-8F92A"
  participantName: string;
  teamName: string;
  competitionId: string;
  competitionName: string;
  achievementType: AchievementType;
  achievementTitle: string; // e.g. "1st Place Champions" or "Verified Participant"
  achievement?: string; // Alias for backward compatibility
  placementRank?: number;
  totalTeams?: number;
  issueDate: string;
  issuer: string;
  verificationHash: string; // SHA-256 fingerprint string
  isValid: boolean;
  isDemoRecord?: boolean; // explicit flag for sample/preview records
  metadata: {
    totalSolves: number;
    totalPoints: number;
    categoriesMastered: string[];
  };
}

export interface WinnerEntry {
  competitionId: string;
  competitionName: string;
  date: string;
  topTeams: {
    rank: number;
    teamName: string;
    score: number;
    members: string[];
    countryCode: string;
    prize: string;
  }[];
  highlight: string;
}

export interface CommunityChannel {
  id: string;
  platform: "Discord" | "WhatsApp" | "GitHub" | "X / Twitter";
  name: string;
  description: string;
  memberCount: string;
  url: string;
  isPrimary?: boolean;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  status: "CURRENT" | "PLANNED" | "FUTURE";
  description: string;
  features: string[];
}

export * from "./organizer";
export * from "./challenge";
