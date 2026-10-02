/** Turn a URL slug into a display label, e.g. "united-states" → "United States". */
export function displayNameFromSlug(slug: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** Country / region names that take a definite article in English prose. */
const NAMES_WITH_DEFINITE_ARTICLE = new Set([
  "united states",
  "united kingdom",
  "united arab emirates",
  "uae",
  "netherlands",
  "philippines",
]);

/**
 * Prefixed form for "in/for/…" copy, e.g. "United States" → "the United States".
 * Leaves names that already start with "the" unchanged.
 */
export function withDefiniteArticle(countryName: string): string {
  const trimmed = countryName.trim();
  if (!trimmed) return trimmed;

  const normalized = trimmed.toLowerCase();
  if (normalized.startsWith("the ")) return trimmed;
  if (!NAMES_WITH_DEFINITE_ARTICLE.has(normalized)) return trimmed;
  return `the ${trimmed}`;
}

export function countryTemplateValues(
  countryName: string,
  extra: Record<string, string> = {},
): Record<string, string> {
  return {
    countryName,
    theCountryName: withDefiniteArticle(countryName),
    ...extra,
  };
}

/**
 * Fill `{placeholders}` for country copy. Rewrites preposition + `{countryName}`
 * to use `{theCountryName}` so "in United States" becomes "in the United States".
 * Also supports `{{doubleBrace}}` placeholders used in FAQ stats.
 */
export function fillCountryTemplate(
  template: string,
  countryName: string,
  extra: Record<string, string> = {},
): string {
  const values = countryTemplateValues(countryName, extra);
  const expanded = template.replace(
    /\b(for|in|within|into|throughout|across|to|of|outside|from|through|around|over)\s+\{countryName\}/gi,
    (_match, prep: string) => `${prep} {theCountryName}`,
  );
  return expanded
    .replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] ?? "")
    .replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}
