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

/**
 * Secondary fair-use / throttle note under Data.
 * Prefer structured fields; fall back to capacityInfo when useful.
 */
export function getPlanFairUseNote(plan: {
  capacityInfo: string | null;
  unlimitedAfterAllowance: boolean | null;
  reducedSpeed: number | null;
  speedLimit?: number | null;
  possibleThrottling?: boolean | null;
}): string | null {
  if (plan.reducedSpeed != null && plan.reducedSpeed > 0) {
    const speed = formatKbpsSpeed(plan.reducedSpeed);
    return speed ? `Then ${speed}` : null;
  }
  if (plan.possibleThrottling) {
    return "May throttle after fair use";
  }
  if (plan.unlimitedAfterAllowance) {
    return "Unlimited after high-speed data";
  }
  if (plan.speedLimit != null && plan.speedLimit > 0) {
    const speed = formatKbpsSpeed(plan.speedLimit);
    return speed ? `Capped at ${speed}` : null;
  }

  const info = plan.capacityInfo?.trim();
  if (!info) return null;
  const lower = info.toLowerCase();
  if (lower === "unlimited" || lower === "data unknown") return null;
  return info;
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
