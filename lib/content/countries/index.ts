import { defaultPlansHeroContent } from "./default";
import {
  franceHowToChooseContent,
  francePlansHeroContent,
} from "./france";
import type {
  CountryPlansHeroContent,
  HowToChooseEsimContent,
} from "./types";

export type {
  CountryPlansHeroContent,
  HowToChooseEsimContent,
  HowToChooseEsimCriterion,
  PlansHeroStats,
} from "./types";

const countryPlansHeroContentBySlug: Record<string, CountryPlansHeroContent> = {
  france: francePlansHeroContent,
};

const countryHowToChooseContentBySlug: Record<string, HowToChooseEsimContent> =
  {
    france: franceHowToChooseContent,
  };

export function getCountryPlansHeroContent(
  slug: string,
): CountryPlansHeroContent {
  return countryPlansHeroContentBySlug[slug] ?? defaultPlansHeroContent;
}

/** Returns country-specific how-to-choose content, or null when none exists. */
export function getCountryHowToChooseContent(
  slug: string,
): HowToChooseEsimContent | null {
  return countryHowToChooseContentBySlug[slug] ?? null;
}
