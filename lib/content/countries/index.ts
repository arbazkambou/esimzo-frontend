import { defaultPlansHeroContent } from "./default";
import {
  franceDataNeedsContent,
  franceHowToChooseContent,
  franceNetworkCoverageContent,
  francePlansHeroContent,
} from "./france";
import type {
  CountryPlansHeroContent,
  DataNeedsContent,
  HowToChooseEsimContent,
  NetworkCoverageContent,
} from "./types";

export type {
  CountryPlansHeroContent,
  DataNeedsContent,
  DataNeedsTableRow,
  HowToChooseEsimContent,
  HowToChooseEsimCriterion,
  NetworkCoverageContent,
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

const countryNetworkCoverageContentBySlug: Record<
  string,
  NetworkCoverageContent
> = {
  france: franceNetworkCoverageContent,
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

/** Returns country-specific network coverage content, or null when none exists. */
export function getCountryNetworkCoverageContent(
  slug: string,
): NetworkCoverageContent | null {
  return countryNetworkCoverageContentBySlug[slug] ?? null;
}
