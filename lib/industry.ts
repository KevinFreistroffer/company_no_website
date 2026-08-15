import type {
  OfferItem,
  OfferSection,
  Offerings,
  OfferingsOverride,
  TemplateId,
} from "@/lib/types";

export type FoodKind =
  | "bakery"
  | "ice_cream"
  | "burrito"
  | "mexican"
  | "bbq"
  | "steakhouse"
  | "japanese"
  | "diner"
  | "seafood"
  | "cafe"
  | "bar"
  | "restaurant";

export type SalonKind = "barber" | "nails" | "spa" | "braiding" | "salon";
export type AutoKind = "body" | "tires" | "muffler" | "towing" | "repair";
export type RetailKind =
  | "florist"
  | "boutique"
  | "convenience"
  | "hardware"
  | "furniture"
  | "electronics"
  | "shop";
export type LaundryKind = "dry_clean" | "coin";

const CLIENT_FOOTNOTE =
  "This list is a starting point for the proposed site. Send names, prices, and notes and we will swap them in.";

function item(
  name: string,
  description?: string,
  price?: string,
  notes?: string,
): OfferItem {
  const entry: OfferItem = { name };
  if (description) {
    entry.description = description;
  }
  if (price) {
    entry.price = price;
  }
  if (notes) {
    entry.notes = notes;
  }
  return entry;
}

function section(heading: string, items: OfferItem[]): OfferSection {
  return { heading, items };
}

function haystack(name: string, category: string): string {
  return `${name} ${category}`.toLowerCase();
}

export function foodKind(name: string, category: string): FoodKind {
  const hay = haystack(name, category);
  if (/donut|doughnut|bakery|baker/.test(hay)) {
    return "bakery";
  }
  if (/ice cream|scoops/.test(hay)) {
    return "ice_cream";
  }
  if (/burrito/.test(hay)) {
    return "burrito";
  }
  if (
    /mexican|tequila|jalisco|casita|cosina|amores|alfonso|alicia|el rodeo|casa blanca/.test(
      hay,
    )
  ) {
    return "mexican";
  }
  if (/bbq|barbeque|barbecue/.test(hay)) {
    return "bbq";
  }
  if (/steak/.test(hay)) {
    return "steakhouse";
  }
  if (/hibachi|sushi|ramen|japanese/.test(hay)) {
    return "japanese";
  }
  if (/diner/.test(hay)) {
    return "diner";
  }
  if (/seafood|fish and|sea j/.test(hay)) {
    return "seafood";
  }
  if (/pub|lounge|saloon|tavern|\bclub\b|\bbar\b|amenity:bar/.test(hay)) {
    return "bar";
  }
  if (/cafe|roast|coffee/.test(hay)) {
    return "cafe";
  }
  return "restaurant";
}

export function salonKind(name: string, category: string): SalonKind {
  const hay = haystack(name, category);
  if (/braid/.test(hay)) {
    return "braiding";
  }
  if (/nail/.test(hay)) {
    return "nails";
  }
  if (/spa/.test(hay)) {
    return "spa";
  }
  if (/barber/.test(hay)) {
    return "barber";
  }
  return "salon";
}

export function autoKind(name: string, category: string): AutoKind {
  const hay = haystack(name, category);
  if (/tow/.test(hay)) {
    return "towing";
  }
  if (/muffler|exhaust|lube/.test(hay)) {
    return "muffler";
  }
  if (/tyre|tire/.test(hay)) {
    return "tires";
  }
  if (/body|collision|paint|frame/.test(hay)) {
    return "body";
  }
  return "repair";
}

export function retailKind(name: string, category: string): RetailKind {
  const hay = haystack(name, category);
  if (/florist|floral/.test(hay)) {
    return "florist";
  }
  if (/clothes|boutique/.test(hay)) {
    return "boutique";
  }
  if (/furniture|mattress/.test(hay)) {
    return "furniture";
  }
  if (/hardware|appliance/.test(hay)) {
    return "hardware";
  }
  if (/electronics|device repair/.test(hay)) {
    return "electronics";
  }
  if (/convenience|liquor|market/.test(hay)) {
    return "convenience";
  }
  return "shop";
}

