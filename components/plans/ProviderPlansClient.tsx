"use client";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { Sparkles } from "lucide-react";
import type { Plan, Provider } from "@/lib/types/plans.types";
import {
  isMultiCountryPlan,
  isSingleCountryPlan,
  sortPlans,
  type SortOption,
} from "@/lib/plans/sort-plans";
import {
  clearClickedPlanCookie,
  readClickedPlanCookie,
} from "@/lib/provider-plan-cookie";
import { ProviderListControls } from "@/components/plans/ProviderListControls";
import { ProviderPackagesCard } from "@/components/cards/ProviderPackagesCard";
import NoFilterResults from "@/components/plans/NoFilterResults";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const NUQS_OPTIONS = { shallow: true, throttleMs: 150 } as const;
const DEFAULT_SORT: SortOption = "cheapest";
const DEFAULT_APPLY_PROMO = true;

const TABLE_COLS = [
  { id: "most-data", label: "Data" },
  { id: "longest", label: "Validity" },
  { id: "best-value", label: "Price/GB" },
  { id: "cheapest", label: "Price" },
] as const;

function pinnedPlanStorageKey(destinationSlug: string, providerSlug: string) {
  return `esimzo_pinned_plan:${destinationSlug}:${providerSlug}`;
}

function readPinnedPlanId(
  destinationSlug: string,
  providerSlug: string,
): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(
      pinnedPlanStorageKey(destinationSlug, providerSlug),
    );
  } catch {
    return null;
  }
}

function writePinnedPlanId(
  destinationSlug: string,
  providerSlug: string,
  planId: string,
) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      pinnedPlanStorageKey(destinationSlug, providerSlug),
      planId,
    );
  } catch {
    // ignore quota / private mode
  }
}

/** Cookie first (fresh click), then session pin — client-only. */
function resolvePinnedPlanId(
  destinationSlug: string,
  providerSlug: string,
  plans: Plan[],
): string | null {
  const cookie = readClickedPlanCookie();
  if (
    cookie &&
    cookie.providerSlug === providerSlug &&
    cookie.destinationSlug === destinationSlug &&
    plans.some((p) => p.id === cookie.planId)
  ) {
    return cookie.planId;
  }

  const storedId = readPinnedPlanId(destinationSlug, providerSlug);
  if (storedId && plans.some((p) => p.id === storedId)) {
    return storedId;
  }

  return null;
}

function PlansTableColgroup() {
  return (
    <colgroup>
      <col className="w-[36%]" />
      <col className="w-[12%]" />
      <col className="w-[14%]" />
      <col className="w-[12%]" />
      <col className="w-[14%]" />
      <col className="w-[12%]" />
    </colgroup>
  );
}

function PlansTableHead({
  sort,
  highlightActiveSort = false,
}: {
  sort?: string;
  highlightActiveSort?: boolean;
}) {
  return (
    <thead>
      <tr className="border-b border-border bg-muted/60">
        <th
          scope="col"
          className="px-5 py-3.5 text-left text-sm font-semibold text-brand-navy"
        >
          Plan &amp; Provider
        </th>
        {TABLE_COLS.map((col) => {
          const isActive = highlightActiveSort && sort === col.id;
          return (
            <th
              key={col.id}
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold"
            >
              <span
                className={isActive ? "text-primary-text" : "text-brand-navy"}
              >
                {col.label}
              </span>
            </th>
          );
        })}
        <th
          scope="col"
          className="px-3 py-3.5 text-right text-sm font-semibold text-brand-navy"
        >
          <span className="sr-only">Details</span>
        </th>
      </tr>
    </thead>
  );
}

/**
 * Fallback for “Your pick” + filter controls only (muted, responsive).
 * Plans list is never inside this Suspense boundary.
 */
