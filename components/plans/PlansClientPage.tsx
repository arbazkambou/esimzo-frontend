"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import type { Plan } from "@/lib/types/plans.types";
import { usePlans, type PlansScope } from "@/lib/hooks/use-plans";
import { usePackageFilters } from "@/lib/hooks/use-package-filters";
import { Button } from "@/components/ui/button";
import PlanFilterCard from "./PlanFilterCard";
import PlansTable from "./PlansTable";
import PlansTableSkeleton, { TableSkeleton } from "./PlansTableSkeleton";
import NoFilterResults from "./NoFilterResults";

/** Max plans rendered on first load when no filters are applied. */
const INITIAL_PLAN_LIMIT = 100;
/** How many extra rows to mount per animation frame when expanding. */
const EXPAND_CHUNK = 100;

type Props = {
  slug: string;
  initialData: Plan[];
  scope?: PlansScope;
};

function PlansContent({ slug, initialData, scope = "country" }: Props) {
  const { data: plans, isLoading } = usePlans(slug, initialData, scope);
  const filters = usePackageFilters(plans, slug);
  const [displayLimit, setDisplayLimit] = useState(INITIAL_PLAN_LIMIT);
  const [isExpanding, setIsExpanding] = useState(false);

  const allFiltered = filters.filteredPlans;
  const hasActiveFilters = filters.activeFilterCount > 0;

  // Filters → show everything. Cleared filters → reset to the initial cap.
  useEffect(() => {
    if (hasActiveFilters) {
      setDisplayLimit(allFiltered.length);
      setIsExpanding(false);
    } else {
      setDisplayLimit(INITIAL_PLAN_LIMIT);
      setIsExpanding(false);
    }
  }, [hasActiveFilters, allFiltered.length]);

  const isCapped =
    !hasActiveFilters && displayLimit < allFiltered.length;
  const visiblePlans = hasActiveFilters
    ? allFiltered
    : allFiltered.slice(0, Math.min(displayLimit, allFiltered.length));

  const handleViewAll = useCallback(() => {
    if (isExpanding) return;
    setIsExpanding(true);

    // Grow in chunks so React can paint between batches (avoids a long freeze).
    const grow = (current: number) => {
      const next = Math.min(current + EXPAND_CHUNK, allFiltered.length);
      setDisplayLimit(next);
      if (next < allFiltered.length) {
        requestAnimationFrame(() => grow(next));
      } else {
        setIsExpanding(false);
      }
    };

    // Let the loading state paint before the first heavy chunk.
    requestAnimationFrame(() => grow(displayLimit));
  }, [allFiltered.length, displayLimit, isExpanding]);

  if (isLoading) {
    return <PlansTableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PlanFilterCard filters={filters} />
      {filters.isFiltering ? (
        <TableSkeleton />
      ) : allFiltered.length > 0 ? (
        <div className={isCapped || isExpanding ? "relative" : undefined}>
          <PlansTable
            plans={visiblePlans}
            sort={filters.sort}
            sortDir={filters.sortDir}
            onSort={filters.toggleColumnSort}
            slug={slug}
            totalPlanCount={allFiltered.length}
            isCapped={isCapped}
          />
          {isCapped || isExpanding ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-background from-40% via-background/95 to-transparent pb-5 pt-28">
              <Button
                type="button"
                variant="default"
                size="lg"
                className="pointer-events-auto shadow-elevated"
                isLoading={isExpanding}
                disabled={isExpanding}
                onClick={handleViewAll}
              >
                View all {allFiltered.length} plans
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <NoFilterResults onClear={filters.clearAll} />
      )}
    </div>
  );
}

export default function PlansClientPage({
  slug,
  initialData,
  scope = "country",
}: Props) {
  return (
    <div id="plans" className="scroll-mt-6 pt-3 pb-4 sm:pt-4 sm:pb-6">
      <Suspense fallback={<PlansTableSkeleton />}>
        <PlansContent slug={slug} initialData={initialData} scope={scope} />
      </Suspense>
    </div>
  );
}
