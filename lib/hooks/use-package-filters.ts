"use client";

import { useCallback, useMemo, useTransition, useDeferredValue } from "react";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
  parseAsArrayOf,
} from "nuqs";
import type { Plan } from "@/lib/types/plans.types";
import { normalizeNetworkName } from "@/lib/network-names";
import {
  getEffectiveUsdPrice,
  getHighSpeedDataMB,
  isUnlimitedPlan,
} from "@/lib/utils";

/** Prefer slim `plan.networks`; fall back to coverages (provider/detail payloads). */
function getPlanNetworkNames(plan: Plan): string[] {
  const raw: string[] = [];

  if (Array.isArray(plan.networks) && plan.networks.length > 0) {
    for (const name of plan.networks) {
      if (typeof name === "string" && name.trim()) raw.push(name);
    }
  } else {
    for (const coverage of plan.coverages ?? []) {
      for (const network of coverage.networks ?? []) {
        const netName =
          typeof network === "string" ? network : network?.name;
        if (netName?.trim()) raw.push(netName.trim());
      }
    }
  }

  const names = new Set<string>();
  for (const name of raw) {
    const normalized = normalizeNetworkName(name);
    if (normalized) names.add(normalized);
  }
  return [...names];
}

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
  applyPromo: boolean = true,
): Plan[] {
  const sorted = [...plans];
  const dir = direction === "asc" ? 1 : -1;

  const getPrice = (p: Plan) =>
    applyPromo ? getEffectiveUsdPrice(p) : p.usdPrice;

  switch (column) {
    case "cheapest":
      return sorted.sort((a, b) => (getPrice(a) - getPrice(b)) * dir);
    case "best-value": {
      const value = (p: Plan) => {
        const highSpeedData =
          p.dataType === "daily"
            ? p.capacity * Math.max(p.period, 1)
            : getHighSpeedDataMB(p);
        return highSpeedData <= 0 || !Number.isFinite(highSpeedData)
          ? Infinity
          : getPrice(p) / (highSpeedData / 1024);
      };
      return sorted.sort((a, b) => (value(a) - value(b)) * dir);
    }
    case "most-data":
      return sorted.sort((a, b) => {
        const dataA =
          a.dataType === "daily"
            ? a.capacity * Math.max(p_period(a), 1)
            : getHighSpeedDataMB(a);
        const dataB =
          b.dataType === "daily"
            ? b.capacity * Math.max(p_period(b), 1)
            : getHighSpeedDataMB(b);
        if (!Number.isFinite(dataA) && !Number.isFinite(dataB)) return 0;
        if (!Number.isFinite(dataA)) return -1 * dir;
        if (!Number.isFinite(dataB)) return 1 * dir;
        return (dataB - dataA) * dir;
      });
    case "longest":
      return sorted.sort((a, b) => (b.period - a.period) * dir);
    default:
      return sorted;
  }
}

const p_period = (p: Plan) => p.period ?? 1;

// ── nuqs options (shallow: true prevents Next.js from refetching page on URL changes) ──
const NUQS_OPTIONS = { shallow: true, throttleMs: 150 } as const;

export type DataMode = "total" | "daily";
export type PackageCategory = "all" | "data-only" | "data-voice";

