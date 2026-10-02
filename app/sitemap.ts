import { getCountries, getRegions } from "@/lib/services/plans/plans.services";
import type { MetadataRoute } from "next";

const SITE_URL = "https://esimzo.com";

function toEntries(
  items: { slug: string }[] | undefined,
): MetadataRoute.Sitemap {
  if (!items) return [];
  return items
    .filter((item) => Boolean(item.slug))
    .map((item) => ({
      url: `${SITE_URL}/${item.slug}/`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [countries, regions] = await Promise.all([
    getCountries(),
    getRegions(),
  ]);

  const countryEntries = toEntries(
    countries.success && Array.isArray(countries.data) ? countries.data : [],
  );
  const regionEntries = toEntries(
    regions.success && Array.isArray(regions.data) ? regions.data : [],
  );

  // Omit lastModified until we have real content dates — inventing build-time
  // timestamps makes every URL look freshly updated on every deploy.
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    ...countryEntries,
    ...regionEntries,
    {
      url: `${SITE_URL}/global/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
