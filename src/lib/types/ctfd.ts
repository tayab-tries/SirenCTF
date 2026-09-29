export interface CTFdResponse<T> {
  success: boolean;
  data: T;
  errors?: string[];
}

export interface CTFdChallenge {
  id: number;
  name: string;
  category: string;
  value: number;
  solves: number;
  state: "visible" | "hidden";
  type: string;
}

export interface CTFdScoreboardEntry {
  pos: number;
  account_id: number;
  name: string;
  score: number;
  members?: {
    id: number;
    name: string;
  }[];
}

export interface CTFdSolve {
  id: number;
  challenge_id: number;
  team_id: number;
  user_id: number;
  date: string;
}
