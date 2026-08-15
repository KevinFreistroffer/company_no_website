import catalog from "@/data/catalog.json";
import type { Business } from "@/lib/types";

export function loadBusinesses(): Business[] {
  return catalog as Business[];
}

export function getBusiness(slug: string): Business | undefined {
  return loadBusinesses().find((business) => business.slug === slug);
}
