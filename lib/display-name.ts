/** Turn a URL slug into a display label, e.g. "united-states" → "United States". */
export function displayNameFromSlug(slug: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
