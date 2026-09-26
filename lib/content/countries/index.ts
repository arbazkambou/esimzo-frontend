import { defaultPlansHeroContent } from "./default";
import {
  franceDataNeedsContent,
  franceEsimVsLocalContent,
  franceHowToChooseContent,
  franceNetworkCoverageContent,
  francePlansHeroContent,
  franceUnlimitedPlansContent,
} from "./france";
import type {
  CountryPlansHeroContent,
  DataNeedsContent,
  EsimVsLocalContent,
  HowToChooseEsimContent,
  NetworkCoverageContent,
  UnlimitedPlansContent,
} from "./types";

export type {
  CountryPlansHeroContent,
  DataNeedsContent,
  DataNeedsTableRow,
  EsimVsLocalContent,
  EsimVsLocalRow,
  HowToChooseEsimContent,
  HowToChooseEsimCriterion,
  NetworkCoverageContent,
  PlansHeroStats,
  UnlimitedPlansContent,
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

const countryUnlimitedPlansContentBySlug: Record<
  string,
  UnlimitedPlansContent
> = {
  france: franceUnlimitedPlansContent,
};

const countryEsimVsLocalContentBySlug: Record<string, EsimVsLocalContent> = {
  france: franceEsimVsLocalContent,
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

/** Returns country-specific unlimited-plans content, or null when none exists. */
export function getCountryUnlimitedPlansContent(
  slug: string,
): UnlimitedPlansContent | null {
  return countryUnlimitedPlansContentBySlug[slug] ?? null;
}

/** Returns country-specific eSIM vs local content, or null when none exists. */
export function getCountryEsimVsLocalContent(
  slug: string,
): EsimVsLocalContent | null {
  return countryEsimVsLocalContentBySlug[slug] ?? null;
}
