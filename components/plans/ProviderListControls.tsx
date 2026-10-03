"use client";

import { useTransition } from "react";
import {
  ArrowUpDown,
  Flag,
  Flame,
  Globe2,
  Layers3,
  Package,
  Sparkles,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/lib/plans/sort-plans";

const SORT_OPTIONS: {
  value: SortOption;
  label: string;
  shortLabel: string;
  icon?: React.ReactNode;
}[] = [
  { value: "cheapest", label: "Cheapest", shortLabel: "Cheap" },
  {
    value: "best-value",
    label: "Best Value",
    shortLabel: "Value",
    icon: (
      <Flame
        className="hidden size-3.5 sm:inline"
        strokeWidth={1.75}
        aria-hidden
      />
    ),
  },
  { value: "most-data", label: "Most Data", shortLabel: "Data" },
  { value: "longest", label: "Longest Trip", shortLabel: "Long" },
];

const COVERAGE_TABS = [
  {
    value: "all" as const,
    label: "All plans",
    shortLabel: "All",
    icon: <Layers3 className="size-3.5" strokeWidth={1.75} />,
  },
  {
    value: "single" as const,
    label: "Single-country",
    shortLabel: "Single",
    icon: <Flag className="size-3.5" strokeWidth={1.75} />,
  },
  {
    value: "multi" as const,
    label: "Multi-country",
    shortLabel: "Multi",
    icon: <Globe2 className="size-3.5" strokeWidth={1.75} />,
  },
];

type CoverageTab = "all" | "single" | "multi";

type Props = {
  tab: CoverageTab;
  onTabChange: (tab: CoverageTab) => void;
  counts: { all: number; single: number; multi: number };
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  applyPromo: boolean;
  onApplyPromoChange: (value: boolean) => void;
  /** Only show the promo toggle when this provider has a promo code. */
  hasProviderPromo?: boolean;
  filteredCount: number;
  totalCount: number;
};

const trackClass =
  "flex w-full gap-1 rounded-xl bg-muted p-1 ring-1 ring-border/60";

const countBadgeClass =
  "inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-card px-1.5 text-[11px] font-bold tabular text-text-secondary group-data-[state=active]/tab:bg-primary-foreground/20 group-data-[state=active]/tab:text-primary-foreground";

/**
 * One control card: coverage + sort share the same track/chip language.
 */
export function ProviderListControls({
  tab,
  onTabChange,
  counts,
  sort,
  onSortChange,
  applyPromo,
  onApplyPromoChange,
  hasProviderPromo = false,
  filteredCount,
  totalCount,
}: Props) {
  const [, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-card">
      <Tabs
        value={tab}
        onValueChange={(value) => onTabChange(value as CoverageTab)}
        className="w-full min-w-0"
      >
        <TabsList
          variant="pill"
          className={cn(trackClass, "ring-border/60")}
        >
          {COVERAGE_TABS.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="min-h-9 min-w-0 flex-1 gap-1.5 rounded-lg px-2 py-2 text-xs sm:gap-1.5 sm:px-3 sm:text-sm [&_svg]:text-primary-text data-[state=active]:[&_svg]:text-primary-foreground"
            >
              {item.icon}
              <span className="truncate sm:hidden">{item.shortLabel}</span>
              <span className="hidden truncate sm:inline">{item.label}</span>
              <span className={cn(countBadgeClass, "hidden sm:inline-flex")}>
                {counts[item.value]}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:contents">
          <div className="flex items-center justify-between gap-2 px-1 sm:contents">
            <div className="flex shrink-0 items-center gap-1 text-caption font-bold uppercase tracking-wider text-text-secondary sm:px-1.5">
              <ArrowUpDown
                className="size-3.5 text-primary-text"
                strokeWidth={1.75}
                aria-hidden
              />
              <span>Sort</span>
            </div>
            {!hasProviderPromo ? (
              <p
                className="text-caption tabular text-text-secondary sm:hidden"
                aria-label={`Showing ${filteredCount} of ${totalCount} plans`}
              >
                <span className="font-semibold text-brand-navy">
                  {filteredCount}
                </span>
                {filteredCount !== totalCount ? (
                  <span className="text-text-muted">
                    {" "}
                    of{" "}
                    <span className="tabular">{totalCount}</span>
                  </span>
                ) : null}
                <span>
                  {" "}
                  {filteredCount === 1 ? "plan" : "plans"}
                </span>
              </p>
            ) : null}
          </div>
          <div
            role="group"
            aria-label="Sort plans"
            className={cn(trackClass, "min-w-0 flex-1 items-center")}
          >
            {SORT_OPTIONS.map((opt) => {
              const isActive = sort === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    startTransition(() => onSortChange(opt.value))
                  }
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex min-h-9 min-w-0 flex-1 basis-0 items-center justify-center gap-1 rounded-lg px-1 py-2 text-xs font-semibold transition-[color,background-color,box-shadow] active:scale-[0.98] sm:gap-1.5 sm:px-3 sm:text-sm",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-subtle [&_svg]:text-primary-foreground"
                      : "text-text-secondary hover:bg-card/80 hover:text-brand-navy [&_svg]:text-primary-text",
                  )}
                >
                  {opt.icon}
                  <span className="sm:hidden">{opt.shortLabel}</span>
                  <span className="hidden sm:inline">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {hasProviderPromo ? (
          <div className="flex min-h-11 shrink-0 items-center justify-between gap-3 rounded-xl bg-muted px-3 ring-1 ring-border/60 sm:min-h-0 sm:justify-center sm:gap-2 sm:bg-card sm:p-1 sm:px-2 sm:ring-0">
            <label className="flex min-w-0 flex-1 cursor-pointer select-none items-center gap-2.5 sm:flex-none sm:gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-text sm:size-auto sm:bg-transparent">
                <Sparkles className="size-3.5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0 flex-1 sm:flex-none">
                <span className="block text-sm font-semibold text-brand-navy">
                  Promo
                </span>
                <span className="block text-caption text-text-muted sm:hidden">
                  Apply discount prices
                </span>
              </span>
              <Switch
                checked={applyPromo}
                onCheckedChange={(checked) =>
                  startTransition(() => onApplyPromoChange(checked))
                }
                className="data-[state=checked]:bg-primary"
                aria-label="Toggle promo codes"
              />
            </label>
            <p
              className="shrink-0 rounded-md bg-card px-2.5 py-1.5 text-caption tabular ring-1 ring-border/60 sm:bg-transparent sm:px-1.5 sm:py-0 sm:text-sm sm:ring-0"
              aria-label={`${filteredCount} of ${totalCount} plans`}
            >
              <span className="font-semibold text-brand-navy">
                {filteredCount}
              </span>
              <span className="text-text-muted">/{totalCount}</span>
            </p>
          </div>
        ) : (
          <div className="hidden min-h-9 shrink-0 items-center justify-end gap-2 px-1.5 sm:flex">
            <Package
              className="size-3.5 shrink-0 text-primary-text"
              strokeWidth={1.75}
              aria-hidden
            />
            <p
              className="min-w-0 text-sm text-text-secondary"
              aria-label={`Showing ${filteredCount} of ${totalCount} plans`}
            >
              <span>Showing </span>
              <span className="font-semibold tabular text-brand-navy">
                {filteredCount}
              </span>
              {filteredCount !== totalCount ? (
                <span className="text-text-muted">
                  {" "}
                  of{" "}
                  <span className="tabular">{totalCount}</span>
                </span>
              ) : null}
              <span>
                {" "}
                {filteredCount === 1 ? "plan" : "plans"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
