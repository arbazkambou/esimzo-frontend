import type { PlansHeroStats } from "@/lib/content/countries";
import type { Plan } from "@/lib/types/plans.types";

/** Derive hero stats from the plans list already fetched for the page. */
export function derivePlansHeroStats(plans: Plan[]): PlansHeroStats {
  const planCount = plans.length;
  const providerCount = new Set(plans.map((p) => p.provider.slug)).size;
  const startingPrice =
    planCount === 0
      ? 0
      : Math.min(...plans.map((p) => p.usdPrice));

  return {
    planCount,
    providerCount,
    startingPrice,
    // No public last_updated on plan payloads yet; matches site "updated daily" messaging.
    lastUpdated: "daily",
  };
}
