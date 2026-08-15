import { describe, expect, it } from "vitest";
import { completeFoodItem, completeFoodOfferings, dishPresetFor } from "@/lib/foodMenu";
import { defaultOfferings } from "@/lib/industry";

describe("dishPresetFor", () => {
  it("matches known dishes and keyword fallbacks", () => {
    expect(dishPresetFor("Fish and chips").price).toBe("$18");
    expect(dishPresetFor("Fish and chips").image).toContain("images.unsplash.com");
    expect(dishPresetFor("Green chile plates").description).toMatch(/chile/i);
    expect(dishPresetFor("Something invented").price).toBe("$12");
  });
});

describe("completeFoodItem", () => {
  it("fills photo, description, and price without wiping client notes", () => {
    const filled = completeFoodItem({
      name: "Fish and chips",
      notes: "Owner: keep this first.",
    });
    expect(filled.description).toMatch(/fish/i);
    expect(filled.price).toBe("$18");
    expect(filled.image).toMatch(/^https:\/\/images\.unsplash\.com\//);
    expect(filled.notes).toBe("Owner: keep this first.");
  });

  it("keeps a client-supplied photo, description, and price", () => {
    const filled = completeFoodItem({
      name: "Fish and chips",
      description: "Cod, twice-fried chips.",
      price: "$19",
      image: "https://example.com/cod.jpg",
    });
    expect(filled.description).toBe("Cod, twice-fried chips.");
    expect(filled.price).toBe("$19");
    expect(filled.image).toBe("https://example.com/cod.jpg");
  });
});

describe("food menus", () => {
  it("gives every default food item a photo, description, and price", () => {
    const menu = defaultOfferings(
      "food",
      "Alfonso's Mexican Food",
      "amenity:restaurant",
      "Raton",
    );
    const items = menu.sections.flatMap((section) => section.items);
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item.description?.length).toBeGreaterThan(8);
      expect(item.price?.length).toBeGreaterThan(0);
      expect(item.image).toMatch(/^https:\/\/images\.unsplash\.com\//);
    }
  });

  it("completes a client menu that only names the dishes", () => {
    const completed = completeFoodOfferings({
      navLabel: "Menu",
      sectionId: "menu",
      title: "Menu",
      intro: "Owner list",
      footnote: "Swap anytime",
      sections: [
        {
          heading: "From the fryer",
          items: [{ name: "Fish and chips", notes: "Keep first." }],
        },
      ],
    });
    const dish = completed.sections[0]?.items[0];
    expect(dish?.description).toBeTruthy();
    expect(dish?.price).toBe("$18");
    expect(dish?.image).toContain("unsplash");
    expect(dish?.notes).toBe("Keep first.");
  });
});
