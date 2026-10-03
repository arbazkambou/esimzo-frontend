"use client";

import { useEffect, useMemo, useState, useTransition, useSyncExternalStore } from "react";
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
import ProviderPackageHeader from "@/components/sections/ProviderPackageHeader";
import NoFilterResults from "@/components/plans/NoFilterResults";
import { Badge } from "@/components/ui/badge";

const NUQS_OPTIONS = { shallow: true, throttleMs: 150 } as const;

const TABLE_COLS = [
  { id: "most-data", label: "Data" },
  { id: "longest", label: "Validity" },
  { id: "best-value", label: "Price/GB" },
  { id: "cheapest", label: "Price" },
] as const;

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

type CoverageTab = "all" | "single" | "multi";

type Props = {
  plans: Plan[];
  provider: Provider;
  destinationSlug: string;
  providerSlug: string;
  providerName: string;
  locationName: string;
};

function filterByCoverageTab(plans: Plan[], tab: CoverageTab): Plan[] {
  if (tab === "single") return plans.filter(isSingleCountryPlan);
  if (tab === "multi") return plans.filter(isMultiCountryPlan);
  return plans;
}

export function ProviderPlansClient({
  plans,
  provider,
  destinationSlug,
  providerSlug,
  providerName,
  locationName,
}: Props) {
  const [tab, setTab] = useState<CoverageTab>("all");
  const [pinnedPlanId, setPinnedPlanId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const isLargeScreen = useIsLargeScreen();

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("cheapest").withOptions(NUQS_OPTIONS),
  );
  const [applyPromo, setApplyPromo] = useQueryState(
    "promo",
    parseAsBoolean.withDefault(true).withOptions(NUQS_OPTIONS),
  );

  const buyHref = provider.providerLinks[0]?.link;
  const providerLinks = provider.providerLinks;
  const hasProviderPromo = Boolean(provider.promoCode?.trim());
  const providerPromo = useMemo(
    () => ({ promoCode: provider.promoCode }),
    [provider.promoCode],
  );

  useEffect(() => {
    const cookie = readClickedPlanCookie();
    if (
      cookie &&
      cookie.providerSlug === providerSlug &&
      cookie.destinationSlug === destinationSlug &&
      plans.some((p) => p.id === cookie.planId)
    ) {
      setPinnedPlanId(cookie.planId);
      writePinnedPlanId(destinationSlug, providerSlug, cookie.planId);
      clearClickedPlanCookie();
      return;
    }

    const storedId = readPinnedPlanId(destinationSlug, providerSlug);
    if (storedId && plans.some((p) => p.id === storedId)) {
      setPinnedPlanId(storedId);
    }
  }, [destinationSlug, plans, providerSlug]);

  const counts = useMemo(
    () => ({
      all: plans.length,
      single: plans.filter(isSingleCountryPlan).length,
      multi: plans.filter(isMultiCountryPlan).length,
    }),
    [plans],
  );

  const pinnedPlan = useMemo(() => {
    if (!pinnedPlanId) return null;
    return plans.find((p) => p.id === pinnedPlanId) ?? null;
  }, [plans, pinnedPlanId]);

  const listedPlans = useMemo(() => {
    const filtered = filterByCoverageTab(plans, tab).filter(
      (p) => p.id !== pinnedPlanId,
    );
    return sortPlans(
      filtered,
      sort as SortOption,
      "asc",
      applyPromo,
      providerPromo,
    );
  }, [plans, tab, sort, applyPromo, pinnedPlanId, providerPromo]);

  const empty = listedPlans.length === 0 && !pinnedPlan;

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-5">
      <ProviderPackageHeader
        providerName={providerName}
        countryName={locationName}
      />

      {pinnedPlan ? (
        <section
          aria-label="Selected plan"
          className="overflow-hidden rounded-2xl border-2 border-primary bg-card shadow-card"
        >
          <div className="flex flex-wrap items-center gap-2 border-b border-primary/20 bg-primary-soft px-3 py-2.5 sm:px-4">
            <Sparkles className="size-4 shrink-0 text-primary-text" aria-hidden />
            <Badge variant="brand">Your pick</Badge>
            <p className="text-caption text-text-secondary sm:text-body-sm">
              Plan you opened from the comparison list
            </p>
          </div>

          {isLargeScreen ? (
            <div className="overflow-x-auto">
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
          ) : (
            <div className="p-2">
              <ProviderPackagesCard
                data={pinnedPlan}
                applyPromo={applyPromo}
                buyHref={buyHref}
                providerLinks={providerLinks}
                providerPromo={providerPromo}
                selected
              />
            </div>
          )}
        </section>
      ) : null}

      <ProviderListControls
        tab={tab}
        onTabChange={setTab}
        counts={counts}
        sort={sort as SortOption}
        onSortChange={(value) => {
          startTransition(() => {
            void setSort(value);
          });
        }}
        applyPromo={applyPromo}
        onApplyPromoChange={(value) => {
          startTransition(() => {
            void setApplyPromo(value);
          });
        }}
        hasProviderPromo={hasProviderPromo}
        filteredCount={listedPlans.length + (pinnedPlan ? 1 : 0)}
        totalCount={counts.all}
      />

      {empty ? (
        <NoFilterResults onClear={() => setTab("all")} />
      ) : listedPlans.length === 0 ? null : isLargeScreen ? (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
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
      ) : (
        <div className="flex flex-col gap-2.5">
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
      )}
    </div>
  );
}
