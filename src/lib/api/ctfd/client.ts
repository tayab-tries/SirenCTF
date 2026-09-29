import { CTFdResponse, CTFdChallenge, CTFdScoreboardEntry } from "@/lib/types/ctfd";

export class CTFdClient {
  private baseUrl: string | undefined;
  private token: string | undefined;

  constructor() {
    this.baseUrl = process.env.CTFD_API_URL?.replace(/\/$/, "");
    this.token = process.env.CTFD_API_TOKEN;
  }

  public isConfigured(): boolean {
    return Boolean(this.baseUrl && this.baseUrl.trim().length > 0);
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Token ${this.token}`;
    }
    return headers;
  }

  public async getChallenges(): Promise<CTFdChallenge[]> {
    if (!this.isConfigured()) return [];
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${this.baseUrl}/api/v1/challenges`, {
        headers: this.getHeaders(),
        signal: controller.signal,
        next: { revalidate: 60 },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        console.warn(`[CTFdClient] getChallenges HTTP ${res.status}`);
        return [];
      }

      const json: CTFdResponse<CTFdChallenge[]> = await res.json();
      return json.success && Array.isArray(json.data) ? json.data : [];
    } catch (error) {
      console.warn("[CTFdClient] getChallenges fetch error:", error);
      return [];
    }
  }

  public async getScoreboard(): Promise<CTFdScoreboardEntry[]> {
    if (!this.isConfigured()) return [];
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${this.baseUrl}/api/v1/scoreboard`, {
        headers: this.getHeaders(),
        signal: controller.signal,
        next: { revalidate: 30 },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        console.warn(`[CTFdClient] getScoreboard HTTP ${res.status}`);
        return [];
      }

      const json: CTFdResponse<CTFdScoreboardEntry[]> = await res.json();
      return json.success && Array.isArray(json.data) ? json.data : [];
    } catch (error) {
      console.warn("[CTFdClient] getScoreboard fetch error:", error);
      return [];
    }
  }
}

export const ctfdClient = new CTFdClient();
