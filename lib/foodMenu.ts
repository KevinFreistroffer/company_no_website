import type { OfferItem, OfferSection, Offerings } from "@/lib/types";

function unsplash(id: string): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
}

const PHOTO = {
  donut: unsplash("photo-1551024601-bec78aea704b"),
  chocolate: unsplash("photo-1551024506-0bccd828d307"),
  pastry: unsplash("photo-1509440159596-0249088772ff"),
  coffee: unsplash("photo-1495474472287-4d71bcdd2085"),
  espresso: unsplash("photo-1511920170033-f8396924c348"),
  latte: unsplash("photo-1461023058943-07fcbe16d735"),
  breakfast: unsplash("photo-1525351484163-7529414344d8"),
  pancakes: unsplash("photo-1484723091739-30a097e8f929"),
  sandwich: unsplash("photo-1553909489-cd47e0907980"),
  burger: unsplash("photo-1568901346375-23c9450c58cd"),
  tacos: unsplash("photo-1565299585323-38d6b0865b47"),
  burrito: unsplash("photo-1626700051175-6818013e1d4f"),
  nachos: unsplash("photo-1513456852971-30c0b8199d4d"),
  chips: unsplash("photo-1613514785940-daed07799d9b"),
  guacamole: unsplash("photo-1582169296194-e4d644c48063"),
  mexican: unsplash("photo-1504674900247-0877df9cc836"),
  margarita: unsplash("photo-1556855810-ac404aa91e85"),
  drink: unsplash("photo-1551024709-8f23befc6f87"),
  soda: unsplash("photo-1554866585-cd94860890b7"),
  bbq: unsplash("photo-1555939594-58d7cb561ad1"),
  brisket: unsplash("photo-1529193591184-b1d58069ecdd"),
  steak: unsplash("photo-1600891964092-4316c288032e"),
  chicken: unsplash("photo-1598103442097-8b74394b95c6"),
  salad: unsplash("photo-1512621776951-a57141f2eefd"),
  fries: unsplash("photo-1573080496219-bb080dd4f877"),
  potato: unsplash("photo-1518013431117-eb1465fa5752"),
  soup: unsplash("photo-1547592180-85f173990554"),
  japanese: unsplash("photo-1579871494447-9811cf80d66c"),
  gyoza: unsplash("photo-1496116218417-1a781b1c416c"),
  ramen: unsplash("photo-1617093727343-374698b1b08d"),
  fish: unsplash("photo-1467003909585-2f8a72700288"),
  friedFish: unsplash("photo-1519708227418-c8fd9a32b7a2"),
  shrimp: unsplash("photo-1565680018434-b513d5e5fd47"),
  iceCream: unsplash("photo-1563805042-7684c019e1cb"),
  milkshake: unsplash("photo-1572490122747-3968b75cc699"),
  beer: unsplash("photo-1571613316887-6f8d5cbf7ef7"),
  cocktail: unsplash("photo-1536935338788-846bb9981813"),
  wings: unsplash("photo-1608039829572-78524f79c4c7"),
  pie: unsplash("photo-1535920527002-b35e96722eb9"),
  plated: unsplash("photo-1414235077428-338989a2e8c0"),
  bar: unsplash("photo-1514933651103-005eec06c04b"),
  takeout: unsplash("photo-1513104890138-7c749659a591"),
} as const;

type DishPreset = {
  description: string;
  price: string;
  image: string;
};

