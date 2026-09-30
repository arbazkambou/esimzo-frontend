"use client";

import React, { useState, useMemo, useRef, useTransition } from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import {
  SlidersHorizontal,
  RotateCcw,
  Flame,
  X,
  Wifi,
  Calendar,
  Tag,
  Sparkles,
  ArrowUpDown,
  Filter,
  ChevronDown,
  PhoneCall,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn, isUnlimitedPlan, getEffectiveUsdPrice } from "@/lib/utils";
import type {
  UsePackageFiltersReturn,
  SortOption,
  DataMode,
  PackageCategory,
} from "@/lib/hooks/use-package-filters";
import AdvancedFiltersDialog from "./AdvancedFiltersDialog";

// ── Presets Configuration ──
const TOTAL_DATA_PRESETS = [5, 10, 20, 30, 50]; // in GB (5 items + Unlimited = 6 chips)
const DAILY_DATA_PRESETS = [1, 2, 3, 5]; // in GB/day
const DURATION_PRESETS = [7, 14, 21, 30, 60]; // in Days (5 items + No Expiry = 6 chips)
const PRICE_PRESETS = [10, 20, 30, 40, 50, 75]; // in USD (6 chips)

const SORT_OPTIONS: {
  value: SortOption;
  label: string;
  icon?: React.ReactNode;
}[] = [
  { value: "cheapest", label: "Cheapest" },
  {
    value: "best-value",
    label: "Best Value",
    icon: <Flame className="h-3.5 w-3.5" />,
  },
  { value: "most-data", label: "Most Data" },
  { value: "longest", label: "Longest Trip" },
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
    onlyDataOnly,
    packageCategory,
    setPackageCategory,
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
    unlimited,
    setUnlimited,
    noExpiry,
    setNoExpiry,
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
  const [prevDataProps, setPrevDataProps] = useState({
    min: propMinDataGB,
    max: propMaxDataGB,
  });
  if (
    prevDataProps.min !== propMinDataGB ||
    prevDataProps.max !== propMaxDataGB
  ) {
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
  const [prevValidityProps, setPrevValidityProps] = useState({
    min: propMinDays,
    max: propMaxDays,
  });
  if (
    prevValidityProps.min !== propMinDays ||
    prevValidityProps.max !== propMaxDays
  ) {
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
  const [prevPriceProps, setPrevPriceProps] = useState({
    min: propMinPrice,
    max: propMaxPrice,
  });
  if (
    prevPriceProps.min !== propMinPrice ||
    prevPriceProps.max !== propMaxPrice
  ) {
    setPrevPriceProps({ min: propMinPrice, max: propMaxPrice });
    setLocalPriceRange([propMinPrice, propMaxPrice]);
  }

  // ── Active Bracket / Tier Matching (e.g. 15GB+ highlights 10GB+) ──
  const activeDataPreset = useMemo(() => {
    if (unlimited) return null;
    const currentMin = localDataRange[0];
    const presets = isDaily ? DAILY_DATA_PRESETS : TOTAL_DATA_PRESETS;
    if (currentMin <= 0) return null;
    const matched = [...presets].reverse().find((gb) => currentMin >= gb);
    return matched ?? null;
  }, [localDataRange, isDaily, unlimited]);

  const activeDurationPreset = useMemo(() => {
    if (noExpiry) return null;
    const currentMinDays = localValidityRange[0];
    if (currentMinDays <= 1) return null;
    const matched = [...DURATION_PRESETS]
      .reverse()
      .find((days) => currentMinDays >= days);
    return matched ?? null;
  }, [localValidityRange, noExpiry]);

  const activePricePreset = useMemo(() => {
    const currentMaxPrice = localPriceRange[1];
    if (currentMaxPrice >= 100) return null;
    const matched = PRICE_PRESETS.find((amt) => currentMaxPrice <= amt);
    return matched ?? null;
  }, [localPriceRange]);

  // ── Debounced Commit Helpers for Sliders ──
  const dataDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const validityDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const priceDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Commit Data Range to URL / Filter
  const commitDataRange = (vals: number[]) => {
    const [minVal, maxVal] = vals;
    startTransition(() => {
      setUnlimited(false);
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
      setNoExpiry(false);
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
    const dataVoicePlans = allPlans.filter(
      (p) =>
        p.phoneNumber === true ||
        Boolean(
          p.telephony?.voice?.inbound ||
            p.telephony?.voice?.outbound ||
            p.telephony?.sms?.inbound ||
            p.telephony?.sms?.outbound,
        ),
    );
    const dataOnlyPlans = allPlans.filter(
      (p) =>
        !p.phoneNumber &&
        !Boolean(
          p.telephony?.voice?.inbound ||
            p.telephony?.voice?.outbound ||
            p.telephony?.sms?.inbound ||
            p.telephony?.sms?.outbound,
        ),
    );

    // Active pool for data allowance chips based on selected category
    const activeDataPool =
      packageCategory === "data-voice"
        ? dataVoicePlans
        : packageCategory === "data-only"
          ? dataOnlyPlans
          : allPlans;

    const totalDataCounts: Record<number, number> = {};
    TOTAL_DATA_PRESETS.forEach((gb) => {
      const mb = gb * 1024;
      totalDataCounts[gb] = activeDataPool.filter(
        (p) => p.dataType !== "daily" && p.capacity >= mb,
      ).length;
    });

    const dailyDataCounts: Record<number, number> = {};
    DAILY_DATA_PRESETS.forEach((gb) => {
      const mb = gb * 1024;
      dailyDataCounts[gb] = activeDataPool.filter(
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

    const unlimitedCount = activeDataPool.filter(isUnlimitedPlan).length;
    const noExpiryCount = allPlans.filter((p) => p.period === 0).length;
    const freeCount = allPlans.filter(
      (p) => getEffectiveUsdPrice(p) === 0 || (p.usdPrice ?? 0) === 0,
    ).length;

    return {
      totalData: totalDataCounts,
      dailyData: dailyDataCounts,
      duration: durationCounts,
      price: priceCounts,
      unlimited: unlimitedCount,
      noExpiry: noExpiryCount,
      free: freeCount,
      dataVoice: dataVoicePlans.length,
      dataOnly: dataOnlyPlans.length,
    };
  }, [allPlans, packageCategory]);

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

  // ── Preset Click Handlers ──
  const handleDataPresetClick = (gb: number) => {
    if (activeDataPreset === gb) {
      setLocalDataRange([0, dataSliderMax]);
      startTransition(() => {
        setUnlimited(false);
        if (isDaily) {
          setDailyMinData(null);
          setDailyMaxData(null);
        } else {
          setMinData(null);
          setMaxData(null);
        }
      });
      return;
    }

    setLocalDataRange([gb, dataSliderMax]);
    startTransition(() => {
      setUnlimited(false);
      if (isDaily) {
        setDailyMinData(gb * 1024);
        setDailyMaxData(null);
      } else {
        setMinData(gb * 1024);
        setMaxData(null);
      }
    });
  };

  const handleValidityPresetClick = (days: number) => {
    if (activeDurationPreset === days) {
      setLocalValidityRange([1, 90]);
      startTransition(() => {
        setNoExpiry(false);
        setMinDuration(null);
        setMaxDuration(null);
      });
      return;
    }

    setLocalValidityRange([days, 90]);
    startTransition(() => {
      setNoExpiry(false);
      setMinDuration(days);
      setMaxDuration(null);
    });
  };

  const handlePricePresetClick = (amt: number) => {
    if (activePricePreset === amt && localPriceRange[0] === 0) {
      setLocalPriceRange([0, 100]);
      startTransition(() => {
        setMinPrice(null);
        setMaxPrice(null);
      });
      return;
    }

    setLocalPriceRange([0, amt]);
    startTransition(() => {
      setMinPrice(null);
      setMaxPrice(amt);
    });
  };

  const handleClearAll = () => {
    setLocalDataRange([0, isDaily ? 10 : 50]);
    setLocalValidityRange([1, 90]);
    setLocalPriceRange([0, 100]);
    clearAll();
  };

  // Status text representations
  const dataStatusText = useMemo(() => {
    if (unlimited) {
      return "Unlimited Data";
    }
    const minVal = localDataRange[0];
    const maxVal = localDataRange[1];
    const unit = isDaily ? "GB/day" : "GB";

    if (minVal === 0 && maxVal === dataSliderMax) {
      return null;
    }
    if (minVal > 0 && maxVal === dataSliderMax) {
      return `${minVal} ${unit}+`;
    }
    if (minVal === 0 && maxVal < dataSliderMax) {
      return `Up to ${maxVal} ${unit}`;
    }
    return `${minVal} – ${maxVal} ${unit}`;
  }, [localDataRange, dataSliderMax, isDaily, unlimited]);

  const validityStatusText = useMemo(() => {
    if (noExpiry) {
      return "No Expiry";
    }
    const minVal = localValidityRange[0];
    const maxVal = localValidityRange[1];

    if (minVal === 1 && maxVal === 90) {
      return null;
    }
    if (minVal > 1 && maxVal === 90) {
      return `${minVal}+ Days`;
    }
    if (minVal === 1 && maxVal < 90) {
      return `Up to ${maxVal} Days`;
    }
    return `${minVal} – ${maxVal} Days`;
  }, [localValidityRange, noExpiry]);

  const priceStatusText = useMemo(() => {
    if (maxPrice === 0) {
      return "Free ($0)";
    }
    const minVal = localPriceRange[0];
    const maxVal = localPriceRange[1];

    if (minVal === 0 && maxVal === 100) {
      return null;
    }
    if (minVal > 0 && maxVal === 100) {
      return `$${minVal}+`;
    }
    if (minVal === 0 && maxVal < 100) {
      return `Under $${maxVal}`;
    }
    return `$${minVal} – $${maxVal}`;
  }, [localPriceRange, maxPrice]);

  return (
    <div className="w-full space-y-4">
      {/* ── Main Filter Container (Compact eSIMDB Style) ── */}
      <section
        aria-label="eSIM Plan Filters"
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-4 sm:p-5 md:p-6 shadow-xs transition-shadow"
      >
        {/* Compact Top Badge: FILTER PLANS */}
        <div className="flex items-center justify-center pb-2 sm:pb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/40 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground shadow-2xs">
            <span>Filter Plans</span>
            {(activeFilterCount > 0 || unlimited || noExpiry || maxPrice === 0 || advancedFilterCount > 0) && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-xs">
                {(activeFilterCount || 0) + (unlimited ? 1 : 0) + (noExpiry ? 1 : 0) + (maxPrice === 0 ? 1 : 0) + (advancedFilterCount || 0)}
              </span>
            )}
          </span>
        </div>

        {/* ── Main Filters: 3 Columns (Data, Validity, Price) with Seamless Dividers ── */}
        <div className="grid grid-cols-1 divide-y lg:divide-y-0 lg:divide-x divide-border/60 pt-2 lg:grid-cols-3">
          {/* ── COLUMN 1: DATA ── */}
          <div className="flex flex-col justify-between py-4 first:pt-0 last:pb-0 lg:py-0 lg:px-6 first:lg:pl-0 last:lg:pr-0">
            <div className="flex flex-col gap-3">
              {/* Header Row: Tabs on Left, Readout Badge on Right */}
              <div className="h-8 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Total vs Daily Modern Segmented Control */}
                  <div className="inline-flex items-center rounded-lg bg-muted/70 p-0.5 border border-border/50 text-xs shadow-2xs">
                    <button
                      type="button"
                      onClick={() => handleModeChange("total")}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-semibold transition-all",
                        !isDaily
                          ? "bg-primary text-primary-foreground shadow-xs font-bold"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      Total
                    </button>
                    <button
                      type="button"
                      onClick={() => handleModeChange("daily")}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-semibold transition-all",
                        isDaily
                          ? "bg-primary text-primary-foreground shadow-xs font-bold"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      Daily
                    </button>
                  </div>

                  {/* Data Only vs Voice Segmented Control (if voice plans available) */}
                  {planCounts.dataVoice > 0 && (
                    <div className="inline-flex items-center rounded-lg bg-muted/70 p-0.5 border border-border/50 text-xs shadow-2xs">
                      <button
                        type="button"
                        onClick={() => {
                          startTransition(() => {
                            setPackageCategory("data-only");
                          });
                        }}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-all",
                          packageCategory === "data-only"
                            ? "bg-primary text-primary-foreground shadow-xs font-bold"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        aria-label="Data Only"
                      >
                        <Wifi className="h-3 w-3 shrink-0" />
                        <span>Data</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          startTransition(() => {
                            setPackageCategory("data-voice");
                          });
                        }}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-all",
                          packageCategory === "data-voice"
                            ? "bg-primary text-primary-foreground shadow-xs font-bold"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        aria-label="Data and Voice"
                      >
                        <PhoneCall className="h-3 w-3 shrink-0" />
                        <span>+ Voice</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Readout Badge */}
                <div className="shrink-0 text-[11px]">
                  {dataStatusText ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 border border-primary/25 px-2 py-0.5 font-bold text-primary">
                      <span>Min:</span>
                      <span>{dataStatusText}</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground/60 font-medium">All Data</span>
                  )}
                </div>
              </div>

              {/* Chips Grid (Symmetrical 3x2, placed ABOVE slider) */}
              <div className="grid grid-cols-3 gap-1.5">
                {(isDaily ? DAILY_DATA_PRESETS : TOTAL_DATA_PRESETS).map((gb) => {
                  const count = isDaily
                    ? planCounts.dailyData[gb] ?? 0
                    : planCounts.totalData[gb] ?? 0;
                  const isSelected = activeDataPreset === gb;
                  const label = isDaily ? `${gb}GB/d` : `${gb}GB+`;

                  return (
                    <button
                      key={gb}
                      type="button"
                      onClick={() => handleDataPresetClick(gb)}
                      disabled={count === 0}
                      className={cn(
                        "inline-flex h-[30px] items-center justify-between rounded-full border px-2.5 py-1 text-xs font-medium transition-all active:scale-95",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-xs hover:bg-primary/95 font-semibold"
                          : "border-border/70 bg-background text-foreground/80 hover:border-foreground/20 hover:bg-muted/40",
                        count === 0 &&
                          "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground hover:bg-background",
                      )}
                      aria-label={`Filter by ${label}`}
                    >
                      <span className="truncate">{label}</span>
                      {isSelected ? (
                        <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                      ) : (
                        <span
                          className={cn(
                            "text-[9px] font-medium px-1.5 py-0.2 rounded-full shrink-0 ml-1",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-muted text-muted-foreground/80",
                          )}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Unlimited Data Chip */}
                <button
                  type="button"
                  onClick={() => {
                    startTransition(() => {
                      if (!unlimited) {
                        setLocalDataRange([0, dataSliderMax]);
                        setMinData(null);
                        setMaxData(null);
                        setDailyMinData(null);
                        setDailyMaxData(null);
                        setUnlimited(true);
                      } else {
                        setUnlimited(false);
                      }
                    });
                  }}
                  disabled={planCounts.unlimited === 0}
                  className={cn(
                    "inline-flex h-[30px] items-center justify-between rounded-full border px-2.5 py-1 text-xs font-medium transition-all active:scale-95",
                    isDaily && "col-span-2",
                    unlimited
                      ? "border-primary bg-primary text-primary-foreground shadow-xs hover:bg-primary/95 font-semibold"
                      : "border-border/70 bg-background text-foreground/80 hover:border-foreground/20 hover:bg-muted/40",
                    planCounts.unlimited === 0 &&
                      "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground hover:bg-background",
                  )}
                  aria-label="Filter by Unlimited Data"
                >
                  <span className="truncate">Unlimited</span>
                  {unlimited ? (
                    <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                  ) : (
                    <span
                      className={cn(
                        "text-[9px] font-medium px-1.5 py-0.2 rounded-full shrink-0 ml-1",
                        unlimited
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground/80",
                      )}
                    >
                      {planCounts.unlimited}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Slider Row (Now placed BELOW the chips, aligned across all cards) */}
            <div className="pt-3 mt-3 border-t border-border/50">
              <SliderPrimitive.Root
                value={localDataRange}
                onValueChange={handleDataSliderChange}
                onValueCommit={handleDataSliderCommit}
                min={0}
                max={dataSliderMax}
                step={isDaily ? 0.5 : 1}
                className="relative flex w-full touch-none select-none items-center py-2"
                aria-label="Data range slider"
              >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
                  <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  aria-label="Minimum data"
                  className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
                <SliderPrimitive.Thumb
                  aria-label="Maximum data"
                  className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
              </SliderPrimitive.Root>
              <div className="flex items-center justify-between text-[11px] pt-1 font-medium text-muted-foreground">
                <span>0 GB</span>
                <span>{isDaily ? "10 GB+/day" : "50 GB+"}</span>
              </div>
            </div>
          </div>

          {/* ── COLUMN 2: DURATION / VALIDITY ── */}
          <div className="flex flex-col justify-between py-4 first:pt-0 last:pb-0 lg:py-0 lg:px-6 first:lg:pl-0 last:lg:pr-0">
            <div className="flex flex-col gap-3">
              {/* Header Row: Label on Left, Readout Badge on Right */}
              <div className="h-8 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Validity
                </span>

                {/* Readout Badge */}
                <div className="shrink-0 text-[11px]">
                  {validityStatusText ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 border border-primary/25 px-2 py-0.5 font-bold text-primary">
                      <span>Min:</span>
                      <span>{validityStatusText}</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground/60 font-medium">All Durations</span>
                  )}
                </div>
              </div>

              {/* Chips Grid (Symmetrical 3x2, placed ABOVE slider) */}
              <div className="grid grid-cols-3 gap-1.5">
                {DURATION_PRESETS.map((days) => {
                  const count = planCounts.duration[days] ?? 0;
                  const isSelected = activeDurationPreset === days;

                  return (
                    <button
                      key={days}
                      type="button"
                      onClick={() => handleValidityPresetClick(days)}
                      disabled={count === 0}
                      className={cn(
                        "inline-flex h-[30px] items-center justify-between rounded-full border px-2.5 py-1 text-xs font-medium transition-all active:scale-95",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-xs hover:bg-primary/95 font-semibold"
                          : "border-border/70 bg-background text-foreground/80 hover:border-foreground/20 hover:bg-muted/40",
                        count === 0 &&
                          "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground hover:bg-background",
                      )}
                      aria-label={`Filter by ${days}+ Days`}
                    >
                      <span className="truncate">{days}+ Days</span>
                      {isSelected ? (
                        <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                      ) : (
                        <span
                          className={cn(
                            "text-[9px] font-medium px-1.5 py-0.2 rounded-full shrink-0 ml-1",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-muted text-muted-foreground/80",
                          )}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* No Expiry Chip */}
                <button
                  type="button"
                  onClick={() => {
                    startTransition(() => {
                      if (!noExpiry) {
                        setLocalValidityRange([1, 90]);
                        setMinDuration(null);
                        setMaxDuration(null);
                        setNoExpiry(true);
                      } else {
                        setNoExpiry(false);
                      }
                    });
                  }}
                  disabled={planCounts.noExpiry === 0}
                  className={cn(
                    "inline-flex h-[30px] items-center justify-between rounded-full border px-2.5 py-1 text-xs font-medium transition-all active:scale-95",
                    noExpiry
                      ? "border-primary bg-primary text-primary-foreground shadow-xs hover:bg-primary/95 font-semibold"
                      : "border-border/70 bg-background text-foreground/80 hover:border-foreground/20 hover:bg-muted/40",
                    planCounts.noExpiry === 0 &&
                      "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground hover:bg-background",
                  )}
                  aria-label="Filter by No Expiry"
                >
                  <span className="truncate">No Expiry</span>
                  {noExpiry ? (
                    <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                  ) : (
                    <span
                      className={cn(
                        "text-[9px] font-medium px-1.5 py-0.2 rounded-full shrink-0 ml-1",
                        noExpiry
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground/80",
                      )}
                    >
                      {planCounts.noExpiry}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Slider Row (Now placed BELOW the chips, aligned across all cards) */}
            <div className="pt-3 mt-3 border-t border-border/50">
              <SliderPrimitive.Root
                value={localValidityRange}
                onValueChange={handleValiditySliderChange}
                onValueCommit={handleValiditySliderCommit}
                min={1}
                max={90}
                step={1}
                className="relative flex w-full touch-none select-none items-center py-2"
                aria-label="Trip duration range slider"
              >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
                  <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  aria-label="Minimum duration"
                  className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
                <SliderPrimitive.Thumb
                  aria-label="Maximum duration"
                  className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
              </SliderPrimitive.Root>
              <div className="flex items-center justify-between text-[11px] pt-1 font-medium text-muted-foreground">
                <span>1 Day</span>
                <span>90+ Days</span>
              </div>
            </div>
          </div>

          {/* ── COLUMN 3: PRICE ── */}
          <div className="flex flex-col justify-between py-4 first:pt-0 last:pb-0 lg:py-0 lg:px-6 first:lg:pl-0 last:lg:pr-0">
            <div className="flex flex-col gap-3">
              {/* Header Row: Label on Left, Readout Badge on Right */}
              <div className="h-8 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Price
                </span>

                {/* Readout Badge */}
                <div className="shrink-0 text-[11px]">
                  {priceStatusText ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 border border-primary/25 px-2 py-0.5 font-bold text-primary">
                      <span>Max:</span>
                      <span>{priceStatusText}</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground/60 font-medium">All Budgets</span>
                  )}
                </div>
              </div>

              {/* Chips Grid (Symmetrical 3x2, placed ABOVE slider) */}
              <div className="grid grid-cols-3 gap-1.5">
                {planCounts.free > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const isCurrentlyFree = maxPrice === 0;
                      startTransition(() => {
                        if (isCurrentlyFree) {
                          setLocalPriceRange([0, 100]);
                          setMinPrice(null);
                          setMaxPrice(null);
                        } else {
                          setLocalPriceRange([0, 0]);
                          setMinPrice(null);
                          setMaxPrice(0);
                        }
                      });
                    }}
                    className={cn(
                      "inline-flex h-[30px] items-center justify-between rounded-full border px-2.5 py-1 text-xs font-medium transition-all active:scale-95",
                      maxPrice === 0
                        ? "border-primary bg-primary text-primary-foreground shadow-xs hover:bg-primary/95 font-semibold"
                        : "border-border/70 bg-background text-foreground/80 hover:border-foreground/20 hover:bg-muted/40",
                    )}
                    aria-label="Filter by Free Plans"
                  >
                    <span className="truncate">Free</span>
                    {maxPrice === 0 ? (
                      <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                    ) : (
                      <span
                        className={cn(
                          "text-[9px] font-medium px-1.5 py-0.2 rounded-full shrink-0 ml-1",
                          maxPrice === 0
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground/80",
                        )}
                      >
                        {planCounts.free}
                      </span>
                    )}
                  </button>
                )}

                {PRICE_PRESETS.slice(0, planCounts.free > 0 ? 5 : 6).map((amt) => {
                  const count = planCounts.price[amt] ?? 0;
                  const isSelected =
                    activePricePreset === amt &&
                    localPriceRange[0] === 0 &&
                    maxPrice !== 0;

                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handlePricePresetClick(amt)}
                      disabled={count === 0}
                      className={cn(
                        "inline-flex h-[30px] items-center justify-between rounded-full border px-2.5 py-1 text-xs font-medium transition-all active:scale-95",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-xs hover:bg-primary/95 font-semibold"
                          : "border-border/70 bg-background text-foreground/80 hover:border-foreground/20 hover:bg-muted/40",
                        count === 0 &&
                          "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground hover:bg-background",
                      )}
                      aria-label={`Filter by Under $${amt}`}
                    >
                      <span className="truncate">Under ${amt}</span>
                      {isSelected ? (
                        <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                      ) : (
                        <span
                          className={cn(
                            "text-[9px] font-medium px-1.5 py-0.2 rounded-full shrink-0 ml-1",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-muted text-muted-foreground/80",
                          )}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider Row (Now placed BELOW the chips, aligned across all cards) */}
            <div className="pt-3 mt-3 border-t border-border/50">
              <SliderPrimitive.Root
                value={localPriceRange}
                onValueChange={handlePriceSliderChange}
                onValueCommit={handlePriceSliderCommit}
                min={0}
                max={100}
                step={1}
                className="relative flex w-full touch-none select-none items-center py-2"
                aria-label="Price range slider"
              >
                <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
                  <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  aria-label="Minimum price"
                  className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
                <SliderPrimitive.Thumb
                  aria-label="Maximum price"
                  className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
              </SliderPrimitive.Root>
              <div className="flex items-center justify-between text-[11px] pt-1 font-medium text-muted-foreground">
                <span>$0</span>
                <span>$100+</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM ACTIONS: Advanced Filters (Left), Applied Filters, Reset All (Right) ── */}
        <div className="mt-5 border-t border-border/60 pt-3.5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Advanced Filters Button + Applied Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAdvancedModalOpen(true)}
                className={cn(
                  "inline-flex min-h-[34px] items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 shadow-2xs",
                  advancedFilterCount > 0
                    ? "border-primary bg-primary/10 text-primary hover:bg-primary/15"
                    : "border-border/70 bg-background hover:bg-muted/40 text-foreground hover:border-foreground/30",
                )}
                aria-label="Open Advanced Filters"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                <span>Advanced Filters</span>
                {advancedFilterCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-xs">
                    {advancedFilterCount}
                  </span>
                )}
              </button>

              {(activeFilterCount > 0 || unlimited || noExpiry || maxPrice === 0) && (
                <>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground mr-0.5 ml-1">
                    <Filter className="h-3 w-3 text-primary" />
                    <span>Active:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                  {/* Data Range Pill / Unlimited Pill (Brand Orange) */}
                  {unlimited ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>Data: Unlimited</span>
                      <button
                        type="button"
                        onClick={() => setUnlimited(false)}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove unlimited data filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : (
                    dataStatusText && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
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
                          className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                          aria-label="Remove data filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )
                  )}

                  {/* Validity Pill / No Expiry Pill (Duration Filter) */}
                  {noExpiry ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>Duration: No Expiry</span>
                      <button
                        type="button"
                        onClick={() => setNoExpiry(false)}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove no expiry filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : (
                    validityStatusText && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                        <span>Duration: {validityStatusText}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setLocalValidityRange([1, 90]);
                            startTransition(() => {
                              setMinDuration(null);
                              setMaxDuration(null);
                            });
                          }}
                          className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                          aria-label="Remove duration filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )
                  )}

                  {/* Price Pill / Free Pill (Price Filter) */}
                  {maxPrice === 0 ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>Price: Free ($0)</span>
                      <button
                        type="button"
                        onClick={() => {
                          setLocalPriceRange([0, 100]);
                          startTransition(() => {
                            setMinPrice(null);
                            setMaxPrice(null);
                          });
                        }}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove free price filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : (
                    priceStatusText && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
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
                          className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                          aria-label="Remove price filter"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )
                  )}

                  {/* Preferences / Toggles Pills */}
                  {hideThrottling && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>No Throttling</span>
                      <button
                        type="button"
                        onClick={() => setHideThrottling(false)}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove no throttling filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {hideSpeedLimits && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>Uncapped Speed</span>
                      <button
                        type="button"
                        onClick={() => setHideSpeedLimits(false)}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove uncapped speed filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {hideDailyCaps && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>No Daily Caps</span>
                      <button
                        type="button"
                        onClick={() => setHideDailyCaps(false)}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove no daily caps filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {hideSubscriptions && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>Prepaid Only</span>
                      <button
                        type="button"
                        onClick={() => setHideSubscriptions(false)}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove prepaid only filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {packageCategory === "data-voice" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <PhoneCall className="h-3 w-3" />
                      <span>Data + Voice</span>
                      <button
                        type="button"
                        onClick={() => setPackageCategory("data-only")}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove data and voice filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {onlyHotspot && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>Hotspot Supported</span>
                      <button
                        type="button"
                        onClick={() => setOnlyHotspot(false)}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove hotspot filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {onlyLocalBreakout && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>Low Latency / Local IP</span>
                      <button
                        type="button"
                        onClick={() => setOnlyLocalBreakout(false)}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove low latency filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {onlyPromo && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary">
                      <span>Discounted Only</span>
                      <button
                        type="button"
                        onClick={() => setOnlyPromo(false)}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label="Remove discounted only filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}

                  {/* Carrier Networks Pills */}
                  {networks.map((net) => (
                    <span
                      key={net}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary"
                    >
                      <span>Network: {net}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = networks.filter((n) => n !== net);
                          setNetworks(next.length === 0 ? [] : next);
                        }}
                        className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                        aria-label={`Remove ${net} network filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}

                  {/* Providers Pills */}
                  {providers.map((slug) => {
                    const prov = allProviders.find((p) => p.slug === slug);
                    return (
                      <span
                        key={slug}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary"
                      >
                        <span>Provider: {prov?.name ?? slug}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = providers.filter((p) => p !== slug);
                            setProviders(next.length === 0 ? [] : next);
                          }}
                          className="rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                          aria-label={`Remove ${prov?.name ?? slug} provider filter`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </>
            )}
          </div>

            {/* Right: Reset All Action */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={handleClearAll}
                disabled={activeFilterCount === 0 && !unlimited && !noExpiry && maxPrice !== 0}
                className={cn(
                  "inline-flex min-h-[34px] items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 shadow-2xs",
                  activeFilterCount > 0 || unlimited || noExpiry || maxPrice === 0
                    ? "border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary cursor-pointer"
                    : "border-border/60 text-muted-foreground/40 cursor-not-allowed opacity-50",
                )}
                aria-label="Reset all filters"
              >
                <RotateCcw className="h-3.5 w-3.5 text-primary" />
                <span>Reset All</span>
                {(activeFilterCount > 0 || unlimited || noExpiry || maxPrice === 0) && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-xs">
                    {(activeFilterCount || 0) + (unlimited ? 1 : 0) + (noExpiry ? 1 : 0) + (maxPrice === 0 ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Advanced Filters Dialog Modal / Mobile Drawer ── */}
      <AdvancedFiltersDialog
        open={isAdvancedModalOpen}
        onOpenChange={setIsAdvancedModalOpen}
        filters={filters}
      />

      {/* ── SEPARATE SORTING & RESULT CONTROLS TOOLBAR ── */}
      <div className="rounded-2xl border border-border/80 bg-card p-3 sm:px-5 sm:py-3.5 shadow-2xs">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Left: Sort By Controls */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground shrink-0 mr-1">
              <ArrowUpDown className="h-3.5 w-3.5" />
              <span>SORT:</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {SORT_OPTIONS.map((opt) => {
                const isActive = sort === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => startTransition(() => setSort(opt.value))}
                    className={cn(
                      "inline-flex min-h-[36px] items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all active:scale-95 shadow-2xs whitespace-nowrap",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-xs [&_svg]:text-primary-foreground"
                        : "border-border/80 bg-background text-foreground/80 hover:bg-muted/70 hover:text-foreground [&_svg]:text-primary",
                    )}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Apply Promo Codes & Results Count */}
          <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-2.5 md:border-t-0 md:pt-0">
            <div className="hidden lg:block h-4 w-px bg-border/80" />

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                Apply Promo Codes
              </span>
              <Switch
                checked={applyPromo}
                onCheckedChange={(checked) =>
                  startTransition(() => setApplyPromo(checked))
                }
                className="data-[state=checked]:bg-primary"
                aria-label="Toggle promo codes"
              />
            </label>

            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground border-l border-border/70 pl-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span>
                Showing <strong className="text-foreground">{filteredCount}</strong> of{" "}
                {totalCount} plans
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