function PickAndFiltersSkeleton({
  hasProviderPromo,
}: {
  hasProviderPromo: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 sm:gap-5" aria-hidden>
      {/* Your pick — desktop row */}
      <section className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:block">
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
          <Skeleton className="size-4 shrink-0 rounded-sm" />
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-3.5 w-48 max-w-[50%]" />
        </div>
        <div className="flex items-center px-5 py-4">
          <div className="flex w-[36%] shrink-0 items-center gap-3 pr-3">
            <div className="size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1">
              <Skeleton className="size-full rounded-md" />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3 w-36 max-w-full" />
            </div>
          </div>
          <div className="w-[12%] shrink-0 px-1">
            <Skeleton className="h-3.5 w-12" />
          </div>
          <div className="w-[14%] shrink-0 px-1">
            <Skeleton className="h-3.5 w-14" />
          </div>
          <div className="w-[12%] shrink-0 px-1">
            <Skeleton className="h-3.5 w-12" />
          </div>
          <div className="w-[14%] shrink-0 px-1">
            <Skeleton className="h-4 w-14" />
          </div>
          <div className="flex w-[12%] shrink-0 justify-end">
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      </section>

      {/* Your pick — mobile card */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:hidden">
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2.5">
          <Skeleton className="size-4 shrink-0 rounded-sm" />
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-3 w-32 max-w-[45%]" />
        </div>
        <div className="p-2">
          <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 px-3.5 pt-3.5 pb-3">
              <div className="size-10 shrink-0 overflow-hidden rounded-lg border border-border bg-white p-1">
                <Skeleton className="size-full rounded-md" />
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-40 max-w-full" />
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-border bg-muted/30">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1.5 px-3 py-3 ${
                    i < 2 ? "border-r border-border" : ""
                  }`}
                >
                  <Skeleton className="h-2.5 w-10" />
                  <Skeleton className="h-3.5 w-12" />
                </div>
              ))}
            </div>
            <div className="border-t border-border px-3.5 py-2.5">
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </article>
        </div>
      </section>

      {/* Filters / sort */}
      <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-card">
        <div className="flex w-full gap-1 rounded-xl bg-muted/60 p-1 ring-1 ring-border/60">
          <Skeleton className="h-9 min-w-0 flex-[1.2] rounded-lg" />
          <Skeleton className="h-9 min-w-0 flex-1 rounded-lg" />
          <Skeleton className="h-9 min-w-0 flex-1 rounded-lg" />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Skeleton className="mx-1.5 h-3 w-10" />
            <div className="flex w-full gap-1 rounded-xl bg-muted/60 p-1 ring-1 ring-border/60">
              <Skeleton className="h-9 min-w-0 flex-1 rounded-lg" />
              <Skeleton className="h-9 min-w-0 flex-1 rounded-lg" />
              <Skeleton className="h-9 min-w-0 flex-1 rounded-lg" />
              <Skeleton className="h-9 min-w-0 flex-1 rounded-lg" />
            </div>
          </div>
          {hasProviderPromo ? (
            <Skeleton className="h-11 w-full rounded-xl sm:h-9 sm:w-36" />
          ) : (
            <Skeleton className="hidden h-4 w-28 sm:block" />
          )}
        </div>
      </div>
    </div>
  );
}

type CoverageTab = "all" | "single" | "multi";

type Props = {
  plans: Plan[];
  provider: Provider;
  destinationSlug: string;
  providerSlug: string;
};

function filterByCoverageTab(plans: Plan[], tab: CoverageTab): Plan[] {
  if (tab === "single") return plans.filter(isSingleCountryPlan);
  if (tab === "multi") return plans.filter(isMultiCountryPlan);
  return plans;
}

type PickAndFiltersProps = {
  plans: Plan[];
  provider: Provider;
  destinationSlug: string;
  providerSlug: string;
  tab: CoverageTab;
  onTabChange: (tab: CoverageTab) => void;
  counts: { all: number; single: number; multi: number };
  filteredCount: number;
  totalCount: number;
  onSortChange: (sort: SortOption) => void;
  onApplyPromoChange: (value: boolean) => void;
  onPinnedPlanIdChange: (id: string | null) => void;
  applyPromo: boolean;
};

/**
 * Resolves URL (nuqs) + pinned plan together.
 * Renders nothing useful until both are ready — skeleton stays up via parent Suspense
 * fallback while URL suspends, then local skeleton until pin handoff finishes.
 */
function PickAndFilters({
  plans,
  provider,
  destinationSlug,
  providerSlug,
  tab,
  onTabChange,
  counts,
  filteredCount,
  totalCount,
  onSortChange,
  onApplyPromoChange,
  onPinnedPlanIdChange,
  applyPromo,
}: PickAndFiltersProps) {
  const [, startTransition] = useTransition();
  const [urlSort, setUrlSort] = useQueryState(
    "sort",
    parseAsString.withDefault(DEFAULT_SORT).withOptions(NUQS_OPTIONS),
  );
  const [urlPromo, setUrlPromo] = useQueryState(
    "promo",
    parseAsBoolean.withDefault(DEFAULT_APPLY_PROMO).withOptions(NUQS_OPTIONS),
  );

  const [pinReady, setPinReady] = useState(false);
  const [pinnedPlanId, setPinnedPlanId] = useState<string | null>(null);

  const hasProviderPromo = Boolean(provider.promoCode?.trim());
  const providerPromo = useMemo(
    () => ({ promoCode: provider.promoCode }),
    [provider.promoCode],
  );
  const buyHref = provider.providerLinks[0]?.link;
  const providerLinks = provider.providerLinks;

  useLayoutEffect(() => {
    onSortChange(urlSort as SortOption);
    onApplyPromoChange(urlPromo);
  }, [urlSort, urlPromo, onSortChange, onApplyPromoChange]);

  useLayoutEffect(() => {
    const id = resolvePinnedPlanId(destinationSlug, providerSlug, plans);
    setPinnedPlanId(id);
    onPinnedPlanIdChange(id);
    if (id) {
      writePinnedPlanId(destinationSlug, providerSlug, id);
      clearClickedPlanCookie();
    }
    setPinReady(true);
  }, [destinationSlug, plans, providerSlug, onPinnedPlanIdChange]);

  const pinnedPlan = useMemo(() => {
    if (!pinnedPlanId) return null;
    return plans.find((p) => p.id === pinnedPlanId) ?? null;
  }, [plans, pinnedPlanId]);

  // URL is resolved (we rendered past Suspense); wait for pin before painting UI.
  if (!pinReady) {
    return <PickAndFiltersSkeleton hasProviderPromo={hasProviderPromo} />;
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {pinnedPlan ? (
        <section
          aria-label="Selected plan"
          className="overflow-hidden rounded-2xl border-2 border-primary bg-card shadow-card"
        >
          <div className="flex flex-wrap items-center gap-2 border-b border-primary/20 bg-primary-soft px-3 py-2.5 sm:px-4">
            <Sparkles
              className="size-4 shrink-0 text-primary-text"
              aria-hidden
            />
            <Badge variant="brand">Your pick</Badge>
            <p className="text-caption text-text-secondary sm:text-body-sm">
              Plan you opened from the comparison list
            </p>
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[36rem] table-fixed border-collapse">
              <PlansTableColgroup />
              <tbody>
                <ProviderPackagesCard
                  data={pinnedPlan}
                  applyPromo={applyPromo}
                  buyHref={buyHref}
                  providerLinks={providerLinks}
                  providerPromo={providerPromo}
                  asRow
                  selected
                />
              </tbody>
            </table>
          </div>
          <div className="p-2 lg:hidden">
            <ProviderPackagesCard
              data={pinnedPlan}
              applyPromo={applyPromo}
              buyHref={buyHref}
              providerLinks={providerLinks}
              providerPromo={providerPromo}
              selected
            />
          </div>
        </section>
      ) : null}

      <ProviderListControls
        tab={tab}
        onTabChange={onTabChange}
        counts={counts}
        sort={urlSort as SortOption}
        onSortChange={(value) => {
          onSortChange(value);
          startTransition(() => {
            void setUrlSort(value);
          });
        }}
        applyPromo={urlPromo}
        onApplyPromoChange={(value) => {
          onApplyPromoChange(value);
          startTransition(() => {
            void setUrlPromo(value);
          });
        }}
        hasProviderPromo={hasProviderPromo}
        filteredCount={filteredCount}
        totalCount={totalCount}
      />
    </div>
  );
}

export function ProviderPlansClient({
  plans,
  provider,
  destinationSlug,
  providerSlug,
}: Props) {
  const [tab, setTab] = useState<CoverageTab>("all");
  const [pinnedPlanId, setPinnedPlanId] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);
  const [applyPromo, setApplyPromo] = useState(DEFAULT_APPLY_PROMO);

  const buyHref = provider.providerLinks[0]?.link;
  const providerLinks = provider.providerLinks;
  const hasProviderPromo = Boolean(provider.promoCode?.trim());
  const providerPromo = useMemo(
    () => ({ promoCode: provider.promoCode }),
    [provider.promoCode],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [destinationSlug, providerSlug]);

  const counts = useMemo(
    () => ({
      all: plans.length,
      single: plans.filter(isSingleCountryPlan).length,
      multi: plans.filter(isMultiCountryPlan).length,
    }),
    [plans],
  );

  const listedPlans = useMemo(() => {
    const filtered = filterByCoverageTab(plans, tab).filter(
      (p) => p.id !== pinnedPlanId,
    );
    return sortPlans(filtered, sort, "asc", applyPromo, providerPromo);
  }, [plans, tab, sort, applyPromo, pinnedPlanId, providerPromo]);

  const empty = listedPlans.length === 0 && !pinnedPlanId;

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-5">
      {/* Your pick + filters: wait for URL + pin, then show together */}
      <Suspense
        fallback={
          <PickAndFiltersSkeleton hasProviderPromo={hasProviderPromo} />
        }
      >
        <PickAndFilters
          plans={plans}
          provider={provider}
          destinationSlug={destinationSlug}
          providerSlug={providerSlug}
          tab={tab}
          onTabChange={setTab}
          counts={counts}
          filteredCount={listedPlans.length + (pinnedPlanId ? 1 : 0)}
          totalCount={counts.all}
          onSortChange={setSort}
          onApplyPromoChange={setApplyPromo}
          onPinnedPlanIdChange={setPinnedPlanId}
          applyPromo={applyPromo}
        />
      </Suspense>

      {/* Plans list — outside Suspense for SEO / static HTML */}
      {empty ? (
        <NoFilterResults onClear={() => setTab("all")} />
      ) : listedPlans.length === 0 ? null : (
        <>
          <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card shadow-card lg:block">
            <table className="w-full min-w-[36rem] table-fixed border-collapse">
              <PlansTableColgroup />
              <PlansTableHead sort={sort} highlightActiveSort />
              <tbody>
                {listedPlans.map((plan) => (
                  <ProviderPackagesCard
                    key={plan.id}
                    data={plan}
                    applyPromo={applyPromo}
                    buyHref={buyHref}
                    providerLinks={providerLinks}
                    providerPromo={providerPromo}
                    asRow
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2.5 lg:hidden">
            {listedPlans.map((plan) => (
              <ProviderPackagesCard
                key={plan.id}
                data={plan}
                applyPromo={applyPromo}
                buyHref={buyHref}
                providerLinks={providerLinks}
                providerPromo={providerPromo}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
