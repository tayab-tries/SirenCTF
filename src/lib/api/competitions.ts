import { mockCompetitions, mockCategories } from "../data/mockData";
import { Competition, Category } from "../types";

export async function getCompetitions(): Promise<Competition[]> {
  // Simulate network micro-latency for async architecture testing
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockCompetitions]), 10);
  });
}

export async function getFeaturedCompetition(): Promise<Competition | undefined> {
  const competitions = await getCompetitions();
  return competitions.find((c) => c.status === "UPCOMING" || c.status === "LIVE") || competitions[0];
}

export async function getCompetitionBySlug(slug: string): Promise<Competition | undefined> {
  const competitions = await getCompetitions();
  return competitions.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}

export async function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockCategories]), 10);
  });
}
