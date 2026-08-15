import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildCatalog } from "@/lib/buildCatalog";
import { mergeCsvSources, parseCsv } from "@/lib/csv";
import { businessSlug, slugify } from "@/lib/slug";
import { templateForCategory } from "@/lib/template";
import { enrichmentBySlug } from "@/data/enrichment";
import type { TemplateId } from "@/lib/types";

function csv(name: string): string {
  return readFileSync(join(process.cwd(), name), "utf8");
}

const groups = [
  { text: csv("results.csv"), sourceFile: "results.csv" },
  {
    text: csv("sample_no_website_businesses.csv"),
    sourceFile: "sample_no_website_businesses.csv",
  },
  {
    text: csv("no_website_businesses_master.csv"),
    sourceFile: "no_website_businesses_master.csv",
  },
];

describe("parseCsv", () => {
  it("reads quoted fields with commas", () => {
    const rows = parseCsv(
      'business_name,city\n"Neal Baeten Autobody, Inc.",Astoria\n',
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]?.business_name).toBe("Neal Baeten Autobody, Inc.");
  });
});

describe("catalog ingest", () => {
  it("dedupes CSV sources to unique businesses", () => {
    const rows = mergeCsvSources(groups);
    const catalog = buildCatalog(groups);
    expect(rows.length).toBeGreaterThan(0);
    expect(catalog).toHaveLength(rows.length);
    expect(new Set(catalog.map((business) => business.slug)).size).toBe(rows.length);
  });

  it("includes names from every source file", () => {
    const catalog = buildCatalog(groups);
    const names = new Set(catalog.map((business) => business.name));
    expect(names.has("Sea J's Cafe")).toBe(true);
    expect(names.has("Clark Auto Body & Frame")).toBe(true);
    expect(names.has("The Madcutter (Hair by Chell)")).toBe(true);
  });

  it("keeps enrichment slugs in the catalog", () => {
    const catalog = buildCatalog(groups, {
      "sea-j-s-cafe-port-townsend-wa": {
        slug: "sea-j-s-cafe-port-townsend-wa",
        tagline: "Waterfront fish and chips",
      },
    });
    const seaJs = catalog.find((business) => business.slug === "sea-j-s-cafe-port-townsend-wa");
    expect(seaJs?.tagline).toBe("Waterfront fish and chips");
  });

  it("applies a client menu from enrichment", () => {
    const catalog = buildCatalog(groups, {
      "sea-j-s-cafe-port-townsend-wa": {
        slug: "sea-j-s-cafe-port-townsend-wa",
        offerings: {
          sections: [
            {
              heading: "From the fryer",
              items: [{ name: "Fish and chips", notes: "Owner: keep this first." }],
            },
          ],
        },
      },
    });
    const seaJs = catalog.find((business) => business.slug === "sea-j-s-cafe-port-townsend-wa");
    expect(seaJs?.offerings.navLabel).toBe("Menu");
    expect(seaJs?.offerings.sections[0]?.items[0]?.name).toBe("Fish and chips");
    expect(seaJs?.offerings.sections[0]?.items[0]?.notes).toContain("Owner");
  });

  it("applies every enrichment key to a real slug", () => {
    const catalog = buildCatalog(groups, enrichmentBySlug);
    const slugs = new Set(catalog.map((business) => business.slug));
    for (const slug of Object.keys(enrichmentBySlug)) {
      expect(slugs.has(slug)).toBe(true);
    }
  });

  it("gives every business a tagline, about blurb, and offerings list", () => {
    const catalog = buildCatalog(groups, enrichmentBySlug);
    expect(Object.keys(enrichmentBySlug).length).toBeGreaterThan(0);
    for (const business of catalog) {
      expect(business.tagline.length).toBeGreaterThan(8);
      expect(business.about.length).toBeGreaterThan(40);
      expect(business.offerings.sections.length).toBeGreaterThan(0);
      expect(business.offerings.sections[0]?.items.length).toBeGreaterThan(0);
    }
  });
});

describe("slugify", () => {
  it("builds stable business slugs", () => {
    expect(slugify("Sea J's Cafe")).toBe("sea-j-s-cafe");
    expect(businessSlug("Sea J's Cafe", "Port Townsend", "WA")).toBe(
      "sea-j-s-cafe-port-townsend-wa",
    );
    expect(
      businessSlug(
        "Auto Beauty Shop (listed on review aggregators as The Beauty Shop)",
        "Selma",
        "AL",
      ),
    ).toBe("auto-beauty-shop-selma-al");
  });
});

describe("templateForCategory", () => {
  const cases: [string, TemplateId][] = [
    ["amenity:restaurant", "food"],
    ["amenity:cafe", "food"],
    ["amenity:pub", "food"],
    ["amenity:fast_food", "food"],
    ["shop:hairdresser", "salon"],
    ["shop:beauty", "salon"],
    ["Barber shop", "salon"],
    ["shop:car_repair", "auto"],
    ["Auto body shop", "auto"],
    ["shop:tyres", "auto"],
    ["Towing / auto repair", "auto"],
    ["shop:convenience", "retail"],
    ["shop:hardware", "retail"],
    ["shop:tattoo", "studio"],
    ["amenity:laundry", "laundry"],
    ["shop:dry_cleaning", "laundry"],
    ["shop:second_hand", "thrift"],
    ["shop:charity", "thrift"],
    ["Plumber", "trade"],
  ];

  it.each(cases)("maps %s to %s", (category, expected) => {
    expect(templateForCategory(category)).toBe(expected);
  });

  it("maps donut and ice cream names to food even without a food category", () => {
    expect(templateForCategory("shop:convenience", "Sweet Scoops market")).toBe("food");
    expect(templateForCategory("shop:hardware", "Western Auto & Appliance")).toBe(
      "retail",
    );
  });
});
