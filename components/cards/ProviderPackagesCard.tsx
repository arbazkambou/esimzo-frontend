"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  CalendarDays,
  Check,
  Database,
  Eye,
  Gauge,
  Info,
  Megaphone,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Signal,
  Smartphone,
  Tag,
  Timer,
  UserRound,
  Wallet,
  Wifi,
  X,
} from "lucide-react";
import { Plan, Coverage } from "@/lib/types/plans.types";
import type { PlanListItem, Provider } from "@/lib/types/plans.types";
import { OfficialWebsiteCta } from "@/components/sections/OfficialWebsiteCta";
import { toPlanListItem } from "@/lib/plans/plan-list-item";
import {
  cn,
  formatKbpsSpeed,
  formatPlanData,
  formatPrice,
  getEffectiveUsdPrice,
  getPlanFairUseNote,
  pricePerGB,
  getHighSpeedDataMB,
} from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { HintTip } from "@/components/ui/hint-tip";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePlanCoverages } from "@/lib/hooks/use-plan-coverages";

const FEATURE_META: Record<
  string,
  { tip: string; icon: React.ReactNode }
> = {
  Tethering: {
    tip: "Personal hotspot is supported on this plan.",
    icon: <Wifi strokeWidth={1.75} aria-hidden />,
  },
  "Top-up": {
    tip: "You can buy more data after the allowance runs out.",
    icon: <RefreshCw strokeWidth={1.75} aria-hidden />,
  },
  "Low latency": {
    tip: "Optimized for lower-latency connections.",
    icon: <Timer strokeWidth={1.75} aria-hidden />,
  },
  "Voice calls": {
    tip: "Includes voice calling (where supported).",
    icon: <Phone strokeWidth={1.75} aria-hidden />,
  },
  SMS: {
    tip: "Includes SMS messaging (where supported).",
    icon: <MessageSquare strokeWidth={1.75} aria-hidden />,
  },
  "Phone number": {
    tip: "This plan includes a phone number.",
    icon: <Smartphone strokeWidth={1.75} aria-hidden />,
  },
  "Pay as you go": {
    tip: "Billed as you use data, not a fixed package only.",
    icon: <Wallet strokeWidth={1.75} aria-hidden />,
  },
};

function IncludedChip({ label }: { label: string }) {
  const meta = FEATURE_META[label];
  const tip = meta?.tip ?? `${label} is included with this plan.`;
  const icon = meta?.icon ?? <Check strokeWidth={2} aria-hidden />;

  return (
    <HintTip content={tip} label={`${label}: ${tip}`} side="top">
      <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary-soft px-2 py-1 text-caption font-semibold text-brand-navy [&_svg]:size-3.5 [&_svg]:text-primary-text">
        {icon}
        {label}
      </span>
    </HintTip>
  );
}

function InfoChip({
  icon,
  label,
  tip,
}: {
  icon: React.ReactNode;
  label: string;
  tip?: string;
}) {
  const chip = (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-border bg-surface-tint px-2 py-1 text-caption font-semibold text-brand-navy [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-primary-text">
      {icon}
      <span className="truncate">{label}</span>
    </span>
  );

  if (!tip) return chip;

  return (
    <HintTip content={tip} label={`${label}: ${tip}`} side="top">
      {chip}
    </HintTip>
  );
}

function DetailBadge({
  icon,
  label,
  value,
  tip,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  tip?: string;
}) {
  const badge = (
    <span className="inline-flex w-full min-w-0 items-start gap-1.5 rounded-md border border-border bg-surface-tint px-2 py-1.5">
      <span className="mt-0.5 shrink-0 text-primary-text [&_svg]:size-3.5">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5 leading-tight">
        <span className="text-caption font-medium text-text-muted">{label}</span>
        <span className="text-sm font-semibold break-words tabular text-brand-navy">
          {value}
        </span>
      </span>
    </span>
  );

  if (!tip) return badge;

  return (
    <HintTip
      content={tip}
      label={`${label}: ${tip}`}
      side="top"
      className="min-w-0 w-full"
    >
      {badge}
    </HintTip>
  );
}

function GenPill({ type }: { type: string }) {
  const normalized = type.trim().toUpperCase();
  const is5G = normalized === "5G";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 text-caption font-semibold tabular",
        is5G
          ? "border-primary/30 bg-primary-soft text-primary-text"
          : "border-border bg-card text-text-secondary",
      )}
    >
      {normalized}
    </span>
  );
}

