import { useQuery } from "@tanstack/react-query";
import { getPlanCoverages } from "@/lib/services/plans/plans.services";

/**
 * Lazy-load plan coverages when Details opens.
 * Cached forever in the client QueryClient (no refetch while mounted).
 */
export function usePlanCoverages(slugOrId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["plan-coverages", slugOrId],
    queryFn: async () => {
      const res = await getPlanCoverages(slugOrId);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    enabled: enabled && !!slugOrId,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
