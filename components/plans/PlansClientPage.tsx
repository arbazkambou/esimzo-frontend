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
import { ArrowUp } from "lucide-react";

/** Show jump control once the plans section start is this far above the viewport. */
const JUMP_SHOW_OFFSET_PX = 240;
/** Only offer jump-to-top when the list is long enough to matter. */
const JUMP_MIN_PLANS = 40;

type Props = {
  slug: string;
  initialData: Plan[];
  scope?: PlansScope;
};

function PlansContent({ slug, initialData, scope = "country" }: Props) {
  const { data: plans, isLoading } = usePlans(slug, initialData, scope);
  const filters = usePackageFilters(plans, slug);
  const [showJumpToPlans, setShowJumpToPlans] = useState(false);

  const allFiltered = filters.filteredPlans;
  const canJump = allFiltered.length >= JUMP_MIN_PLANS;

  useEffect(() => {
    if (!canJump) {
      setShowJumpToPlans(false);
      return;
    }

    const updateVisibility = () => {
      const plansEl = document.getElementById("plans");
      if (!plansEl) return;
      setShowJumpToPlans(
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

  if (isLoading) {
    return <PlansTableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PlanFilterCard filters={filters} />
      {filters.isFiltering ? (
        <TableSkeleton />
      ) : allFiltered.length > 0 ? (
        <PlansTable
          plans={allFiltered}
          sort={filters.sort}
          sortDir={filters.sortDir}
          onSort={filters.toggleColumnSort}
          slug={slug}
        />
      ) : (
        <NoFilterResults onClear={filters.clearAll} />
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
      <Suspense fallback={<PlansTableSkeleton />}>
        <PlansContent slug={slug} initialData={initialData} scope={scope} />
      </Suspense>
    </div>
  );
}
