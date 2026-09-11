import {
  Country,
  Plan,
  Provider,
  PlansListPayload,
  Region,
} from "@/lib/types/plans.types";
import { api, fail, ok, type ApiResponse } from "../api";

const hour = { revalidate: 3600 } as const;
const noStore = { cache: "no-store" as const };

/** Normalize API `data` which may be `{ plans, provider? }` or `[]`. */
function unwrapPlansPayload(data: PlansListPayload | Plan[]): {
  plans: Plan[];
  provider?: Provider;
} {
  if (Array.isArray(data)) {
    return { plans: data };
  }
  return {
    plans: Array.isArray(data?.plans) ? data.plans : [],
    provider: data?.provider,
  };
}

export async function getCountries() {
  return api<Country[]>("/countries", {
    next: { ...hour, tags: ["countries"] },
  });
}

export async function getPopularCountries() {
  return api<Country[]>("/countries/popular", {
    next: { ...hour, tags: ["countries"] },
  });
}

export async function getRegions() {
  return api<Region[]>("/regions", {
    next: { ...hour, tags: ["regions"] },
  });
}

export async function getCountryPackagesBySlug(slug: string) {
  return unwrapPlans(await api<PlansListPayload | Plan[]>(
    `/plans/country/${slug}`,
    noStore,
  ));
}

export async function getRegionalPackagesBySlug(slug: string) {
  return unwrapPlans(
    await api<PlansListPayload | Plan[]>(`/plans/region/${slug}`, noStore),
  );
}

export async function getRegionalPackagesByProvider(
  regionSlug: string,
  providerSlug: string,
) {
  return unwrapPlansWithProvider(
    await api<PlansListPayload | Plan[]>(
      `/plans/region/${regionSlug}/provider/${providerSlug}`,
      noStore,
    ),
  );
}

export async function getGlobalPackages() {
  return unwrapPlans(
    await api<PlansListPayload | Plan[]>(`/plans/global`, noStore),
  );
}

export async function getGlobalPackagesBySlug(slug: string) {
  return unwrapPlansWithProvider(
    await api<PlansListPayload | Plan[]>(
      `/plans/global/provider/${slug}`,
      noStore,
    ),
  );
}

export async function getProviderBySearchParams(
  countrySlug: string,
  providerSlug: string,
) {
  return unwrapPlansWithProvider(
    await api<PlansListPayload | Plan[]>(
      `/plans/country/${countrySlug}/provider/${providerSlug}`,
      noStore,
    ),
  );
}

function unwrapPlans(
  res: ApiResponse<PlansListPayload | Plan[]>,
): ApiResponse<Plan[]> {
  if (!res.success) return res;
  return ok(unwrapPlansPayload(res.data).plans);
}

function unwrapPlansWithProvider(
  res: ApiResponse<PlansListPayload | Plan[]>,
): ApiResponse<{ plans: Plan[]; provider: Provider }> {
  if (!res.success) return res;
  const { plans, provider } = unwrapPlansPayload(res.data);
  if (!provider) return fail("Provider not found");
  return ok({ plans, provider });
}
