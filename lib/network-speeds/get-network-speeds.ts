import rawData from "@/data/network-speeds-by-country.json";
import type { CountryNetworkSpeeds } from "@/lib/network-speeds/types";

const bySlug = new Map<string, CountryNetworkSpeeds>();

for (const entry of rawData as CountryNetworkSpeeds[]) {
  if (entry?.slug) {
    bySlug.set(entry.slug.toLowerCase(), entry);
  }
}

export function getNetworkSpeedsBySlug(
  slug: string,
): CountryNetworkSpeeds | null {
  if (!slug) return null;
  return bySlug.get(slug.toLowerCase()) ?? null;
}

export function hasNetworkSpeeds(slug: string): boolean {
  return getNetworkSpeedsBySlug(slug) != null;
}
