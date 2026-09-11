import { Country } from "./plans.types";

export type GetAdditionalCountryInfoResponse = {
  success: boolean;
  data: AdditionalCountryInfo;
};

export type AdditionalCountryInfo = {
  topDestinations: Country[];
  providers: Provider[];
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
  promoCode: string | null;
  promoTitle: string | null;
};
