"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMbps } from "@/lib/city-networks/derive-view-model";
import type { CityNetworkCard } from "@/lib/city-networks/types";
import { cn } from "@/lib/utils";

type Props = {
  card: CityNetworkCard;
  highlightedNetwork: string | null;
};

export default function CityNetworkCardView({
  card,
  highlightedNetwork,
}: Props) {
  const isHighlighted =
    highlightedNetwork != null &&
    highlightedNetwork.toLowerCase() === card.fastest.toLowerCase();

  const topHighlights = card.highlights.slice(0, 2);
  const restHighlights = card.highlights.slice(2);

  return (
    <article
      id={card.anchor}
      className={cn(
        "flex h-full flex-col gap-4 rounded-2xl border bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:p-5 dark:bg-card",
        isHighlighted
          ? "border-2 border-primary bg-primary-soft dark:bg-primary/10"
          : "border-slate-200/80 dark:border-slate-800",
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold leading-snug text-foreground sm:text-[15px] dark:text-white">
          {card.city}
        </h3>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
            card.closeRace
              ? "border border-slate-200/80 bg-muted text-text-secondary dark:border-slate-700"
              : "border border-primary/20 bg-primary-soft text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary",
          )}
        >
          {card.badgeLabel}
        </span>
      </header>

      <div>
        <p className="text-[11px] font-bold tracking-wide text-text-secondary sm:text-xs">
          Fastest network
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-sm font-extrabold text-foreground sm:text-[15px] dark:text-white">
            {card.fastest}
          </span>
          <span className="text-sm font-extrabold tabular text-foreground sm:text-[15px] dark:text-white">
            {formatMbps(card.downloadMbps)}{" "}
            <span className="text-[11px] font-medium text-text-secondary sm:text-xs">
              Mbps
            </span>
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary sm:text-[13.5px]">
          {card.comparisonText}
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {card.bars.map((bar) => (
          <li key={bar.name} className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2 text-xs sm:text-[13.5px]">
              <span
                className={cn(
                  "font-semibold",
                  bar.isFastest
                    ? "text-foreground dark:text-white"
                    : "text-text-secondary",
                )}
              >
                {bar.name}
              </span>
              <span className="tabular text-text-secondary">
                {formatMbps(bar.mbps)} Mbps
              </span>
            </div>
            <span
              className="block h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              aria-hidden="true"
            >
              <span
                className={cn(
                  "block h-full rounded-full",
                  bar.isFastest ? "bg-primary" : "bg-brand-navy/25",
                )}
                style={{ width: `${bar.percent}%` }}
              />
            </span>
          </li>
        ))}
      </ul>

      {topHighlights.length > 0 ? (
        <div
          className={cn(
            "grid gap-2",
            topHighlights.length === 1 ? "grid-cols-1" : "grid-cols-2",
          )}
        >
          {topHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200/80 bg-muted/50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900/30"
            >
              <p className="text-[11px] text-text-secondary sm:text-xs">
                {item.label}
              </p>
              <p className="mt-0.5 text-xs font-bold text-foreground sm:text-[13.5px] dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {restHighlights.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-200/80 bg-muted/50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900/30"
        >
          <p className="text-[11px] text-text-secondary sm:text-xs">
            {item.label}
          </p>
          <p className="mt-0.5 text-xs font-bold text-foreground sm:text-[13.5px] dark:text-white">
            {item.value}
          </p>
        </div>
      ))}

      <div className="mt-auto flex flex-col gap-2 pt-1">
        <Button asChild className="w-full">
          <Link href={card.ctaHref}>
            {card.ctaLabel}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </Button>
        <p className="text-[11px] text-text-secondary sm:text-xs">
          {card.source} · {card.period} · download speed
        </p>
      </div>
    </article>
  );
}
