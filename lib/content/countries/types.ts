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
