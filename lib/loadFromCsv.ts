import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildCatalog } from "@/lib/buildCatalog";
import { enrichmentBySlug } from "@/data/enrichment";
import type { Business } from "@/lib/types";

function readCsv(filename: string): string {
  return readFileSync(join(process.cwd(), filename), "utf8");
}

export function loadBusinessesFromCsv(): Business[] {
  return buildCatalog(
    [
      { text: readCsv("results.csv"), sourceFile: "results.csv" },
      {
        text: readCsv("sample_no_website_businesses.csv"),
        sourceFile: "sample_no_website_businesses.csv",
      },
      {
        text: readCsv("no_website_businesses_master.csv"),
        sourceFile: "no_website_businesses_master.csv",
      },
    ],
    enrichmentBySlug,
  );
}
