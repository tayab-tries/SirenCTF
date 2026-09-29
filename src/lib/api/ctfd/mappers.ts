import { CTFdScoreboardEntry, CTFdChallenge } from "@/lib/types/ctfd";
import { LeaderboardEntry, Category, CategorySlug } from "@/lib/types";
import { mockCategories } from "@/lib/data/mockData";

export function mapCTFdScoreboardToLeaderboard(entries: CTFdScoreboardEntry[]): LeaderboardEntry[] {
  if (!Array.isArray(entries)) return [];

  return entries.map((entry, index) => {
    return {
      rank: entry.pos || index + 1,
      teamId: `ctfd-team-${entry.account_id || index + 1}`,
      teamName: entry.name || `Team #${entry.account_id || index + 1}`,
      affiliation: entry.members && entry.members.length > 0 ? entry.members.map((m) => m.name).join(", ") : undefined,
      countryCode: "UN",
      score: typeof entry.score === "number" ? entry.score : 0,
      solvesCount: 0,
      lastSolveTime: "Recently",
      categoryBreakdown: {
        web: 0,
        crypto: 0,
        forensics: 0,
        osint: 0,
        rev: 0,
        pwn: 0,
        linux: 0,
        misc: 0,
      },
      trend: "steady",
    };
  });
}

export function mapCTFdChallengesToCategories(challenges: CTFdChallenge[]): Category[] {
  if (!Array.isArray(challenges) || challenges.length === 0) {
    return mockCategories;
  }

  const categoryCounts: Record<string, number> = {};

  for (const ch of challenges) {
    if (ch.state === "visible") {
      const rawCat = (ch.category || "misc").toLowerCase().trim();
      categoryCounts[rawCat] = (categoryCounts[rawCat] || 0) + 1;
    }
  }

  return mockCategories.map((baseCat) => {
    const slug = baseCat.slug;
    const count = categoryCounts[slug] ?? categoryCounts[baseCat.name.toLowerCase()] ?? baseCat.challengeCount;
    return {
      ...baseCat,
      challengeCount: count,
      isProvisional: false,
    };
  });
}
