"use client";

import React, { useState, useMemo, useRef, useTransition } from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import {
  SlidersHorizontal,
  RotateCcw,
  Flame,
  X,

} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type {
  UsePackageFiltersReturn,
  SortOption,
  DataMode,
} from "@/lib/hooks/use-package-filters";
import AdvancedFiltersDialog from "./AdvancedFiltersDialog";

// ── Presets Configuration ──
const TOTAL_DATA_PRESETS = [5, 10, 20, 30, 50]; // in GB
const DAILY_DATA_PRESETS = [1, 2, 3, 5]; // in GB/day
const DURATION_PRESETS = [7, 14, 21, 30]; // in Days
const PRICE_PRESETS = [10, 20, 30, 40]; // in USD

const SORT_OPTIONS: {
  value: SortOption;
  label: string;
  icon?: React.ReactNode;
}[] = [
  { value: "cheapest", label: "Cheapest" },
  {
    value: "best-value",
    label: "Best Price/GB",
    icon: <Flame className="h-3.5 w-3.5" />,
  },
  { value: "most-data", label: "Most Data" },
  { value: "longest", label: "Validity" },
];

export default function PlanFilterCard({
  filters,
}: {
  filters: UsePackageFiltersReturn;
}) {
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [, startTransition] = useTransition();

  const {
    dataMode,
    setDataMode,
    minData,
    maxData,
    setMinData,
    setMaxData,
    dailyMinData,
    dailyMaxData,
    setDailyMinData,
    setDailyMaxData,
    minDuration,
    maxDuration,
    setMinDuration,
    setMaxDuration,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    applyPromo,
    setApplyPromo,
    hideThrottling,
    setHideThrottling,
    hideSpeedLimits,
    setHideSpeedLimits,
    hideDailyCaps,
    setHideDailyCaps,
    hideSubscriptions,
    setHideSubscriptions,
    hideDataOnly,
    setHideDataOnly,
    onlyHotspot,
    setOnlyHotspot,
    onlyLocalBreakout,
    setOnlyLocalBreakout,
    onlyPromo,
    setOnlyPromo,
    networks,
    setNetworks,
    providers,
    setProviders,
    allProviders,
    sort,
    setSort,
    clearAll,
    activeFilterCount,
    advancedFilterCount,
    totalCount,
    filteredCount,
    allPlans,
  } = filters;

  // ── 1. Data Slider Calculations ──
  const isDaily = dataMode === "daily";
  const dataSliderMax = isDaily ? 10 : 50;

  const propMinDataGB = isDaily
    ? dailyMinData !== null
      ? dailyMinData / 1024
      : 0
    : minData !== null
      ? minData / 1024
      : 0;

  const propMaxDataGB = isDaily
    ? dailyMaxData !== null
      ? dailyMaxData / 1024
      : dataSliderMax
    : maxData !== null
      ? maxData / 1024
      : dataSliderMax;

  // Local state for smooth 120 FPS slider dragging without UI lag
  const [localDataRange, setLocalDataRange] = useState<number[]>([
    propMinDataGB,
    propMaxDataGB,
  ]);
  const [prevDataProps, setPrevDataProps] = useState({ min: propMinDataGB, max: propMaxDataGB });
  if (prevDataProps.min !== propMinDataGB || prevDataProps.max !== propMaxDataGB) {
    setPrevDataProps({ min: propMinDataGB, max: propMaxDataGB });
    setLocalDataRange([propMinDataGB, propMaxDataGB]);
  }

  // ── 2. Validity Slider Calculations ──
  const propMinDays = minDuration ?? 1;
  const propMaxDays = maxDuration ?? 90;

  const [localValidityRange, setLocalValidityRange] = useState<number[]>([
    propMinDays,
    propMaxDays,
  ]);
  const [prevValidityProps, setPrevValidityProps] = useState({ min: propMinDays, max: propMaxDays });
  if (prevValidityProps.min !== propMinDays || prevValidityProps.max !== propMaxDays) {
    setPrevValidityProps({ min: propMinDays, max: propMaxDays });
    setLocalValidityRange([propMinDays, propMaxDays]);
  }

  // ── 3. Price Slider Calculations ──
  const propMinPrice = minPrice ?? 0;
  const propMaxPrice = maxPrice ?? 100;

  const [localPriceRange, setLocalPriceRange] = useState<number[]>([
    propMinPrice,
    propMaxPrice,
  ]);
  const [prevPriceProps, setPrevPriceProps] = useState({ min: propMinPrice, max: propMaxPrice });
  if (prevPriceProps.min !== propMinPrice || prevPriceProps.max !== propMaxPrice) {
    setPrevPriceProps({ min: propMinPrice, max: propMaxPrice });
    setLocalPriceRange([propMinPrice, propMaxPrice]);
  }

  // ── Active Bracket / Tier Matching (15GB+ highlights 10GB+, 34+ Days highlights 30+ Days) ──
  const activeDataPreset = useMemo(() => {
    const currentMin = localDataRange[0];
    const presets = isDaily ? DAILY_DATA_PRESETS : TOTAL_DATA_PRESETS;
    if (currentMin <= 0) return null;
    const matched = [...presets].reverse().find((gb) => currentMin >= gb);
    return matched ?? null;
  }, [localDataRange, isDaily]);

  const activeDurationPreset = useMemo(() => {
    const currentMinDays = localValidityRange[0];
    if (currentMinDays <= 1) return null;
    const matched = [...DURATION_PRESETS].reverse().find((days) => currentMinDays >= days);
    return matched ?? null;
  }, [localValidityRange]);

  const activePricePreset = useMemo(() => {
    const currentMaxPrice = localPriceRange[1];
    if (currentMaxPrice >= 100) return null;
    const matched = PRICE_PRESETS.find((amt) => currentMaxPrice <= amt);
    return matched ?? 40;
  }, [localPriceRange]);

  // ── Debounced Commit Helpers for Sliders ──
  const dataDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const validityDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const priceDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Commit Data Range to URL / Filter
  const commitDataRange = (vals: number[]) => {
    const [minVal, maxVal] = vals;
    startTransition(() => {
      if (isDaily) {
        setDailyMinData(minVal > 0 ? minVal * 1024 : null);
        setDailyMaxData(maxVal < dataSliderMax ? maxVal * 1024 : null);
      } else {
        setMinData(minVal > 0 ? minVal * 1024 : null);
        setMaxData(maxVal < dataSliderMax ? maxVal * 1024 : null);
      }
    });
  };

  const handleDataSliderChange = (vals: number[]) => {
    setLocalDataRange(vals);
    if (dataDebounceRef.current) clearTimeout(dataDebounceRef.current);
    dataDebounceRef.current = setTimeout(() => {
      commitDataRange(vals);
    }, 120);
  };

  const handleDataSliderCommit = (vals: number[]) => {
    if (dataDebounceRef.current) clearTimeout(dataDebounceRef.current);
    commitDataRange(vals);
  };

  // Commit Validity Range to URL / Filter
  const commitValidityRange = (vals: number[]) => {
    const [minVal, maxVal] = vals;
    startTransition(() => {
      setMinDuration(minVal > 1 ? minVal : null);
      setMaxDuration(maxVal < 90 ? maxVal : null);
    });
  };

  const handleValiditySliderChange = (vals: number[]) => {
    setLocalValidityRange(vals);
    if (validityDebounceRef.current) clearTimeout(validityDebounceRef.current);
    validityDebounceRef.current = setTimeout(() => {
      commitValidityRange(vals);
    }, 120);
  };

  const handleValiditySliderCommit = (vals: number[]) => {
    if (validityDebounceRef.current) clearTimeout(validityDebounceRef.current);
    commitValidityRange(vals);
  };

  // Commit Price Range to URL / Filter
  const commitPriceRange = (vals: number[]) => {
    const [minVal, maxVal] = vals;
    startTransition(() => {
      setMinPrice(minVal > 0 ? minVal : null);
      setMaxPrice(maxVal < 100 ? maxVal : null);
    });
  };

  const handlePriceSliderChange = (vals: number[]) => {
    setLocalPriceRange(vals);
    if (priceDebounceRef.current) clearTimeout(priceDebounceRef.current);
    priceDebounceRef.current = setTimeout(() => {
      commitPriceRange(vals);
    }, 120);
  };

  const handlePriceSliderCommit = (vals: number[]) => {
    if (priceDebounceRef.current) clearTimeout(priceDebounceRef.current);
    commitPriceRange(vals);
  };

  // ── Calculate matching plan counts for each chip ──
  const planCounts = useMemo(() => {
    const totalDataCounts: Record<number, number> = {};
    TOTAL_DATA_PRESETS.forEach((gb) => {
      const mb = gb * 1024;
      totalDataCounts[gb] = allPlans.filter(
        (p) => p.dataType !== "daily" && p.capacity >= mb,
      ).length;
    });

    const dailyDataCounts: Record<number, number> = {};
    DAILY_DATA_PRESETS.forEach((gb) => {
      const mb = gb * 1024;
      dailyDataCounts[gb] = allPlans.filter(
        (p) => p.dataType === "daily" && p.capacity >= mb,
      ).length;
    });

    const durationCounts: Record<number, number> = {};
    DURATION_PRESETS.forEach((days) => {
      durationCounts[days] = allPlans.filter((p) => p.period >= days).length;
    });

    const priceCounts: Record<number, number> = {};
    PRICE_PRESETS.forEach((dollars) => {
      priceCounts[dollars] = allPlans.filter(
        (p) => (p.usdPrice ?? 0) <= dollars,
      ).length;
    });

    return {
      totalData: totalDataCounts,
      dailyData: dailyDataCounts,
      duration: durationCounts,
      price: priceCounts,
    };
  }, [allPlans]);

  // ── Handlers for Data Mode ──
  const handleModeChange = (mode: DataMode) => {
    const newMax = mode === "daily" ? 10 : 50;
    setLocalDataRange([0, newMax]);
    startTransition(() => {
      setDataMode(mode);
      if (mode === "daily") {
        setMinData(null);
        setMaxData(null);
      } else {
        setDailyMinData(null);
        setDailyMaxData(null);
      }
    });
  };

  // ── Preset Chip Click Handlers (Synchronizes both local and query state) ──
  const handleDataPresetClick = (gb: number) => {
    const isCurrentlySelected = activeDataPreset === gb;

    if (isCurrentlySelected) {
      setLocalDataRange([0, dataSliderMax]);
      startTransition(() => {
        if (isDaily) {
          setDailyMinData(null);
          setDailyMaxData(null);
        } else {
          setMinData(null);
          setMaxData(null);
        }
      });
    } else {
      setLocalDataRange([gb, dataSliderMax]);
      startTransition(() => {
        if (isDaily) {
          setDailyMinData(gb * 1024);
          setDailyMaxData(null);
        } else {
          setMinData(gb * 1024);
          setMaxData(null);
        }
      });
    }
  };

  const handleValidityPresetClick = (days: number) => {
    const isCurrentlySelected = activeDurationPreset === days;

    if (isCurrentlySelected) {
      setLocalValidityRange([1, 90]);
      startTransition(() => {
        setMinDuration(null);
        setMaxDuration(null);
      });
    } else {
      setLocalValidityRange([days, 90]);
      startTransition(() => {
        setMinDuration(days);
        setMaxDuration(null);
      });
    }
  };

  const handlePricePresetClick = (amt: number) => {
    const isCurrentlySelected = activePricePreset === amt;

    if (isCurrentlySelected) {
      setLocalPriceRange([0, 100]);
      startTransition(() => {
        setMinPrice(null);
        setMaxPrice(null);
      });
    } else {
      setLocalPriceRange([0, amt]);
      startTransition(() => {
        setMinPrice(null);
        setMaxPrice(amt);
      });
    }
  };

  const handleClearAll = () => {
    setLocalDataRange([0, dataSliderMax]);
    setLocalValidityRange([1, 90]);
    setLocalPriceRange([0, 100]);
    startTransition(() => {
      clearAll();
    });
  };

  // ── Status Badges (Derived from local range for immediate 0ms visual feedback) ──
  const dataStatusText = useMemo(() => {
    const [minVal, maxVal] = localDataRange;
    const unit = isDaily ? "GB/day" : "GB";
    const isMinSet = minVal > 0;
    const isMaxSet = maxVal < dataSliderMax;

    if (!isMinSet && !isMaxSet) return "Filter Not Set";
    if (isMinSet && isMaxSet) return `${minVal} - ${maxVal} ${unit}`;
    if (isMinSet) return `Min: ${minVal}${unit}+`;
    return `Max: ${maxVal} ${unit}`;
  }, [localDataRange, isDaily, dataSliderMax]);

  const validityStatusText = useMemo(() => {
    const [minVal, maxVal] = localValidityRange;
    const isMinSet = minVal > 1;
    const isMaxSet = maxVal < 90;

    if (!isMinSet && !isMaxSet) return "Filter Not Set";
    if (isMinSet && isMaxSet) return `${minVal} - ${maxVal} Days`;
    if (isMinSet) return `Min: ${minVal}+ Days`;
    return `Max: ${maxVal} Days`;
  }, [localValidityRange]);

  const priceStatusText = useMemo(() => {
    const [minVal, maxVal] = localPriceRange;
    const isMinSet = minVal > 0;
    const isMaxSet = maxVal < 100;

    if (!isMinSet && !isMaxSet) return "Filter Not Set";
    if (isMinSet && isMaxSet) return `$${minVal} - $${maxVal}`;
    if (isMinSet) return `Min: $${minVal}`;
    return `Max: $${maxVal}`;
  }, [localPriceRange]);

  return (
    <div className="w-full space-y-4">
      {/* ── Main Filter Card ── */}
      <div className="relative rounded-2xl border border-border/80 bg-card p-5 md:p-6 shadow-sm transition-all hover:shadow-md">
        {/* Floating Top Badge */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-semibold tracking-wide text-muted-foreground shadow-xs">
            <SlidersHorizontal className="h-3 w-3 text-primary" />
            <span>FILTER PLANS</span>
            {activeFilterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground animate-in zoom-in-75 duration-200">
                {activeFilterCount}
              </span>
            )}
          </div>
        </div>

        {/* 3 Main Columns */}
        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-3 md:gap-8 md:divide-x md:divide-border/60">
          {/* ── Column 1: DATA FILTER ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {/* Segmented Mode Control */}
              <div className="inline-flex rounded-lg bg-muted/60 p-0.5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => handleModeChange("total")}
                  className={cn(
                    "rounded-md px-2.5 py-1 transition-all",
                    !isDaily
                      ? "bg-card text-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  TOTAL DATA
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("daily")}
                  className={cn(
                    "rounded-md px-2.5 py-1 transition-all",
                    isDaily
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  DAILY DATA
                </button>
              </div>

              {/* Status Pill */}
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors",
                  dataStatusText !== "Filter Not Set"
                    ? "bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20 dark:text-primary font-semibold"
                    : "bg-muted/50 text-muted-foreground",
                )}
              >
                {dataStatusText}
              </span>
            </div>

            {/* Range Slider */}
            <div className="pt-2">
              <SliderPrimitive.Root
                value={localDataRange}
                onValueChange={handleDataSliderChange}
                onValueCommit={handleDataSliderCommit}
                min={0}
                max={dataSliderMax}
                step={isDaily ? 0.5 : 1}
                className="relative flex w-full touch-none select-none items-center py-2"
              >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
                  <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary/40" />
                <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </SliderPrimitive.Root>
              <div className="mt-1 flex justify-between text-[11px] font-medium text-muted-foreground">
                <span>0GB</span>
                <span>{isDaily ? "10GB+/day" : "50GB+"}</span>
              </div>
            </div>

            {/* Quick Preset Chips with plan counts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(isDaily ? DAILY_DATA_PRESETS : TOTAL_DATA_PRESETS).map((gb) => {
                const count = isDaily
                  ? planCounts.dailyData[gb] ?? 0
                  : planCounts.totalData[gb] ?? 0;
                
                // Matches the active tier bracket (e.g. 15GB+ highlights 10GB+)
                const isSelected = activeDataPreset === gb;
                const label = isDaily ? `${gb}GB+/day` : `${gb}GB+`;

                return (
                  <button
                    key={gb}
                    type="button"
                    onClick={() => handleDataPresetClick(gb)}
                    disabled={count === 0}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all active:scale-95",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                      count === 0 &&
                        "cursor-not-allowed opacity-40 hover:border-border hover:text-muted-foreground",
                    )}
                  >
                    <span>{label}</span>
                    {isSelected ? (
                      <X className="h-3 w-3 text-primary-foreground" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground/70">
                        ({count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Column 2: VALIDITY FILTER ── */}
          <div className="space-y-4 md:pl-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                VALIDITY
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors",
                  validityStatusText !== "Filter Not Set"
                    ? "bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20 dark:text-primary font-semibold"
                    : "bg-muted/50 text-muted-foreground",
                )}
              >
                {validityStatusText}
              </span>
            </div>

            {/* Range Slider */}
            <div className="pt-2">
              <SliderPrimitive.Root
                value={localValidityRange}
                onValueChange={handleValiditySliderChange}
                onValueCommit={handleValiditySliderCommit}
                min={1}
                max={90}
                step={1}
                className="relative flex w-full touch-none select-none items-center py-2"
              >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
                  <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary/40" />
                <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </SliderPrimitive.Root>
              <div className="mt-1 flex justify-between text-[11px] font-medium text-muted-foreground">
                <span>1 Day</span>
                <span>90+ Days</span>
              </div>
            </div>

            {/* Quick Preset Chips with plan counts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {DURATION_PRESETS.map((days) => {
                const count = planCounts.duration[days] ?? 0;
                // Matches the active tier bracket (e.g. 34+ Days highlights 30+ Days)
                const isSelected = activeDurationPreset === days;

                return (
                  <button
                    key={days}
                    type="button"
                    onClick={() => handleValidityPresetClick(days)}
                    disabled={count === 0}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all active:scale-95",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                      count === 0 &&
                        "cursor-not-allowed opacity-40 hover:border-border hover:text-muted-foreground",
                    )}
                  >
                    <span>{days}+ Days Trip</span>
                    {isSelected ? (
                      <X className="h-3 w-3 text-primary-foreground" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground/70">
                        ({count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Column 3: PRICE FILTER ── */}
          <div className="space-y-4 md:pl-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                PRICE
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors",
                  priceStatusText !== "Filter Not Set"
                    ? "bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20 dark:text-primary font-semibold"
                    : "bg-muted/50 text-muted-foreground",
                )}
              >
                {priceStatusText}
              </span>
            </div>

            {/* Range Slider */}
            <div className="pt-2">
              <SliderPrimitive.Root
                value={localPriceRange}
                onValueChange={handlePriceSliderChange}
                onValueCommit={handlePriceSliderCommit}
                min={0}
                max={100}
                step={1}
                className="relative flex w-full touch-none select-none items-center py-2"
              >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
                  <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary/40" />
                <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </SliderPrimitive.Root>
              <div className="mt-1 flex justify-between text-[11px] font-medium text-muted-foreground">
                <span>$0</span>
                <span>$100+</span>
              </div>
            </div>

            {/* Quick Preset Chips with plan counts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PRICE_PRESETS.map((amt) => {
                const count = planCounts.price[amt] ?? 0;
                // Matches the active ceiling bracket (e.g. $15 highlights Under $20)
                const isSelected = activePricePreset === amt;

                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePricePresetClick(amt)}
                    disabled={count === 0}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all active:scale-95",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                      count === 0 &&
                        "cursor-not-allowed opacity-40 hover:border-border hover:text-muted-foreground",
                    )}
                  >
                    <span>Under ${amt}</span>
                    {isSelected ? (
                      <X className="h-3 w-3 text-primary-foreground" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground/70">
                        ({count})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom Section of the Card: Advanced Filters & Reset All ── */}
        <div className="mt-6 flex flex-wrap items-center justify-between border-t border-border/60 pt-4 gap-3">
          <button
            type="button"
            onClick={() => setIsAdvancedModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20 hover:border-primary active:scale-95 shadow-xs dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
            <span>Advanced Filters</span>
            {advancedFilterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-xs">
                {advancedFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 ? (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All
            </button>
          ) : (
            <span className="text-xs text-muted-foreground/50">Reset All</span>
          )}
        </div>

        {/* ── Active Filter Pills (0-click removal of any active filter - Much better than eSIMDB) ── */}
        {activeFilterCount > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border/50 pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">
              Active:
            </span>

            {/* Data Range Pill */}
            {dataStatusText !== "Filter Not Set" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>Data: {dataStatusText}</span>
                <button
                  type="button"
                  onClick={() => {
                    setLocalDataRange([0, dataSliderMax]);
                    startTransition(() => {
                      if (isDaily) {
                        setDailyMinData(null);
                        setDailyMaxData(null);
                      } else {
                        setMinData(null);
                        setMaxData(null);
                      }
                    });
                  }}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {/* Validity Pill */}
            {validityStatusText !== "Filter Not Set" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>Validity: {validityStatusText}</span>
                <button
                  type="button"
                  onClick={() => {
                    setLocalValidityRange([1, 90]);
                    startTransition(() => {
                      setMinDuration(null);
                      setMaxDuration(null);
                    });
                  }}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {/* Price Pill */}
            {priceStatusText !== "Filter Not Set" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>Price: {priceStatusText}</span>
                <button
                  type="button"
                  onClick={() => {
                    setLocalPriceRange([0, 100]);
                    startTransition(() => {
                      setMinPrice(null);
                      setMaxPrice(null);
                    });
                  }}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {/* 8 Plan Preferences Pills */}
            {hideThrottling && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>No Throttling</span>
                <button
                  type="button"
                  onClick={() => setHideThrottling(false)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {hideSpeedLimits && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>No Speed Cap</span>
                <button
                  type="button"
                  onClick={() => setHideSpeedLimits(false)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {hideDailyCaps && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>No Daily Caps</span>
                <button
                  type="button"
                  onClick={() => setHideDailyCaps(false)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {hideSubscriptions && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>No Subscriptions</span>
                <button
                  type="button"
                  onClick={() => setHideSubscriptions(false)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {hideDataOnly && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>Voice &amp; SMS</span>
                <button
                  type="button"
                  onClick={() => setHideDataOnly(false)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {onlyHotspot && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>Hotspot</span>
                <button
                  type="button"
                  onClick={() => setOnlyHotspot(false)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {onlyLocalBreakout && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>Local Breakout</span>
                <button
                  type="button"
                  onClick={() => setOnlyLocalBreakout(false)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {onlyPromo && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary">
                <span>Promo Available</span>
                <button
                  type="button"
                  onClick={() => setOnlyPromo(false)}
                  className="hover:text-primary/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {/* Networks Pills */}
            {networks.length > 0 &&
              networks[0] !== "__NONE_SELECTED__" &&
              networks.map((netName) => (
                <span
                  key={netName}
                  className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary"
                >
                  <span>Net: {netName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const next = networks.filter((n) => n !== netName);
                      setNetworks(next.length === 0 ? [] : next);
                    }}
                    className="hover:text-primary/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

            {/* Providers Pills */}
            {providers.length > 0 &&
              providers[0] !== "__NONE_SELECTED__" &&
              providers.map((slug) => {
                const prov = allProviders.find((p) => p.slug === slug);
                return (
                  <span
                    key={slug}
                    className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/20 dark:text-primary"
                  >
                    <span>{prov?.name ?? slug}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = providers.filter((p) => p !== slug);
                        setProviders(next.length === 0 ? [] : next);
                      }}
                      className="hover:text-primary/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}

            {/* Clear All action */}
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[11px] font-semibold text-muted-foreground hover:text-primary underline ml-1 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* ── Advanced Filters Dialog Modal ── */}
      <AdvancedFiltersDialog
        open={isAdvancedModalOpen}
        onOpenChange={setIsAdvancedModalOpen}
        filters={filters}
      />

      {/* ── Sort & Promo Bar (Directly below Filter Card) ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Sort:
          </span>
          <div className="flex flex-wrap gap-1">
            {SORT_OPTIONS.map((opt) => {
              const isActive = sort === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => startTransition(() => setSort(opt.value))}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs [&_svg]:text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground [&_svg]:text-primary",
                  )}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Promo Codes Switch & Plan Counter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">
              Apply Promo Codes
            </span>
            <Switch
              checked={applyPromo}
              onCheckedChange={(checked) =>
                startTransition(() => setApplyPromo(checked))
              }
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="hidden text-xs text-muted-foreground sm:block">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredCount}
            </span>{" "}
            of {totalCount} plans
          </div>
        </div>
      </div>
    </div>
  );
}
