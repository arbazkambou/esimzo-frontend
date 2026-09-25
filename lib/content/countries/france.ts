import type { CountryPlansHeroContent } from "./types";

/** France plans-page hero copy. Country-specific; not used inside the reusable UI. */
export const francePlansHeroContent: CountryPlansHeroContent = {
  eyebrow: "Compare Plans",
  titleTemplate: "Compare eSIM Plans for {countryName}",
  description:
    "Compare travel eSIM plans for {countryName} by price, data, validity, local network, 5G access, hotspot support and speed limits. Use the filters to find an option that fits your trip and phone.",
  browseTemplate:
    "Browse {planCount} plans from {providerCount} providers.",
  pricingTemplate:
    "Plans currently start at {startingPrice}. Plan information updated {lastUpdated}.",
};
