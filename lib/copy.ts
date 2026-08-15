const RESEARCH_SENTENCE =
  /\b(no (owned |company |official |independent )?(website|domain)|web search found|mapquest|directories? (name|list|show|describe|also)|hubbiz|birdeye|dun & bradstreet|aggregator|hours (conflict|were not|are omitted|disagree)|facebook is the|not (a |the )?(company |official )?website|should not be used|unrelated|yelp lists|chamber (profile|listing|member)|loc8nearme|bestprosintown|opencorpdata|so hours)\b/i;

const CONFIRM_HIGHLIGHT =
  /\b(mapquest|director(y|ies)|conflict|uncorroborated|aggregat|hubbiz|birdeye|d&b|dun & bradstreet|second phone|alternate|hours|listing phone|facebook is)\b/i;

const STORY_HIGHLIGHT =
  /\b(independent|family|owner|founded|established|since \d{4}|locally owned|not a (national )?chain|downtown|walk-in)\b/i;

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}

export function isResearchSentence(sentence: string): boolean {
  return RESEARCH_SENTENCE.test(sentence);
}

export function customerAbout(about: string, fallback: string): string {
  const kept = splitSentences(about).filter((sentence) => !isResearchSentence(sentence));
  const text = kept.join(" ").trim();
  if (text.length >= 40) {
    return text;
  }
  return fallback;
}

export function defaultCustomerAbout(input: {
  name: string;
  categoryLabel: string;
  city: string;
  state: string;
  address: string;
}): string {
  return `${input.name} is a locally owned ${input.categoryLabel.toLowerCase()} in ${input.city}, ${input.state}. Visit ${input.address} or call to schedule.`;
}

export function splitHighlights(highlights: string[]): {
  story: string[];
  confirm: string[];
} {
  const story: string[] = [];
  const confirm: string[] = [];
  for (const item of highlights) {
    if (CONFIRM_HIGHLIGHT.test(item) && !STORY_HIGHLIGHT.test(item)) {
      confirm.push(item);
      continue;
    }
    if (STORY_HIGHLIGHT.test(item) || !CONFIRM_HIGHLIGHT.test(item)) {
      story.push(item);
      continue;
    }
    confirm.push(item);
  }
  return { story, confirm };
}

export function mapsEmbedUrl(input: {
  address: string;
  city: string;
  state: string;
}): string {
  const hasCity = input.address.toLowerCase().includes(input.city.toLowerCase());
  const query = hasCity
    ? input.address
    : `${input.address}, ${input.city}, ${input.state}`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}
