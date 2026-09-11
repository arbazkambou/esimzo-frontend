export type GetCountriesResponse = {
  success: boolean;
  data: Country[];
};

export type GetPopularResponse = {
  success: boolean;
  data: Country[];
};

export type GetRegionsResponse = {
  success: boolean;
  data: Region[];
};

export type Region = {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag: string;
  countries: Country[];
};

/** Slim region nested on country list endpoints — no `countries` to avoid a cycle. */
export type CountryRegion = Pick<
  Region,
  "id" | "name" | "slug" | "code" | "flag"
>;

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

export type Plan = {
  id: string;
  name: string;
  slug: string;
  usdPrice: number;
  capacity: number;
  period: number;
  isLowLatency: boolean;
  has5G: boolean;
  tethering: boolean;
  canTopUp: boolean;
  phoneNumber: boolean;
  subscription: boolean;
  payAsYouGo: boolean;
  newUserOnly: boolean;
  isConsecutive: boolean;
  eKYC: boolean;
  coverages: Coverage[];
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
