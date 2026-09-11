import { useQuery } from "@tanstack/react-query";
import type { Plan } from "@/lib/types/plans.types";
import {
  getCountryPackagesBySlug,
  getGlobalPackages,
  getRegionalPackagesBySlug,
} from "@/lib/services/plans/plans.services";

export type PlansScope = "country" | "region" | "global";

export function usePlans(
  slug: string,
  initialData?: Plan[],
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
      return res.data;
    },
    initialData,
    staleTime: 5 * 60 * 1000,
  });
}
