import type { PlanListItem } from "@/lib/types/plans.types";
import { getEffectiveUsdPrice, getHighSpeedDataMB } from "@/lib/utils";

export type SortOption = "cheapest" | "best-value" | "most-data" | "longest";
export type SortDirection = "asc" | "desc";

type SortablePlan = Pick<
  PlanListItem,
  | "usdPrice"
  | "promoEnabled"
  | "promoPrice"
  | "providerPromoAvailable"
  | "provider"
  | "capacity"
  | "dataType"
  | "period"
> & {
  capacityInfo?: string | null;
  unlimitedAfterAllowance?: boolean | null;
  reducedSpeed?: number | null;
};

function periodOf(p: SortablePlan) {
  return p.period ?? 1;
}

/** Shared sort used by country plans page and provider plans page. */
export function sortPlans<T extends SortablePlan>(
  plans: T[],
  column: SortOption,
  direction: SortDirection,
  applyPromo: boolean = true,
  providerPromo?: {
    promoCode?: string | null;
  } | null,
): T[] {
  const sorted = [...plans];
  const dir = direction === "asc" ? 1 : -1;

  const getPrice = (p: SortablePlan) =>
    applyPromo ? getEffectiveUsdPrice(p, providerPromo) : p.usdPrice;

  switch (column) {
    case "cheapest":
      return sorted.sort((a, b) => (getPrice(a) - getPrice(b)) * dir);
    case "best-value": {
      const value = (p: SortablePlan) => {
        const highSpeedData =
          p.dataType === "daily"
            ? p.capacity * Math.max(periodOf(p), 1)
            : getHighSpeedDataMB(p);
        return highSpeedData <= 0 || !Number.isFinite(highSpeedData)
          ? Infinity
          : getPrice(p) / (highSpeedData / 1024);
      };
      return sorted.sort((a, b) => (value(a) - value(b)) * dir);
    }
    case "most-data":
      return sorted.sort((a, b) => {
        const dataA =
          a.dataType === "daily"
            ? a.capacity * Math.max(periodOf(a), 1)
            : getHighSpeedDataMB(a);
        const dataB =
          b.dataType === "daily"
            ? b.capacity * Math.max(periodOf(b), 1)
            : getHighSpeedDataMB(b);
        if (!Number.isFinite(dataA) && !Number.isFinite(dataB)) return 0;
        if (!Number.isFinite(dataA)) return -1 * dir;
        if (!Number.isFinite(dataB)) return 1 * dir;
        return (dataB - dataA) * dir;
      });
    case "longest":
      return sorted.sort((a, b) => (b.period - a.period) * dir);
    default:
      return sorted;
  }
}

export function coverageCountryCount(plan: {
  coverages?: { code?: string }[] | null;
  coverageCodes?: string[] | null;
}): number {
  if (Array.isArray(plan.coverages) && plan.coverages.length > 0) {
    return plan.coverages.length;
  }
  if (Array.isArray(plan.coverageCodes) && plan.coverageCodes.length > 0) {
    return plan.coverageCodes.length;
  }
  return 0;
}

export function isSingleCountryPlan(plan: {
  coverages?: { code?: string }[] | null;
  coverageCodes?: string[] | null;
}): boolean {
  return coverageCountryCount(plan) === 1;
}

export function isMultiCountryPlan(plan: {
  coverages?: { code?: string }[] | null;
  coverageCodes?: string[] | null;
}): boolean {
  return coverageCountryCount(plan) > 1;
}