function CoverageFlag({ code }: { code: string }) {
  const iso = code.trim().toLowerCase();
  if (!iso) return null;

  return (
    <span className="flex size-4 shrink-0 overflow-hidden rounded-xs border border-border bg-muted">
      <img
        src={`https://flagcdn.com/w40/${iso}.png`}
        alt=""
        width={16}
        height={16}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
        aria-hidden
      />
    </span>
  );
}

function CoverageRow({ coverage }: { coverage: Coverage }) {
  const networks = coverage.networks ?? [];
  const countryLabel = coverage.name?.trim() || coverage.code;

  return (
    <div className="flex items-start gap-2 border-b border-border-subtle py-1.5 last:border-0">
      <CoverageFlag code={coverage.code} />

      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0.5">
        <span className="shrink-0 text-caption font-semibold text-brand-navy">
          {countryLabel}
          <span className="ml-1 font-semibold uppercase text-text-muted">
            {coverage.code}
          </span>
        </span>

        {networks.length > 0 ? (
          networks.map((net, i) => (
            <span
              key={net.name}
              className="inline-flex min-w-0 items-center gap-1 text-caption text-text-secondary"
            >
              {i > 0 ? (
                <span className="text-border-strong" aria-hidden>
                  ·
                </span>
              ) : null}
              <span className="truncate">{net.name}</span>
              <span className="inline-flex items-center gap-0.5">
                {net.types.map((t) => (
                  <GenPill key={t} type={t} />
                ))}
              </span>
            </span>
          ))
        ) : (
          <span className="text-caption italic text-text-muted">
            No network info
          </span>
        )}
      </div>
    </div>
  );
}

/** Single-line rows matching `CoverageRow` height — avoids layout jump on load. */
function CoverageListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-0" aria-hidden>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-2 border-b border-border-subtle py-1.5 last:border-0"
        >
          <Skeleton className="size-4 shrink-0 rounded-sm" />
          <Skeleton className="h-3.5 w-24 max-w-[30%]" />
          <Skeleton className="h-3 w-28 max-w-[35%]" />
          <Skeleton className="h-4 w-7 shrink-0 rounded-sm" />
        </div>
      ))}
    </div>
  );
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

