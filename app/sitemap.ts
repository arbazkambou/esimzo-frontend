import { getCountries } from "@/lib/services/plans/plans.services";
import type { MetadataRoute } from "next";

const SITE_URL = "https://esimzo.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const countries = await getCountries();

  const countryEntries: MetadataRoute.Sitemap =
    countries.success && Array.isArray(countries.data)
      ? countries.data
          .filter((country) => Boolean(country.slug))
          .map((country) => ({
            url: `${SITE_URL}/${country.slug}/`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
          }))
      : [];

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...countryEntries,
  ];
}
