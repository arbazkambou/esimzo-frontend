"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  ChevronRight,
  Database,
  Fingerprint,
  Info,
  MapPin,
  MessageSquare,
  Phone,
  Radio,
  RefreshCw,
  Repeat,
  Smartphone,
  Tag,
  UserPlus,
  Wifi,
  Zap,
} from "lucide-react";
import type { Plan } from "@/lib/types/plans.types";
import type {
  SortOption,
  SortDirection,
} from "@/lib/hooks/use-package-filters";
import {
  cn,
  formatPlanData,
  formatPrice,
  getEffectiveUsdPrice,
  getHighSpeedDataMB,
  getPlanFairUseNote,
  pricePerGB,
} from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  plans: Plan[];
  sort: SortOption;
  sortDir: SortDirection;
  onSort: (sort: SortOption) => void;
  slug: string;
  /** Total matching plans (before the initial 100-plan cap). */
  totalPlanCount?: number;
  /** True when the list is truncated for initial load performance. */
  isCapped?: boolean;
};

type ColumnSort = {
  id: SortOption;
  label: string;
};

const SORTABLE_COLUMNS: ColumnSort[] = [
  { id: "most-data", label: "Data" },
  { id: "longest", label: "Validity" },
  { id: "best-value", label: "Price/GB" },
  { id: "cheapest", label: "Price" },
];

function getSpeedLabel(plan: Plan): "4G" | "5G" | "4G/5G" | null {
  if (plan.has5G === true) return "4G/5G";
  if (plan.has5G === false) return "4G";
  return null;
}

type FeatureChip = {
  key: string;
  label: string;
  detail: string;
  icon: ReactNode;
};

function getPlanFeatureChips(plan: Plan): FeatureChip[] {
  const features: FeatureChip[] = [];
  const speed = getSpeedLabel(plan);
  const hasVoice =
    plan.phoneNumber === true ||
    plan.telephony?.voice?.inbound === true ||
    plan.telephony?.voice?.outbound === true;
  const hasSms =
    plan.telephony?.sms?.inbound === true ||
    plan.telephony?.sms?.outbound === true;

  if (speed) {
    features.push({
      key: "speed",
      label: speed,
      detail:
        speed === "4G/5G"
          ? "Supports 4G and 5G where available on partner networks."
          : "Runs on 4G/LTE networks.",
      icon: <Radio className="h-3 w-3 shrink-0" aria-hidden />,
    });
  }
  if (plan.tethering) {
    features.push({
      key: "hotspot",
      label: "Hotspot",
      detail: "Personal hotspot / tethering is supported on this plan.",
      icon: <Smartphone className="h-3 w-3 shrink-0" aria-hidden />,
    });
  }
  if (hasVoice && hasSms) {
    features.push({
      key: "calls-sms",
      label: "Calls + SMS",
      detail: "Includes voice calls and SMS (check countries covered).",
      icon: <Phone className="h-3 w-3 shrink-0" aria-hidden />,
    });
  } else if (hasVoice) {
    features.push({
      key: "calls",
      label: "Calls",
      detail: "Includes voice calling (check inbound/outbound coverage).",
      icon: <Phone className="h-3 w-3 shrink-0" aria-hidden />,
    });
  } else if (hasSms) {
    features.push({
      key: "sms",
      label: "SMS",
      detail: "Includes SMS messaging.",
      icon: <MessageSquare className="h-3 w-3 shrink-0" aria-hidden />,
    });
  }
  if (plan.canTopUp) {
    features.push({
      key: "topup",
      label: "Top Up",
      detail: "You can buy more data on this plan after purchase.",
      icon: <RefreshCw className="h-3 w-3 shrink-0" aria-hidden />,
    });
  }
  if (plan.isLowLatency) {
    features.push({
      key: "latency",
      label: "Low latency",
      detail:
        "Local breakout / lower latency routing for better call and app performance.",
      icon: <Zap className="h-3 w-3 shrink-0" aria-hidden />,
    });
  }
  if (plan.eKYC) {
    features.push({
      key: "ekyc",
      label: "eKYC",
      detail: "Identity verification (eKYC) is required before activation.",
      icon: <Fingerprint className="h-3 w-3 shrink-0" aria-hidden />,
    });
  }
  if (plan.subscription) {
    features.push({
      key: "sub",
      label: "Subscription",
      detail:
        "This is a recurring subscription plan, not a one-time prepaid pack.",
      icon: <Repeat className="h-3 w-3 shrink-0" aria-hidden />,
    });
  }
  if (plan.payAsYouGo) {
    features.push({
      key: "payg",
      label: "Pay-as-you-go",
      detail: "Pay-as-you-go pricing — usage is billed as you consume data.",
      icon: <Wifi className="h-3 w-3 shrink-0" aria-hidden />,
    });
  }
  if (plan.newUserOnly) {
    features.push({
      key: "new",
      label: "New users",
      detail: "Available only for new customers of this provider.",
      icon: <UserPlus className="h-3 w-3 shrink-0" aria-hidden />,
    });
  }

  return features;
}