const NAMED: Record<string, DishPreset> = {
  Glazed: {
    description: "Classic yeast donut with a thin sugar glaze.",
    price: "$2.25",
    image: PHOTO.donut,
  },
  "Chocolate iced": {
    description: "Cake donut finished with chocolate icing.",
    price: "$2.50",
    image: PHOTO.chocolate,
  },
  Filled: {
    description: "Filled with cream or fruit when the case has them.",
    price: "$2.75",
    image: PHOTO.donut,
  },
  "Dozen box": {
    description: "A mixed dozen to take home.",
    price: "$16",
    image: PHOTO.donut,
  },
  "Drip coffee": {
    description: "House brew, served all day.",
    price: "$3",
    image: PHOTO.coffee,
  },
  "Breakfast sandwich": {
    description: "Egg, cheese, and the day’s meat on a roll.",
    price: "$8",
    image: PHOTO.breakfast,
  },
  "Kolache or savory bake": {
    description: "Warm pastry when the kitchen runs it.",
    price: "$4.50",
    image: PHOTO.pastry,
  },
  "Single scoop": {
    description: "One scoop in a cup or cake cone.",
    price: "$4",
    image: PHOTO.iceCream,
  },
  "Double scoop": {
    description: "Two scoops. Mix flavors if you like.",
    price: "$6.50",
    image: PHOTO.iceCream,
  },
  "Waffle cone": {
    description: "Crisp cone upgrade.",
    price: "$1.50",
    image: PHOTO.iceCream,
  },
  Sundae: {
    description: "Scoops, sauce, and whipped cream.",
    price: "$7",
    image: PHOTO.iceCream,
  },
  Milkshake: {
    description: "Hand-spun, thick enough for a spoon.",
    price: "$7",
    image: PHOTO.milkshake,
  },
  "Seasonal flavor": {
    description: "Whatever is on the board this week.",
    price: "$4.50",
    image: PHOTO.iceCream,
  },
  Burrito: {
    description: "Rice, beans, salsa, and the day’s protein, wrapped tight.",
    price: "$12",
    image: PHOTO.burrito,
  },
  Tacos: {
    description: "Street-style, two or three to an order.",
    price: "$11",
    image: PHOTO.tacos,
  },
  Quesadilla: {
    description: "Griddled tortilla, melted cheese, salsa on the side.",
    price: "$10",
    image: PHOTO.mexican,
  },
  Nachos: {
    description: "Chips piled with cheese, salsa, and jalapeños.",
    price: "$11",
    image: PHOTO.nachos,
  },
  "Chips and salsa": {
    description: "Warm chips with red, green, or both.",
    price: "$5",
    image: PHOTO.chips,
  },
  Guacamole: {
    description: "Ripe avocado, lime, and onion. Made to order.",
    price: "$8",
    image: PHOTO.guacamole,
  },
  "Agua fresca or soda": {
    description: "Fruit water or a cold soda.",
    price: "$3",
    image: PHOTO.drink,
  },
  Queso: {
    description: "Warm cheese dip for the chips.",
    price: "$7",
    image: PHOTO.nachos,
  },
  Enchiladas: {
    description: "Rolled tortillas, chile sauce, and cheese.",
    price: "$14",
    image: PHOTO.mexican,
  },
  "Burrito plate": {
    description: "A burrito plated with rice and beans.",
    price: "$13",
    image: PHOTO.burrito,
  },
  "Chile relleno": {
    description: "Roasted pepper, cheese, and ranchero sauce.",
    price: "$15",
    image: PHOTO.mexican,
  },
  "Combination plate": {
    description: "A mix of house plates — tacos, enchilada, rice, and beans.",
    price: "$16",
    image: PHOTO.mexican,
  },
  Horchata: {
    description: "Cinnamon rice drink, served cold.",
    price: "$3.50",
    image: PHOTO.drink,
  },
  "Agua fresca": {
    description: "Fruit water of the day.",
    price: "$3.50",
    image: PHOTO.drink,
  },
  "Mexican coke": {
    description: "Bottle, cane sugar.",
    price: "$3",
    image: PHOTO.soda,
  },
  Margarita: {
    description: "Lime, tequila, and a salted rim when the bar is open.",
    price: "$9",
    image: PHOTO.margarita,
  },
  Brisket: {
    description: "Sliced smoked brisket, by the plate.",
    price: "$18",
    image: PHOTO.brisket,
  },
  Ribs: {
    description: "St. Louis-style, dry rub or sauce.",
    price: "$17",
    image: PHOTO.bbq,
  },
  "Pulled pork": {
    description: "Chopped pork with pickles and sauce.",
    price: "$14",
    image: PHOTO.bbq,
  },
  Sausage: {
    description: "Smoked link with mustard.",
    price: "$8",
    image: PHOTO.bbq,
  },
  Chicken: {
    description: "Quarter or half, from the pit.",
    price: "$13",
    image: PHOTO.chicken,
  },
  Beans: {
    description: "Pit beans, a little sweet, a little smoke.",
    price: "$4",
    image: PHOTO.bbq,
  },
  Slaw: {
    description: "Crisp cabbage slaw.",
    price: "$3.50",
    image: PHOTO.salad,
  },
  "Potato salad": {
    description: "House potato salad.",
    price: "$4",
    image: PHOTO.potato,
  },
  Cornbread: {
    description: "Skillet cornbread, served warm.",
    price: "$3.50",
    image: PHOTO.plated,
  },
  Ribeye: {
    description: "Grilled ribeye, cooked how you like it.",
    price: "$36",
    image: PHOTO.steak,
  },
  Sirloin: {
    description: "Center-cut sirloin with house butter.",
    price: "$28",
    image: PHOTO.steak,
  },
  Filet: {
    description: "Tender filet, smaller cut, bigger price.",
    price: "$42",
    image: PHOTO.steak,
  },
  "Chop or chicken": {
    description: "Pork chop or roasted chicken when posted.",
    price: "$24",
    image: PHOTO.chicken,
  },
  "House salad": {
    description: "Greens, house dressing, seasonal garnish.",
    price: "$8",
    image: PHOTO.salad,
  },
  "Baked potato": {
    description: "Loaded or plain, with the steak.",
    price: "$6",
    image: PHOTO.potato,
  },
  "Seasonal vegetable": {
    description: "Whatever is on the line tonight.",
    price: "$6",
    image: PHOTO.salad,
  },
  "Onion rings or fries": {
    description: "Crisp rings or a pile of fries.",
    price: "$6",
    image: PHOTO.fries,
  },
  "Miso soup": {
    description: "Hot miso with tofu and scallion.",
    price: "$4",
    image: PHOTO.ramen,
  },
  Gyoza: {
    description: "Pan-fried dumplings, six to an order.",
    price: "$8",
    image: PHOTO.gyoza,
  },
  Edamame: {
    description: "Salted pods, for the table.",
    price: "$6",
    image: PHOTO.japanese,
  },
  "Chicken hibachi": {
    description: "Teppanyaki chicken, fried rice, and vegetables.",
    price: "$18",
    image: PHOTO.japanese,
  },
  "Steak hibachi": {
    description: "Teppanyaki steak, fried rice, and vegetables.",
    price: "$24",
    image: PHOTO.steak,
  },
  "Shrimp hibachi": {
    description: "Teppanyaki shrimp, fried rice, and vegetables.",
    price: "$22",
    image: PHOTO.shrimp,
  },
  "Combination hibachi": {
    description: "Pick two proteins from the hibachi list.",
    price: "$26",
    image: PHOTO.japanese,
  },
  "Two-egg plate": {
    description: "Eggs any style, hash browns, and toast.",
    price: "$10",
    image: PHOTO.breakfast,
  },
  "Pancakes or French toast": {
    description: "A short stack or griddled bread, syrup on the side.",
    price: "$11",
    image: PHOTO.pancakes,
  },
  Omelet: {
    description: "Three-egg omelet with the fillings you name.",
    price: "$12",
    image: PHOTO.breakfast,
  },
  Burger: {
    description: "Griddled beef patty, bun, and the usual toppings.",
    price: "$13",
    image: PHOTO.burger,
  },
  "Club sandwich": {
    description: "Triple-decker with turkey, bacon, and tomato.",
    price: "$13",
    image: PHOTO.sandwich,
  },
  "Daily special": {
    description: "Ask what the kitchen wrote on the board.",
    price: "$14",
    image: PHOTO.plated,
  },
  "Pie and coffee": {
    description: "A slice of pie and a cup of coffee.",
    price: "$7",
    image: PHOTO.pie,
  },
  "Fish and chips": {
    description: "Beer-battered fish with a pile of fries.",
    price: "$18",
    image: PHOTO.friedFish,
  },
  "Fish sandwich": {
    description: "Fried fish on a bun, tartar on the side.",
    price: "$14",
    image: PHOTO.friedFish,
  },
  "Seafood basket": {
    description: "Fried seafood, fries, and coleslaw.",
    price: "$17",
    image: PHOTO.shrimp,
  },
  "Clam or shrimp basket": {
    description: "Fried clams or shrimp when the board lists it.",
    price: "$16",
    image: PHOTO.shrimp,
  },
  "Breakfast plate": {
    description: "Eggs, potatoes, and toast until they cut it off.",
    price: "$11",
    image: PHOTO.breakfast,
  },
  Chowder: {
    description: "A cup of chowder when the kettle is on.",
    price: "$7",
    image: PHOTO.soup,
  },
  Espresso: {
    description: "A double shot.",
    price: "$3.50",
    image: PHOTO.espresso,
  },
  "Latte or cappuccino": {
    description: "Espresso with steamed milk.",
    price: "$5",
    image: PHOTO.latte,
  },
  Tea: {
    description: "Hot tea, black or herbal.",
    price: "$3",
    image: PHOTO.drink,
  },
  Pastry: {
    description: "Whatever came out of the case this morning.",
    price: "$4",
    image: PHOTO.pastry,
  },
  "Soup or salad": {
    description: "Cup of soup or a small salad, when posted.",
    price: "$8",
    image: PHOTO.soup,
  },
  "Lunch plate": {
    description: "The midday plate — sandwich or leftover special.",
    price: "$12",
    image: PHOTO.plated,
  },
  "Local draft": {
    description: "A pint from a nearby tap.",
    price: "$6",
    image: PHOTO.beer,
  },
  "Domestic bottle": {
    description: "Cold bottle from the well-known list.",
    price: "$4.50",
    image: PHOTO.beer,
  },
  "Well cocktail": {
    description: "A standard mixed drink from the well.",
    price: "$8",
    image: PHOTO.cocktail,
  },
  "House pour": {
    description: "Whiskey or well spirit, neat or on ice.",
    price: "$7",
    image: PHOTO.cocktail,
  },
  "Wings or nachos": {
    description: "A basket of wings or nachos for the table.",
    price: "$12",
    image: PHOTO.wings,
  },
  "Burger or basket": {
    description: "Burger or fried basket, depending on the kitchen.",
    price: "$13",
    image: PHOTO.burger,
  },
  "Pool, darts, or live music": {
    description: "Tables and a stage when the room is running it.",
    price: "—",
    image: PHOTO.bar,
  },
  "Soup of the day": {
    description: "A cup of whatever went on the stove this morning.",
    price: "$6",
    image: PHOTO.soup,
  },
  "Appetizer plate": {
    description: "A shareable starter for the table.",
    price: "$10",
    image: PHOTO.plated,
  },
  "House special": {
    description: "The plate this kitchen is known for.",
    price: "$18",
    image: PHOTO.plated,
  },
  "Chicken plate": {
    description: "Roasted or fried chicken with two sides.",
    price: "$16",
    image: PHOTO.chicken,
  },
  "Burger or sandwich": {
    description: "Burger or deli sandwich, fries on the side.",
    price: "$13",
    image: PHOTO.burger,
  },
  "Catch or steak": {
    description: "Fish or steak when the kitchen runs it.",
    price: "$24",
    image: PHOTO.fish,
  },
  Dessert: {
    description: "A slice of cake or pie to finish.",
    price: "$7",
    image: PHOTO.pie,
  },
  "Iced tea and soda": {
    description: "Bottomless iced tea or a soda.",
    price: "$3",
    image: PHOTO.soda,
  },
  Coffee: {
    description: "A mug of coffee.",
    price: "$3",
    image: PHOTO.coffee,
  },
  Breakfast: {
    description: "Eggs, potatoes, and toast.",
    price: "$11",
    image: PHOTO.breakfast,
  },
  "Red chile plates": {
    description: "House red chile over the plate of the day.",
    price: "$15",
    image: PHOTO.mexican,
  },
  "Green chile plates": {
    description: "House green chile, the one locals argue about.",
    price: "$15",
    image: PHOTO.mexican,
  },
  "House salsas": {
    description: "Red and green salsa with chips.",
    price: "$4",
    image: PHOTO.chips,
  },
  "Children’s menu": {
    description: "Smaller plates for kids.",
    price: "$8",
    image: PHOTO.plated,
  },
  Margaritas: {
    description: "House margarita, frozen or on the rocks.",
    price: "$9",
    image: PHOTO.margarita,
  },
  Takeout: {
    description: "Same menu, packed to go.",
    price: "—",
    image: PHOTO.takeout,
  },
};

