export type CountryRegion = {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag: string;
};

export type Region = {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag: string;
  countries: Country[];
};

export type RegionsResponse = {
  success: boolean;
  data: Region[];
};

export type Country = {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag: string;
  regionId: string;
  popularity: number;
  region?: CountryRegion | null;
};

export type NetworkGeneration = "2G" | "3G" | "4G" | "5G";

export type Network = {
  name: string;
  types: NetworkGeneration[];
};

export type Coverage = {
  code: string;
  name?: string;
  networks?: Network[];
};

export type InternetBreakout = {
  country: string;
};

export type Telephony = {
  dialingCode?: string;
  voice?: { inbound?: boolean; outbound?: boolean };
  sms?: { inbound?: boolean; outbound?: boolean };
};

export type Plan = {
  id: string;
  name: string;
  slug: string;
  usdPrice: number;
  prices: Record<string, number>;
  promoEnabled: boolean;
  promoPrice: number | null;
  promoPrices: Record<string, number> | null;
  capacity: number;
  capacityInfo: string | null;
  dataType: "fixed" | "daily" | "unlimited" | "unknown";
  unlimitedAfterAllowance: boolean | null;
  period: number;
  /** Post-allowance speed in kbps. */
  reducedSpeed: number | null;
  speedLimit?: number | null;
  possibleThrottling?: boolean | null;
  isLowLatency: boolean | null;
  has5G: boolean | null;
  tethering: boolean | null;
  canTopUp: boolean | null;
  phoneNumber: boolean | null;
  telephony?: Telephony | null;
  subscription: boolean | null;
  payAsYouGo: boolean | null;
  newUserOnly: boolean | null;
  isConsecutive: boolean | null;
  eKYC: boolean | null;
  hasAds: boolean | null;
  packageType: string | null;
  providerPromoAvailable: boolean | null;
  /** Omitted from list responses; null on detail responses means unknown. */
  internetBreakouts?: InternetBreakout[] | null;
  coverages: Coverage[];
  /**
   * Slim local operator names for the destination (country list endpoints).
   * Prefer this over `coverages` for network filters — full coverages are often empty on lists.
   */
  networks?: string[];
  provider: {
    name: string;
    slug: string;
    image: string | null;
  };
};

export type Provider = {
  id: string;
  name: string;
  slug: string;
  info: string;
  image: string;
  certified: boolean;
  popularity: number;
  planCount: number;
  providerLinks: ProviderLinks[];
  promoCode: string | null;
  promoTitle: string | null;
  promoDiscount: number | null;
  promoPercentage: boolean;
};

export type ProviderLinks = {
  link: string;
  name: string;
  type: string;
};

/** Nested payload returned by /plans/country|region|global endpoints */
export type PlansListPayload = {
  plans: Plan[];
  provider?: Provider;
};

export type GetCountrySlugResponse = {
  success: boolean;
  /** Object with plans (and optional provider), or [] when empty/not found */
  data: PlansListPayload | Plan[];
};
