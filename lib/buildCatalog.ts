import { mergeCsvSources } from "@/lib/csv";
import { suggestDomains } from "@/lib/domains";
import { cleanBusinessName, businessSlug } from "@/lib/slug";
import {
  defaultAmenities,
  defaultOfferings,
  industryLabel,
  mergeOfferings,
} from "@/lib/industry";
import { completeFoodOfferings } from "@/lib/foodMenu";
import {
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
  const template = templateForCategory(row.category, name);
  const label = industryLabel(name, row.category, template);
  const slug = businessSlug(row.name, row.city, row.state);
  const phone = row.phone.length > 0 ? row.phone : null;
  const offerings = defaultOfferings(template, name, row.category, row.city);
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
    services: defaultAmenities(template, name, row.category),
    hours: null,
    highlights: defaultHighlights(row),
    sources: row.mapsUrl ? [{ label: "Google Maps listing", url: row.mapsUrl }] : [],
    suggestedDomains: suggestDomains(name, row.city, row.state),
    theme: themeFor(slug, template),
    paymentNotes: null,
    established: null,
    notes: row.notes,
    offerings,
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
    offerings: attachOfferings(template, offerings, enrichment?.offerings),
  };
}

function attachOfferings(
  template: ReturnType<typeof templateForCategory>,
  defaults: Business["offerings"],
  override: Enrichment["offerings"],
): Business["offerings"] {
  const merged = mergeOfferings(defaults, override);
  if (template === "food") {
    return completeFoodOfferings(merged);
  }
  return merged;
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
