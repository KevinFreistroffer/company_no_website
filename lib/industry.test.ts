import { describe, expect, it } from "vitest";
import {
  autoKind,
  defaultOfferings,
  foodKind,
  industryLabel,
  mergeOfferings,
  salonKind,
} from "@/lib/industry";

describe("foodKind", () => {
  it("classifies restaurants, cafes, and bars", () => {
    expect(foodKind("Alfonso's Mexican Food", "amenity:restaurant")).toBe("mexican");
    expect(foodKind("Big Wave Burritos", "amenity:restaurant")).toBe("burrito");
    expect(foodKind("Sea J's Cafe", "amenity:cafe")).toBe("seafood");
    expect(foodKind("The Donut Shop", "amenity:cafe")).toBe("bakery");
    expect(foodKind("Eureka Daily Roast", "amenity:cafe")).toBe("cafe");
    expect(foodKind("Scarlet Tavern", "amenity:pub")).toBe("bar");
    expect(foodKind("Dave's Diner", "amenity:restaurant")).toBe("diner");
    expect(foodKind("Milo's Steakhouse", "amenity:restaurant")).toBe("steakhouse");
    expect(foodKind("Rump's BBQ", "amenity:restaurant")).toBe("bbq");
    expect(foodKind("Hibachi House", "amenity:restaurant")).toBe("japanese");
    expect(foodKind("Sweet Scoops market", "shop:convenience")).toBe("ice_cream");
  });
});

describe("salonKind and autoKind", () => {
  it("splits salon and auto specialties", () => {
    expect(salonKind("Jim's Barber Shop", "Barber shop")).toBe("barber");
    expect(salonKind("Best Nails", "shop:beauty")).toBe("nails");
    expect(salonKind("Isa's African Hair Braiding", "shop:hairdresser")).toBe("braiding");
    expect(autoKind("Clark Auto Body & Frame", "Auto body shop")).toBe("body");
    expect(autoKind("Don Licho's Tire Shop", "shop:tyres")).toBe("tires");
    expect(autoKind("EQ Muffler", "Muffler / exhaust / auto repair")).toBe("muffler");
  });
});

describe("industryLabel", () => {
  it("uses a customer-facing industry name", () => {
    expect(industryLabel("Baker's Dozen Donuts", "amenity:fast_food", "food")).toBe(
      "Bakery",
    );
    expect(industryLabel("Miller Plumbing", "Plumber", "trade")).toBe("Plumbing");
  });
});

describe("defaultOfferings", () => {
  it("builds a food menu with sections a client can replace", () => {
    const menu = defaultOfferings(
      "food",
      "Alfonso's Mexican Food",
      "amenity:restaurant",
      "Raton",
    );
    expect(menu.navLabel).toBe("Menu");
    expect(menu.sectionId).toBe("menu");
    expect(menu.sections.length).toBeGreaterThan(0);
    expect(menu.sections.some((group) => group.heading === "Plates")).toBe(true);
  });

  it("builds a salon service menu", () => {
    const menu = defaultOfferings("salon", "Best Nails", "shop:beauty", "Beaufort");
    expect(menu.title).toMatch(/nail/i);
    expect(menu.sections[0]?.items.length).toBeGreaterThan(0);
  });
});

describe("mergeOfferings", () => {
  it("replaces menu sections with the client's list and keeps the rest", () => {
    const defaults = defaultOfferings("food", "Sea J's Cafe", "amenity:cafe", "Port Townsend");
    const merged = mergeOfferings(defaults, {
      intro: "Owner asked to lead with fried cod.",
      sections: [
        {
          heading: "From the fryer",
          items: [
            {
              name: "Fish and chips",
              description: "Fried cod",
              price: "$18",
              notes: "Client: keep this first.",
            },
          ],
        },
      ],
    });
    expect(merged.intro).toBe("Owner asked to lead with fried cod.");
    expect(merged.navLabel).toBe("Menu");
    expect(merged.sections).toHaveLength(1);
    expect(merged.sections[0]?.items[0]?.notes).toContain("Client");
  });
});