const KEYWORDS: { test: RegExp; preset: DishPreset }[] = [
  { test: /fish and chips|fried cod/i, preset: NAMED["Fish and chips"]! },
  { test: /taco/i, preset: NAMED.Tacos! },
  { test: /burrito/i, preset: NAMED.Burrito! },
  { test: /enchilada|chile|salsa|queso|guacamole/i, preset: NAMED.Enchiladas! },
  { test: /donut|doughnut|glazed/i, preset: NAMED.Glazed! },
  { test: /steak|ribeye|sirloin|filet/i, preset: NAMED.Ribeye! },
  { test: /burger/i, preset: NAMED.Burger! },
  { test: /bbq|brisket|rib|pulled pork/i, preset: NAMED.Brisket! },
  { test: /hibachi|sushi|gyoza|miso|ramen/i, preset: NAMED["Chicken hibachi"]! },
  { test: /coffee|espresso|latte/i, preset: NAMED["Drip coffee"]! },
  { test: /ice cream|scoop|sundae/i, preset: NAMED["Single scoop"]! },
  { test: /milkshake|shake/i, preset: NAMED.Milkshake! },
  { test: /beer|draft|pint/i, preset: NAMED["Local draft"]! },
  { test: /margarita|cocktail/i, preset: NAMED.Margarita! },
  { test: /salad/i, preset: NAMED["House salad"]! },
  { test: /soup|chowder/i, preset: NAMED["Soup of the day"]! },
  { test: /fish|shrimp|clam|seafood/i, preset: NAMED["Fish and chips"]! },
  { test: /pancake|omelet|breakfast|egg/i, preset: NAMED["Two-egg plate"]! },
  { test: /chicken/i, preset: NAMED["Chicken plate"]! },
  { test: /pie|cake|dessert/i, preset: NAMED.Dessert! },
  { test: /wing|nacho/i, preset: NAMED["Wings or nachos"]! },
  { test: /sandwich/i, preset: NAMED["Club sandwich"]! },
];

const FALLBACK: DishPreset = {
  description: "House dish. We’ll swap this line for the owner’s wording.",
  price: "$12",
  image: PHOTO.plated,
};

export function dishPresetFor(name: string): DishPreset {
  const exact = NAMED[name];
  if (exact) {
    return exact;
  }
  const match = KEYWORDS.find((entry) => entry.test.test(name));
  if (match) {
    return match.preset;
  }
  return FALLBACK;
}

export function completeFoodItem(item: OfferItem): OfferItem {
  const preset = dishPresetFor(item.name);
  return {
    ...item,
    description: item.description ?? preset.description,
    price: item.price ?? preset.price,
    image: item.image ?? preset.image,
  };
}

export function completeFoodSection(section: OfferSection): OfferSection {
  return {
    ...section,
    items: section.items.map(completeFoodItem),
  };
}

export function completeFoodOfferings(offerings: Offerings): Offerings {
  return {
    ...offerings,
    sections: offerings.sections.map(completeFoodSection),
  };
}
