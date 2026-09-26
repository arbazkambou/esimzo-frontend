export type CountryPlansHeroContent = {
  /** e.g. "Compare eSIM Plans for {countryName}" */
  titleTemplate: string;
  /** Supporting copy; may include {countryName} */
  description: string;
  /** e.g. "Browse {planCount} plans from {providerCount} providers." */
  browseTemplate: string;
  /**
   * e.g. "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}."
   */
  pricingTemplate: string;
  /** Optional non-heading eyebrow label */
  eyebrow?: string;
};

export type PlansHeroStats = {
  planCount: number;
  providerCount: number;
  /** USD */
  startingPrice: number;
  /** Display string or Date; omit/null when unknown */
  lastUpdated?: string | Date | null;
};

export type HowToChooseEsimCriterion = {
  heading: string;
  /** One or more body paragraphs; may include {countryName} */
  paragraphs: string[];
  /** Optional bullet list under this criterion */
  list?: string[];
  /** Optional callout under this criterion */
  notice?: string;
};

export type HowToChooseEsimContent = {
  /** Optional non-heading eyebrow label */
  eyebrow?: string;
  /** e.g. "How to Choose an eSIM for {countryName}" */
  headingTemplate: string;
  /** Lead paragraph; may include {countryName} */
  intro: string;
  criteria: HowToChooseEsimCriterion[];
  /** Optional section-level notice */
  notice?: string;
};
