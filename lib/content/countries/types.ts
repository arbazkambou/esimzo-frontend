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

export type DataNeedsTableRow = {
  travelerType: string;
  planningRange: string;
  typicalUse: string;
};

export type DataNeedsContent = {
  /** Optional non-heading eyebrow label */
  eyebrow?: string;
  /** e.g. "How Much Data Do You Need in {countryName}?" */
  headingTemplate: string;
  /** Lead paragraph; may include {countryName} */
  intro: string;
  columns: {
    travelerType: string;
    planningRange: string;
    typicalUse: string;
  };
  rows: DataNeedsTableRow[];
  /** Closing paragraphs after the table */
  closingParagraphs: string[];
  /** Optional section-level notice */
  notice?: string;
};

export type NetworkCoverageContent = {
  /** Optional non-heading eyebrow label */
  eyebrow?: string;
  /** e.g. "Mobile Networks and eSIM Coverage in {countryName}" */
  headingTemplate: string;
  /** Body paragraphs; may include {countryName} */
  paragraphs: string[];
  /** Major local network operator names */
  networks?: string[];
  /** Optional overseas / special destinations for chips */
  territories?: string[];
  /** Optional coverage notice (e.g. overseas territories) */
  notice?: string;
};

export type UnlimitedPlansContent = {
  /** Optional non-heading eyebrow label */
  eyebrow?: string;
  /** e.g. "Are Unlimited eSIM Plans Available in {countryName}?" */
  headingTemplate: string;
  /** Intro paragraphs; may include {countryName} */
  introParagraphs: string[];
  /** Lead-in before the checklist */
  checklistIntro: string;
  /** Comparison checklist items */
  checklist: string[];
  /** Closing sentence */
  closing: string;
  /** Optional section-level notice */
  notice?: string;
};

export type EsimVsLocalRow = {
  travelEsim: string;
  localSim: string;
};

export type EsimVsLocalContent = {
  /** Optional non-heading eyebrow label */
  eyebrow?: string;
  /** e.g. "eSIM or Local SIM in {countryName}?" */
  headingTemplate: string;
  /** Intro paragraph; may include {countryName} */
  intro: string;
  columns: {
    travelEsim: string;
    localSim: string;
  };
  rows: EsimVsLocalRow[];
  closingParagraphs: string[];
  notice?: string;
};

export type CountryVsRegionalOption = {
  /** e.g. "{countryName} eSIM" or "Regional Europe eSIM" */
  titleTemplate: string;
  paragraphs: string[];
  destinations?: string[];
};

export type CountryVsRegionalContent = {
  eyebrow?: string;
  /** e.g. "Should You Choose a {countryName} eSIM or a Regional Europe eSIM?" */
  headingTemplate: string;
  countryOption: CountryVsRegionalOption;
  regionalOption: CountryVsRegionalOption;
  notice?: string;
};
