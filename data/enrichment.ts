import records from "@/data/enrichment-records.json";
import type { Enrichment } from "@/lib/types";

export const enrichmentBySlug: Record<string, Enrichment> = Object.fromEntries(
  (records as Enrichment[]).map((record) => [record.slug, record]),
);
