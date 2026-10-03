"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Info,
  Minus,
  Wifi,
  Phone,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import type { Plan } from "@/lib/types/plans.types";
import {
  cn,
  formatPlanData,
  formatPrice,
  getEffectiveUsdPrice,
  getHighSpeedDataMB,
  getPlanFairUseNote,
  pricePerGB,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HintTip } from "@/components/ui/hint-tip";

export type PlanCardBadge = "Best value" | "Most popular";

export type PlanCardProps = {
  plan: Plan;
  href?: string;
  selected?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  badge?: PlanCardBadge;
  compareMode?: boolean;
  /** Hide provider logo/name row (provider page sidebar already shows brand). */
  hideProvider?: boolean;
  /**
   * Provider-page layout: always stacked (no mobile row collapse), shows plan
   * name + coverage chip, and keeps View details / Buy CTAs prominent.
   */
  detailLayout?: boolean;
  /** When false, show list price only (matches Apply Promo Codes toggle). Default true. */
  applyPromo?: boolean;
  /** Override primary CTA label. */
  primaryLabel?: string;
  /** External buy / referral URL — renders as primary CTA instead of Select. */
  buyHref?: string;
  onSelect?: (plan: Plan) => void;
  onViewDetails?: (plan: Plan) => void;
  className?: string;
};

function getSpeedLabel(plan: Plan): "4G" | "5G" | "4G/5G" | null {
  if (plan.has5G === true) return "4G/5G";
  if (plan.has5G === false) return "4G";
  return null;
}

function getNetworkNames(plan: Plan): string[] {
  const names = new Set<string>();

  if (Array.isArray(plan.networks) && plan.networks.length > 0) {
    for (const name of plan.networks) {
      if (typeof name === "string" && name.trim()) names.add(name.trim());
    }
    return Array.from(names);
  }

  for (const coverage of plan.coverages ?? []) {
    for (const network of coverage.networks ?? []) {
      if (network.name) names.add(network.name);
    }
  }
  return Array.from(names);
}

function getFeatures(plan: Plan) {
  const telephony = plan.telephony;
  const hasCalls =
    telephony?.voice?.inbound === true || telephony?.voice?.outbound === true;
  const hasSms =
    telephony?.sms?.inbound === true || telephony?.sms?.outbound === true;
  const dataOnly = !hasCalls && !hasSms && plan.phoneNumber !== true;

  const features: { key: string; label: string; included: boolean; icon: React.ReactNode }[] = [
    {
      key: "data",
      label: dataOnly ? "Data only" : "Calls + SMS",
      included: true,
      icon: dataOnly ? (
        <Check className="size-3.5" strokeWidth={1.75} aria-hidden />
      ) : (
        <Phone className="size-3.5" strokeWidth={1.75} aria-hidden />
      ),
    },
    {
      key: "hotspot",
      label: "Hotspot",
      included: plan.tethering === true,
      icon:
        plan.tethering === true ? (
          <Wifi className="size-3.5" strokeWidth={1.75} aria-hidden />
        ) : (
          <Minus className="size-3.5" strokeWidth={1.75} aria-hidden />
        ),
    },
    {
      key: "topup",
      label: "Top-up",
      included: plan.canTopUp === true,
      icon:
        plan.canTopUp === true ? (
          <RefreshCw className="size-3.5" strokeWidth={1.75} aria-hidden />
        ) : (
          <Minus className="size-3.5" strokeWidth={1.75} aria-hidden />
        ),
    },
  ];

  if (hasSms && !dataOnly) {
    features[0] = {
      key: "calls-sms",
      label: "Calls + SMS",
      included: true,
      icon: <MessageSquare className="size-3.5" strokeWidth={1.75} aria-hidden />,
    };
  }

  return features.slice(0, 3);
}

