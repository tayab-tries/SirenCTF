import { mockCertificates } from "../data/mockData";
import { Certificate } from "../types";

export async function getCertificateById(id: string): Promise<Certificate | null> {
  return new Promise((resolve) => {
    const formattedId = id.trim().toUpperCase();
    const found = mockCertificates[formattedId] || null;
    setTimeout(() => resolve(found), 10);
  });
}

export async function getAllCertificates(): Promise<Certificate[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Object.values(mockCertificates)), 10);
  });
}
