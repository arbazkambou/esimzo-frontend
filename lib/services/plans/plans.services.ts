import {
  Country,
  Plan,
  Provider,
  PlansListPayload,
  Region,
} from "@/lib/types/plans.types";
import { api, fail, ok, type ApiResponse } from "../api";
import {
  cacheRevalidate,
  cacheTags,
  nextFetchCache,
} from "../cache-keys";

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
  return api<Country[]>(
    "/countries",
    nextFetchCache({
      revalidate: cacheRevalidate.hour,
      tags: [cacheTags.countries],
    }),
  );
}

export async function getPopularCountries() {
  return api<Country[]>(
    "/countries/popular",
    nextFetchCache({
      revalidate: cacheRevalidate.hour,
      tags: [cacheTags.countries],
    }),
  );
}

export async function getRegions() {
  return api<Region[]>(
    "/regions",
    nextFetchCache({
      revalidate: cacheRevalidate.twelveHours,
      tags: [cacheTags.regions],
    }),
  );
}

/** Match a slug against the cached regions list. Null means it is not a region. */
export async function getRegionBySlug(slug: string): Promise<Region | null> {
  if (!slug) return null;
  const regions = await getRegions();
  if (!regions.success) return null;
  const normalized = slug.toLowerCase();
  return (
    regions.data.find(
      (region) => region.slug?.toLowerCase() === normalized,
    ) ?? null
  );
}

export async function getRegionCountries(slug: string) {
  return api<Country[]>(`/regions/${slug}/countries`, noStore);
}

export async function getCountryPackagesBySlug(slug: string) {
  return unwrapPlans(
    await api<PlansListPayload | Plan[]>(
      `/plans/country/${slug}`,
      nextFetchCache({
        revalidate: cacheRevalidate.twelveHours,
        tags: [cacheTags.plans],
      }),
    ),
  );
}

export async function getRegionalPackagesBySlug(slug: string) {
  return unwrapPlans(
    await api<PlansListPayload | Plan[]>(
      `/plans/region/${slug}`,
      nextFetchCache({
        revalidate: cacheRevalidate.twelveHours,
        tags: [cacheTags.plans],
      }),
    ),
  );
}

export async function getRegionalPackagesByProvider(
  regionSlug: string,
  providerSlug: string,
) {
  return unwrapPlansWithProvider(
    await api<PlansListPayload | Plan[]>(
      `/plans/region/${regionSlug}/provider/${providerSlug}`,
      nextFetchCache({
        revalidate: cacheRevalidate.twelveHours,
        tags: [cacheTags.plans],
      }),
    ),
  );
}

export async function getGlobalPackages() {
  return unwrapPlans(
    await api<PlansListPayload | Plan[]>(
      `/plans/global`,
      nextFetchCache({
        revalidate: cacheRevalidate.twelveHours,
        tags: [cacheTags.plans],
      }),
    ),
  );
}

export async function getGlobalPackagesBySlug(slug: string) {
  return unwrapPlansWithProvider(
    await api<PlansListPayload | Plan[]>(
      `/plans/global/provider/${slug}`,
      nextFetchCache({
        revalidate: cacheRevalidate.twelveHours,
        tags: [cacheTags.plans],
      }),
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
      nextFetchCache({
        revalidate: cacheRevalidate.twelveHours,
        tags: [cacheTags.plans],
      }),
    ),
  );
}

/** Resolve a country's parent region slug from the cached countries list. */
export async function getCountryRegionSlug(
  countrySlug: string,
): Promise<string | null> {
  if (!countrySlug) return null;
  const countries = await getCountries();
  if (!countries.success) return null;
  const normalized = countrySlug.toLowerCase();
  const country = countries.data.find(
    (item) => item.slug?.toLowerCase() === normalized,
  );
  return country?.region?.slug ?? null;
}

function dedupePlansById(plans: Plan[]): Plan[] {
  const seen = new Set<string>();
  const result: Plan[] = [];
  for (const plan of plans) {
    if (seen.has(plan.id)) continue;
    seen.add(plan.id);
    result.push(plan);
  }
  return result;
}

/**
 * Load provider plans for a destination:
 * - country: country + parent-region + global (deduped)
 * - region: region + global (deduped)
 * - global: global only
 */
export async function loadProviderDestinationPlans(
  destinationSlug: string,
  providerSlug: string,
): Promise<ApiResponse<{ plans: Plan[]; provider: Provider }>> {
  const isGlobal = destinationSlug.toLowerCase() === "global";
  const region = isGlobal ? null : await getRegionBySlug(destinationSlug);

  if (isGlobal) {
    return getGlobalPackagesBySlug(providerSlug);
  }

  if (region) {
    const [regional, global] = await Promise.all([
      getRegionalPackagesByProvider(destinationSlug, providerSlug),
      getGlobalPackagesBySlug(providerSlug),
    ]);

    if (!regional.success && !global.success) {
      return regional.success ? regional : global;
    }

    const provider =
      (regional.success ? regional.data.provider : null) ??
      (global.success ? global.data.provider : null);
    if (!provider) return fail("Provider not found");

    const plans = dedupePlansById([
      ...(regional.success ? regional.data.plans : []),
      ...(global.success ? global.data.plans : []),
    ]);

    return ok({ plans, provider });
  }

  const regionSlug = await getCountryRegionSlug(destinationSlug);
  const [country, regional, global] = await Promise.all([
    getProviderBySearchParams(destinationSlug, providerSlug),
    regionSlug
      ? getRegionalPackagesByProvider(regionSlug, providerSlug)
      : Promise.resolve(null),
    getGlobalPackagesBySlug(providerSlug),
  ]);

  if (!country.success && !(regional && regional.success) && !global.success) {
    return country.success ? country : global;
  }

  const provider =
    (country.success ? country.data.provider : null) ??
    (regional?.success ? regional.data.provider : null) ??
    (global.success ? global.data.provider : null);
  if (!provider) return fail("Provider not found");

  const plans = dedupePlansById([
    ...(country.success ? country.data.plans : []),
    ...(regional?.success ? regional.data.plans : []),
    ...(global.success ? global.data.plans : []),
  ]);

  return ok({ plans, provider });
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