export function PlanCard({
  plan,
  href,
  selected = false,
  disabled = false,
  isLoading = false,
  badge,
  compareMode = false,
  hideProvider = false,
  detailLayout = false,
  applyPromo = true,
  primaryLabel,
  buyHref,
  onSelect,
  onViewDetails,
  className,
}: PlanCardProps) {
  const effectivePrice = applyPromo ? getEffectiveUsdPrice(plan) : plan.usdPrice;
  const hasPromo = applyPromo && getEffectiveUsdPrice(plan) < plan.usdPrice;
  const dataLabel = formatPlanData(plan);
  const fairUseNote = getPlanFairUseNote(plan);
  const speed = getSpeedLabel(plan);
  const networks = getNetworkNames(plan);
  const features = getFeatures(plan);
  const highSpeedMB = getHighSpeedDataMB(plan);
  const perGb = pricePerGB(effectivePrice, highSpeedMB);
  const visibleNetworks = networks.slice(0, 2);
  const extraNetworks = Math.max(networks.length - 2, 0);
  const unavailable = disabled || plan.newUserOnly === false;
  const ctaLabel = primaryLabel ?? (buyHref ? "Buy now" : "Select plan");
  const coverageCount = plan.coverages?.length ?? 0;
  const coverageLabel =
    coverageCount === 1
      ? "1 country"
      : coverageCount > 1
        ? `${coverageCount} countries`
        : null;

  const featureLine = features
    .filter((f) => f.included || compareMode)
    .map((f) => (f.included ? f.label : `Not included: ${f.label}`))
    .slice(0, 3)
    .join(" · ");

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (unavailable || isLoading) return;
    if (buyHref) {
      window.open(buyHref, "_blank", "noopener,noreferrer");
      return;
    }
    onSelect?.(plan);
  };

  const handleDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewDetails?.(plan);
  };

  const cardInner = (
    <>
      {selected && (
        <span
          className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-hidden
        >
          <Check className="size-3.5" strokeWidth={2.5} />
        </span>
      )}

      {/* Provider row */}
      {!hideProvider ? (
        <div className="flex items-center gap-2 min-w-0">
          {plan.provider.image ? (
            <div className="relative size-6 shrink-0 overflow-hidden rounded-xs">
              <Image
                src={plan.provider.image}
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </div>
          ) : (
            <div className="flex size-6 shrink-0 items-center justify-center rounded-xs bg-muted text-caption font-semibold text-text-secondary">
              {plan.provider.name.charAt(0)}
            </div>
          )}
          <span className="text-label text-text-muted truncate">
            {plan.provider.name}
          </span>
          {badge && (
            <Badge
              variant={badge === "Most popular" ? "navy" : "brand"}
              className="ml-auto shrink-0"
            >
              {badge}
            </Badge>
          )}
          {unavailable && !badge && (
            <Badge variant="default" className="ml-auto shrink-0">
              Unavailable
            </Badge>
          )}
        </div>
      ) : detailLayout ? (
        <div className="flex items-start justify-between gap-2 min-w-0 pr-8">
          <div className="min-w-0">
            <p className="truncate text-label font-semibold text-brand-navy">
              {plan.name}
            </p>
            {coverageLabel ? (
              <p className="mt-0.5 text-caption text-text-muted">
                {coverageLabel}
                {speed ? ` · ${speed}` : ""}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
            {selected ? (
              <Badge variant="brand">Your pick</Badge>
            ) : null}
            {badge ? (
              <Badge variant={badge === "Most popular" ? "navy" : "brand"}>
                {badge}
              </Badge>
            ) : null}
            {unavailable && !badge ? (
              <Badge variant="default">Unavailable</Badge>
            ) : null}
          </div>
        </div>
      ) : (
        (badge || unavailable) && (
          <div className="flex items-center min-w-0">
            {badge && (
              <Badge
                variant={badge === "Most popular" ? "navy" : "brand"}
                className="shrink-0"
              >
                {badge}
              </Badge>
            )}
            {unavailable && !badge && (
              <Badge variant="default" className="shrink-0">
                Unavailable
              </Badge>
            )}
          </div>
        )
      )}

      {/* Data + validity */}
      <div className={cn(compareMode && "subgrid-row")}>
        <div
          className={cn(
            "flex items-center gap-1",
            (!hideProvider || detailLayout || badge || unavailable) && "mt-3",
          )}
        >
          <p className="text-h2">{dataLabel}</p>
          {fairUseNote ? (
            <HintTip
              content={fairUseNote}
              label={`Fair use details: ${fairUseNote}`}
              side="top"
              className="inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-text-muted transition-colors hover:text-primary-text"
            >
              <Info className="h-3.5 w-3.5" />
            </HintTip>
          ) : null}
        </div>
        <p className="text-body-sm mt-1 text-text-secondary">
          {plan.period} {plan.period === 1 ? "day" : "days"}
          {!detailLayout && speed && (
            <>
              {" · "}
              <span className="inline-flex items-center rounded-sm border border-border px-1.5 py-0.5 text-caption font-medium text-text-secondary">
                {speed}
              </span>
            </>
          )}
          {detailLayout && plan.isLowLatency === true ? " · Low latency" : null}
        </p>
      </div>

      {/* Price */}
      <div className="mt-3">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-price">
            {formatPrice(effectivePrice)}{" "}
            <span className="text-xs font-medium text-text-muted align-baseline">
              USD
            </span>
          </p>
          {hasPromo ? (
            <span className="text-xs tabular text-destructive line-through decoration-destructive/80">
              {formatPrice(plan.usdPrice)}
            </span>
          ) : null}
          {hasPromo ? <Badge variant="success">Discount</Badge> : null}
          {perGb !== "–" ? (
            <span className="text-xs text-text-muted">{perGb}/GB</span>
          ) : null}
        </div>
      </div>

      <div className="my-3 h-px bg-border-subtle" />

      {/* Features — always visible in detail layout */}
      <ul
        className={cn(
          "flex-col gap-1.5",
          detailLayout ? "flex" : "hidden sm:flex",
        )}
      >
        {features.map((feature) => (
          <li
            key={feature.key}
            className={cn(
              "flex items-center gap-2 text-body-sm",
              feature.included ? "text-text-secondary" : "text-text-muted",
            )}
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center",
                feature.included ? "text-success" : "text-text-muted",
              )}
            >
              {feature.included ? (
                <Check className="size-3.5" strokeWidth={1.75} aria-hidden />
              ) : (
                <Minus className="size-3.5" strokeWidth={1.75} aria-hidden />
              )}
            </span>
            {compareMode && !feature.included
              ? `Not included`
              : feature.label}
          </li>
        ))}
      </ul>

      {/* Networks */}
      {networks.length > 0 && (
        <p
          className={cn(
            "mt-2 text-body-sm text-text-muted",
            !detailLayout && "hidden sm:block",
          )}
        >
          Networks: {visibleNetworks.join(", ")}
          {extraNetworks > 0 && ` +${extraNetworks}`}
        </p>
      )}

      {/* Mobile feature line — skipped in detail layout */}
      {!detailLayout && (
        <p className="mt-2 sm:hidden text-body-sm text-text-muted line-clamp-1">
          {featureLine}
          {speed ? ` · ${speed}` : ""}
        </p>
      )}

      {/* CTAs */}
      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleDetails}
          disabled={isLoading}
        >
          View details
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={handleSelect}
          disabled={unavailable || isLoading}
          isLoading={isLoading}
          aria-pressed={selected}
        >
          {selected && !buyHref ? (
            <>
              <Check className="size-4" strokeWidth={2} aria-hidden />
              Selected
            </>
          ) : (
            <>
              {ctaLabel}
              <ChevronRight className="size-4" strokeWidth={1.75} aria-hidden />
            </>
          )}
        </Button>
      </div>
    </>
  );

  const classes = cn(
    "group relative flex flex-col rounded-lg border border-border bg-card p-[var(--card-pad)] shadow-card transition-[border-color,box-shadow,background-color] duration-[var(--transition-base)]",
    "hover:border-border-strong hover:shadow-elevated",
    "focus-visible:shadow-[var(--focus-ring)]",
    selected &&
      "bg-primary-soft border-primary shadow-[inset_0_0_0_1px_var(--primary)] hover:border-primary",
    unavailable &&
      "opacity-70 pointer-events-none hover:shadow-card hover:border-border",
    !detailLayout &&
      "max-sm:flex-row max-sm:items-center max-sm:gap-4 max-sm:[&>*:not(:first-child):not(:nth-child(2)):not(:nth-child(3)):not(:last-child)]:hidden",
    className,
  );

  if (href && !unavailable) {
    return (
      <Link
        href={href}
        className={classes}
        aria-pressed={selected || undefined}
        aria-disabled={unavailable || undefined}
      >
        {cardInner}
      </Link>
    );
  }

  return (
    <div
      role="group"
      className={classes}
      aria-pressed={selected || undefined}
      aria-disabled={unavailable || undefined}
    >
      {cardInner}
    </div>
  );
}

export function PlanGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}
