"use client";

import { cn } from "@/lib/utils";
import {
  SortOption,
  type UsePackageFiltersReturn,
} from "@/lib/hooks/use-package-filters";
import { Filter, Flame } from "lucide-react";
import MoreFiltersPopover from "./MoreFiltersPopover";

type Props = {
  filters: UsePackageFiltersReturn;
};

const SORT_OPTIONS: {
  value: SortOption;
  label: string;
  icon?: React.ReactNode;
}[] = [
  { value: "cheapest", label: "Cheapest" },
  {
    value: "best-value",
    label: "Best price/GB",
    icon: <Flame className="h-3.5 w-3.5" />,
  },
  { value: "most-data", label: "Largest GB" },
  { value: "longest", label: "Longest validity" },
];

const DURATION_PRESETS = [7, 14, 21, 30];

export default function SortFilterToolbar({ filters }: Props) {
  const {
    sort,
    duration,
    setSort,
    setDuration,
    totalCount,
    filteredCount,
    uniqueProviderCount: uniqueProviders,
    activeFilterCount,
  } = filters;

  return (
    <div className="space-y-4">
      {/* Top row: Stats + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Stats */}
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {uniqueProviders}
          </span>{" "}
          providers &{" "}
          <span className="font-semibold text-foreground">{totalCount}</span>{" "}
          data plans
          {filteredCount !== totalCount && (
            <span className="ml-1 text-xs">({filteredCount} shown)</span>
          )}
        </p>

        {/* Sort buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <div className="flex gap-1">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                  sort === opt.value
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Duration presets + More Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Duration presets */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Filter by travel duration:
          </span>
          <div className="flex gap-1.5">
            {DURATION_PRESETS.map((days) => (
              <button
                key={days}
                onClick={() => setDuration(duration === days ? null : days)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                  duration === days
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {days}+ Days Trip
                {duration === days && <span className="ml-1">✕</span>}
              </button>
            ))}
          </div>
        </div>

        {/* More Filters */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">More Filters:</span>
          <MoreFiltersPopover filters={filters}>
            <button
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                activeFilterCount > 0
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Filter className="h-3.5 w-3.5" />
              Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
            </button>
          </MoreFiltersPopover>
        </div>
      </div>
    </div>
  );
}
