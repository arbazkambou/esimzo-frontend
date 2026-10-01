import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatData(capacityMB: number): string {
  if (capacityMB <= 0) return "Unlimited";
  if (capacityMB < 1024) return `${capacityMB}MB`;
  const gb = capacityMB / 1024;
  return `${gb % 1 === 0 ? gb.toFixed(0) : gb.toFixed(1)}GB`;
}

export function formatPrice(usd: number): string {
  return `$${usd}`;
}

/** Format kbps to a short human speed label. */
export function formatKbpsSpeed(kbps: number): string {
  if (!Number.isFinite(kbps) || kbps <= 0) return "";
  if (kbps >= 1000) {
    const mbps = kbps / 1000;
    const label = mbps % 1 === 0 ? mbps.toFixed(0) : mbps.toFixed(1);
    return `${label} Mbps`;
  }
  return `${Math.round(kbps)} Kbps`;
}

/** True when capacityInfo is a real fair-use / policy note, not a data label. */
function isUsefulFairUseCapacityInfo(info: string): boolean {
  const trimmed = info.trim();
  if (!trimmed) return false;
  const lower = trimmed.toLowerCase();
  if (lower === "unlimited" || lower === "data unknown") return false;
  // Skip short data labels like "1GB", "5 GB/day"
  if (/^\d+(\.\d+)?\s*(mb|gb|tb)(\s*\/\s*day)?$/i.test(trimmed)) return false;
  return true;
}

/**
 * Secondary fair-use / throttle note for tooltips.
 * Prefer provider capacityInfo when it already explains the policy;
 * otherwise build a clear message from structured fields.
 */
export function getPlanFairUseNote(plan: {
  capacityInfo: string | null;
  unlimitedAfterAllowance: boolean | null;
  reducedSpeed: number | null;
  speedLimit?: number | null;
  possibleThrottling?: boolean | null;
}): string | null {
  const info = plan.capacityInfo?.trim();
  if (info && isUsefulFairUseCapacityInfo(info)) {
    return info;
  }

  if (plan.reducedSpeed != null && plan.reducedSpeed > 0) {
    const speed = formatKbpsSpeed(plan.reducedSpeed);
    if (!speed) return null;
    if (plan.unlimitedAfterAllowance) {
      return `Slows to ${speed} after the high-speed allowance`;
    }
    return `Speed may drop to ${speed} after fair use`;
  }

  if (plan.possibleThrottling) {
    return "May throttle after fair use";
  }

  if (plan.unlimitedAfterAllowance) {
    return "Continues at reduced speed after high-speed data";
  }

  if (plan.speedLimit != null && plan.speedLimit > 0) {
    const speed = formatKbpsSpeed(plan.speedLimit);
    return speed ? `Speed capped at ${speed}` : null;
  }

  return null;
}

export function formatPlanData(plan: {
  capacity: number;
  capacityInfo: string | null;
  dataType: "fixed" | "daily" | "unlimited" | "unknown";
}): string {
  if (plan.dataType === "daily") {
    return `${formatData(plan.capacity)}/day`;
  }
  if (plan.dataType === "unlimited") return "Unlimited";
  if (plan.dataType === "fixed") return formatData(plan.capacity);
  if (plan.capacity > 0) return formatData(plan.capacity);
  return plan.capacityInfo || "Data unknown";
}

export function getHighSpeedDataMB(plan: {
  capacity: number;
  period: number;
  dataType: "fixed" | "daily" | "unlimited" | "unknown";
}): number {
  if (plan.dataType === "unlimited") return Infinity;
  if (plan.dataType === "daily") {
    return plan.capacity * Math.max(plan.period, 1);
  }
  return plan.capacity;
}

/** True unlimited data only — not daily caps that continue after fair use. */
export function isUnlimitedPlan(plan: {
  dataType: "fixed" | "daily" | "unlimited" | "unknown";
}): boolean {
  return plan.dataType === "unlimited";
}

export function getEffectiveUsdPrice(plan: {
  usdPrice: number;
  promoEnabled: boolean;
  promoPrice: number | null;
}): number {
  return plan.promoEnabled &&
    plan.promoPrice != null &&
    plan.promoPrice >= 0 &&
    plan.promoPrice < plan.usdPrice
    ? plan.promoPrice
    : plan.usdPrice;
}

export function pricePerGB(usd: number, capacityMB: number): string {
  if (capacityMB <= 0 || !Number.isFinite(capacityMB)) return "–";
  const gb = capacityMB / 1024;
  return `$${(usd / gb).toFixed(2)}`;
}
