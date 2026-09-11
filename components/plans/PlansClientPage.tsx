"use client";

import { Suspense } from "react";
import type { Plan } from "@/lib/types/plans.types";
import { usePlans, type PlansScope } from "@/lib/hooks/use-plans";
import { usePackageFilters } from "@/lib/hooks/use-package-filters";
import SortFilterToolbar from "./SortFilterToolbar";
import PlansTable from "./PlansTable";
import PlansTableSkeleton from "./PlansTableSkeleton";
import NoFilterResults from "./NoFilterResults";

type Props = {
  slug: string;
  initialData: Plan[];
  scope?: PlansScope;
};

function PlansContent({ slug, initialData, scope = "country" }: Props) {
  const { data: plans, isLoading } = usePlans(slug, initialData, scope);
  const filters = usePackageFilters(plans);

  if (isLoading) {
    return <PlansTableSkeleton />;
  }

  return (
    <div>
      <SortFilterToolbar filters={filters} />
      {filters.filteredPlans.length > 0 ? (
        <PlansTable
          plans={filters.filteredPlans}
          sort={filters.sort}
          sortDir={filters.sortDir}
          onSort={filters.toggleColumnSort}
          slug={slug}
        />
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
    <div className="container py-6">
      <Suspense fallback={<PlansTableSkeleton />}>
        <PlansContent slug={slug} initialData={initialData} scope={scope} />
      </Suspense>
    </div>
  );
}
