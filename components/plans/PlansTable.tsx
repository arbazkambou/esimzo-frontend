"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronRight,
  Fingerprint,
  Info,
  MessageSquare,
  Phone,
  Radio,
  RefreshCw,
  Repeat,
  Smartphone,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  plans: Plan[];
  sort: SortOption;
  sortDir: SortDirection;
  onSort: (sort: SortOption) => void;
  slug: string;
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

type FeatureIcon = {
  key: string;
  label: string;
  detail: string;
  icon: ReactNode;
};

function getPlanFeatureIcons(plan: Plan): FeatureIcon[] {
  const features: FeatureIcon[] = [];
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
      icon: <Radio className="h-3.5 w-3.5" aria-hidden />,
    });
  }
  if (plan.tethering) {
    features.push({
      key: "hotspot",
      label: "Hotspot",
      detail: "Personal hotspot / tethering is supported on this plan.",
      icon: <Smartphone className="h-3.5 w-3.5" aria-hidden />,
    });
  }
  if (hasVoice && hasSms) {
    features.push({
      key: "calls-sms",
      label: "Calls + SMS",
      detail: "Includes voice calls and SMS (check countries covered).",
      icon: <Phone className="h-3.5 w-3.5" aria-hidden />,
    });
  } else if (hasVoice) {
    features.push({
      key: "calls",
      label: "Calls",
      detail: "Includes voice calling (check inbound/outbound coverage).",
      icon: <Phone className="h-3.5 w-3.5" aria-hidden />,
    });
  } else if (hasSms) {
    features.push({
      key: "sms",
      label: "SMS",
      detail: "Includes SMS messaging.",
      icon: <MessageSquare className="h-3.5 w-3.5" aria-hidden />,
    });
  }
  if (plan.canTopUp) {
    features.push({
      key: "topup",
      label: "Top-up",
      detail: "You can buy more data on this plan after purchase.",
      icon: <RefreshCw className="h-3.5 w-3.5" aria-hidden />,
    });
  }
  if (plan.isLowLatency) {
    features.push({
      key: "latency",
      label: "Low latency",
      detail: "Local breakout / lower latency routing for better call and app performance.",
      icon: <Zap className="h-3.5 w-3.5" aria-hidden />,
    });
  }
  if (plan.eKYC) {
    features.push({
      key: "ekyc",
      label: "eKYC",
      detail: "Identity verification (eKYC) is required before activation.",
      icon: <Fingerprint className="h-3.5 w-3.5" aria-hidden />,
    });
  }
  if (plan.subscription) {
    features.push({
      key: "sub",
      label: "Subscription",
      detail: "This is a recurring subscription plan, not a one-time prepaid pack.",
      icon: <Repeat className="h-3.5 w-3.5" aria-hidden />,
    });
  }
  if (plan.payAsYouGo) {
    features.push({
      key: "payg",
      label: "Pay-as-you-go",
      detail: "Pay-as-you-go pricing — usage is billed as you consume data.",
      icon: <Wifi className="h-3.5 w-3.5" aria-hidden />,
    });
  }
  if (plan.newUserOnly) {
    features.push({
      key: "new",
      label: "New users",
      detail: "Available only for new customers of this provider.",
      icon: <UserPlus className="h-3.5 w-3.5" aria-hidden />,
    });
  }

  return features;
}

