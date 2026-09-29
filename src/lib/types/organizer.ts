export type OrganizerRole = "PLATFORM_ADMIN" | "ORGANIZER" | "CHALLENGE_AUTHOR";

export interface OrganizerUser {
  id: string;
  name: string;
  email: string;
  role: OrganizerRole;
  organizationName?: string;
  managedCompetitionIds: string[];
}

export interface AdminTelemetrySummary {
  totalCompetitions: number;
  activeTournaments: number;
  totalParticipants: number;
  pendingCertificates: number;
}
