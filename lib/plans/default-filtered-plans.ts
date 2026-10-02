import type { Plan } from "@/lib/types/plans.types";
import { getEffectiveUsdPrice } from "@/lib/utils";

/** Match empty-URL `onlyDataOnly` default in usePackageFilters. */
function isDataOnlyPlan(plan: Plan): boolean {
  const voice = plan.telephony?.voice;
  const sms = plan.telephony?.sms;
  return !Boolean(
    plan.phoneNumber ||
      (voice && (voice.inbound || voice.outbound)) ||
      (sms && (sms.inbound || sms.outbound)),
  );
}

/**
 * Empty-URL defaults used for SSR and before nuqs hydrates:
 * data-only packages, cheapest first, promo prices applied.
 */
export function getDefaultFilteredPlans(plans: Plan[]): Plan[] {
  return [...plans]
    .filter(isDataOnlyPlan)
    .sort((a, b) => getEffectiveUsdPrice(a) - getEffectiveUsdPrice(b));
}
