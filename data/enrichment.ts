import records from "@/data/enrichment-records.json";
import type { Enrichment } from "@/lib/types";

// Put owner menus, prices, and notes on a record's `offerings` field.
// That replaces the demo list for that business without changing the template.
export const enrichmentBySlug: Record<string, Enrichment> = Object.fromEntries(
  (records as Enrichment[]).map((record) => [record.slug, record]),
);
