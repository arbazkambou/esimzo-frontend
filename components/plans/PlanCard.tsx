"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
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
  pricePerGB,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type PlanCardBadge = "Best value" | "Most popular";

export type PlanCardProps = {
  plan: Plan;
  href?: string;
  selected?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  badge?: PlanCardBadge;
  compareMode?: boolean;
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
  onSelect,
  onViewDetails,
  className,
}: PlanCardProps) {
  const effectivePrice = getEffectiveUsdPrice(plan);
  const hasPromo = effectivePrice < plan.usdPrice;
  const dataLabel = formatPlanData(plan);
  const isUnlimited = plan.dataType === "unlimited";
  const speed = getSpeedLabel(plan);
  const networks = getNetworkNames(plan);
  const features = getFeatures(plan);
  const highSpeedMB = getHighSpeedDataMB(plan);
  const perGb = pricePerGB(effectivePrice, highSpeedMB);
  const visibleNetworks = networks.slice(0, 2);
  const extraNetworks = Math.max(networks.length - 2, 0);
  const unavailable = disabled || plan.newUserOnly === false;

  const featureLine = features
    .filter((f) => f.included || compareMode)
    .map((f) => (f.included ? f.label : `Not included: ${f.label}`))
    .slice(0, 3)
    .join(" · ");

  const handleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (unavailable || isLoading) return;
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

      {/* Data + validity */}
      <div className={cn(compareMode && "subgrid-row")}>
        <p className="text-h2 mt-3">{dataLabel}</p>
        {isUnlimited && plan.capacityInfo && (
          <p className="text-caption mt-0.5">Fair use</p>
        )}
        <p className="text-body-sm mt-1 text-text-secondary">
          {plan.period} {plan.period === 1 ? "day" : "days"}
          {speed && (
            <>
              {" · "}
              <span className="inline-flex items-center rounded-sm border border-border px-1.5 py-0.5 text-caption font-medium text-text-secondary">
                {speed}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Price */}
      <div className="mt-3">
        <p className="text-price">
          {formatPrice(effectivePrice)}{" "}
          <span className="text-caption font-medium text-text-muted align-baseline">
            USD
          </span>
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          {hasPromo && (
            <>
              <span className="text-caption line-through text-text-muted tabular">
                {formatPrice(plan.usdPrice)} USD
              </span>
              <Badge variant="success">Discount</Badge>
            </>
          )}
          {perGb !== "–" && (
            <span className="text-caption">{perGb}/GB</span>
          )}
        </div>
      </div>

      <div className="my-3 h-px bg-border-subtle" />

      {/* Features — desktop */}
      <ul className="hidden sm:flex flex-col gap-1.5">
        {features.map((feature) => (
          <li
            key={feature.key}
            className={cn(
              "flex items-center gap-2 text-body-sm",
              feature.included ? "text-text-secondary" : "text-text-muted"
            )}
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center",
                feature.included ? "text-success" : "text-text-muted"
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
        <p className="mt-2 hidden sm:block text-body-sm text-text-muted">
          Networks: {visibleNetworks.join(", ")}
          {extraNetworks > 0 && ` +${extraNetworks}`}
        </p>
      )}

      {/* Mobile feature line */}
      <p className="mt-2 sm:hidden text-body-sm text-text-muted line-clamp-1">
        {featureLine}
        {speed ? ` · ${speed}` : ""}
      </p>

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
          {selected ? (
            <>
              <Check className="size-4" strokeWidth={2} aria-hidden />
              Selected
            </>
          ) : (
            <>
              Select plan
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
    unavailable && "opacity-70 pointer-events-none hover:shadow-card hover:border-border",
    "max-sm:flex-row max-sm:items-center max-sm:gap-4 max-sm:[&>*:not(:first-child):not(:nth-child(2)):not(:nth-child(3)):not(:last-child)]:hidden",
    className
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
