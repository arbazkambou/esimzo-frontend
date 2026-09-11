"use client";

import { useCallback, useMemo } from "react";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
  parseAsArrayOf,
} from "nuqs";
import type { Plan } from "@/lib/types/plans.types";

// ── Sort options ──
export type SortOption = "cheapest" | "best-value" | "most-data" | "longest";
export type SortDirection = "asc" | "desc";

export type ColumnSortState = {
  column: SortOption;
  direction: SortDirection;
};

// ── Sorting comparators ──
function sortPlans(
  plans: Plan[],
  column: SortOption,
  direction: SortDirection,
): Plan[] {
  const sorted = [...plans];
  const dir = direction === "asc" ? 1 : -1;

  switch (column) {
    case "cheapest":
      return sorted.sort((a, b) => (a.usdPrice - b.usdPrice) * dir);
    case "best-value": {
      const value = (p: Plan) =>
        p.capacity <= 0 ? Infinity : p.usdPrice / (p.capacity / 1024);
      return sorted.sort((a, b) => (value(a) - value(b)) * dir);
    }
    case "most-data":
      return sorted.sort((a, b) => {
        if (a.capacity <= 0 && b.capacity <= 0) return 0;
        if (a.capacity <= 0) return -1 * dir;
        if (b.capacity <= 0) return 1 * dir;
        return (b.capacity - a.capacity) * dir;
      });
    case "longest":
      return sorted.sort((a, b) => (b.period - a.period) * dir);
    default:
      return sorted;
  }
}

// ── nuqs options ──
const NUQS_OPTIONS = { shallow: false } as const;

// ── Main hook ──
export function usePackageFilters(plans: Plan[] | undefined) {
  // nuqs state — each synced to a URL parameter
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("cheapest").withOptions(NUQS_OPTIONS),
  );
  const [sortDir, setSortDir] = useQueryState(
    "dir",
    parseAsString.withDefault("asc").withOptions(NUQS_OPTIONS),
  );
  const [duration, setDuration] = useQueryState(
    "duration",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );
  const [minData, setMinData] = useQueryState(
    "minData",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );
  const [maxData, setMaxData] = useQueryState(
    "maxData",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );
  const [has5G, setHas5G] = useQueryState(
    "5g",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [tethering, setTethering] = useQueryState(
    "tethering",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [topUp, setTopUp] = useQueryState(
    "topup",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [unlimited, setUnlimited] = useQueryState(
    "unlimited",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [providers, setProviders] = useQueryState(
    "provider",
    parseAsArrayOf(parseAsString, ",")
      .withDefault([])
      .withOptions(NUQS_OPTIONS),
  );

  // Toggle a column sort: click once = asc, click again = desc, click again = reset
  const toggleColumnSort = useCallback(
    (column: SortOption) => {
      if (sort === column) {
        if (sortDir === "asc") {
          setSortDir("desc");
        } else {
          // reset
          setSort("cheapest");
          setSortDir("asc");
        }
      } else {
        setSort(column);
        setSortDir("asc");
      }
    },
    [sort, sortDir, setSort, setSortDir],
  );

  const toggleDuration = useCallback(
    (days: number) => {
      setDuration(duration === days ? null : days);
    },
    [duration, setDuration],
  );

  const clearAll = useCallback(() => {
    setSort("cheapest");
    setSortDir("asc");
    setDuration(null);
    setMinData(null);
    setMaxData(null);
    setHas5G(false);
    setTethering(false);
    setTopUp(false);
    setUnlimited(false);
    setProviders([]);
  }, [
    setSort,
    setSortDir,
    setDuration,
    setMinData,
    setMaxData,
    setHas5G,
    setTethering,
    setTopUp,
    setUnlimited,
    setProviders,
  ]);

  // ── Derived data ──
  const allPlans = Array.isArray(plans) ? plans : [];

  // Extract unique providers for the filter UI
  const allProviders = useMemo(() => {
    const map = new Map<
      string,
      { slug: string; name: string; image: string | null }
    >();
    for (const p of allPlans) {
      if (!map.has(p.provider.slug)) {
        map.set(p.provider.slug, {
          slug: p.provider.slug,
          name: p.provider.name,
          image: p.provider.image,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [allPlans]);

  const filteredPlans = useMemo(() => {
    let result = [...allPlans];

    // Duration filter
    if (duration !== null) {
      result = result.filter((p) => p.period >= duration);
    }

    // Data range
    if (minData !== null) {
      result = result.filter((p) => p.capacity <= 0 || p.capacity >= minData);
    }
    if (maxData !== null) {
      result = result.filter((p) => p.capacity > 0 && p.capacity <= maxData);
    }

    // Boolean filters
    if (has5G) result = result.filter((p) => p.has5G);
    if (tethering) result = result.filter((p) => p.tethering);
    if (topUp) result = result.filter((p) => p.canTopUp);
    if (unlimited) result = result.filter((p) => p.capacity <= 0);

    // Provider filter
    if (providers.length > 0) {
      const set = new Set(providers);
      result = result.filter((p) => set.has(p.provider.slug));
    }

    // Sort
    return sortPlans(result, sort as SortOption, sortDir as SortDirection);
  }, [
    allPlans,
    duration,
    minData,
    maxData,
    has5G,
    tethering,
    topUp,
    unlimited,
    providers,
    sort,
    sortDir,
  ]);

  const uniqueProviderCount = useMemo(() => {
    return new Set(allPlans.map((p) => p.provider.slug)).size;
  }, [allPlans]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (duration !== null) count++;
    if (minData !== null) count++;
    if (maxData !== null) count++;
    if (has5G) count++;
    if (tethering) count++;
    if (topUp) count++;
    if (unlimited) count++;
    if (providers.length > 0) count++;
    return count;
  }, [
    duration,
    minData,
    maxData,
    has5G,
    tethering,
    topUp,
    unlimited,
    providers,
  ]);

  return {
    // state
    sort: sort as SortOption,
    sortDir: sortDir as SortDirection,
    duration,
    minData,
    maxData,
    has5G,
    tethering,
    topUp,
    unlimited,
    providers,
    // setters
    setSort: (val: SortOption) => setSort(val),
    setSortDir: (val: SortDirection) => setSortDir(val),
    toggleColumnSort,
    setDuration,
    toggleDuration,
    setMinData,
    setMaxData,
    setHas5G,
    setTethering,
    setTopUp,
    setUnlimited,
    setProviders,
    clearAll,
    // derived
    filteredPlans,
    totalCount: allPlans.length,
    filteredCount: filteredPlans.length,
    uniqueProviderCount,
    activeFilterCount,
    allProviders,
  };
}

export type UsePackageFiltersReturn = ReturnType<typeof usePackageFilters>;
