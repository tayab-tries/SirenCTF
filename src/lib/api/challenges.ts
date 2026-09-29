import { mockChallengeRecords } from "../data/challengeSpecs";
import { ChallengeRecord } from "../types";

export async function getChallengeRecords(): Promise<ChallengeRecord[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChallengeRecords);
    }, 10);
  });
}