export function laundryKind(name: string, category: string): LaundryKind {
  const hay = haystack(name, category);
  if (/dry_clean|dry clean|cleaners/.test(hay)) {
    return "dry_clean";
  }
  return "coin";
}

export function industryLabel(
  name: string,
  category: string,
  template: TemplateId,
): string {
  switch (template) {
    case "food": {
      const kind = foodKind(name, category);
      switch (kind) {
        case "bakery":
          return "Bakery";
        case "ice_cream":
          return "Ice Cream";
        case "burrito":
          return "Burritos";
        case "mexican":
          return "Mexican Restaurant";
        case "bbq":
          return "BBQ";
        case "steakhouse":
          return "Steakhouse";
        case "japanese":
          return "Japanese Restaurant";
        case "diner":
          return "Diner";
        case "seafood":
          return "Seafood";
        case "cafe":
          return "Cafe";
        case "bar":
          return "Bar";
        case "restaurant":
          return "Restaurant";
        default: {
          const exhaustive: never = kind;
          return exhaustive;
        }
      }
    }
    case "salon": {
      const kind = salonKind(name, category);
      switch (kind) {
        case "barber":
          return "Barbershop";
        case "nails":
          return "Nail Salon";
        case "spa":
          return "Salon & Spa";
        case "braiding":
          return "Hair Braiding";
        case "salon":
          return "Hair Salon";
        default: {
          const exhaustive: never = kind;
          return exhaustive;
        }
      }
    }
    case "auto": {
      const kind = autoKind(name, category);
      switch (kind) {
        case "body":
          return "Collision Shop";
        case "tires":
          return "Tire Shop";
        case "muffler":
          return "Exhaust Shop";
        case "towing":
          return "Towing & Repair";
        case "repair":
          return "Auto Repair";
        default: {
          const exhaustive: never = kind;
          return exhaustive;
        }
      }
    }
    case "retail": {
      const kind = retailKind(name, category);
      switch (kind) {
        case "florist":
          return "Florist";
        case "boutique":
          return "Boutique";
        case "convenience":
          return "Market";
        case "hardware":
          return "Hardware";
        case "furniture":
          return "Furniture";
        case "electronics":
          return "Device Repair";
        case "shop":
          return "Local Shop";
        default: {
          const exhaustive: never = kind;
          return exhaustive;
        }
      }
    }
    case "studio":
      return "Tattoo Studio";
    case "laundry":
      return laundryKind(name, category) === "dry_clean"
        ? "Dry Cleaner"
        : "Laundromat";
    case "thrift":
      return "Thrift Shop";
    case "trade":
      return "Plumbing";
    default: {
      const exhaustive: never = template;
      return exhaustive;
    }
  }
}

export type IndustryChrome = {
  heroCta: string;
  visitTitle: string;
  visitBlurb: string;
  amenitiesTitle: string;
};

