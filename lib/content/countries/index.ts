import { defaultPlansHeroContent } from "./default";
import { francePlansHeroContent } from "./france";
import type { CountryPlansHeroContent } from "./types";

export type { CountryPlansHeroContent, PlansHeroStats } from "./types";

const countryPlansHeroContentBySlug: Record<string, CountryPlansHeroContent> = {
  france: francePlansHeroContent,
};

export function getCountryPlansHeroContent(
  slug: string,
): CountryPlansHeroContent {
  return countryPlansHeroContentBySlug[slug] ?? defaultPlansHeroContent;
}
