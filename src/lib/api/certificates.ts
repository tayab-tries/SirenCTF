import { mockCertificates } from "../data/mockData";
import { Certificate } from "../types";

export interface VerificationResult {
  status: "VALID" | "REVOKED" | "NOT_FOUND";
  record: Certificate | null;
  checkedAt: string;
  isDemo: boolean;
  notice?: string;
}

export async function verifyCertificateRecord(id: string): Promise<VerificationResult> {
  const formattedId = id.trim().toUpperCase();
  const checkedAt = new Date().toISOString();
  const found = mockCertificates[formattedId] || null;

  if (!found) {
    return {
      status: "NOT_FOUND",
      record: null,
      checkedAt,
      isDemo: false,
      notice: "No SirenCTF achievement record matches the provided identifier.",
    };
  }

  const isDemo = Boolean(found.isDemoRecord);
  const status = found.isValid ? "VALID" : "REVOKED";

  return {
    status,
    record: found,
    checkedAt,
    isDemo,
    notice: isDemo
      ? "This is a demonstration achievement record issued for platform testing."
      : undefined,
  };
}

export async function getCertificateById(id: string): Promise<Certificate | null> {
  const result = await verifyCertificateRecord(id);
  return result.record;
}

export async function getAllCertificates(): Promise<Certificate[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Object.values(mockCertificates)), 10);
  });
}
