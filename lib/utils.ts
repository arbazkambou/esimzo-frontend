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
  if (capacityMB <= 0) return "–";
  const gb = capacityMB / 1024;
  return `$${(usd / gb).toFixed(2)}`;
}
