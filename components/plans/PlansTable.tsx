"use client";

import {
  type ReactNode,
  type RefObject,
  memo,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
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
import type { PlanListItem } from "@/lib/types/plans.types";
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
import { HintTip } from "@/components/ui/hint-tip";
import { Button } from "@/components/ui/button";
import { setClickedPlanCookie } from "@/lib/provider-plan-cookie";

/** Estimated desktop row height for window virtualization. */
const DESKTOP_ROW_ESTIMATE = 84;
/**
 * Estimated mobile card height (content only). Cards vary with feature chips /
 * coverage lines — real sizes are measured via measureElement.
 */
const MOBILE_CARD_ESTIMATE = 168;
/** Matches Tailwind `gap-2.5` (10px) used by the pinned mobile list. */
const MOBILE_CARD_GAP = 10;
const VIRTUAL_OVERSCAN = 5;
const TABLE_COL_SPAN = 7;
/** First N plans are always real DOM (SSR + initial view) for SEO and UX. */
const INITIAL_PLAN_COUNT = 100;

type Props = {
  plans: PlanListItem[];
  sort: SortOption;
  sortDir: SortDirection;
  onSort: (sort: SortOption) => void;
  slug: string;
  /** When false, show list prices only (ignore provider promo codes). */
  applyPromo?: boolean;
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

function getSpeedLabel(plan: PlanListItem): "4G" | "5G" | "4G/5G" | null {
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

function getPlanFeatureChips(plan: PlanListItem): FeatureChip[] {
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

function ProviderLogo({
  src,
  name,
  sizeClassName,
}: {
  src?: string | null;
  name: string;
  sizeClassName: string;
}) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-bold text-primary-text",
          sizeClassName,
        )}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "shrink-0 overflow-hidden rounded-lg border border-border bg-white",
        sizeClassName,
      )}
    >
      {/* Native img is cheaper than next/image inside a virtualized list. */}
      <img
        src={src}
        alt=""
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
        className="size-full object-contain p-1"
        aria-hidden
      />
    </div>
  );
}

function PlanFeatureChips({ plan }: { plan: PlanListItem }) {
  const features = getPlanFeatureChips(plan);
  if (features.length === 0) return null;

  const visible = features.slice(0, 3);
  const overflow = features.length - visible.length;

  return (
    <div className="flex min-w-0 flex-wrap items-center gap-1">
      {visible.map((feature) => (
        <HintTip
          key={feature.key}
          content={feature.detail}
          label={feature.detail}
          side="bottom"
          className="inline-flex cursor-default items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-[11px] font-medium text-text-secondary"
        >
          {feature.icon}
          <span>{feature.label}</span>
        </HintTip>
      ))}
      {overflow > 0 && (
        <span className="text-[11px] font-medium text-text-muted">
          +{overflow}
        </span>
      )}
    </div>
  );
}

function FairUseInfo({ plan }: { plan: PlanListItem }) {
  const note = getPlanFairUseNote(plan);
  if (!note) return null;

  return (
    <HintTip
      content={note}
      label={`Fair use details: ${note}`}
      side="top"
      className="ml-1 inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-text-muted transition-colors hover:text-primary-text"
    >
      <Info className="h-3.5 w-3.5" aria-hidden />
    </HintTip>
  );
}

/** Derive a compact location label from coverage codes */
function getCoverageLabel(plan: PlanListItem): string | null {
  if (!plan.coverageCodes || plan.coverageCodes.length === 0) return null;
  const codes = plan.coverageCodes.filter(Boolean);
  if (codes.length === 0) return null;
  if (codes.length <= 3) return codes.join(", ");
  return `${codes.slice(0, 2).join(", ")} +${codes.length - 2}`;
}

