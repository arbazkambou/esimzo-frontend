"use client";

import { cn } from "@/lib/utils";
import {
  SortOption,
  type UsePackageFiltersReturn,
} from "@/lib/hooks/use-package-filters";
import { Check, Filter, Flame } from "lucide-react";
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
    icon: <Flame className="h-3.5 w-3.5" strokeWidth={1.75} />,
  },
  { value: "most-data", label: "Largest GB" },
  { value: "longest", label: "Longest validity" },
];

const DURATION_PRESETS = [7, 14, 21, 30];

const chipBase =
  "inline-flex items-center gap-1.5 min-h-9 rounded-sm border px-3 py-1.5 text-body-sm font-medium transition-[color,background-color,border-color] duration-[var(--transition-fast)] focus-visible:shadow-[var(--focus-ring)]";

const chipIdle =
  "border-border bg-surface text-text-secondary hover:border-border-strong";

const chipSelected =
  "border-primary bg-primary-soft text-primary-text";

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-body-sm text-text-muted" aria-live="polite">
          <span className="font-semibold text-text-primary tabular">
            {uniqueProviders}
          </span>{" "}
          providers &{" "}
          <span className="font-semibold text-text-primary tabular">
            {totalCount}
          </span>{" "}
          data plans
          {filteredCount !== totalCount && (
            <span className="ml-1 text-caption">({filteredCount} shown)</span>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-label text-text-muted">Sort:</span>
          <div className="flex flex-wrap gap-1.5">
            {SORT_OPTIONS.map((opt) => {
              const selected = sort === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  aria-pressed={selected}
                  className={cn(chipBase, selected ? chipSelected : chipIdle)}
                >
                  {selected && (
                    <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  )}
                  {opt.icon}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-label text-text-muted">Travel duration:</span>
          <div className="flex flex-wrap gap-1.5">
            {DURATION_PRESETS.map((days) => {
              const selected = duration === days;
              return (
                <button
                  key={days}
                  onClick={() => setDuration(duration === days ? null : days)}
                  aria-pressed={selected}
                  className={cn(chipBase, selected ? chipSelected : chipIdle)}
                >
                  {selected && (
                    <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  )}
                  {days}+ days
                </button>
              );
            })}
          </div>
        </div>

        <MoreFiltersPopover filters={filters}>
          <button
            className={cn(
              chipBase,
              activeFilterCount > 0 ? chipSelected : chipIdle,
              "min-h-11"
            )}
            aria-pressed={activeFilterCount > 0}
          >
            <Filter className="h-3.5 w-3.5" strokeWidth={1.75} />
            Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
          </button>
        </MoreFiltersPopover>
      </div>
    </div>
  );
}
