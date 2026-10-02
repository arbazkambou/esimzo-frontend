import type { Plan, PlanListItem } from "@/lib/types/plans.types";

type NetworkNameSource = {
  networks?: string[];
  coverages?: Plan["coverages"];
};

/** Operator names for filters and table — from `networks` or nested coverages. */
export function extractPlanNetworkNames(plan: NetworkNameSource): string[] {
  const raw: string[] = [];

  if (Array.isArray(plan.networks) && plan.networks.length > 0) {
    for (const name of plan.networks) {
      if (typeof name === "string" && name.trim()) raw.push(name.trim());
    }
  } else {
    for (const coverage of plan.coverages ?? []) {
      for (const network of coverage.networks ?? []) {
        const netName =
          typeof network === "string" ? network : network?.name;
        if (netName?.trim()) raw.push(netName.trim());
      }
    }
  }

  return raw;
}

/** Strip list/detail-only fields so RSC → client payload stays small. */
export function toPlanListItem(plan: Plan): PlanListItem {
  const networks = extractPlanNetworkNames(plan);
  const coverageCodes = (plan.coverages ?? [])
    .map((c) => c.code)
    .filter((code): code is string => Boolean(code));

  return {
    id: plan.id,
    name: plan.name,
    usdPrice: plan.usdPrice,
    promoEnabled: plan.promoEnabled,
    promoPrice: plan.promoPrice,
    capacity: plan.capacity,
    capacityInfo: plan.capacityInfo,
    dataType: plan.dataType,
    unlimitedAfterAllowance: plan.unlimitedAfterAllowance,
    period: plan.period,
    reducedSpeed: plan.reducedSpeed,
    speedLimit: plan.speedLimit,
    possibleThrottling: plan.possibleThrottling,
    isLowLatency: plan.isLowLatency,
    has5G: plan.has5G,
    tethering: plan.tethering,
    canTopUp: plan.canTopUp,
    phoneNumber: plan.phoneNumber,
    telephony: plan.telephony,
    subscription: plan.subscription,
    payAsYouGo: plan.payAsYouGo,
    newUserOnly: plan.newUserOnly,
    isConsecutive: plan.isConsecutive,
    eKYC: plan.eKYC,
    providerPromoAvailable: plan.providerPromoAvailable,
    networks,
    coverageCodes,
    hasInternetBreakouts: (plan.internetBreakouts?.length ?? 0) > 0,
    provider: {
      name: plan.provider.name,
      slug: plan.provider.slug,
      image: plan.provider.image,
    },
  };
}

export function toPlanListItems(plans: Plan[]): PlanListItem[] {
  return plans.map(toPlanListItem);
}
