import { mockTenants } from "../data/tenants";
import { Tenant } from "../types";

export async function getTenants(): Promise<Tenant[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTenants);
    }, 10);
  });
}

export async function getTenantBySlug(slug: string): Promise<Tenant | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tenant = mockTenants.find((t) => t.slug === slug || t.id === slug);
      resolve(tenant);
    }, 10);
  });
}
