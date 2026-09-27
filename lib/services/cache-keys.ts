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
