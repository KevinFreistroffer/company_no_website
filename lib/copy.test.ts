import { describe, expect, it } from "vitest";
import {
  customerAbout,
  defaultCustomerAbout,
  isResearchSentence,
  mapsEmbedUrl,
  splitHighlights,
} from "@/lib/copy";

describe("customerAbout", () => {
  it("drops research meta and keeps the shop story", () => {
    const about =
      "Alvey's Automotive is an independent garage at 2344 New Holt Rd in Paducah, Kentucky. MapQuest describes oil changes and brake repairs. No official website was found.";
    expect(customerAbout(about, "fallback")).toContain("independent garage");
    expect(customerAbout(about, "fallback")).not.toMatch(/MapQuest|website was found/i);
  });

  it("uses fallback when only research sentences remain", () => {
    const about = "No official website was found. Directories list the shop on MapQuest.";
    expect(customerAbout(about, "Call the shop in Paducah.")).toBe(
      "Call the shop in Paducah.",
    );
  });
});

describe("isResearchSentence", () => {
  it("flags directory sourcing language", () => {
    expect(isResearchSentence("Directories name owner Morris Alvey.")).toBe(true);
    expect(
      isResearchSentence("Alvey's Automotive is an independent garage in Paducah."),
    ).toBe(false);
  });
});

describe("splitHighlights", () => {
  it("keeps owner facts and moves directory caveats aside", () => {
    const { story, confirm } = splitHighlights([
      "Owner listed as Morris Alvey",
      "Independent Paducah shop, not a dealership",
      "MapQuest lists major credit cards",
      "Some directories show a second phone, (270) 443-6617",
    ]);
    expect(story).toContain("Owner listed as Morris Alvey");
    expect(story).toContain("Independent Paducah shop, not a dealership");
    expect(confirm.some((item) => /MapQuest/i.test(item))).toBe(true);
    expect(confirm.some((item) => /second phone/i.test(item))).toBe(true);
  });
});

describe("mapsEmbedUrl", () => {
  it("encodes a city-qualified address", () => {
    expect(
      mapsEmbedUrl({
        address: "2344 New Holt Rd",
        city: "Paducah",
        state: "KY",
      }),
    ).toContain(encodeURIComponent("2344 New Holt Rd, Paducah, KY"));
  });
});

describe("defaultCustomerAbout", () => {
  it("builds a short local intro", () => {
    expect(
      defaultCustomerAbout({
        name: "Alvey's Automotive",
        categoryLabel: "Auto Repair",
        city: "Paducah",
        state: "KY",
        address: "2344 New Holt Rd",
      }),
    ).toContain("Paducah, KY");
  });
});
