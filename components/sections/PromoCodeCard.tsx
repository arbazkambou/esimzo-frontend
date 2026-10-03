"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  code: string;
  title: string | null;
  discount: number | null;
  isPercentage: boolean;
  /** Nest inside ProviderDetails without a second outer card. */
  embedded?: boolean;
};

function formatDiscount(
  discount: number | null,
  isPercentage: boolean,
): string | null {
  if (discount == null || typeof discount !== "number" || discount <= 0) {
    return null;
  }
  return isPercentage ? `${discount}% off` : `$${discount} off`;
}

export function PromoCodeCard({
  code,
  title,
  discount,
  isPercentage,
  embedded = false,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const discountLabel = formatDiscount(discount, isPercentage);
  const subtitle =
    discountLabel ??
    (title?.trim() ? title.trim() : "Apply at checkout");

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 sm:gap-2.5",
        !embedded &&
          "rounded-2xl border border-border bg-card p-(--card-pad) shadow-card",
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-caption font-bold uppercase tracking-wider text-primary-text">
          Promo code
        </p>
        <p className="truncate text-caption font-semibold text-text-secondary">
          {subtitle}
        </p>
      </div>

      <div className="flex overflow-hidden rounded-lg border border-border bg-card shadow-subtle">
        <div className="flex min-h-9 min-w-0 flex-1 items-center bg-primary-soft/40 px-3 sm:min-h-11 sm:px-3.5">
          <span className="truncate select-all text-body-sm font-bold tracking-[0.14em] text-brand-navy uppercase sm:text-body">
            {code}
          </span>
        </div>
        <Button
          type="button"
          variant={copied ? "default" : "secondary"}
          onClick={handleCopy}
          className="h-auto min-h-9 shrink-0 rounded-none rounded-r-lg border-0 border-l border-border px-3 sm:min-h-11 sm:px-4"
          aria-label={copied ? "Copied" : "Copy promo code"}
        >
          {copied ? (
            <>
              <Check className="size-3.5 sm:size-4" strokeWidth={2} aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5 sm:size-4" strokeWidth={1.75} aria-hidden />
              Copy
            </>
          )}
        </Button>
      </div>

      <p
        className={cn(
          "text-center text-caption text-text-secondary transition-opacity",
          copied
            ? "opacity-100"
            : "pointer-events-none h-0 overflow-hidden opacity-0",
        )}
        aria-live="polite"
      >
        Copied — paste at checkout
      </p>
    </div>
  );
}
