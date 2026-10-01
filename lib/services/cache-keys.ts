/** Next.js data-cache tags for public API fetches. */
export const cacheTags = {
  countries: "countries",
  regions: "regions",
  plans: "plans",
  additionalInfo: "additional-info",
  providers: "providers",
} as const;

export const cacheRevalidate = {
  hour: 60 * 60,
  twelveHours: 60 * 60 * 12,
} as const;

const isDev = process.env.NODE_ENV === "development";

/**
 * Next.js fetch cache options.
 * In development: always bypass Data Cache so backend changes show up immediately.
 * In production: use the provided revalidate + tags.
 */
export function nextFetchCache(options: {
  revalidate: number;
  tags: string[];
}):
  | { cache: "no-store" }
  | { next: { revalidate: number; tags: string[] } } {
  if (isDev) {
    return { cache: "no-store" };
  }
  return { next: options };
}
