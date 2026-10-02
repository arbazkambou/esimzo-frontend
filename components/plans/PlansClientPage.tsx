"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import type { PlanListItem } from "@/lib/types/plans.types";
import { usePlans, type PlansScope } from "@/lib/hooks/use-plans";
import {
  usePackageFilters,
  type SortDirection,
  type SortOption,
} from "@/lib/hooks/use-package-filters";
import { getDefaultFilteredPlans } from "@/lib/plans/default-filtered-plans";
import { Button } from "@/components/ui/button";
import PlanFilterCard from "./PlanFilterCard";
import PlansTable from "./PlansTable";
import { FilterCardSkeleton, TableSkeleton } from "./PlansTableSkeleton";
import NoFilterResults from "./NoFilterResults";
import { ArrowUp } from "lucide-react";

/** Show jump control once the plans section start is this far above the viewport. */
const JUMP_SHOW_OFFSET_PX = 240;
/** Only offer jump-to-top when the list is long enough to matter. */
const JUMP_MIN_PLANS = 40;

type Props = {
  slug: string;
  initialData: PlanListItem[];
  scope?: PlansScope;
};

/** Slice of filter state the list needs — kept outside the nuqs Suspense boundary. */
type ListFilterState = {
  filteredPlans: PlanListItem[];
  sort: SortOption;
  sortDir: SortDirection;
  isFiltering: boolean;
  toggleColumnSort: (sort: SortOption) => void;
  clearAll: () => void;
};

/**
 * Reads URL filters via nuqs. Must stay inside Suspense.
 * Pushes list-relevant state up so the plans table can render outside Suspense.
 */
function UrlFilters({
  plans,
  slug,
  onChange,
}: {
  plans: PlanListItem[];
  slug: string;
  onChange: (state: ListFilterState) => void;
}) {
  const filters = usePackageFilters(plans, slug);
  const {
    filteredPlans,
    sort,
    sortDir,
    isFiltering,
    toggleColumnSort,
    clearAll,
  } = filters;

  useLayoutEffect(() => {
    onChange({
      filteredPlans,
      sort,
      sortDir,
      isFiltering,
      toggleColumnSort,
      clearAll,
    });
  }, [
    onChange,
    filteredPlans,
    sort,
    sortDir,
    isFiltering,
    toggleColumnSort,
    clearAll,
  ]);

  return <PlanFilterCard filters={filters} />;
}

function PlansShell({ slug, initialData, scope = "country" }: Props) {
  const { data: plans } = usePlans(slug, initialData, scope);
  const allPlans = plans ?? initialData;

  const defaultPlans = useMemo(
    () => getDefaultFilteredPlans(allPlans),
    [allPlans],
  );

  const [listFilters, setListFilters] = useState<ListFilterState | null>(null);
  const [scrolledPastPlans, setScrolledPastPlans] = useState(false);

  const handleFiltersChange = useCallback((state: ListFilterState) => {
    setListFilters(state);
  }, []);

  const displayPlans = listFilters?.filteredPlans ?? defaultPlans;
  const sort = listFilters?.sort ?? "cheapest";
  const sortDir = listFilters?.sortDir ?? "asc";
  const isFiltering = listFilters?.isFiltering ?? false;
  const canJump = displayPlans.length >= JUMP_MIN_PLANS;
  const showJumpToPlans = canJump && scrolledPastPlans;

  useEffect(() => {
    if (!canJump) return;

    const updateVisibility = () => {
      const plansEl = document.getElementById("plans");
      if (!plansEl) return;
      setScrolledPastPlans(
        plansEl.getBoundingClientRect().top < -JUMP_SHOW_OFFSET_PX,
      );
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [canJump]);

  const jumpToPlansStart = useCallback(() => {
    document.getElementById("plans")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Only filter/URL state suspends — never the plan list. */}
      <Suspense fallback={<FilterCardSkeleton />}>
        <UrlFilters
          plans={allPlans}
          slug={slug}
          onChange={handleFiltersChange}
        />
      </Suspense>

      {isFiltering ? (
        <TableSkeleton />
      ) : displayPlans.length > 0 ? (
        <PlansTable
          plans={displayPlans}
          sort={sort}
          sortDir={sortDir}
          onSort={listFilters?.toggleColumnSort ?? (() => {})}
          slug={slug}
        />
      ) : (
        <NoFilterResults onClear={listFilters?.clearAll ?? (() => {})} />
      )}

      {showJumpToPlans ? (
        <Button
          type="button"
          size="icon-lg"
          className="fixed bottom-6 right-4 z-50 shadow-elevated sm:bottom-8 sm:right-6"
          aria-label="Jump to start of plans"
          onClick={jumpToPlansStart}
        >
          <ArrowUp className="size-5" strokeWidth={2.2} aria-hidden />
        </Button>
      ) : null}
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
      <PlansShell slug={slug} initialData={initialData} scope={scope} />
    </div>
  );
}
