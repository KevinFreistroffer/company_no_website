import type { TemplateId } from "@/lib/types";

function isFoodName(name: string): boolean {
  const value = name.toLowerCase();
  return (
    /donut|doughnut|bakery|baker/.test(value) ||
    /ice cream|scoops/.test(value) ||
    /burrito/.test(value)
  );
}

export function templateForCategory(category: string, name = ""): TemplateId {
  const value = category.toLowerCase();
  if (value.includes("plumb")) {
    return "trade";
  }
  if (
    value.includes("thrift") ||
    value.includes("charity") ||
    value.includes("second_hand") ||
    value.includes("consign")
  ) {
    return "thrift";
  }
  if (value.includes("tattoo")) {
    return "studio";
  }
  if (
    value.includes("laundry") ||
    value.includes("dry_clean") ||
    value.includes("dry clean")
  ) {
    return "laundry";
  }
  if (
    value.includes("hair") ||
    value.includes("beauty") ||
    value.includes("barber") ||
    value.includes("salon") ||
    value.includes("nail") ||
    value.includes("spa")
  ) {
    return "salon";
  }
  if (
    value.includes("car") ||
    value.includes("auto") ||
    value.includes("tyre") ||
    value.includes("tire") ||
    value.includes("muffler") ||
    value.includes("tow") ||
    value.includes("body") ||
    value.includes("collision") ||
    value.includes("exhaust") ||
    value.includes("paint")
  ) {
    return "auto";
  }
  if (
    value.includes("restaurant") ||
    value.includes("cafe") ||
    value.includes("pub") ||
    value.includes("bar") ||
    value.includes("diner") ||
    value.includes("steak") ||
    value.includes("fast_food") ||
    value.includes("fast food")
  ) {
    return "food";
  }
  if (isFoodName(name)) {
    return "food";
  }
  return "retail";
}

export function categoryLabel(category: string, template: TemplateId): string {
  const cleaned = category
    .replace(/^[^:]+:/, "")
    .replace(/_/g, " ")
    .trim();
  if (cleaned.length > 0 && !cleaned.includes(":")) {
    return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  switch (template) {
    case "food":
      return "Restaurant";
    case "salon":
      return "Salon";
    case "auto":
      return "Auto Shop";
    case "retail":
      return "Local Shop";
    case "studio":
      return "Studio";
    case "laundry":
      return "Laundry";
    case "thrift":
      return "Thrift Shop";
    case "trade":
      return "Home Services";
    default: {
      const exhaustive: never = template;
      return exhaustive;
    }
  }
}

export function defaultServices(template: TemplateId): string[] {
  switch (template) {
    case "food":
      return ["Dine-in", "Takeout", "Local favorites", "Family-friendly seating"];
    case "salon":
      return ["Cuts", "Color", "Styling", "Walk-ins welcome when available"];
    case "auto":
      return [
        "Diagnostics",
        "Mechanical repair",
        "Maintenance",
        "Local drop-off service",
      ];
    case "retail":
      return ["Everyday essentials", "Local service", "In-store pickup", "Helpful staff"];
    case "studio":
      return ["Custom tattoos", "Consultations", "Piercing", "Walk-in inquiries"];
    case "laundry":
      return ["Self-service machines", "Wash and fold", "Detergent on site", "Local hours"];
    case "thrift":
      return ["Clothing", "Housewares", "Seasonal finds", "Community donations"];
    case "trade":
      return [
        "Residential service",
        "Repairs",
        "Installations",
        "Call to schedule",
      ];
    default: {
      const exhaustive: never = template;
      return exhaustive;
    }
  }
}

export function defaultTagline(
  name: string,
  categoryLabelText: string,
  city: string,
  state: string,
): string {
  return `${categoryLabelText} in ${city}, ${state} — ${name}`;
}
