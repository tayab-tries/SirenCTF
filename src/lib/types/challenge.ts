import { CategorySlug } from "./index";

export type ChallengeType = "DYNAMIC_CONTAINER" | "STATIC_ARTIFACT" | "MANAGED_SERVICE";

export interface ContainerDeploymentSpec {
  image: string;
  internalPort: number;
  memoryLimit: string; // e.g. "128MB"
  cpuLimit: string;    // e.g. "0.25"
  timeoutMinutes: number;
  networkIsolation: "NONE" | "INTERNAL_ONLY" | "EGRESS_FILTERED";
  envVars?: Record<string, string>;
}

export interface ChallengeRecord {
  id: string;
  title: string;
  category: CategorySlug;
  difficulty: "Easy" | "Medium" | "Hard" | "Insane";
  points: number;
  type: ChallengeType;
  flagPattern: string; // e.g. "siren{[a-f0-9]+}"
  containerSpec?: ContainerDeploymentSpec;
  artifactUrl?: string;
  isIsolated: boolean;
  author: string;
  status: "DEPLOYED" | "STANDBY" | "DRAFT";
}