/** Horizontal plans-table row layout — Details opens the dialog (Buy lives there). */
export const ProviderPackagesCard = ({
  data,
  applyPromo = true,
  buyHref,
  providerLinks,
  selected = false,
  asRow = false,
  providerPromo,
}: {
  data: Plan;
  hideProvider?: boolean;
  applyPromo?: boolean;
  /** @deprecated Prefer providerLinks for multi-destination buy CTAs. */
  buyHref?: string;
  /** Official website destinations — same options as the sticky provider CTA. */
  providerLinks?: Provider["providerLinks"];
  selected?: boolean;
  /** Render as a `<tr>` inside the plans table. */
  asRow?: boolean;
  /**
   * When set, promo prices only apply if this provider has a promoCode.
   * Prices themselves come from denormalized plan.promoPrice.
   */
  providerPromo?: {
    promoCode?: string | null;
  } | null;
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [coverageQuery, setCoverageQuery] = useState("");
  const [debouncedCoverageQuery, setDebouncedCoverageQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    data: coveragesPayload,
    isLoading: isCoveragesLoading,
    isError: isCoveragesError,
  } = usePlanCoverages(data.slug || data.id, open);

  const coverages = coveragesPayload?.coverages ?? [];

  const listItem = useMemo(() => toPlanListItem(data), [data]);
  const {
    usdPrice,
    period,
    tethering,
    canTopUp,
    has5G,
    isLowLatency,
    telephony,
  } = data;

  const effectiveUsdPrice = applyPromo
    ? getEffectiveUsdPrice(data, providerPromo)
    : data.usdPrice;
  const hasPromo = applyPromo && effectiveUsdPrice < data.usdPrice;
  const fairUseNote = getPlanFairUseNote(data);
  const perGb = pricePerGB(effectiveUsdPrice, getHighSpeedDataMB(data));
  const hasCalls =
    telephony?.voice == null
      ? null
      : telephony.voice.inbound === true || telephony.voice.outbound === true;
  const hasSms =
    telephony?.sms == null
      ? null
      : telephony.sms.inbound === true || telephony.sms.outbound === true;

  const periodLabel =
    period === 0
      ? "No expiry"
      : `${period} ${period === 1 ? "Day" : "Days"}`;
  const perGbLabel = perGb === "–" ? "–" : perGb;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setCoverageQuery("");
      setDebouncedCoverageQuery("");
    }
  };

  // 5G lives in the Network detail badge — keep Included for extras only.
  const includedFeatures = [
    { label: "Tethering", value: tethering },
    { label: "Top-up", value: canTopUp },
    { label: "Low latency", value: isLowLatency },
    { label: "Voice calls", value: hasCalls },
    { label: "SMS", value: hasSms },
    { label: "Phone number", value: data.phoneNumber },
    { label: "Pay as you go", value: data.payAsYouGo },
  ]
    .filter((f) => f.value === true)
    .map((f) => f.label);

  const infoBadges = useMemo(() => {
    const items: {
      id: string;
      label: string;
      tip?: string;
      icon: React.ReactNode;
    }[] = [];

    // Tooltip only when the short label needs the full policy text.
    if (fairUseNote) {
      items.push({
        id: "fair-use",
        label: "Fair use",
        tip: fairUseNote,
        icon: <Gauge strokeWidth={1.75} aria-hidden />,
      });
    } else if (data.reducedSpeed != null && data.reducedSpeed > 0) {
      const speed = formatKbpsSpeed(data.reducedSpeed);
      if (speed) {
        items.push({
          id: "reduced-speed",
          label: "Fair use",
          tip: data.unlimitedAfterAllowance
            ? `After the high-speed allowance, speed drops to ${speed}.`
            : `Speed may drop to ${speed} after fair use.`,
          icon: <Gauge strokeWidth={1.75} aria-hidden />,
        });
      }
    } else if (data.possibleThrottling === true) {
      items.push({
        id: "throttling",
        label: "Fair use",
        tip: "Speed may be throttled after fair use.",
        icon: <Gauge strokeWidth={1.75} aria-hidden />,
      });
    } else if (data.unlimitedAfterAllowance === true) {
      items.push({
        id: "unlimited-after",
        label: "Fair use",
        tip: "Data continues at a reduced speed after the high-speed allowance.",
        icon: <Gauge strokeWidth={1.75} aria-hidden />,
      });
    }

    if (
      data.speedLimit != null &&
      data.speedLimit > 0 &&
      !fairUseNote?.toLowerCase().includes("capped")
    ) {
      const speed = formatKbpsSpeed(data.speedLimit);
      if (speed) {
        items.push({
          id: "speed-limit",
          label: "Speed cap",
          tip: `Speed capped at ${speed}.`,
          icon: <Timer strokeWidth={1.75} aria-hidden />,
        });
      }
    }

    const validityInfo = data.validityInfo?.trim();
    if (validityInfo) {
      items.push({
        id: "validity-info",
        label: "Validity note",
        tip: validityInfo,
        icon: <Info strokeWidth={1.75} aria-hidden />,
      });
    }

    if (data.isConsecutive) {
      items.push({
        id: "consecutive",
        label: "Consecutive",
        icon: <CalendarDays strokeWidth={1.75} aria-hidden />,
      });
    }

    if (data.eKYC === true) {
      items.push({
        id: "ekyc",
        label: "eKYC",
        icon: <ShieldCheck strokeWidth={1.75} aria-hidden />,
      });
    }

    if (data.subscription === true) {
      items.push({
        id: "subscription",
        label: "Subscription",
        icon: <RefreshCw strokeWidth={1.75} aria-hidden />,
      });
    }

    if (data.newUserOnly === true) {
      items.push({
        id: "new-user",
        label: "New users",
        icon: <UserRound strokeWidth={1.75} aria-hidden />,
      });
    }

    if (data.hasAds === true) {
      items.push({
        id: "ads",
        label: "Ads",
        icon: <Megaphone strokeWidth={1.75} aria-hidden />,
      });
    }

    return items;
  }, [data, fairUseNote]);

  // Use list `coverageCount` while fetching so the search slot is reserved
  // before coverages arrive (avoids a jump when the input mounts).
  const coverageTotal =
    coverages.length > 0
      ? coverages.length
      : (coveragesPayload?.coverageCount ?? data.coverageCount ?? 0);
  const showCoverageSearch = coverageTotal > 4;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedCoverageQuery(coverageQuery), 200);
    return () => clearTimeout(t);
  }, [coverageQuery]);

  const filteredCoverages = useMemo<Coverage[]>(() => {
    const q = debouncedCoverageQuery.trim().toLowerCase();
    if (!q) return coverages;
    return coverages.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.networks?.some((n) => n.name.toLowerCase().includes(q)),
    );
  }, [debouncedCoverageQuery, coverages]);

  const identity = (
    <div className="flex min-w-0 items-center gap-3">
      <ProviderLogo
        src={listItem.provider.image}
        name={listItem.provider.name}
        sizeClassName="size-10 sm:size-11"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-brand-navy">
          {listItem.provider.name}
        </p>
        <p className="mt-0.5 truncate text-xs font-normal text-text-secondary">
          {listItem.name}
        </p>
      </div>
    </div>
  );

  const dataCell = (
    <span className="inline-flex items-center text-sm font-semibold tabular text-brand-navy">
      {formatPlanData(listItem)}
      <FairUseInfo plan={listItem} />
    </span>
  );

  const validityCell = (
    <span className="inline-flex items-center gap-1 text-sm font-medium tabular text-brand-navy">
      {periodLabel}
      {data.isConsecutive ? (
        <span
          title="Consecutive days from activation"
          aria-label="Consecutive days from activation"
          className="inline-flex"
        >
          <Info className="h-3.5 w-3.5 text-text-muted" aria-hidden />
        </span>
      ) : null}
    </span>
  );

  const priceCell = (
    <div className="flex items-baseline gap-1.5">
      <span
        className={cn(
          "text-base font-bold tabular leading-tight",
          hasPromo ? "text-primary-text" : "text-brand-navy",
        )}
      >
        {formatPrice(effectiveUsdPrice)}
      </span>
      {hasPromo ? (
        <span className="text-xs tabular text-primary-text line-through decoration-primary-text">
          {formatPrice(usdPrice)}
        </span>
      ) : null}
    </div>
  );

  const actions = (
    <div className="flex items-center justify-end">
      <Button size="sm" onClick={() => setOpen(true)} className="w-full sm:w-auto">
        <Eye className="size-3.5" strokeWidth={1.75} />
        Details
      </Button>
    </div>
  );

  const row = asRow ? (
    <tr
      className={cn(
        "group border-b border-border last:border-b-0",
        selected ? "bg-primary-soft/40" : "hover:bg-surface-tint",
      )}
    >
      <td className="px-5 py-4">{identity}</td>
      <td className="px-3 py-4">{dataCell}</td>
      <td className="px-3 py-4">{validityCell}</td>
      <td className="px-3 py-4">
        <span className="text-sm font-medium tabular text-text-secondary">
          {perGbLabel}
        </span>
      </td>
      <td className="px-3 py-4">{priceCell}</td>
      <td className="px-3 py-4">{actions}</td>
    </tr>
  ) : (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card",
        selected && "border-transparent bg-transparent shadow-none",
      )}
    >
      <div className="px-3.5 pt-3.5 pb-3 sm:px-4 sm:pt-4">{identity}</div>

      <div className="grid grid-cols-3 border-t border-border bg-surface-tint">
        <div className="flex min-w-0 flex-col gap-1 border-r border-border px-3 py-3">
          <p className="text-caption font-medium text-text-muted">Data</p>
          {dataCell}
        </div>
        <div className="flex min-w-0 flex-col gap-1 border-r border-border px-3 py-3">
          <p className="text-caption font-medium text-text-muted">Validity</p>
          {validityCell}
        </div>
        <div className="flex min-w-0 flex-col gap-1 px-3 py-3">
          <p className="text-caption font-medium text-text-muted">Price</p>
          {priceCell}
        </div>
      </div>

      <div className="border-t border-border px-3.5 py-2.5 sm:px-4">{actions}</div>
    </article>
  );

  const detailsDescription = `${formatPlanData(data)}, ${periodLabel}, ${formatPrice(effectiveUsdPrice)}${perGb !== "–" ? `, ${perGb} per GB` : ""}`;

  const planMetaBadges = (
    <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-2.5 sm:grid-cols-3">
      <DetailBadge
        icon={<Database strokeWidth={1.75} aria-hidden />}
        label="Data"
        value={formatPlanData(data)}
      />
      <DetailBadge
        icon={<CalendarDays strokeWidth={1.75} aria-hidden />}
        label="Validity"
        value={periodLabel}
      />
      <DetailBadge
        icon={<Tag strokeWidth={1.75} aria-hidden />}
        label="Price"
        value={
          hasPromo ? (
            <span className="inline-flex flex-wrap items-baseline gap-1">
              <span>{formatPrice(effectiveUsdPrice)}</span>
              <span className="font-normal text-text-muted line-through">
                {formatPrice(usdPrice)}
              </span>
            </span>
          ) : (
            formatPrice(effectiveUsdPrice)
          )
        }
      />
      {perGb !== "–" ? (
        <DetailBadge
          icon={<Gauge strokeWidth={1.75} aria-hidden />}
          label="Per GB"
          value={perGb}
        />
      ) : null}
      {has5G === true ? (
        <DetailBadge
          icon={<Signal strokeWidth={1.75} aria-hidden />}
          label="Network"
          value="5G"
        />
      ) : null}
    </div>
  );

  const coverageCountLabel = coverageTotal;

  // Fixed height in both loading and loaded states — prevents list box jump.
  const coverageListClass =
    "h-36 overflow-y-auto rounded-lg border border-border bg-card px-2.5 sm:h-44 sm:px-3";

  const planDetailsBody = (
    <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3">
      {infoBadges.length > 0 ? (
        <section className="space-y-1">
          <h3 className="text-label font-semibold text-brand-navy">
            Plan info
          </h3>
          <div className="flex flex-wrap gap-1">
            {infoBadges.map((item) => (
              <InfoChip
                key={item.id}
                icon={item.icon}
                label={item.label}
                tip={item.tip}
              />
            ))}
          </div>
        </section>
      ) : null}

      {includedFeatures.length > 0 ? (
        <section className="space-y-1">
          <h3 className="text-label font-semibold text-brand-navy">
            Included
          </h3>
          <div className="flex flex-wrap gap-1">
            {includedFeatures.map((label) => (
              <IncludedChip key={label} label={label} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="flex shrink-0 flex-col gap-1.5">
        <div className="flex h-4 shrink-0 items-baseline justify-between gap-2">
          <h3 className="text-label font-semibold text-brand-navy">
            Coverage
          </h3>
          <span className="text-caption tabular text-text-muted">
            {coverageCountLabel > 0 ? (
              <>
                {isCoveragesLoading || !debouncedCoverageQuery
                  ? coverageCountLabel
                  : `${filteredCoverages.length} of ${coverages.length}`}{" "}
                {coverageCountLabel === 1 ? "country" : "countries"}
              </>
            ) : isCoveragesLoading ? (
              <Skeleton className="inline-block h-3 w-16 align-middle" />
            ) : null}
          </span>
        </div>

        {showCoverageSearch ? (
          <div className="flex h-9 shrink-0 items-center gap-2 rounded-md border border-border bg-input-bg px-3 transition-[border-color,box-shadow] focus-within:border-border-strong focus-within:shadow-subtle">
            <Search
              className="size-3.5 shrink-0 text-text-muted"
              strokeWidth={1.75}
              aria-hidden
            />
            <input
              ref={searchRef}
              type="search"
              value={coverageQuery}
              onChange={(e) => setCoverageQuery(e.target.value)}
              placeholder="Search country or network…"
              disabled={isCoveragesLoading}
              className="flex-1 bg-transparent text-sm text-brand-navy outline-none placeholder:text-text-muted disabled:cursor-wait disabled:opacity-70"
            />
            {coverageQuery ? (
              <button
                type="button"
                onClick={() => setCoverageQuery("")}
                className="inline-flex size-7 items-center justify-center rounded-md text-text-muted transition-colors hover:text-brand-navy"
                aria-label="Clear search"
              >
                <X className="size-3.5" strokeWidth={1.75} />
              </button>
            ) : null}
          </div>
        ) : null}

        <div
          className={coverageListClass}
          aria-busy={isCoveragesLoading}
          aria-live="polite"
        >
          {isCoveragesLoading ? (
            <CoverageListSkeleton />
          ) : isCoveragesError ? (
            <p className="py-4 text-center text-caption text-text-muted">
              Couldn&apos;t load coverage details.
            </p>
          ) : filteredCoverages.length > 0 ? (
            filteredCoverages.map((c, i) => (
              <CoverageRow key={`${c.code}-${i}`} coverage={c} />
            ))
          ) : debouncedCoverageQuery ? (
            <p className="py-4 text-center text-caption text-text-muted">
              No countries match &quot;{debouncedCoverageQuery}&quot;
            </p>
          ) : (
            <p className="py-4 text-center text-caption text-text-muted">
              No coverage details available.
            </p>
          )}
        </div>
      </section>
    </div>
  );

  const footerLinks =
    providerLinks && providerLinks.length > 0
      ? providerLinks
      : buyHref
        ? [{ link: buyHref, name: "Official Website", type: "website" }]
        : [];

  const planDetailsFooter =
    footerLinks.length > 0 ? (
      <div className="shrink-0 border-t border-border bg-card px-3 py-2.5 sm:px-5 sm:py-3">
        <OfficialWebsiteCta
          links={footerLinks}
          label="Buy on official website"
          menuSide="top"
          className="h-11 w-full sm:h-[var(--btn-h-md)] sm:w-full"
        />
      </div>
    ) : null;

  return (
    <>
      {row}

      {isMobile ? (
        <Drawer open={open} onOpenChange={handleOpenChange}>
          <DrawerContent
            className="flex h-[80dvh] max-h-[80vh] flex-col gap-0 overflow-hidden rounded-t-2xl border-border bg-card p-0 shadow-modal"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DrawerHeader className="shrink-0 space-y-0 border-b border-border px-3 pt-1 pb-2.5 text-left group-data-[vaul-drawer-direction=bottom]/drawer-content:text-left">
              <DrawerTitle className="w-full line-clamp-2 text-left text-base font-semibold leading-snug text-brand-navy text-pretty">
                {data.name}
              </DrawerTitle>
              <DrawerDescription className="sr-only">
                {detailsDescription}
              </DrawerDescription>
              {planMetaBadges}
            </DrawerHeader>
            {planDetailsBody}
            {planDetailsFooter}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent
            className="flex max-h-[min(85dvh,40rem)] w-[calc(100%-1.5rem)] max-w-xl! flex-col gap-0 overflow-hidden rounded-xl border-border p-0 sm:w-full"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader className="shrink-0 space-y-0 border-b border-border px-4 pt-3.5 pr-12 pb-3 text-left sm:px-5 sm:pr-14">
              <DialogTitle className="w-full line-clamp-2 text-left text-base font-semibold leading-snug text-brand-navy text-pretty sm:text-lg">
                {data.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {detailsDescription}
              </DialogDescription>
              {planMetaBadges}
            </DialogHeader>
            {planDetailsBody}
            {planDetailsFooter}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
