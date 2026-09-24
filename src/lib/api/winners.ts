import { mockWinners, mockCommunityChannels, mockRoadmap } from "../data/mockData";
import { WinnerEntry, CommunityChannel, RoadmapPhase } from "../types";

export async function getWinners(): Promise<WinnerEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockWinners]), 10);
  });
}

export async function getCommunityChannels(): Promise<CommunityChannel[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockCommunityChannels]), 10);
  });
}

export async function getRoadmap(): Promise<RoadmapPhase[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockRoadmap]), 10);
  });
}

export interface PlatformStats {
  competitionsCount: number;
  totalParticipants: number;
  totalFlagsCaptured: number;
  prizePoolDistributed: string;
  verifiedCertificatesIssued: number;
}

export async function getPlatformStats(): Promise<PlatformStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        competitionsCount: 3,
        totalParticipants: 1910,
        totalFlagsCaptured: 4280,
        prizePoolDistributed: "$6,500+",
        verifiedCertificatesIssued: 312
      });
    }, 10);
  });
}
