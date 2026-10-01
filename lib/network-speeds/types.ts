export type NetworkSpeedFaq = {
  q: string;
  a: string;
};

export type NetworkSpeedOperator = {
  name: string;
  formerly: string[];
  download_mbps: number;
  upload_mbps: number;
  latency_ms: number | null;
  source: string;
  period: string;
  latency_source: string;
  source_url: string;
  best_for: string;
  plan_filter_slug: string;
};

export type CountryNetworkSpeeds = {
  country: string;
  slug: string;
  networks: number;
  fastest: string;
  fastest_dl: number;
  lowest_latency: string;
  faq: NetworkSpeedFaq[];
  meta_description_suggestion: string;
  operators: NetworkSpeedOperator[];
  not_measured: string[];
};

export type LatencyTier =
  | "Excellent"
  | "Good"
  | "Fair"
  | "Slow"
  | "Not reported";

export type NetworkSpeedsVerdict = {
  id: "fastest" | "latency" | "allround" | "average";
  label: string;
  name: string;
  value: string;
  dot: "primary" | "navy" | "muted";
};

export type NetworkSpeedsTableRow = {
  rank: number;
  name: string;
  formerly: string[];
  downloadMbps: number;
  uploadMbps: number;
  latencyMs: number | null;
  latencyTier: LatencyTier;
  bestFor: string;
  barPercent: number;
  badge: "Fastest download" | "Lowest latency" | null;
  ctaHref: string;
  ctaLabel: string;
};

export type NetworkSpeedsSource = {
  label: string;
  url: string;
};

export type NetworkSpeedsViewModel = {
  country: string;
  slug: string;
  updatedLabel: string;
  updatedDatetime: string;
  heading: string;
  intro: string;
  tableHeading: string;
  tableCaption: string;
  note: string;
  footerDisclaimer: string;
  verdicts: NetworkSpeedsVerdict[];
  rows: NetworkSpeedsTableRow[];
  faq: { question: string; answer: string }[];
  tip: {
    title: string;
    text: string;
    uses: { label: string; network: string }[];
    ctaLabel: string;
    ctaHref: string;
  };
  sources: NetworkSpeedsSource[];
  metaDescriptionSuggestion: string;
};