/** Mobile card */
const PlanMobileCard = memo(function PlanMobileCard({
  plan,
  href,
  slug,
  applyPromo = true,
}: {
  plan: PlanListItem;
  href: string;
  slug: string;
  applyPromo?: boolean;
}) {
  const effective = applyPromo ? getEffectiveUsdPrice(plan) : plan.usdPrice;
  const hasPromo = applyPromo && effective < plan.usdPrice;
  const periodLabel =
    plan.period === 0
      ? "No expiry"
      : `${plan.period} ${plan.period === 1 ? "day" : "days"}`;
  const coverageLabel = getCoverageLabel(plan);
  const features = getPlanFeatureChips(plan);

  const rememberClick = () => {
    setClickedPlanCookie({
      planId: plan.id,
      providerSlug: plan.provider.slug,
      destinationSlug: slug,
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
      {/* Link only covers header + stats so tip buttons are never inside <a>. */}
      <div className="relative">
        <Link
          href={href}
          onClick={rememberClick}
          className="absolute inset-0 z-0 outline-none focus-visible:shadow-[var(--focus-ring)]"
          aria-label={`View ${plan.provider.name} plan details`}
        />

        <div className="relative z-10 flex min-w-0 flex-col pointer-events-none">
          <div className="flex min-w-0 items-start gap-3 bg-card px-3.5 pt-3.5 pb-3 sm:px-4 sm:pt-4">
            <ProviderLogo
              src={plan.provider.image}
              name={plan.provider.name}
              sizeClassName="size-10 sm:size-11"
            />

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

            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary-muted bg-primary-soft text-primary">
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>

          <div className="grid grid-cols-3 border-t border-border bg-surface-tint">
            <div className="flex min-w-0 flex-col gap-1 border-r border-border px-3 py-3">
              <div className="flex items-center gap-1 text-text-muted">
                <Database className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="text-[10px] font-medium">Data</span>
                <span className="pointer-events-auto">
                  <FairUseInfo plan={plan} />
                </span>
              </div>
              <span className="text-sm font-medium tabular text-brand-navy">
                {formatPlanData(plan)}
              </span>
            </div>

            <div className="flex min-w-0 flex-col gap-1 border-r border-border px-3 py-3">
              <div className="flex items-center gap-1 text-text-muted">
                <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="text-[10px] font-medium">Validity</span>
              </div>
              <span className="truncate text-sm font-medium tabular text-brand-navy">
                {periodLabel}
              </span>
            </div>

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
        </div>
      </div>

      {features.length > 0 && (
        <div className="relative z-10 flex flex-wrap items-center gap-2 border-t border-border bg-primary-soft/40 px-3.5 py-2.5 sm:px-4">
          <PlanFeatureChips plan={plan} />
        </div>
      )}
    </article>
  );
});

const PlanDesktopRow = memo(function PlanDesktopRow({
  plan,
  slug,
  sort,
  applyPromo = true,
}: {
  plan: PlanListItem;
  slug: string;
  sort: SortOption;
  applyPromo?: boolean;
}) {
  const href = `/${slug}/${plan.provider.slug}-provider`;
  const effective = applyPromo ? getEffectiveUsdPrice(plan) : plan.usdPrice;
  const hasPromo = applyPromo && effective < plan.usdPrice;
  const periodLabel =
    plan.period === 0
      ? "No expiry"
      : `${plan.period} ${plan.period === 1 ? "Day" : "Days"}`;
  const coverageLabel = getCoverageLabel(plan);

  const rememberClick = () => {
    setClickedPlanCookie({
      planId: plan.id,
      providerSlug: plan.provider.slug,
      destinationSlug: slug,
    });
  };

  return (
    <tr className="group border-b border-border last:border-b-0 hover:bg-surface-tint">
      <td className="px-5 py-4">
        <Link
          href={href}
          onClick={rememberClick}
          className="flex min-w-0 items-center gap-3 no-underline"
        >
          <ProviderLogo
            src={plan.provider.image}
            name={plan.provider.name}
            sizeClassName="size-11"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-brand-navy">
              {plan.provider.name}
            </p>
            <p className="mt-0.5 truncate text-xs font-normal text-text-secondary">
              {plan.name}
            </p>
            {coverageLabel && (
              <p className="mt-0.5 flex items-center gap-0.5 truncate text-[11px] text-text-muted">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                {coverageLabel}
              </p>
            )}
          </div>
        </Link>
      </td>

      <td className="px-3 py-4">
        <span className="inline-flex items-center text-sm font-semibold tabular text-brand-navy">
          {formatPlanData(plan)}
          <FairUseInfo plan={plan} />
        </span>
      </td>

      <td className="px-3 py-4">
        <span className="inline-flex items-center gap-1 text-sm font-medium tabular text-brand-navy">
          {periodLabel}
          {plan.isConsecutive ? (
            <span
              title="Consecutive days from activation"
              aria-label="Consecutive days from activation"
              className="inline-flex"
            >
              <Info className="h-3.5 w-3.5 text-text-muted" aria-hidden />
            </span>
          ) : null}
        </span>
      </td>

      <td className="px-3 py-4">
        <span className="text-sm font-medium tabular text-text-secondary">
          {pricePerGB(effective, getHighSpeedDataMB(plan))}
        </span>
      </td>

      <td className="px-3 py-4">
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
          <span className="ml-1.5 text-xs tabular text-primary line-through decoration-primary">
            {formatPrice(plan.usdPrice)}
          </span>
        )}
      </td>

      <td className="px-3 py-4">
        <PlanFeatureChips plan={plan} />
      </td>

            <td className="px-3 py-4">
        <Link
          href={href}
          onClick={rememberClick}
          aria-label={`View ${plan.provider.name} plan details`}
          className="flex items-center justify-center no-underline"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-border bg-card text-primary group-hover:border-primary/30 group-hover:bg-primary-soft">
            <ChevronRight className="h-4 w-4" />
          </span>
        </Link>
      </td>
    </tr>
  );
});

