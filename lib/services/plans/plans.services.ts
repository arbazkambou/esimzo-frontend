import {
  Country,
  Plan,
  Provider,
  PlansListPayload,
  Region,
} from "@/lib/types/plans.types";
import { api, fail, ok, type ApiResponse } from "../api";
import { cacheRevalidate, cacheTags } from "../cache-keys";

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
    next: { revalidate: cacheRevalidate.hour, tags: [cacheTags.countries] },
  });
}

export async function getPopularCountries() {
  return api<Country[]>("/countries/popular", {
    next: { revalidate: cacheRevalidate.hour, tags: [cacheTags.countries] },
  });
}

export async function getRegions() {
  return api<Region[]>("/regions", {
    next: { revalidate: cacheRevalidate.twelveHours, tags: [cacheTags.regions] },
  });
}

/** Match a slug against the cached regions list. Null means it is not a region. */
export async function getRegionBySlug(slug: string): Promise<Region | null> {
  const regions = await getRegions();
  if (!regions.success) return null;
  const normalized = slug.toLowerCase();
  return regions.data.find((region) => region.slug === normalized) ?? null;
}

export async function getRegionCountries(slug: string) {
  return api<Country[]>(`/regions/${slug}/countries`, noStore);
}

export async function getCountryPackagesBySlug(slug: string) {
  return unwrapPlans(await api<PlansListPayload | Plan[]>(
    `/plans/country/${slug}`,
    { next: { revalidate: cacheRevalidate.twelveHours, tags: [cacheTags.plans] } },
  ));
}

export async function getRegionalPackagesBySlug(slug: string) {
  return unwrapPlans(
    await api<PlansListPayload | Plan[]>(`/plans/region/${slug}`, {
      next: { revalidate: cacheRevalidate.twelveHours, tags: [cacheTags.plans] },
    }),
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
    await api<PlansListPayload | Plan[]>(`/plans/global`, {
      next: { revalidate: cacheRevalidate.twelveHours, tags: [cacheTags.plans] },
    }),
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
