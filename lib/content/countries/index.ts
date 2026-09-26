import { defaultPlansHeroContent } from "./default";
import {
  franceDataNeedsContent,
  franceHowToChooseContent,
  francePlansHeroContent,
} from "./france";
import type {
  CountryPlansHeroContent,
  DataNeedsContent,
  HowToChooseEsimContent,
} from "./types";

export type {
  CountryPlansHeroContent,
  DataNeedsContent,
  DataNeedsTableRow,
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

const countryDataNeedsContentBySlug: Record<string, DataNeedsContent> = {
  france: franceDataNeedsContent,
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

/** Returns country-specific data-needs content, or null when none exists. */
export function getCountryDataNeedsContent(
  slug: string,
): DataNeedsContent | null {
  return countryDataNeedsContentBySlug[slug] ?? null;
}
