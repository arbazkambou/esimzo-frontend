export type CityNetworkFaq = {
  q: string;
  a: string;
};

export type CityNetworkCity = {
  source: string;
  city: string;
  anchor: string;
  fastest: string;
  download_mbps: number;
  runner_up: string;
  runner_up_mbps: number;
  lead_pct: number;
  close_race: boolean;
  all_networks_download_mbps: Record<string, number>;
  highlights: Record<string, string>;
  period: string;
  source_url: string;
  plan_filter_slug: string;
};

export type CountryCityNetworks = {
  country: string;
  slug: string;
  primary_source: string;
  cities_compared: number;
  leader: string;
  meta_description_suggestion: string;
  faq: CityNetworkFaq[];
  cities: CityNetworkCity[];
  official_findings?: string[];
};

export type CitySourceTab = "analytics" | "user";

export type CityNetworkBar = {
  name: string;
  mbps: number;
  percent: number;
  isFastest: boolean;
};

export type CityNetworkCard = {
  id: string;
  city: string;
  anchor: string;
  source: string;
  sourceTab: CitySourceTab;
  fastest: string;
  downloadMbps: number;
  runnerUp: string;
  runnerUpMbps: number;
  leadPct: number;
  closeRace: boolean;
  badgeLabel: string;
  comparisonText: string;
  bars: CityNetworkBar[];
  highlights: { label: string; value: string }[];
  period: string;
  sourceUrl: string;
  ctaHref: string;
  ctaLabel: string;
};

export type CityLeaderRow = {
  name: string;
  wins: number;
  total: number;
  percent: number;
};

export type CityNetworksViewModel = {
  country: string;
  slug: string;
  updatedLabel: string;
  updatedDatetime: string;
  heading: string;
  intro: string;
  leader: string;
  primarySource: string;
  metaDescriptionSuggestion: string;
  leaders: CityLeaderRow[];
  citiesCompared: number;
  cards: CityNetworkCard[];
  hasAnalytics: boolean;
  hasUserTests: boolean;
  faq: { question: string; answer: string }[];
  tip: {
    title: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  sources: { label: string; url: string }[];
  footerDisclaimer: string;
};