export function industryChrome(
  template: TemplateId,
  name: string,
  category: string,
): IndustryChrome {
  switch (template) {
    case "food": {
      const kind = foodKind(name, category);
      if (kind === "bar") {
        return {
          heroCta: "See the menu",
          visitTitle: "Pull up a stool",
          visitBlurb: "Call ahead for live music, kitchen hours, or tonight’s specials.",
          amenitiesTitle: "What to expect",
        };
      }
      if (kind === "cafe" || kind === "bakery" || kind === "ice_cream") {
        return {
          heroCta: "See the menu",
          visitTitle: "Stop in",
          visitBlurb: "Counter service for coffee, pastry, and the day’s kitchen list.",
          amenitiesTitle: "How we serve",
        };
      }
      return {
        heroCta: "See the menu",
        visitTitle: "Dine with us",
        visitBlurb: "Dine in or call ahead for takeout. We’ll post the owner’s menu as soon as we have it.",
        amenitiesTitle: "How we serve",
      };
    }
    case "salon":
      return {
        heroCta: "See the service menu",
        visitTitle: "Book a chair",
        visitBlurb: "Walk-ins when a chair is open — call to confirm before you come in.",
        amenitiesTitle: "In the chair",
      };
    case "auto":
      return {
        heroCta: "See repairs",
        visitTitle: "Drop off",
        visitBlurb: "Call for an estimate or to leave the keys. We’ll confirm the work before we start.",
        amenitiesTitle: "How we work",
      };
    case "retail":
      return {
        heroCta: "See what’s in store",
        visitTitle: "Come by the shop",
        visitBlurb: "Stop in during posted hours or call if you need something set aside.",
        amenitiesTitle: "In the shop",
      };
    case "studio":
      return {
        heroCta: "See the work",
        visitTitle: "Book a consult",
        visitBlurb: "Bring a reference or an idea. Custom work starts with a conversation.",
        amenitiesTitle: "Studio notes",
      };
    case "laundry":
      return {
        heroCta: "See pricing",
        visitTitle: "Wash here",
        visitBlurb: "Machines are first-come. Call if you need drop-off or dry-clean turnaround.",
        amenitiesTitle: "On site",
      };
    case "thrift":
      return {
        heroCta: "See what’s here",
        visitTitle: "Shop & donate",
        visitBlurb: "Browse during shop hours. Ask before leaving donations after close.",
        amenitiesTitle: "In the shop",
      };
    case "trade":
      return {
        heroCta: "See services",
        visitTitle: "Request a visit",
        visitBlurb: "Call to describe the job. We’ll schedule a window and price the work before we start.",
        amenitiesTitle: "Coverage",
      };
    default: {
      const exhaustive: never = template;
      return exhaustive;
    }
  }
}