/** Text + icon chips for the features column */
function PlanFeatureChips({ plan }: { plan: Plan }) {
  const features = getPlanFeatureChips(plan);
  if (features.length === 0) return null;

  const visible = features.slice(0, 3);
  const overflow = features.length - visible.length;

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-1">
      {visible.map((feature) => (
        <Tooltip key={feature.key}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-surface-tint px-2 py-0.5 text-[11px] font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-brand-navy"
            >
              {feature.icon}
              <span>{feature.label}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[16rem]">
            {feature.detail}
          </TooltipContent>
        </Tooltip>
      ))}
      {overflow > 0 && (
        <span className="text-[11px] font-medium text-text-muted">
          +{overflow}
        </span>
      )}
    </div>
  );
}

function FairUseInfo({ plan }: { plan: Plan }) {
  const note = getPlanFairUseNote(plan);
  if (!note) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label={`Fair use details: ${note}`}
          className="ml-1 inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-text-muted transition-colors hover:text-primary-text"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[16rem]">
        {note}
      </TooltipContent>
    </Tooltip>
  );
}

/** Derive a compact location label from coverage codes */
function getCoverageLabel(plan: Plan): string | null {
  if (!plan.coverages || plan.coverages.length === 0) return null;
  const codes = plan.coverages.map((c) => c.code).filter(Boolean);
  if (codes.length === 0) return null;
  if (codes.length <= 3) return codes.join(", ");
  return `${codes.slice(0, 2).join(", ")} +${codes.length - 2}`;
}

