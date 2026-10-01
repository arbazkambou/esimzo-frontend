import rawData from "@/data/city-network-by-country.json";
import type { CountryCityNetworks } from "@/lib/city-networks/types";

const bySlug = new Map<string, CountryCityNetworks>();

for (const entry of rawData as CountryCityNetworks[]) {
  if (entry?.slug) {
    bySlug.set(entry.slug.toLowerCase(), entry);
  }
}

export function getCityNetworksBySlug(
  slug: string,
): CountryCityNetworks | null {
  if (!slug) return null;
  return bySlug.get(slug.toLowerCase()) ?? null;
}
