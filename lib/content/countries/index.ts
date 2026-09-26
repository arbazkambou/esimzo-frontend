import { defaultPlansHeroContent } from "./default";
import {
  franceCountryVsRegionalContent,
  franceDataNeedsContent,
  franceEsimVsLocalContent,
  franceFaqsContent,
  franceHowToChooseContent,
  franceNetworkCoverageContent,
  francePhoneCompatibilityContent,
  francePlansHeroContent,
  franceTravelerTipsContent,
  franceUnlimitedPlansContent,
} from "./france";
import {
  spainCountryVsRegionalContent,
  spainDataNeedsContent,
  spainEsimVsLocalContent,
  spainFaqsContent,
  spainHowToChooseContent,
  spainNetworkCoverageContent,
  spainPhoneCompatibilityContent,
  spainPlansHeroContent,
  spainTravelerTipsContent,
  spainUnlimitedPlansContent,
} from "./spain";
import type {
  CountryFaqItem,
  CountryFaqsContent,
  CountryPlansHeroContent,
  CountryVsRegionalContent,
  DataNeedsContent,
  EsimVsLocalContent,
  HowToChooseEsimContent,
  NetworkCoverageContent,
  PhoneCompatibilityContent,
  PlansHeroStats,
  TravelerTipsContent,
  UnlimitedPlansContent,
} from "./types";
import { formatPrice } from "@/lib/utils";

export type {
  CountryFaqItem,
  CountryFaqsContent,
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
  TravelerTip,
  TravelerTipsContent,
  UnlimitedPlansContent,
} from "./types";

const countryPlansHeroContentBySlug: Record<string, CountryPlansHeroContent> = {
  france: francePlansHeroContent,
  spain: spainPlansHeroContent,
};

const countryHowToChooseContentBySlug: Record<string, HowToChooseEsimContent> =
  {
    france: franceHowToChooseContent,
    spain: spainHowToChooseContent,
  };

const countryDataNeedsContentBySlug: Record<string, DataNeedsContent> = {
  france: franceDataNeedsContent,
  spain: spainDataNeedsContent,
};

const countryNetworkCoverageContentBySlug: Record<
  string,
  NetworkCoverageContent
> = {
  france: franceNetworkCoverageContent,
  spain: spainNetworkCoverageContent,
};

const countryUnlimitedPlansContentBySlug: Record<
  string,
  UnlimitedPlansContent
> = {
  france: franceUnlimitedPlansContent,
  spain: spainUnlimitedPlansContent,
};

const countryEsimVsLocalContentBySlug: Record<string, EsimVsLocalContent> = {
  france: franceEsimVsLocalContent,
  spain: spainEsimVsLocalContent,
};

const countryVsRegionalContentBySlug: Record<string, CountryVsRegionalContent> =
  {
    france: franceCountryVsRegionalContent,
    spain: spainCountryVsRegionalContent,
  };

const countryPhoneCompatibilityContentBySlug: Record<
  string,
  PhoneCompatibilityContent
> = {
  france: francePhoneCompatibilityContent,
  spain: spainPhoneCompatibilityContent,
};

const countryTravelerTipsContentBySlug: Record<string, TravelerTipsContent> = {
  france: franceTravelerTipsContent,
  spain: spainTravelerTipsContent,
};

const countryFaqsContentBySlug: Record<string, CountryFaqsContent> = {
  france: franceFaqsContent,
  spain: spainFaqsContent,
};

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template
    .replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] ?? "")
    .replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

function formatLastUpdated(value: PlansHeroStats["lastUpdated"]): string {
  if (value == null || value === "") return "daily";
  if (value instanceof Date) {
    return value.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return String(value);
}

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

/** Returns traveler tips content, or null when none exists. */
export function getCountryTravelerTipsContent(
  slug: string,
): TravelerTipsContent | null {
  return countryTravelerTipsContentBySlug[slug] ?? null;
}

/** Returns country FAQ content, or null when none exists. */
export function getCountryFaqsContent(
  slug: string,
): CountryFaqsContent | null {
  return countryFaqsContentBySlug[slug] ?? null;
}

/** Resolves FAQ templates with country name and live plan stats. */
export function resolveCountryFaqs(
  content: CountryFaqsContent,
  countryName: string,
  stats: PlansHeroStats,
): { heading?: string; faqs: CountryFaqItem[] } {
  const values = {
    countryName,
    starting_price: formatPrice(stats.startingPrice),
    last_updated: formatLastUpdated(stats.lastUpdated),
  };

  return {
    heading: content.heading
      ? fillTemplate(content.heading, values)
      : undefined,
    faqs: content.faqs.map((faq) => ({
      question: fillTemplate(faq.question, values),
      answer: fillTemplate(faq.answer, values),
    })),
  };
}