/** Mobile card */
function PlanMobileCard({
  plan,
  href,
}: {
  plan: Plan;
  href: string;
}) {
  const effective = getEffectiveUsdPrice(plan);
  const hasPromo = effective < plan.usdPrice;
  const periodLabel =
    plan.period === 0
      ? "No expiry"
      : `${plan.period} ${plan.period === 1 ? "day" : "days"}`;
  const coverageLabel = getCoverageLabel(plan);
  const features = getPlanFeatureChips(plan);

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-[border-color,box-shadow,background-color] duration-150",
        "hover:border-border-strong",
        "focus-visible:shadow-[var(--focus-ring)] outline-none",
      )}
    >
      {/* ── Provider header ── */}
      <div className="flex min-w-0 items-start gap-3 px-3.5 pt-3.5 pb-3 sm:px-4 sm:pt-4">
        {plan.provider.image ? (
          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border bg-white sm:size-11 sm:rounded-xl">
            <Image
              src={plan.provider.image}
              alt=""
              fill
              className="object-contain p-1"
              aria-hidden
            />
          </div>
        ) : (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-bold text-primary-text sm:size-11 sm:rounded-xl">
            {plan.provider.name.charAt(0)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-brand-navy">
            {plan.provider.name}
          </p>
          <p className="line-clamp-2 text-xs leading-snug text-text-secondary">
            {plan.name}
          </p>
          {coverageLabel && (
            <p className="mt-0.5 flex min-w-0 items-center gap-1 text-[11px] text-text-muted">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              <span className="truncate">{coverageLabel}</span>
            </p>
          )}
        </div>

        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary transition-[background-color,border-color] duration-150 group-hover:border-[#FFE0D1] group-hover:bg-[#FFF1EB]">
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>

      {/* ── Stats: Data | Validity | Price ── */}
      <div className="grid grid-cols-3 border-t border-border">
        {/* Data */}
        <div className="flex min-w-0 flex-col gap-1 border-r border-border px-3 py-3">
          <div className="flex items-center gap-1 text-text-muted">
            <Database className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="text-[10px] font-medium">Data</span>
            <FairUseInfo plan={plan} />
          </div>
          <span className="text-sm font-medium tabular text-brand-navy">
            {formatPlanData(plan)}
          </span>
        </div>

        {/* Validity */}
        <div className="flex min-w-0 flex-col gap-1 border-r border-border px-3 py-3">
          <div className="flex items-center gap-1 text-text-muted">
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="text-[10px] font-medium">Validity</span>
          </div>
          <span className="truncate text-sm font-medium tabular text-brand-navy">
            {periodLabel}
          </span>
        </div>

        {/* Price */}
        <div className="flex min-w-0 flex-col gap-1 px-3 py-3">
          <div className="flex items-center gap-1 text-text-muted">
            <Tag className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="text-[10px] font-medium">Price</span>
          </div>
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
            <span className="truncate text-sm font-medium tabular text-brand-navy">
              {formatPrice(effective)}
            </span>
            {hasPromo && (
              <span className="truncate text-[11px] tabular text-primary line-through">
                {formatPrice(plan.usdPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      {features.length > 0 && (
        <div className="border-t border-border px-3.5 py-2.5 sm:px-4">
          <PlanFeatureChips plan={plan} />
        </div>
      )}
    </Link>
  );
}

export default function PlansTable({
  plans,
  sort,
  sortDir,
  onSort,
  slug,
  totalPlanCount,
  isCapped = false,
}: Props) {
  const matchCount = totalPlanCount ?? plans.length;

  return (
    <div className="mt-2 space-y-3 sm:mt-4">
      {/* Mobile / tablet card list */}
      <div className="flex flex-col gap-2.5 lg:hidden">
        <p className="px-0.5 text-caption text-text-secondary">
          {isCapped ? (
            <>
              Showing{" "}
              <span className="tabular font-semibold text-brand-navy">
                {plans.length}
              </span>{" "}
              of{" "}
              <span className="tabular font-semibold text-brand-navy">
                {matchCount}
              </span>{" "}
              plans
            </>
          ) : (
            <>
              <span className="tabular font-semibold text-brand-navy">
                {plans.length}
              </span>{" "}
              plans match your filters
            </>
          )}
        </p>
        {plans.map((plan) => (
          <PlanMobileCard
            key={plan.id}
            plan={plan}
            href={`/${slug}/${plan.provider.slug}-provider`}
          />
        ))}
      </div>

      {/* Desktop comparison table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-[0_4px_20px_rgba(11,18,33,0.04)] lg:block">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            {/* Plan & Provider — most space */}
            <col className="w-[31%]" />
            {/* Data */}
            <col className="w-[9%]" />
            {/* Validity */}
            <col className="w-[11%]" />
            {/* Price/GB */}
            <col className="w-[10%]" />
            {/* Price */}
            <col className="w-[11%]" />
            {/* Features */}
            <col className="w-[21%]" />
            {/* Action */}
            <col className="w-[7%]" />
          </colgroup>

          {/* ── Table Header ── */}
          <thead>
            <tr className="border-b border-border bg-muted/60">
              {/* Plan & Provider — non-sortable */}
              <th
                scope="col"
                className="px-5 py-4 text-left text-sm font-semibold text-brand-navy"
              >
                Plan &amp; Provider
              </th>

              {/* Sortable columns */}
              {SORTABLE_COLUMNS.map((col) => {
                const isActive = sort === col.id;
                return (
                  <th
                    key={col.id}
                    scope="col"
                    className="px-3 py-4 text-left"
                  >
                    <button
                      type="button"
                      onClick={() => onSort(col.id)}
                      className={cn(
                        "inline-flex items-center gap-1 text-sm font-semibold transition-colors duration-150",
                        isActive
                          ? "text-primary-text"
                          : "text-brand-navy hover:text-primary-text",
                      )}
                    >
                      <span>{col.label}</span>
                      {isActive ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3.5 w-3.5 text-primary" />
                        ) : (
                          <ArrowDown className="h-3.5 w-3.5 text-primary" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3.5 w-3.5 text-text-muted" />
                      )}
                    </button>
                  </th>
                );
              })}

              {/* Features — non-sortable */}
              <th
                scope="col"
                className="px-3 py-4 text-left text-sm font-semibold text-brand-navy"
              >
                Features
              </th>

              {/* Action — empty header */}
              <th scope="col" className="px-3 py-4" aria-hidden />
            </tr>
          </thead>

          {/* ── Table Body ── */}
          <tbody>
            {plans.map((plan) => {
              const href = `/${slug}/${plan.provider.slug}-provider`;
              const effective = getEffectiveUsdPrice(plan);
              const hasPromo = effective < plan.usdPrice;
              const periodLabel =
                plan.period === 0
                  ? "No expiry"
                  : `${plan.period} ${plan.period === 1 ? "Day" : "Days"}`;
              const coverageLabel = getCoverageLabel(plan);

              return (
                <tr
                  key={plan.id}
                  className="group border-b border-border last:border-b-0 transition-colors duration-150 hover:bg-surface-tint"
                >
                  {/* ── Plan & Provider ── */}
                  <td className="px-5 py-4">
                    <Link
                      href={href}
                      className="flex min-w-0 items-center gap-3 no-underline"
                    >
                      {/* Provider logo */}
                      {plan.provider.image ? (
                        <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-white">
                          <Image
                            src={plan.provider.image}
                            alt=""
                            fill
                            className="object-contain p-1"
                            aria-hidden
                          />
                        </div>
                      ) : (
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-bold text-primary-text">
                          {plan.provider.name.charAt(0)}
                        </div>
                      )}

                      {/* Provider / plan info */}
                      <div className="min-w-0 flex-1">
                        {/* Provider name */}
                        <p className="truncate text-sm font-semibold text-brand-navy">
                          {plan.provider.name}
                        </p>
                        {/* Plan name */}
                        <p className="mt-0.5 truncate text-xs font-normal text-text-secondary">
                          {plan.name}
                        </p>
                        {/* Location */}
                        {coverageLabel && (
                          <p className="mt-0.5 flex items-center gap-0.5 truncate text-[11px] text-text-muted">
                            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                            {coverageLabel}
                          </p>
                        )}
                      </div>
                    </Link>
                  </td>

                  {/* ── Data ── */}
                  <td className="px-3 py-4">
                    <Link href={href} className="inline-flex items-center no-underline">
                      <span className="text-sm font-semibold tabular text-brand-navy">
                        {formatPlanData(plan)}
                      </span>
                      <FairUseInfo plan={plan} />
                    </Link>
                  </td>

                  {/* ── Validity ── */}
                  <td className="px-3 py-4">
                    <Link href={href} className="inline-flex items-center gap-1 no-underline">
                      <span className="text-sm font-medium tabular text-brand-navy">
                        {periodLabel}
                      </span>
                      {plan.isConsecutive ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info
                              className="h-3.5 w-3.5 text-text-muted"
                              aria-label="Consecutive days from activation"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            Consecutive days from activation
                          </TooltipContent>
                        </Tooltip>
                      ) : null}
                    </Link>
                  </td>

                  {/* ── Price / GB ── */}
                  <td className="px-3 py-4">
                    <Link href={href} className="no-underline">
                      <span className="text-sm font-medium tabular text-text-secondary">
                        {pricePerGB(effective, getHighSpeedDataMB(plan))}
                      </span>
                    </Link>
                  </td>

                  {/* ── Price ── */}
                  <td className="px-3 py-4">
                    <Link
                      href={href}
                      className="inline-flex flex-row flex-wrap items-baseline gap-x-1.5 no-underline"
                    >
                      <span
                        className={cn(
                          "text-base font-bold tabular leading-tight",
                          sort === "cheapest" || sort === "best-value"
                            ? "text-primary-text"
                            : "text-brand-navy",
                        )}
                      >
                        {formatPrice(effective)}
                      </span>
                      {hasPromo && (
                        <span className="text-xs tabular text-primary line-through decoration-primary">
                          {formatPrice(plan.usdPrice)}
                        </span>
                      )}
                    </Link>
                  </td>

                  {/* ── Features ── */}
                  <td className="px-3 py-4">
                    <PlanFeatureChips plan={plan} />
                  </td>

                  {/* ── Action chevron ── */}
                  <td className="px-3 py-4">
                    <Link
                      href={href}
                      aria-label={`View ${plan.provider.name} plan details`}
                      className="flex items-center justify-center no-underline"
                    >
                      <span className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors duration-150 group-hover:border-[#FFE0D1] group-hover:bg-[#FFF1EB]">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