function useDocumentOffsetTop(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  layoutKey: string | number,
) {
  const [offsetTop, setOffsetTop] = useState(0);

  useLayoutEffect(() => {
    if (!enabled) return;

    const update = () => {
      const el = ref.current;
      if (!el) return;
      setOffsetTop(el.getBoundingClientRect().top + window.scrollY);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [enabled, layoutKey, ref]);

  return offsetTop;
}

function useIsLargeScreen() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(min-width: 1024px)");
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

export default function PlansTable({
  plans,
  sort,
  sortDir,
  onSort,
  slug,
  applyPromo = true,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  // First N are always real DOM (SSR + crawlers). Remainder loads only after
  // "View all plans", via the window virtualizer.
  const pinnedPlans = plans.slice(0, INITIAL_PLAN_COUNT);
  const hiddenCount = Math.max(0, plans.length - INITIAL_PLAN_COUNT);
  const restPlans = showAll ? plans.slice(INITIAL_PLAN_COUNT) : [];
  const restCount = restPlans.length;
  const showViewAll = !showAll && hiddenCount > 0;

  const isLargeScreen = useIsLargeScreen();
  const mobileRestRef = useRef<HTMLDivElement>(null);
  const desktopRestRef = useRef<HTMLTableRowElement>(null);

  const mobileScrollMargin = useDocumentOffsetTop(
    mobileRestRef,
    !isLargeScreen && restCount > 0,
    plans.length,
  );
  const desktopScrollMargin = useDocumentOffsetTop(
    desktopRestRef,
    isLargeScreen && restCount > 0,
    plans.length,
  );

  const mobileVirtualizer = useWindowVirtualizer({
    count: !isLargeScreen ? restCount : 0,
    estimateSize: () => MOBILE_CARD_ESTIMATE,
    gap: MOBILE_CARD_GAP,
    overscan: VIRTUAL_OVERSCAN,
    scrollMargin: mobileScrollMargin,
    getItemKey: (index) => restPlans[index]?.id ?? index,
  });

  const desktopVirtualizer = useWindowVirtualizer({
    count: isLargeScreen ? restCount : 0,
    estimateSize: () => DESKTOP_ROW_ESTIMATE,
    overscan: VIRTUAL_OVERSCAN,
    scrollMargin: desktopScrollMargin,
    getItemKey: (index) => restPlans[index]?.id ?? index,
  });

  const mobileItems = mobileVirtualizer.getVirtualItems();
  const desktopItems = desktopVirtualizer.getVirtualItems();

  const desktopPaddingTop =
    desktopItems.length > 0
      ? Math.max(0, desktopItems[0]!.start - desktopScrollMargin)
      : 0;
  const desktopPaddingBottom =
    desktopItems.length > 0
      ? Math.max(
          0,
          desktopVirtualizer.getTotalSize() -
            (desktopItems[desktopItems.length - 1]!.end - desktopScrollMargin),
        )
      : 0;

  return (
    <div className="mt-2 space-y-3 sm:mt-4">
      {/* Mobile / tablet card list */}
      <div className="flex flex-col gap-2.5 lg:hidden">
        <p className="px-0.5 text-caption text-text-secondary">
          <span className="tabular font-semibold text-brand-navy">
            {plans.length}
          </span>{" "}
          plans match your filters
          {showViewAll ? (
            <>
              {" "}
              · showing{" "}
              <span className="tabular font-semibold text-brand-navy">
                {INITIAL_PLAN_COUNT}
              </span>
            </>
          ) : null}
        </p>

        <div className="flex flex-col gap-2.5">
          {pinnedPlans.map((plan) => (
            <PlanMobileCard
              key={plan.id}
              plan={plan}
              slug={slug}
              href={`/${slug}/${plan.provider.slug}-provider`}
              applyPromo={applyPromo}
            />
          ))}
        </div>

        {restCount > 0 ? (
          <div
            ref={mobileRestRef}
            className="relative w-full"
            style={{ height: mobileVirtualizer.getTotalSize() }}
          >
            {mobileItems.map((virtualRow) => {
              const plan = restPlans[virtualRow.index]!;
              return (
                <div
                  key={plan.id}
                  data-index={virtualRow.index}
                  ref={mobileVirtualizer.measureElement}
                  className="absolute top-0 left-0 w-full"
                  style={{
                    transform: `translateY(${virtualRow.start - mobileScrollMargin}px)`,
                  }}
                >
                  <PlanMobileCard
                    plan={plan}
                    slug={slug}
                    href={`/${slug}/${plan.provider.slug}-provider`}
                    applyPromo={applyPromo}
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Desktop comparison table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:block">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col className="w-[31%]" />
            <col className="w-[9%]" />
            <col className="w-[11%]" />
            <col className="w-[10%]" />
            <col className="w-[11%]" />
            <col className="w-[21%]" />
            <col className="w-[7%]" />
          </colgroup>

          <thead>
            <tr className="border-b border-border bg-muted/60">
              <th
                scope="col"
                className="px-5 py-4 text-left text-sm font-semibold text-brand-navy"
              >
                Plan &amp; Provider
              </th>

              {SORTABLE_COLUMNS.map((col) => {
                const isActive = sort === col.id;
                return (
                  <th key={col.id} scope="col" className="px-3 py-4 text-left">
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

              <th
                scope="col"
                className="px-3 py-4 text-left text-sm font-semibold text-brand-navy"
              >
                Features
              </th>
              <th scope="col" className="px-3 py-4" aria-hidden />
            </tr>
          </thead>

          <tbody>
            {pinnedPlans.map((plan) => (
              <PlanDesktopRow
                key={plan.id}
                plan={plan}
                slug={slug}
                sort={sort}
                applyPromo={applyPromo}
              />
            ))}

            {restCount > 0 ? (
              <>
                {/* Anchor for virtualizer scroll margin (after pinned rows). */}
                <tr ref={desktopRestRef} aria-hidden>
                  <td
                    colSpan={TABLE_COL_SPAN}
                    style={{ height: 0, padding: 0, border: 0 }}
                  />
                </tr>

                {desktopPaddingTop > 0 ? (
                  <tr aria-hidden>
                    <td
                      colSpan={TABLE_COL_SPAN}
                      style={{
                        height: desktopPaddingTop,
                        padding: 0,
                        border: 0,
                      }}
                    />
                  </tr>
                ) : null}

                {desktopItems.map((virtualRow) => {
                  const plan = restPlans[virtualRow.index]!;
                  return (
                    <PlanDesktopRow
                      key={plan.id}
                      plan={plan}
                      slug={slug}
                      sort={sort}
                      applyPromo={applyPromo}
                    />
                  );
                })}

                {desktopPaddingBottom > 0 ? (
                  <tr aria-hidden>
                    <td
                      colSpan={TABLE_COL_SPAN}
                      style={{
                        height: desktopPaddingBottom,
                        padding: 0,
                        border: 0,
                      }}
                    />
                  </tr>
                ) : null}
              </>
            ) : null}
          </tbody>
        </table>
      </div>

      {showViewAll ? (
        <div className="relative z-10 -mt-16 flex justify-center pt-10 sm:-mt-20 sm:pt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-background from-40% via-background/85 to-transparent"
          />
          <Button
            type="button"
            variant="default"
            size="lg"
            className="relative z-10 shadow-[0_-12px_28px_color-mix(in_srgb,var(--primary)_42%,transparent)]"
            onClick={() => setShowAll(true)}
          >
            View all {plans.length} plans
          </Button>
        </div>
      ) : null}
    </div>
  );
}