function PlanFeatureIcons({ plan }: { plan: Plan }) {
  const features = getPlanFeatureIcons(plan);
  if (features.length === 0) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-w-0 flex-nowrap items-center gap-1 overflow-x-auto scrollbar-none">
        {features.map((feature) => (
          <Tooltip key={feature.key}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                aria-label={feature.label}
                className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-text-secondary transition-colors hover:border-border-strong hover:bg-muted hover:text-brand-navy"
              >
                {feature.icon}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[16rem]">
              <p className="text-xs font-semibold text-white">{feature.label}</p>
              <p className="mt-0.5 text-xs text-white/90">{feature.detail}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

function FairUseInfo({ plan }: { plan: Plan }) {
  const note = getPlanFairUseNote(plan);
  if (!note) return null;

  return (
    <TooltipProvider delayDuration={200}>
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
          <p className="text-xs font-semibold text-white">Fair use / speed</p>
          <p className="mt-0.5 text-xs text-white/90">{note}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function PlanMobileCard({
  plan,
  href,
}: {
  plan: Plan;
  href: string;
}) {
  const effective = getEffectiveUsdPrice(plan);
  const hasPromo = effective < plan.usdPrice;
  const perGb = pricePerGB(effective, getHighSpeedDataMB(plan));
  const periodLabel =
    plan.period === 0
      ? "No expiry"
      : `${plan.period} ${plan.period === 1 ? "day" : "days"}`;

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3 shadow-card transition-[border-color,box-shadow,background-color]",
        "hover:border-border-strong hover:shadow-elevated",
        "focus-visible:shadow-[var(--focus-ring)] outline-none",
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        {plan.provider.image ? (
          <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-border bg-background">
            <Image
              src={plan.provider.image}
              alt=""
              fill
              className="object-contain p-0.5"
              aria-hidden
            />
          </div>
        ) : (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-caption font-bold text-primary-text">
            {plan.provider.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-caption font-medium text-text-secondary">
            {plan.provider.name}
          </p>
          <p className="truncate text-body-sm font-semibold text-brand-navy">
            {plan.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-md border border-border-subtle bg-muted/30 px-2.5 py-2">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            Data
          </p>
          <div className="mt-0.5 flex items-center">
            <p className="truncate text-body-sm font-bold tabular text-brand-navy">
              {formatPlanData(plan)}
            </p>
            <FairUseInfo plan={plan} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            Validity
          </p>
          <p className="mt-0.5 truncate text-body-sm font-semibold tabular text-brand-navy">
            {periodLabel}
          </p>
        </div>
        <div className="min-w-0 text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            Price
          </p>
          <div className="mt-0.5 flex flex-wrap items-baseline justify-end gap-x-1.5">
            <span className="text-body-sm font-bold tabular text-primary-text">
              {formatPrice(effective)}
            </span>
            {hasPromo ? (
              <span className="text-xs tabular text-destructive line-through decoration-destructive/80">
                {formatPrice(plan.usdPrice)}
              </span>
            ) : perGb !== "–" ? (
              <span className="text-xs text-text-muted">{perGb}/GB</span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <PlanFeatureIcons plan={plan} />
        <span className="inline-flex shrink-0 items-center gap-0.5 text-caption font-semibold text-primary-text">
          View
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default function PlansTable({
  plans,
  sort,
  sortDir,
  onSort,
  slug,
}: Props) {
  return (
    <div className="mt-2 space-y-3 sm:mt-4">
      {/* Mobile / tablet card list */}
      <div className="flex flex-col gap-2.5 lg:hidden">
        <p className="px-0.5 text-caption text-text-secondary">
          <span className="tabular font-semibold text-brand-navy">
            {plans.length}
          </span>{" "}
          plans match your filters
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
      <div className="hidden overflow-hidden rounded-lg border border-border bg-card shadow-card lg:block">
        <Table className="table-fixed">
          <colgroup>
            <col className="w-[32%]" />
            <col className="w-[10%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[22%]" />
          </colgroup>
          <TableHeader>
            <TableRow className="border-border bg-muted/50 hover:bg-muted/50">
              <TableHead className="sticky left-0 z-10 bg-muted/50 px-3 text-caption font-bold uppercase tracking-wider text-text-secondary">
                Plan & provider
              </TableHead>
              {SORTABLE_COLUMNS.map((col) => (
                <TableHead key={col.id} className="px-3">
                  <button
                    type="button"
                    onClick={() => onSort(col.id)}
                    className={cn(
                      "inline-flex items-center gap-1 text-caption font-bold uppercase tracking-wider transition-colors",
                      sort === col.id
                        ? "text-primary-text"
                        : "text-text-secondary hover:text-brand-navy",
                    )}
                  >
                    {col.label}
                    {sort === col.id ? (
                      sortDir === "asc" ? (
                        <ArrowUp className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <ArrowDown className="h-3.5 w-3.5 text-primary" />
                      )
                    ) : (
                      <ArrowUpDown className="h-3.5 w-3.5 text-text-muted" />
                    )}
                  </button>
                </TableHead>
              ))}
              <TableHead className="px-3 text-caption font-bold uppercase tracking-wider text-text-secondary">
                Features
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => {
              const href = `/${slug}/${plan.provider.slug}-provider`;
              const effective = getEffectiveUsdPrice(plan);
              const hasPromo = effective < plan.usdPrice;
              const periodLabel =
                plan.period === 0
                  ? "No expiry"
                  : `${plan.period} ${plan.period === 1 ? "Day" : "Days"}`;
              const linkClass =
                "block no-underline text-inherit hover:no-underline";

              return (
                <TableRow
                  key={plan.id}
                  className="group border-border transition-colors hover:bg-primary-soft/40"
                >
                  <TableCell className="sticky left-0 z-10 bg-card px-3 group-hover:bg-primary-soft/40">
                    <Link href={href} className={cn(linkClass, "flex items-center gap-3")}>
                      {plan.provider.image ? (
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-md border border-border bg-background">
                          <Image
                            src={plan.provider.image}
                            alt=""
                            fill
                            className="object-contain p-0.5"
                            aria-hidden
                          />
                        </div>
                      ) : (
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-sm font-bold text-primary-text">
                          {plan.provider.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-caption font-medium text-text-secondary">
                          {plan.provider.name}
                        </p>
                        <p className="truncate text-body-sm font-semibold text-brand-navy">
                          {plan.name}
                        </p>
                      </div>
                    </Link>
                  </TableCell>

                  <TableCell className="px-3">
                    <Link
                      href={href}
                      className={cn(linkClass, "inline-flex items-center")}
                    >
                      <span className="text-body-sm font-semibold tabular text-brand-navy">
                        {formatPlanData(plan)}
                      </span>
                      <FairUseInfo plan={plan} />
                    </Link>
                  </TableCell>

                  <TableCell className="px-3">
                    <Link
                      href={href}
                      className={cn(linkClass, "inline-flex items-center gap-1")}
                    >
                      <span className="text-body-sm font-medium tabular text-brand-navy">
                        {periodLabel}
                      </span>
                      {plan.isConsecutive ? (
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info
                                className="h-3.5 w-3.5 text-text-muted"
                                aria-label="Consecutive days from activation"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs text-white">
                                Consecutive days from activation
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : null}
                    </Link>
                  </TableCell>

                  <TableCell className="px-3">
                    <Link href={href} className={linkClass}>
                      <span className="text-body-sm font-medium tabular text-text-secondary">
                        {pricePerGB(effective, getHighSpeedDataMB(plan))}
                      </span>
                    </Link>
                  </TableCell>

                  <TableCell className="px-3">
                    <Link
                      href={href}
                      className={cn(
                        linkClass,
                        "inline-flex flex-row flex-wrap items-baseline gap-x-1.5",
                      )}
                    >
                      <span className="text-body-sm font-bold tabular text-primary-text">
                        {formatPrice(effective)}
                      </span>
                      {hasPromo ? (
                        <span className="text-xs tabular text-destructive line-through decoration-destructive/80">
                          {formatPrice(plan.usdPrice)}
                        </span>
                      ) : null}
                    </Link>
                  </TableCell>

                  <TableCell className="px-3">
                    <PlanFeatureIcons plan={plan} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
