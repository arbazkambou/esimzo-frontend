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
      {/* ── Main Filter Container (Matching Reference Design) ── */}
      <section
        aria-label="eSIM Plan Filters"
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-4 sm:p-6 md:p-7 shadow-xs transition-shadow"
      >
        {/* Header: Icon + Title/Subtitle + Advanced Filters Trigger */}
        <div className="flex flex-col gap-3.5 pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:border-b sm:border-border/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                Filter & Customize Plans
              </h2>
              <p className="text-xs text-muted-foreground line-clamp-1 sm:line-clamp-none">
                Choose data allowance, trip duration, and price to find your best match
              </p>
            </div>
          </div>

          {/* Advanced Filters Button (Mobile-First: Min ~44px height, easy to tap with one hand) */}
          <button
            type="button"
            onClick={() => setIsAdvancedModalOpen(true)}
            className={cn(
              "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl sm:rounded-full border px-4 py-2.5 text-xs font-semibold transition-all active:scale-95 shadow-2xs w-full sm:w-auto",
              advancedFilterCount > 0
                ? "border-primary bg-primary/10 text-primary hover:bg-primary/15"
                : "border-primary/40 bg-background hover:bg-primary/5 text-primary hover:border-primary",
            )}
            aria-label="Open Advanced Filters"
          >
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span>Advanced Filters</span>
            {advancedFilterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-xs">
                {advancedFilterCount}
              </span>
            )}
            <ChevronDown className="h-3.5 w-3.5 text-primary opacity-80" />
          </button>
        </div>

        {/* ── Main Filters: 3 Cards (Data, Duration, Price) ── */}
        <div className="grid grid-cols-1 gap-4 pt-2 sm:pt-6 lg:grid-cols-3 lg:gap-5">
          {/* ── CARD 1: DATA ── */}
          <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-border/70 bg-muted/20 p-4 sm:p-5 transition-colors hover:border-border hover:bg-muted/30">
            <div>
              {/* Card Header: Icon, Label, Status (matching Card 2 & 3) */}
              <div className="flex items-center justify-between gap-2 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-background border border-border/60 text-primary shadow-2xs">
                    <Wifi className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Data
                  </span>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>
                    {dataStatusText ??
                      (packageCategory === "data-voice"
                        ? "Data + Voice"
                        : packageCategory === "data-only"
                          ? "Data Only"
                          : "Any Data")}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </div>
              </div>

              {/* Categorized Tabs: Data Only vs Data + Voice (Only shown if page has voice plans) */}
              {planCounts.dataVoice > 0 && (
                <div className="grid grid-cols-2 p-1 bg-background border border-border/70 rounded-xl shadow-2xs mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      startTransition(() => {
                        setPackageCategory("data-only");
                      });
                    }}
                    className={cn(
                      "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all min-h-[34px]",
                      packageCategory === "data-only"
                        ? "bg-primary text-primary-foreground shadow-xs [&_svg]:text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40 [&_svg]:text-primary",
                    )}
                    aria-label="Filter Data Only packages"
                  >
                    <Wifi className="h-3.5 w-3.5" />
                    <span>Data Only</span>
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5",
                        packageCategory === "data-only"
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {planCounts.dataOnly}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      startTransition(() => {
                        setPackageCategory("data-voice");
                      });
                    }}
                    className={cn(
                      "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all min-h-[34px]",
                      packageCategory === "data-voice"
                        ? "bg-primary text-primary-foreground shadow-xs [&_svg]:text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40 [&_svg]:text-primary",
                    )}
                    aria-label="Filter Data + Voice packages"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>Data + Voice</span>
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5",
                        packageCategory === "data-voice"
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {planCounts.dataVoice}
                    </span>
                  </button>
                </div>
              )}

              {/* Subheader: Allowance Label on Left, Total/Daily Switch on Right */}
              <div className="flex items-center justify-between text-xs pb-2.5">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Allowance
                </span>

                <div className="inline-flex rounded-full bg-background p-0.5 border border-border/70 text-xs font-medium shadow-2xs">
                  <button
                    type="button"
                    onClick={() => handleModeChange("total")}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 transition-all text-[11px] font-semibold min-h-[26px]",
                      !isDaily
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Total
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange("daily")}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 transition-all text-[11px] font-semibold min-h-[26px]",
                      isDaily
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Daily
                  </button>
                </div>
              </div>

              {/* Data Filter Chips (3-Column Symmetrical Grid) */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pb-4">
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
                        "inline-flex min-h-[38px] items-center justify-between rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all active:scale-95",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-xs"
                          : "border-border/70 bg-background text-foreground/80 hover:border-primary/50 hover:bg-card hover:text-foreground",
                        count === 0 &&
                          "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground",
                      )}
                      aria-label={`Filter by ${label}`}
                    >
                      <span className="truncate">{label}</span>
                      {isSelected ? (
                        <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                      ) : (
                        <span
                          className={cn(
                            "text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ml-1",
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
                    "inline-flex min-h-[38px] items-center justify-between rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all active:scale-95",
                    isDaily && "col-span-2",
                    unlimited
                      ? "border-primary bg-primary text-primary-foreground shadow-xs"
                      : "border-border/70 bg-background text-foreground/80 hover:border-primary/50 hover:bg-card hover:text-foreground",
                    planCounts.unlimited === 0 &&
                      "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground",
                  )}
                  aria-label="Filter by Unlimited Data"
                >
                  <span className="truncate">Unlimited</span>
                  {unlimited ? (
                    <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                  ) : (
                    <span
                      className={cn(
                        "text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ml-1",
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

            {/* Data Range Slider */}
            <div className="pt-2 border-t border-border/40">
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
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border/70">
                  <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  aria-label="Minimum data"
                  className="block h-4.5 w-4.5 rounded-full border-2 border-primary bg-background shadow-xs transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
                <SliderPrimitive.Thumb
                  aria-label="Maximum data"
                  className="block h-4.5 w-4.5 rounded-full border-2 border-primary bg-background shadow-xs transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
              </SliderPrimitive.Root>
              <div className="flex justify-between text-[11px] font-medium text-muted-foreground pt-0.5">
                <span>0 GB</span>
                <span>{isDaily ? "10 GB+/day" : "50 GB+"}</span>
              </div>
            </div>
          </div>

          {/* ── CARD 2: DURATION ── */}
          <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-border/70 bg-muted/20 p-4 sm:p-5 transition-colors hover:border-border hover:bg-muted/30">
            <div>
              {/* Card Header: Icon, Label, Any Trip Trigger */}
              <div className="flex items-center justify-between gap-2 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-background border border-border/60 text-primary shadow-2xs">
                    <Calendar className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Duration
                  </span>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{validityStatusText ?? "Any Trip"}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </div>
              </div>

              {/* Subheader Spacer */}
              <div className="flex items-center justify-between text-xs pb-2.5">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Quick Select
                </span>
                {validityStatusText && (
                  <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    {validityStatusText}
                  </span>
                )}
              </div>

              {/* Duration Filter Chips (3-Column Symmetrical Grid matching Data card) */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pb-4">
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
                        "inline-flex min-h-[38px] items-center justify-between rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all active:scale-95",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-xs"
                          : "border-border/70 bg-background text-foreground/80 hover:border-primary/50 hover:bg-card hover:text-foreground",
                        count === 0 &&
                          "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground",
                      )}
                      aria-label={`Filter by ${days}+ Days`}
                    >
                      <span className="truncate">{days}+ Days</span>
                      {isSelected ? (
                        <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                      ) : (
                        <span
                          className={cn(
                            "text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ml-1",
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

                {/* No Expiry Chip (Spans 2 columns to complete Row 2 perfectly) */}
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
                    "inline-flex min-h-[38px] items-center justify-between rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all active:scale-95 col-span-2",
                    noExpiry
                      ? "border-primary bg-primary text-primary-foreground shadow-xs"
                      : "border-border/70 bg-background text-foreground/80 hover:border-primary/50 hover:bg-card hover:text-foreground",
                    planCounts.noExpiry === 0 &&
                      "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground",
                  )}
                  aria-label="Filter by No Expiry"
                >
                  <span className="truncate">No Expiry</span>
                  {noExpiry ? (
                    <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                  ) : (
                    <span
                      className={cn(
                        "text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ml-1",
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

            {/* Duration Range Slider */}
            <div className="pt-2 border-t border-border/40">
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
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border/70">
                  <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  aria-label="Minimum duration"
                  className="block h-4.5 w-4.5 rounded-full border-2 border-primary bg-background shadow-xs transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
                <SliderPrimitive.Thumb
                  aria-label="Maximum duration"
                  className="block h-4.5 w-4.5 rounded-full border-2 border-primary bg-background shadow-xs transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
              </SliderPrimitive.Root>
              <div className="flex justify-between text-[11px] font-medium text-muted-foreground pt-0.5">
                <span>1 Day</span>
                <span>90+ Days</span>
              </div>
            </div>
          </div>

          {/* ── CARD 3: PRICE ── */}
          <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-border/70 bg-muted/20 p-4 sm:p-5 transition-colors hover:border-border hover:bg-muted/30">
            <div>
              {/* Card Header: Icon, Label, Any Price Trigger */}
              <div className="flex items-center justify-between gap-2 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-background border border-border/60 text-primary shadow-2xs">
                    <Tag className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Price
                  </span>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{priceStatusText ?? "Any Price"}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </div>
              </div>

              {/* Subheader Spacer */}
              <div className="flex items-center justify-between text-xs pb-2.5">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Budget
                </span>
                {priceStatusText && (
                  <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    {priceStatusText}
                  </span>
                )}
              </div>

              {/* Price Filter Chips (Grid matching Data card) */}
              <div
                className={cn(
                  "grid gap-1.5 sm:gap-2 pb-4",
                  planCounts.free > 0 ? "grid-cols-3" : "grid-cols-2",
                )}
              >
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
                      "inline-flex min-h-[38px] items-center justify-between rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all active:scale-95",
                      maxPrice === 0
                        ? "border-primary bg-primary text-primary-foreground shadow-xs"
                        : "border-border/70 bg-background text-foreground/80 hover:border-primary/50 hover:bg-card hover:text-foreground",
                    )}
                    aria-label="Filter by Free Plans"
                  >
                    <span className="truncate">Free</span>
                    {maxPrice === 0 ? (
                      <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                    ) : (
                      <span
                        className={cn(
                          "text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ml-1",
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

                {PRICE_PRESETS.map((amt, idx) => {
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
                        "inline-flex min-h-[38px] items-center justify-between rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all active:scale-95",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-xs"
                          : "border-border/70 bg-background text-foreground/80 hover:border-primary/50 hover:bg-card hover:text-foreground",
                        count === 0 &&
                          "cursor-not-allowed opacity-35 hover:border-border hover:text-muted-foreground",
                        planCounts.free > 0 &&
                          idx === PRICE_PRESETS.length - 1 &&
                          "col-span-2",
                      )}
                      aria-label={`Filter by Under $${amt}`}
                    >
                      <span className="truncate">Under ${amt}</span>
                      {isSelected ? (
                        <X className="h-3 w-3 text-primary-foreground shrink-0 ml-1" />
                      ) : (
                        <span
                          className={cn(
                            "text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ml-1",
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

            {/* Price Range Slider */}
            <div className="pt-2 border-t border-border/40">
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
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border/70">
                  <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  aria-label="Minimum price"
                  className="block h-4.5 w-4.5 rounded-full border-2 border-primary bg-background shadow-xs transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
                <SliderPrimitive.Thumb
                  aria-label="Maximum price"
                  className="block h-4.5 w-4.5 rounded-full border-2 border-primary bg-background shadow-xs transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing"
                />
              </SliderPrimitive.Root>
              <div className="flex justify-between text-[11px] font-medium text-muted-foreground pt-0.5">
                <span>$0</span>
                <span>$100+</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── APPLIED FILTERS (Placed Below Filter Cards as Requested) ── */}
        <div className="mt-6 border-t border-border/60 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Filter Funnel Icon + Applied Filters Label & Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground shrink-0 mr-1">
                <Filter className="h-4 w-4 text-primary" />
                <span>Applied Filters:</span>
              </div>

              {activeFilterCount === 0 && !unlimited && !noExpiry && maxPrice !== 0 ? (
                <span className="text-xs text-muted-foreground/70 italic">
                  No filters applied
                </span>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {/* Data Range Pill / Unlimited Pill */}
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

                  {/* Validity Pill / No Expiry Pill */}
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

                  {/* Price Pill / Free Pill */}
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
              )}
            </div>

            {/* Right: Clear All & Reset Filters Button (Positioned at END of filter component) */}
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              {(activeFilterCount > 0 || unlimited || noExpiry || maxPrice === 0) && (
                <>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    Clear All
                  </button>
                  <span className="text-border h-4 w-px bg-border hidden sm:block" />
                </>
              )}

              {/* Reset Filters Pill Button matching Reference Design */}
              <button
                type="button"
                onClick={handleClearAll}
                disabled={activeFilterCount === 0 && !unlimited && !noExpiry && maxPrice !== 0}
                className={cn(
                  "inline-flex min-h-[38px] items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all active:scale-95 shadow-2xs",
                  activeFilterCount > 0 || unlimited || noExpiry || maxPrice === 0
                    ? "border-primary/50 text-primary hover:bg-primary/5 hover:border-primary cursor-pointer"
                    : "border-border/60 text-muted-foreground/40 cursor-not-allowed opacity-50",
                )}
                aria-label="Reset all filters"
              >
                <RotateCcw className="h-3.5 w-3.5 text-primary" />
                <span>Reset Filters</span>
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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
