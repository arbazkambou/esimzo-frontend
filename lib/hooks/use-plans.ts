import { useQuery } from "@tanstack/react-query";
import type { PlanListItem } from "@/lib/types/plans.types";
import { toPlanListItems } from "@/lib/plans/plan-list-item";
import {
  getCountryPackagesBySlug,
  getGlobalPackages,
  getRegionalPackagesBySlug,
} from "@/lib/services/plans/plans.services";

export type PlansScope = "country" | "region" | "global";

const twelveHoursMs = 12 * 60 * 60 * 1000;
const isDev = process.env.NODE_ENV === "development";

export function usePlans(
  slug: string,
  initialData?: PlanListItem[],
  scope: PlansScope = "country",
) {
  return useQuery({
    queryKey: ["plans", scope, slug],
    queryFn: async () => {
      const res =
        scope === "global"
          ? await getGlobalPackages()
          : scope === "region"
            ? await getRegionalPackagesBySlug(slug)
            : await getCountryPackagesBySlug(slug);

      if (!res.success) throw new Error(res.message);
      return toPlanListItems(res.data);
    },
    initialData,
    // In prod, treat SSR payload as fresh so we don't immediately refetch.
    // In dev, allow refetch so backend changes show up without cache gymnastics.
    initialDataUpdatedAt: !isDev && initialData ? () => Date.now() : undefined,
    staleTime: isDev ? 0 : twelveHoursMs,
    gcTime: isDev ? 5 * 60 * 1000 : twelveHoursMs,
    refetchOnMount: isDev,
    refetchOnWindowFocus: isDev,
  });
}
