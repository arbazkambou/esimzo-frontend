import { defaultPlansHeroContent } from "./default";
import {
  franceCountryVsRegionalContent,
  franceDataNeedsContent,
  franceEsimVsLocalContent,
  franceHowToChooseContent,
  franceNetworkCoverageContent,
  francePhoneCompatibilityContent,
  francePlansHeroContent,
  franceUnlimitedPlansContent,
} from "./france";
import type {
  CountryPlansHeroContent,
  CountryVsRegionalContent,
  DataNeedsContent,
  EsimVsLocalContent,
  HowToChooseEsimContent,
  NetworkCoverageContent,
  PhoneCompatibilityContent,
  UnlimitedPlansContent,
} from "./types";

export type {
  CountryPlansHeroContent,
  CountryVsRegionalContent,
  CountryVsRegionalOption,
  DataNeedsContent,
  DataNeedsTableRow,
  EsimVsLocalContent,
  EsimVsLocalRow,
  HowToChooseEsimContent,
  HowToChooseEsimCriterion,
  NetworkCoverageContent,
  PhoneCompatibilityContent,
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

const countryVsRegionalContentBySlug: Record<string, CountryVsRegionalContent> =
  {
    france: franceCountryVsRegionalContent,
  };

const countryPhoneCompatibilityContentBySlug: Record<
  string,
  PhoneCompatibilityContent
> = {
  france: francePhoneCompatibilityContent,
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

/** Returns country vs regional content, or null when none exists. */
export function getCountryVsRegionalContent(
  slug: string,
): CountryVsRegionalContent | null {
  return countryVsRegionalContentBySlug[slug] ?? null;
}

/** Returns phone compatibility content, or null when none exists. */
export function getCountryPhoneCompatibilityContent(
  slug: string,
): PhoneCompatibilityContent | null {
  return countryPhoneCompatibilityContentBySlug[slug] ?? null;
}
