import { mockLeaderboardEntries } from "../data/mockData";
import { LeaderboardEntry } from "../types";

export async function getLeaderboard(competitionSlug?: string, limit?: number): Promise<LeaderboardEntry[]> {
  return new Promise((resolve) => {
    let data = [...mockLeaderboardEntries];
    if (limit && limit > 0) {
      data = data.slice(0, limit);
    }
    setTimeout(() => resolve(data), 10);
  });
}