// ── Main hook ──
export function usePackageFilters(plans: Plan[] | undefined, slug?: string) {
  const [isPending, startTransition] = useTransition();

  // Sort state
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("cheapest").withOptions(NUQS_OPTIONS),
  );
  const [sortDir, setSortDir] = useQueryState(
    "dir",
    parseAsString.withDefault("asc").withOptions(NUQS_OPTIONS),
  );

  // Data mode: Total vs Daily
  const [dataMode, setDataMode] = useQueryState(
    "dataMode",
    parseAsString.withDefault("total").withOptions(NUQS_OPTIONS),
  );

  // Total Data limits (in MB)
  const [minData, setMinData] = useQueryState(
    "minData",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );
  const [maxData, setMaxData] = useQueryState(
    "maxData",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );

  // Daily Data limits (in MB/day)
  const [dailyMinData, setDailyMinData] = useQueryState(
    "dailyMin",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );
  const [dailyMaxData, setDailyMaxData] = useQueryState(
    "dailyMax",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );

  // Validity limits (in days)
  const [minDuration, setMinDuration] = useQueryState(
    "minDays",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );
  const [maxDuration, setMaxDuration] = useQueryState(
    "maxDays",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );

  // Price limits (in USD)
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsInteger.withOptions(NUQS_OPTIONS),
  );

  // Apply Promo Codes toggle
  const [applyPromo, setApplyPromo] = useQueryState(
    "promo",
    parseAsBoolean.withDefault(true).withOptions(NUQS_OPTIONS),
  );

  // ── Advanced: Plan Preferences ──
  const [hideThrottling, setHideThrottling] = useQueryState(
    "noThrottle",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [hideSpeedLimits, setHideSpeedLimits] = useQueryState(
    "noSpeedCap",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [hideDailyCaps, setHideDailyCaps] = useQueryState(
    "noDaily",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [hideSubscriptions, setHideSubscriptions] = useQueryState(
    "noSub",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [hideDataOnly, setHideDataOnly] = useQueryState(
    "hasVoice",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [onlyDataOnly, setOnlyDataOnly] = useQueryState(
    "dataOnly",
    parseAsBoolean.withDefault(true).withOptions(NUQS_OPTIONS),
  );

  const packageCategory: PackageCategory = hideDataOnly
    ? "data-voice"
    : onlyDataOnly === false
      ? "all"
      : "data-only";

  const setPackageCategory = useCallback(
    (cat: PackageCategory) => {
      startTransition(() => {
        if (cat === "data-voice") {
          void setOnlyDataOnly(false);
          void setHideDataOnly(true);
        } else if (cat === "data-only") {
          void setHideDataOnly(false);
          void setOnlyDataOnly(true);
        } else {
          void setHideDataOnly(false);
          void setOnlyDataOnly(false);
        }
      });
    },
    [setHideDataOnly, setOnlyDataOnly, startTransition],
  );
  const [onlyHotspot, setOnlyHotspot] = useQueryState(
    "hotspot",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [onlyLocalBreakout, setOnlyLocalBreakout] = useQueryState(
    "localBreakout",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [onlyPromo, setOnlyPromo] = useQueryState(
    "onlyPromo",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );

  // ── Advanced: Networks & Providers filters ──
  const [networks, setNetworks] = useQueryState(
    "network",
    parseAsArrayOf(parseAsString, ",")
      .withDefault([])
      .withOptions(NUQS_OPTIONS),
  );
  const [providers, setProviders] = useQueryState(
    "provider",
    parseAsArrayOf(parseAsString, ",")
      .withDefault([])
      .withOptions(NUQS_OPTIONS),
  );

  // Legacy/quick feature flags
  const [has5G, setHas5G] = useQueryState(
    "5g",
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
  const [noExpiry, setNoExpiry] = useQueryState(
    "noExpiry",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );
  const [noKyc, setNoKyc] = useQueryState(
    "noKyc",
    parseAsBoolean.withDefault(false).withOptions(NUQS_OPTIONS),
  );

  // Toggle a column sort: click once = asc, click again = desc, click again = reset
  const toggleColumnSort = useCallback(
    (column: SortOption) => {
      startTransition(() => {
        if (sort === column) {
          if (sortDir === "asc") {
            setSortDir("desc");
          } else {
            setSort("cheapest");
            setSortDir("asc");
          }
        } else {
          setSort(column);
          setSortDir("asc");
        }
      });
    },
    [sort, sortDir, setSort, setSortDir, startTransition],
  );

  const duration = minDuration;
  const setDuration = setMinDuration;
  const toggleDuration = useCallback(
    (days: number) => {
      startTransition(() => {
        setMinDuration(minDuration === days ? null : days);
      });
    },
    [minDuration, setMinDuration, startTransition],
  );

  const clearAll = useCallback(() => {
    startTransition(() => {
      setSort("cheapest");
      setSortDir("asc");
      setDataMode("total");
      setMinData(null);
      setMaxData(null);
      setDailyMinData(null);
      setDailyMaxData(null);
      setMinDuration(null);
      setMaxDuration(null);
      setMinPrice(null);
      setMaxPrice(null);
      setApplyPromo(true);
      setHideThrottling(false);
      setHideSpeedLimits(false);
      setHideDailyCaps(false);
      setHideSubscriptions(false);
      setHideDataOnly(false);
      setOnlyDataOnly(true);
      setOnlyHotspot(false);
      setOnlyLocalBreakout(false);
      setOnlyPromo(false);
      setNetworks([]);
      setProviders([]);
      setHas5G(false);
      setTopUp(false);
      setUnlimited(false);
      setNoExpiry(false);
      setNoKyc(false);
    });
  }, [
    setSort,
    setSortDir,
    setDataMode,
    setMinData,
    setMaxData,
    setDailyMinData,
    setDailyMaxData,
    setMinDuration,
    setMaxDuration,
    setMinPrice,
    setMaxPrice,
    setApplyPromo,
    setHideThrottling,
    setHideSpeedLimits,
    setHideDailyCaps,
    setHideSubscriptions,
    setHideDataOnly,
    setOnlyHotspot,
    setOnlyLocalBreakout,
    setOnlyPromo,
    setNetworks,
    setProviders,
    setHas5G,
    setTopUp,
    setUnlimited,
    setNoExpiry,
    setNoKyc,
    startTransition,
  ]);

  // Clear only advanced modal filters
  const clearAdvancedFilters = useCallback(() => {
    startTransition(() => {
      setHideThrottling(false);
      setHideSpeedLimits(false);
      setHideDailyCaps(false);
      setHideSubscriptions(false);
      setHideDataOnly(false);
      setOnlyHotspot(false);
      setOnlyLocalBreakout(false);
      setOnlyPromo(false);
      setNetworks([]);
      setProviders([]);
    });
  }, [
    setHideThrottling,
    setHideSpeedLimits,
    setHideDailyCaps,
    setHideSubscriptions,
    setHideDataOnly,
    setOnlyHotspot,
    setOnlyLocalBreakout,
    setOnlyPromo,
    setNetworks,
    setProviders,
    startTransition,
  ]);

  // ── Derived data ──
  const allPlans = useMemo(
    () => (Array.isArray(plans) ? plans : []),
    [plans],
  );

  // Extract unique carriers with plan counts (from slim networks or coverages)
  const allNetworks = useMemo(() => {
    const map = new Map<string, number>();

    for (const plan of allPlans) {
      const planNetworks = new Set(getPlanNetworkNames(plan));
      for (const net of planNetworks) {
        map.set(net, (map.get(net) ?? 0) + 1);
      }
    }

    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [allPlans]);

  // Extract unique providers with logos and plan counts
  const allProviders = useMemo(() => {
    const map = new Map<
      string,
      { slug: string; name: string; image: string | null; count: number }
    >();
    for (const p of allPlans) {
      const slug = p.provider.slug;
      if (!map.has(slug)) {
        map.set(slug, {
          slug,
          name: p.provider.name,
          image: p.provider.image,
          count: 0,
        });
      }
      map.get(slug)!.count += 1;
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [allPlans]);

  // Filtered plans memo
  const filteredPlans = useMemo(() => {
    let result = [...allPlans];

    // Data Mode & Limits
    if (dataMode === "daily") {
      result = result.filter((p) => p.dataType === "daily");
      if (dailyMinData !== null) {
        result = result.filter((p) => p.capacity >= dailyMinData);
      }
      if (dailyMaxData !== null) {
        result = result.filter((p) => p.capacity <= dailyMaxData);
      }
    } else {
      if (minData !== null) {
        result = result.filter((p) => getHighSpeedDataMB(p) >= minData);
      }
      if (maxData !== null) {
        result = result.filter((p) => {
          const data = getHighSpeedDataMB(p);
          return Number.isFinite(data) && data > 0 && data <= maxData;
        });
      }
    }

    // Validity / Duration limits
    if (minDuration !== null) {
      result = result.filter((p) => p.period >= minDuration);
    }
    if (maxDuration !== null) {
      result = result.filter((p) => p.period <= maxDuration);
    }

    // Price limits
    const getPrice = (p: Plan) =>
      applyPromo ? getEffectiveUsdPrice(p) : p.usdPrice;

    if (minPrice !== null) {
      result = result.filter((p) => getPrice(p) >= minPrice);
    }
    if (maxPrice !== null) {
      result = result.filter((p) => getPrice(p) <= maxPrice);
    }

    // ── 8 Advanced Plan Preferences ──
    if (hideThrottling) {
      result = result.filter(
        (p) => !p.possibleThrottling && p.reducedSpeed === null,
      );
    }
    if (hideSpeedLimits) {
      result = result.filter(
        (p) => p.speedLimit === null || p.speedLimit === 0,
      );
    }
    if (hideDailyCaps) {
      result = result.filter((p) => p.dataType !== "daily");
    }
    if (hideSubscriptions) {
      result = result.filter((p) => p.subscription !== true);
    }
    if (hideDataOnly) {
      result = result.filter((p) => {
        const v = p.telephony?.voice;
        const s = p.telephony?.sms;
        return Boolean(
          p.phoneNumber ||
            (v && (v.inbound || v.outbound)) ||
            (s && (s.inbound || s.outbound)),
        );
      });
    } else if (onlyDataOnly) {
      result = result.filter((p) => {
        const v = p.telephony?.voice;
        const s = p.telephony?.sms;
        return !Boolean(
          p.phoneNumber ||
            (v && (v.inbound || v.outbound)) ||
            (s && (s.inbound || s.outbound)),
        );
      });
    }
    if (onlyHotspot) {
      result = result.filter((p) => p.tethering === true);
    }
    if (onlyLocalBreakout) {
      result = result.filter(
        (p) =>
          p.isLowLatency === true ||
          (Array.isArray(p.internetBreakouts) && p.internetBreakouts.length > 0),
      );
    }
    if (onlyPromo) {
      result = result.filter(
        (p) => p.promoEnabled === true || p.providerPromoAvailable === true,
      );
    }

    // Networks filter (slim `networks` or coverages), with alias normalization
    if (networks.length > 0) {
      const netSet = new Set(
        networks
          .filter((name) => name !== "__NONE_SELECTED__")
          .map((name) => normalizeNetworkName(name) || name),
      );
      if (netSet.size === 0) {
        result = [];
      } else {
        result = result.filter((p) =>
          getPlanNetworkNames(p).some((name) => netSet.has(name)),
        );
      }
    }

    // Providers filter
    if (providers.length > 0) {
      const provSet = new Set(providers);
      result = result.filter((p) => provSet.has(p.provider.slug));
    }

    // Quick feature toggles
    if (has5G) result = result.filter((p) => p.has5G === true);
    if (topUp) result = result.filter((p) => p.canTopUp === true);
    if (unlimited) result = result.filter(isUnlimitedPlan);
    if (noExpiry) result = result.filter((p) => p.period === 0);
    if (noKyc) {
      result = result.filter((p) => p.eKYC === false || p.eKYC === null);
    }

    // Sort
    return sortPlans(
      result,
      sort as SortOption,
      sortDir as SortDirection,
      applyPromo,
    );
  }, [
    allPlans,
    dataMode,
    minData,
    maxData,
    dailyMinData,
    dailyMaxData,
    minDuration,
    maxDuration,
    minPrice,
    maxPrice,
    applyPromo,
    hideThrottling,
    hideSpeedLimits,
    hideDailyCaps,
    hideSubscriptions,
    hideDataOnly,
    onlyDataOnly,
    onlyHotspot,
    onlyLocalBreakout,
    onlyPromo,
    networks,
    providers,
    has5G,
    topUp,
    unlimited,
    noExpiry,
    noKyc,
    sort,
    sortDir,
  ]);

  // Deferred value for smooth background rendering
  const deferredFilteredPlans = useDeferredValue(filteredPlans);
  const isFiltering = isPending || deferredFilteredPlans !== filteredPlans;

  const uniqueProviderCount = useMemo(() => {
    return new Set(allPlans.map((p) => p.provider.slug)).size;
  }, [allPlans]);

  // Active Advanced Filters Counter
  const advancedFilterCount = useMemo(() => {
    let count = 0;
    if (hideThrottling) count++;
    if (hideSpeedLimits) count++;
    if (hideDailyCaps) count++;
    if (hideSubscriptions) count++;
    if (hideDataOnly) count++;
    if (onlyHotspot) count++;
    if (onlyLocalBreakout) count++;
    if (onlyPromo) count++;
    if (networks.length > 0) count++;
    if (providers.length > 0) count++;
    return count;
  }, [
    hideThrottling,
    hideSpeedLimits,
    hideDailyCaps,
    hideSubscriptions,
    hideDataOnly,
    onlyDataOnly,
    onlyHotspot,
    onlyLocalBreakout,
    onlyPromo,
    networks,
    providers,
  ]);

  // Total active filters counter
  const activeFilterCount = useMemo(() => {
    let count = advancedFilterCount;
    if (dataMode === "daily") count++;
    if (minData !== null || maxData !== null) count++;
    if (dailyMinData !== null || dailyMaxData !== null) count++;
    if (minDuration !== null || maxDuration !== null) count++;
    if (minPrice !== null || maxPrice !== null) count++;
    if (has5G) count++;
    if (topUp) count++;
    if (unlimited) count++;
    if (noExpiry) count++;
    if (noKyc) count++;
    return count;
  }, [
    advancedFilterCount,
    dataMode,
    minData,
    maxData,
    dailyMinData,
    dailyMaxData,
    minDuration,
    maxDuration,
    minPrice,
    maxPrice,
    has5G,
    topUp,
    unlimited,
    noExpiry,
    noKyc,
  ]);

  return {
    // state
    sort: sort as SortOption,
    sortDir: sortDir as SortDirection,
    dataMode: dataMode as DataMode,
    minData,
    maxData,
    dailyMinData,
    dailyMaxData,
    minDuration,
    maxDuration,
    duration,
    minPrice,
    maxPrice,
    applyPromo,
    hideThrottling,
    hideSpeedLimits,
    hideDailyCaps,
    hideSubscriptions,
    hideDataOnly,
    onlyDataOnly,
    packageCategory,
    setPackageCategory,
    onlyHotspot,
    tethering: onlyHotspot,
    onlyLocalBreakout,
    onlyPromo,
    networks,
    providers,
    has5G,
    topUp,
    unlimited,
    calls: hideDataOnly,
    noExpiry,
    noKyc,
    isPending,
    isFiltering,

    // setters
    setSort: (val: SortOption) =>
      startTransition(() => {
        void setSort(val);
      }),
    setSortDir: (val: SortDirection) =>
      startTransition(() => {
        void setSortDir(val);
      }),
    toggleColumnSort,
    setDataMode: (mode: DataMode) =>
      startTransition(() => {
        void setDataMode(mode);
      }),
    setMinData: (val: number | null) =>
      startTransition(() => {
        void setMinData(val);
      }),
    setMaxData: (val: number | null) =>
      startTransition(() => {
        void setMaxData(val);
      }),
    setDailyMinData: (val: number | null) =>
      startTransition(() => {
        void setDailyMinData(val);
      }),
    setDailyMaxData: (val: number | null) =>
      startTransition(() => {
        void setDailyMaxData(val);
      }),
    setMinDuration: (val: number | null) =>
      startTransition(() => {
        void setMinDuration(val);
      }),
    setMaxDuration: (val: number | null) =>
      startTransition(() => {
        void setMaxDuration(val);
      }),
    setDuration,
    toggleDuration,
    setMinPrice: (val: number | null) =>
      startTransition(() => {
        void setMinPrice(val);
      }),
    setMaxPrice: (val: number | null) =>
      startTransition(() => {
        void setMaxPrice(val);
      }),
    setApplyPromo: (val: boolean) =>
      startTransition(() => {
        void setApplyPromo(val);
      }),
    setHideThrottling: (val: boolean) =>
      startTransition(() => {
        void setHideThrottling(val);
      }),
    setHideSpeedLimits: (val: boolean) =>
      startTransition(() => {
        void setHideSpeedLimits(val);
      }),
    setHideDailyCaps: (val: boolean) =>
      startTransition(() => {
        void setHideDailyCaps(val);
      }),
    setHideSubscriptions: (val: boolean) =>
      startTransition(() => {
        void setHideSubscriptions(val);
      }),
    setHideDataOnly: (val: boolean) =>
      startTransition(() => {
        void setHideDataOnly(val);
      }),
    setOnlyHotspot: (val: boolean) =>
      startTransition(() => {
        void setOnlyHotspot(val);
      }),
    setTethering: (val: boolean) =>
      startTransition(() => {
        void setOnlyHotspot(val);
      }),
    setOnlyLocalBreakout: (val: boolean) =>
      startTransition(() => {
        void setOnlyLocalBreakout(val);
      }),
    setOnlyPromo: (val: boolean) =>
      startTransition(() => {
        void setOnlyPromo(val);
      }),
    setNetworks: (val: string[]) =>
      startTransition(() => {
        void setNetworks(val);
      }),
    setProviders: (val: string[]) =>
      startTransition(() => {
        void setProviders(val);
      }),
    setHas5G: (val: boolean) =>
      startTransition(() => {
        void setHas5G(val);
      }),
    setTopUp: (val: boolean) =>
      startTransition(() => {
        void setTopUp(val);
      }),
    setUnlimited: (val: boolean) =>
      startTransition(() => {
        void setUnlimited(val);
      }),
    setCalls: (val: boolean) =>
      startTransition(() => {
        void setHideDataOnly(val);
      }),
    setOnlyDataOnly: (val: boolean) =>
      startTransition(() => {
        void setOnlyDataOnly(val);
      }),
    setNoExpiry: (val: boolean) =>
      startTransition(() => {
        void setNoExpiry(val);
      }),
    setNoKyc: (val: boolean) =>
      startTransition(() => {
        void setNoKyc(val);
      }),
    clearAll,
    clearAdvancedFilters,

    // derived
    allPlans,
    filteredPlans,
    totalCount: allPlans.length,
    filteredCount: filteredPlans.length,
    uniqueProviderCount,
    activeFilterCount,
    advancedFilterCount,
    allNetworks,
    allProviders,
  };
}

export type UsePackageFiltersReturn = ReturnType<typeof usePackageFilters>;
