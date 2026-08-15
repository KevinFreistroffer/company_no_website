import { mergeCsvSources } from "@/lib/csv";
import { suggestDomains } from "@/lib/domains";
import { cleanBusinessName, businessSlug } from "@/lib/slug";
import {
  categoryLabel,
  defaultServices,
  defaultTagline,
  templateForCategory,
} from "@/lib/template";
import { themeFor } from "@/lib/theme";
import type { Business, CsvRow, Enrichment } from "@/lib/types";

const WEBSITE_NOTE =
  /\b(no (owned |company |official |independent )?(website|domain)|web search found|website field|facebook[_ ]only|aggregator|not a (company )?site)\b/i;

function usableNoteSentences(notes: string): string[] {
  return notes
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 20 && !WEBSITE_NOTE.test(sentence))
    .slice(0, 2);
}

function defaultAbout(name: string, row: CsvRow, label: string): string {
  const lead = `${name} is a locally owned ${label.toLowerCase()} in ${row.city}, ${row.state}.`;
  const extra = usableNoteSentences(row.notes);
  if (extra.length === 0) {
    return `${lead} This proposed site gathers public listing details so customers can find services, location, and a phone number in one place.`;
  }
  return `${lead} ${extra.join(" ")}`;
}

function defaultHighlights(row: CsvRow): string[] {
  const highlights: string[] = [`Locally owned in ${row.city}, ${row.state}`];
  const established = row.notes.match(
    /(?:since|established|founded|est\.?|opened)\s*(?:~)?(\d{4})/i,
  );
  if (established) {
    highlights.push(`Serving the area since around ${established[1]}`);
  }
  if (/family-owned|family owned/i.test(row.notes)) {
    highlights.push("Family-owned");
  }
  if (/independent/i.test(row.notes)) {
    highlights.push("Independent, not a chain");
  }
  if (/cash[ -]?only/i.test(row.notes)) {
    highlights.push("Often listed as cash only — confirm when you visit");
  }
  return highlights.slice(0, 5);
}

export function rowToBusiness(row: CsvRow, enrichment?: Enrichment): Business {
  const name = cleanBusinessName(row.name);
  const template = templateForCategory(row.category);
  const label = categoryLabel(row.category, template);
  const slug = businessSlug(row.name, row.city, row.state);
  const phone = row.phone.length > 0 ? row.phone : null;
  const base: Business = {
    slug,
    name,
    category: row.category,
    categoryLabel: label,
    template,
    address: row.address,
    city: row.city,
    state: row.state,
    phone,
    mapsUrl: row.mapsUrl,
    tagline: defaultTagline(name, label, row.city, row.state),
    about: defaultAbout(name, row, label),
    services: defaultServices(template),
    hours: null,
    highlights: defaultHighlights(row),
    sources: row.mapsUrl ? [{ label: "Google Maps listing", url: row.mapsUrl }] : [],
    suggestedDomains: suggestDomains(name, row.city, row.state),
    theme: themeFor(slug, template),
    paymentNotes: null,
    established: null,
    notes: row.notes,
  };

  if (!enrichment) {
    return base;
  }

  return {
    ...base,
    tagline: enrichment.tagline ?? base.tagline,
    about: enrichment.about ?? base.about,
    services: enrichment.services ?? base.services,
    hours: enrichment.hours === undefined ? base.hours : enrichment.hours,
    highlights: enrichment.highlights ?? base.highlights,
    sources: enrichment.sources ?? base.sources,
    suggestedDomains: enrichment.suggestedDomains ?? base.suggestedDomains,
    paymentNotes: enrichment.paymentNotes ?? base.paymentNotes,
    established: enrichment.established ?? base.established,
  };
}

export function buildCatalog(
  groups: { text: string; sourceFile: string }[],
  enrichmentBySlug: Record<string, Enrichment> = {},
): Business[] {
  const rows = mergeCsvSources(groups);
  return rows
    .map((row) => {
      const slug = businessSlug(row.name, row.city, row.state);
      return rowToBusiness(row, enrichmentBySlug[slug]);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
