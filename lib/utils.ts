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

export function isUnlimitedPlan(plan: {
  dataType: "fixed" | "daily" | "unlimited" | "unknown";
  unlimitedAfterAllowance: boolean | null;
}): boolean {
  return (
    plan.dataType === "unlimited" ||
    (plan.dataType === "daily" && plan.unlimitedAfterAllowance === true)
  );
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
