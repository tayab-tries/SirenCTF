import { mockLeaderboardEntries } from "../data/mockData";
import { LeaderboardEntry } from "../types";
import { ctfdClient } from "./ctfd/client";
import { mapCTFdScoreboardToLeaderboard } from "./ctfd/mappers";

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  isLive: boolean;
  source: "ctfd" | "mock";
  lastUpdated: string;
}

export async function getLeaderboardWithMeta(
  competitionSlug?: string,
  limit?: number
): Promise<LeaderboardResponse> {
  const now = new Date().toISOString();

  if (ctfdClient.isConfigured()) {
    try {
      const ctfdData = await ctfdClient.getScoreboard();
      if (ctfdData && ctfdData.length > 0) {
        let mapped = mapCTFdScoreboardToLeaderboard(ctfdData);
        if (limit && limit > 0) {
          mapped = mapped.slice(0, limit);
        }
        return {
          entries: mapped,
          isLive: true,
          source: "ctfd",
          lastUpdated: now,
        };
      }
    } catch (error) {
      console.warn("[getLeaderboardWithMeta] CTFd fetch failed, falling back to mock data:", error);
    }
  }

  let data = [...mockLeaderboardEntries];
  if (limit && limit > 0) {
    data = data.slice(0, limit);
  }

  return {
    entries: data,
    isLive: false,
    source: "mock",
    lastUpdated: now,
  };
}

export async function getLeaderboard(
  competitionSlug?: string,
  limit?: number
): Promise<LeaderboardEntry[]> {
  const meta = await getLeaderboardWithMeta(competitionSlug, limit);
  return meta.entries;
}