function foodOfferings(name: string, category: string, city: string): Offerings {
  const kind = foodKind(name, category);
  const shared: Pick<Offerings, "navLabel" | "sectionId" | "footnote"> = {
    navLabel: "Menu",
    sectionId: "menu",
    footnote: CLIENT_FOOTNOTE,
  };
  switch (kind) {
    case "bakery":
      return {
        ...shared,
        title: "Bakery case",
        intro: `Donuts, coffee, and the morning counter at ${name}. Swap in the day’s flavors whenever the owner sends them.`,
        sections: [
          section("Donuts", [
            item("Glazed", "The everyday dozen."),
            item("Chocolate iced"),
            item("Filled", "Cream or fruit, when posted."),
            item("Dozen box", "Mix and match."),
          ]),
          section("Also on the counter", [
            item("Drip coffee"),
            item("Breakfast sandwich"),
            item("Kolache or savory bake", "When the kitchen runs it."),
          ]),
        ],
      };
    case "ice_cream":
      return {
        ...shared,
        title: "Scoops",
        intro: `Ice cream and counter treats at ${name}. We’ll post flavors and sizes from the owner’s board.`,
        sections: [
          section("Cups & cones", [
            item("Single scoop"),
            item("Double scoop"),
            item("Waffle cone"),
          ]),
          section("Also", [
            item("Sundae"),
            item("Milkshake"),
            item("Seasonal flavor", "When the board lists it."),
          ]),
        ],
      };
    case "burrito":
      return {
        ...shared,
        title: "Menu",
        intro: `Build-your-own plates from ${name} — burritos, tacos, and the sides people actually order.`,
        sections: [
          section("Mains", [
            item("Burrito", "Rice, beans, salsa, and the day’s protein."),
            item("Tacos", "Street-style, two or three to an order."),
            item("Quesadilla"),
            item("Nachos"),
          ]),
          section("Extras", [
            item("Chips and salsa"),
            item("Guacamole"),
            item("Agua fresca or soda"),
          ]),
        ],
      };
    case "mexican":
      return {
        ...shared,
        title: "Menu",
        intro: `A starter Mexican menu for ${name} in ${city}. We’ll put the house chile, salsas, and family plates first once the owner shares them.`,
        sections: [
          section("To start", [
            item("Chips and salsa", "Red, green, or both."),
            item("Guacamole"),
            item("Queso"),
          ]),
          section("Plates", [
            item("Tacos"),
            item("Enchiladas"),
            item("Burrito plate"),
            item("Chile relleno"),
            item("Combination plate"),
          ]),
          section("Drinks", [
            item("Horchata"),
            item("Agua fresca"),
            item("Mexican coke"),
            item("Margarita", "When the bar is open."),
          ]),
        ],
      };
    case "bbq":
      return {
        ...shared,
        title: "Pit menu",
        intro: `Smoke-house plates for ${name}. Meats and sides will match whatever the pit is running that day.`,
        sections: [
          section("Meats", [
            item("Brisket"),
            item("Ribs"),
            item("Pulled pork"),
            item("Sausage"),
            item("Chicken"),
          ]),
          section("Sides", [
            item("Beans"),
            item("Slaw"),
            item("Potato salad"),
            item("Cornbread"),
          ]),
        ],
      };
    case "steakhouse":
      return {
        ...shared,
        title: "Menu",
        intro: `Steaks, sides, and a lounge list for ${name}. Cut names and prices wait on the owner.`,
        sections: [
          section("From the grill", [
            item("Ribeye"),
            item("Sirloin"),
            item("Filet"),
            item("Chop or chicken", "When posted."),
          ]),
          section("Around the steak", [
            item("House salad"),
            item("Baked potato"),
            item("Seasonal vegetable"),
            item("Onion rings or fries"),
          ]),
        ],
      };
    case "japanese":
      return {
        ...shared,
        title: "Menu",
        intro: `Hibachi dinners and starters for ${name}. Add sushi or lunch bowls if the kitchen runs them.`,
        sections: [
          section("Starters", [
            item("Miso soup"),
            item("Gyoza"),
            item("Edamame"),
            item("House salad"),
          ]),
          section("Hibachi dinners", [
            item("Chicken hibachi"),
            item("Steak hibachi"),
            item("Shrimp hibachi"),
            item("Combination hibachi"),
          ]),
        ],
      };
    case "diner":
      return {
        ...shared,
        title: "Diner menu",
        intro: `Breakfast through supper at ${name}. Classic plates until the owner sends the real ticket.`,
        sections: [
          section("Breakfast", [
            item("Two-egg plate", "Hash browns and toast."),
            item("Pancakes or French toast"),
            item("Omelet"),
            item("Breakfast sandwich"),
          ]),
          section("Lunch & supper", [
            item("Burger"),
            item("Club sandwich"),
            item("Daily special"),
            item("Pie and coffee"),
          ]),
        ],
      };
    case "seafood":
      return {
        ...shared,
        title: "Menu",
        intro: `Fish-and-chips and the waterfront board at ${name}. We’ll lock names to what the kitchen actually fries.`,
        sections: [
          section("From the fryer", [
            item("Fish and chips"),
            item("Fish sandwich"),
            item("Seafood basket"),
            item("Clam or shrimp basket", "When the board lists it."),
          ]),
          section("Also", [
            item("Burger"),
            item("Breakfast plate"),
            item("Milkshake"),
            item("Chowder", "If the kettle is on."),
          ]),
        ],
      };
    case "cafe":
      return {
        ...shared,
        title: "Cafe menu",
        intro: `Coffee and a short kitchen list for ${name}. Easy to replace with the owner’s drinks and daily specials.`,
        sections: [
          section("Drinks", [
            item("Drip coffee"),
            item("Espresso"),
            item("Latte or cappuccino"),
            item("Tea"),
          ]),
          section("Kitchen", [
            item("Breakfast sandwich"),
            item("Pastry"),
            item("Soup or salad", "When posted."),
            item("Lunch plate"),
          ]),
        ],
      };
    case "bar":
      return {
        ...shared,
        title: "Bar menu",
        intro: `Taps, well drinks, and kitchen bites for ${name}. We’ll post tonight’s beers and specials as soon as we have them.`,
        sections: [
          section("Drinks", [
            item("Local draft"),
            item("Domestic bottle"),
            item("Well cocktail"),
            item("House pour"),
          ]),
          section("Kitchen & extras", [
            item("Wings or nachos"),
            item("Burger or basket"),
            item("Pool, darts, or live music", "When the room is running it."),
          ]),
        ],
      };
    case "restaurant":
      return {
        ...shared,
        title: "Menu",
        intro: `A simple restaurant board for ${name} in ${city}. Replace every line with the owner’s dishes, prices, and daily notes.`,
        sections: [
          section("Starters", [
            item("Soup of the day"),
            item("House salad"),
            item("Appetizer plate"),
          ]),
          section("Mains", [
            item("House special"),
            item("Chicken plate"),
            item("Burger or sandwich"),
            item("Catch or steak", "When the kitchen runs it."),
          ]),
          section("Sweets & drinks", [
            item("Dessert"),
            item("Iced tea and soda"),
            item("Coffee"),
          ]),
        ],
      };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

function salonOfferings(name: string, category: string): Offerings {
  const kind = salonKind(name, category);
  const shared: Pick<Offerings, "navLabel" | "sectionId" | "footnote"> = {
    navLabel: "Menu",
    sectionId: "menu",
    footnote: CLIENT_FOOTNOTE,
  };
  switch (kind) {
    case "barber":
      return {
        ...shared,
        title: "Barber menu",
        intro: `Cuts and shaves at ${name}. Add prices and extra services when the shop sends them.`,
        sections: [
          section("Cuts", [
            item("Adult haircut"),
            item("Fade"),
            item("Kids’ cut"),
            item("Senior cut"),
          ]),
          section("Extras", [
            item("Beard trim"),
            item("Hot-towel shave"),
            item("Line-up"),
            item("Hot towel add-on"),
          ]),
        ],
      };
    case "nails":
      return {
        ...shared,
        title: "Nail menu",
        intro: `Manicures, pedicures, and gel work at ${name}.`,
        sections: [
          section("Hands", [
            item("Classic manicure"),
            item("Gel manicure"),
            item("Fill"),
          ]),
          section("Feet & extras", [
            item("Classic pedicure"),
            item("Spa pedicure"),
            item("Polish change"),
            item("Nail art", "When requested."),
          ]),
        ],
      };
    case "spa":
      return {
        ...shared,
        title: "Salon & spa menu",
        intro: `Hair, skin, and spa time at ${name}.`,
        sections: [
          section("Hair", [
            item("Cut and style"),
            item("Color"),
            item("Blowout"),
          ]),
          section("Spa", [
            item("Facial"),
            item("Massage", "When a therapist is on the book."),
            item("Waxing"),
          ]),
        ],
      };
    case "braiding":
      return {
        ...shared,
        title: "Braiding menu",
        intro: `Protective styles at ${name}. Duration and hair length change the price — we’ll post the shop’s chart.`,
        sections: [
          section("Styles", [
            item("Box braids"),
            item("Knotless braids"),
            item("Twists"),
            item("Cornrows"),
            item("Kids’ styles"),
          ]),
        ],
      };
    case "salon":
      return {
        ...shared,
        title: "Service menu",
        intro: `Hair services at ${name}. We’ll add the stylists’ prices and timing once they send the list.`,
        sections: [
          section("Cuts & style", [
            item("Women’s cut"),
            item("Men’s cut"),
            item("Blowout / style"),
            item("Kids’ cut"),
          ]),
          section("Color & texture", [
            item("Single process color"),
            item("Highlights"),
            item("Toner or gloss"),
            item("Treatment"),
          ]),
        ],
      };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

function autoOfferings(name: string, category: string): Offerings {
  const kind = autoKind(name, category);
  const shared: Pick<Offerings, "navLabel" | "sectionId" | "footnote"> = {
    navLabel: "Repairs",
    sectionId: "services",
    footnote: CLIENT_FOOTNOTE,
  };
  switch (kind) {
    case "body":
      return {
        ...shared,
        title: "Collision & body work",
        intro: `${name} handles wrecks, paint, and frame work. Insurance jobs welcome — call with the estimate.`,
        sections: [
          section("Body", [
            item("Collision repair"),
            item("Dent and rust repair"),
            item("Frame work"),
            item("Paint and blend"),
          ]),
          section("Also", [
            item("Glass", "When the shop lists it."),
            item("Towing coordination"),
            item("Insurance estimates"),
          ]),
        ],
      };
    case "tires":
      return {
        ...shared,
        title: "Tires & service",
        intro: `Mounts, balances, and the repairs ${name} posts at the counter.`,
        sections: [
          section("Tires", [
            item("New tires"),
            item("Mount and balance"),
            item("Rotation"),
            item("Patch / plug"),
          ]),
          section("Also", [
            item("Alignment", "When equipment is on site."),
            item("Brakes"),
            item("Oil change"),
          ]),
        ],
      };
    case "muffler":
      return {
        ...shared,
        title: "Exhaust & lube",
        intro: `Mufflers, pipes, and quick lube work at ${name}.`,
        sections: [
          section("Exhaust", [
            item("Muffler replacement"),
            item("Pipe and resonator work"),
            item("Custom exhaust", "When the shop builds it."),
          ]),
          section("Lube & inspection", [
            item("Oil change"),
            item("Fluid top-off"),
            item("Quick inspection"),
          ]),
        ],
      };
    case "towing":
      return {
        ...shared,
        title: "Tow & repair",
        intro: `${name} can hook up a tow and follow it with shop work.`,
        sections: [
          section("Roadside", [
            item("Local tow"),
            item("Jump / lockout", "When listed."),
            item("Winch-out"),
          ]),
          section("In the bay", [
            item("Mechanical repair"),
            item("Diagnostics"),
            item("After-tow inspection"),
          ]),
        ],
      };
    case "repair":
      return {
        ...shared,
        title: "Shop services",
        intro: `Maintenance and repair at ${name}. We’ll add the owner’s common jobs and parts brands.`,
        sections: [
          section("Maintenance", [
            item("Oil change"),
            item("Brakes"),
            item("Tires and rotation"),
            item("Batteries and charging"),
          ]),
          section("Repair", [
            item("Engine diagnostics"),
            item("Check-engine lights"),
            item("Suspension and steering"),
            item("A/C and heating"),
          ]),
        ],
      };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

function retailOfferings(name: string, category: string): Offerings {
  const kind = retailKind(name, category);
  const shared: Pick<Offerings, "navLabel" | "sectionId" | "footnote"> = {
    navLabel: "In store",
    sectionId: "services",
    footnote: CLIENT_FOOTNOTE,
  };
  switch (kind) {
    case "florist":
      return {
        ...shared,
        title: "Flowers & gifts",
        intro: `Arrangements from ${name}. Call with a budget, a color, or a funeral/wedding date.`,
        sections: [
          section("Everyday", [
            item("Hand-tied bouquet"),
            item("Vase arrangement"),
            item("Plant in a pot"),
          ]),
          section("Occasions", [
            item("Sympathy"),
            item("Wedding flowers"),
            item("Holiday specials"),
          ]),
        ],
      };
    case "boutique":
      return {
        ...shared,
        title: "On the racks",
        intro: `Clothing and extras at ${name}. We’ll feature whatever the owner wants on the homepage.`,
        sections: [
          section("Apparel", [
            item("Tops and dresses"),
            item("Denim and bottoms"),
            item("Seasonal layers"),
          ]),
          section("Extras", [
            item("Jewelry and accessories"),
            item("Gifts"),
            item("New arrivals"),
          ]),
        ],
      };
    case "convenience":
      return {
        ...shared,
        title: "In the market",
        intro: `Everyday stops at ${name} — drinks, snacks, and whatever the cooler is holding.`,
        sections: [
          section("Grab and go", [
            item("Cold drinks"),
            item("Snacks"),
            item("Tobacco and lottery", "Where allowed."),
            item("Staples"),
          ]),
        ],
      };
    case "hardware":
      return {
        ...shared,
        title: "Aisles",
        intro: `Hardware and housewares at ${name}. Tell us which departments to put first.`,
        sections: [
          section("Shop", [
            item("Tools"),
            item("Paint and fasteners"),
            item("Housewares"),
            item("Small appliances"),
          ]),
        ],
      };
    case "furniture":
      return {
        ...shared,
        title: "Showroom",
        intro: `Beds, sofas, and floor samples at ${name}.`,
        sections: [
          section("Find", [
            item("Mattresses"),
            item("Bedroom"),
            item("Living room"),
            item("Delivery", "When the shop offers it."),
          ]),
        ],
      };
    case "electronics":
      return {
        ...shared,
        title: "Repairs",
        intro: `Phones, tablets, and small electronics at ${name}.`,
        sections: [
          section("Common jobs", [
            item("Cracked screens"),
            item("Batteries"),
            item("Charging ports"),
            item("Diagnostics"),
          ]),
        ],
      };
    case "shop":
      return {
        ...shared,
        title: "In the shop",
        intro: `What ${name} puts on the floor. Replace this list with departments the owner cares about.`,
        sections: [
          section("Find", [
            item("Everyday essentials"),
            item("Local favorites"),
            item("Seasonal stock"),
            item("Special orders", "When available."),
          ]),
        ],
      };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

function laundryOfferings(name: string, category: string): Offerings {
  const kind = laundryKind(name, category);
  const shared: Pick<Offerings, "navLabel" | "sectionId" | "footnote"> = {
    navLabel: "Pricing",
    sectionId: "services",
    footnote: CLIENT_FOOTNOTE,
  };
  if (kind === "dry_clean") {
    return {
      ...shared,
      title: "Cleaning list",
      intro: `Drop-off cleaning at ${name}. We’ll post turnaround and garment prices from the counter list.`,
      sections: [
        section("Dry cleaning", [
          item("Shirts"),
          item("Pants and skirts"),
          item("Dresses and suits"),
          item("Household items", "Comforters and such, when accepted."),
        ]),
        section("Also", [
          item("Laundry service"),
          item("Alterations", "If the shop offers them."),
          item("Same-week turnaround", "Ask at drop-off."),
        ]),
      ],
    };
  }
  return {
    ...shared,
    title: "Machines & extras",
    intro: `Self-service laundry at ${name}. Coin, card, or both — we’ll match whatever the room actually takes.`,
    sections: [
      section("Wash & dry", [
        item("Standard washer"),
        item("Large / industrial washer"),
        item("Dryer"),
        item("Soap and supplies on site"),
      ]),
      section("Help", [
        item("Wash and fold", "When an attendant is in."),
        item("Change machine"),
        item("Folding tables"),
      ]),
    ],
  };
}

function studioOfferings(name: string): Offerings {
  return {
    navLabel: "Work",
    sectionId: "services",
    title: "Studio",
    intro: `Custom tattoos and consults at ${name}. Artist names, styles, and aftercare go here when the shop sends them.`,
    footnote: CLIENT_FOOTNOTE,
    sections: [
      section("Tattoos", [
        item("Custom tattoos"),
        item("Traditional / neo-traditional"),
        item("Blackwork"),
        item("Cover-ups", "After a consult."),
      ]),
      section("Also", [
        item("Consultations"),
        item("Piercing", "When a piercer is on the roster."),
        item("Aftercare guidance"),
      ]),
    ],
  };
}

function thriftOfferings(name: string): Offerings {
  return {
    navLabel: "Shop",
    sectionId: "services",
    title: "On the floor",
    intro: `Secondhand finds at ${name}. Donation rules and featured racks can change with a note from the shop.`,
    footnote: CLIENT_FOOTNOTE,
    sections: [
      section("Shop", [
        item("Clothing"),
        item("Shoes and accessories"),
        item("Housewares"),
        item("Seasonal finds"),
      ]),
      section("Donate", [
        item("Clean clothing and housewares"),
        item("Drop off during shop hours"),
        item("Ask before leaving items after close"),
      ]),
    ],
  };
}

function tradeOfferings(name: string, city: string): Offerings {
  return {
    navLabel: "Services",
    sectionId: "services",
    title: "Plumbing services",
    intro: `${name} handles residential plumbing around ${city}. We’ll list the jobs the owner actually takes.`,
    footnote: CLIENT_FOOTNOTE,
    sections: [
      section("Common calls", [
        item("Leaks and repairs"),
        item("Drain and sewer cleaning"),
        item("Water heaters"),
        item("Faucets and fixtures"),
        item("Toilet repair"),
      ]),
      section("Scheduling", [
        item("Residential service"),
        item("Same-week windows when available"),
        item("Call for a quote before work starts"),
      ]),
    ],
  };
}

export function defaultOfferings(
  template: TemplateId,
  name: string,
  category: string,
  city: string,
): Offerings {
  switch (template) {
    case "food":
      return foodOfferings(name, category, city);
    case "salon":
      return salonOfferings(name, category);
    case "auto":
      return autoOfferings(name, category);
    case "retail":
      return retailOfferings(name, category);
    case "studio":
      return studioOfferings(name);
    case "laundry":
      return laundryOfferings(name, category);
    case "thrift":
      return thriftOfferings(name);
    case "trade":
      return tradeOfferings(name, city);
    default: {
      const exhaustive: never = template;
      return exhaustive;
    }
  }
}

export function mergeOfferings(
  defaults: Offerings,
  override?: OfferingsOverride,
): Offerings {
  if (!override) {
    return defaults;
  }
  return {
    navLabel: override.navLabel ?? defaults.navLabel,
    sectionId: override.sectionId ?? defaults.sectionId,
    title: override.title ?? defaults.title,
    intro: override.intro ?? defaults.intro,
    sections: override.sections ?? defaults.sections,
    footnote: override.footnote ?? defaults.footnote,
  };
}

export function defaultAmenities(
  template: TemplateId,
  name: string,
  category: string,
): string[] {
  switch (template) {
    case "food": {
      const kind = foodKind(name, category);
      if (kind === "bar") {
        return ["Full bar", "Local drafts", "Late kitchen when posted", "Dine-in"];
      }
      if (kind === "cafe" || kind === "bakery" || kind === "ice_cream") {
        return ["Counter service", "Coffee", "Grab and go", "Local seating"];
      }
      return ["Dine-in", "Takeout", "Family-friendly seating", "Call for today’s specials"];
    }
    case "salon":
      return salonKind(name, category) === "barber"
        ? ["Walk-ins when a chair is open", "Appointments", "Hot towel", "Cash or card — ask"]
        : ["Cuts", "Color", "Styling", "Walk-ins when available"];
    case "auto":
      return ["Diagnostics", "Written estimates", "Local drop-off", "Call before you come"];
    case "retail":
      return ["In-store pickup", "Local service", "Help finding a size or part"];
    case "studio":
      return ["Custom work", "Consultations", "Aftercare", "Walk-in questions when the floor is open"];
    case "laundry":
      return laundryKind(name, category) === "dry_clean"
        ? ["Drop-off", "Hang-and-go", "Ask about rush"]
        : ["Self-service", "Large machines", "Folding tables"];
    case "thrift":
      return ["Clothing", "Housewares", "Donations during shop hours"];
    case "trade":
      return ["Residential", "Repairs", "Call to schedule"];
    default: {
      const exhaustive: never = template;
      return exhaustive;
    }
  }
}
