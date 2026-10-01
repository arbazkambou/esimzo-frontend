"use client";

import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import CityNetworkCardView from "@/components/sections/city-networks/CityNetworkCardView";
import CityNetworkFaqTip from "@/components/sections/city-networks/CityNetworkFaqTip";
import { Input } from "@/components/ui/input";
import type {
  CityNetworksViewModel,
  CitySourceTab,
} from "@/lib/city-networks/types";
import { cn } from "@/lib/utils";

type Props = {
  data: CityNetworksViewModel;
};

export default function CityNetworksSection({ data }: Props) {
  const defaultTab: CitySourceTab = data.hasAnalytics
    ? "analytics"
    : "user";
  const [sourceTab, setSourceTab] = useState<CitySourceTab>(defaultTab);
  const [query, setQuery] = useState("");
  const [highlightedNetwork, setHighlightedNetwork] = useState<string | null>(
    null,
  );

  const tabCards = useMemo(() => {
    const forTab = data.cards.filter((c) => c.sourceTab === sourceTab);
    return forTab.length > 0 ? forTab : data.cards;
  }, [data.cards, sourceTab]);

  const leaders = useMemo(() => {
    const wins = new Map<string, number>();
    for (const card of tabCards) {
      wins.set(card.fastest, (wins.get(card.fastest) ?? 0) + 1);
    }
    const total = tabCards.length || 1;
    return [...wins.entries()]
      .map(([name, count]) => ({
        name,
        wins: count,
        total,
        percent: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name));
  }, [tabCards]);

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = [...tabCards];
    if (highlightedNetwork) {
      list = list.filter(
        (c) =>
          c.fastest.toLowerCase() === highlightedNetwork.toLowerCase(),
      );
    }
    if (q) {
      list = list.filter((c) => c.city.toLowerCase().includes(q));
    }
    return list.sort((a, b) => a.city.localeCompare(b.city));
  }, [tabCards, query, highlightedNetwork]);

  const showTabs = data.hasAnalytics && data.hasUserTests;

  return (
    <section
      id="city-networks"
      aria-labelledby="city-networks-heading"
      className="bg-background py-[var(--section-y-tight)]"
    >
      <div className="w-full">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-3.5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-primary-soft px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-primary/15 dark:text-primary">
            <MapPin
              className="h-3.5 w-3.5"
              strokeWidth={2.2}
              aria-hidden="true"
            />
            <span>Speeds by city</span>
            <span aria-hidden="true">•</span>
            <span>
              Updated{" "}
              <time dateTime={data.updatedDatetime}>{data.updatedLabel}</time>
            </span>
          </p>

          <h2
            id="city-networks-heading"
            className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl dark:text-white"
          >
            Best mobile network by city in{" "}
            <span className="text-primary">{data.country}</span> (2026)
          </h2>

          <p className="mx-auto max-w-3xl text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
            {data.intro}
          </p>
        </header>

        <aside className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] sm:mb-10 sm:p-6 dark:border-slate-800 dark:bg-card">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-foreground sm:text-[15px] dark:text-white">
              Fastest in the most places
            </p>
            <span className="rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary">
              {tabCards.length} areas
            </span>
          </div>
          <ul className="flex flex-col gap-2 sm:gap-2.5">
            {leaders.map((row) => {
              const active =
                highlightedNetwork?.toLowerCase() === row.name.toLowerCase();
              return (
                <li key={row.name}>
                  <button
                    type="button"
                    onClick={() =>
                      setHighlightedNetwork((prev) =>
                        prev?.toLowerCase() === row.name.toLowerCase()
                          ? null
                          : row.name,
                      )
                    }
                    className={cn(
                      "flex w-full flex-col gap-1.5 rounded-xl border px-3.5 py-3 text-left transition-colors",
                      active
                        ? "border-primary bg-primary-soft"
                        : "border-slate-200/80 bg-muted/40 hover:bg-muted dark:border-slate-800 dark:bg-slate-900/30 dark:hover:bg-slate-900/50",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs sm:text-[13.5px]">
                      <span className="font-bold text-foreground dark:text-white">
                        {row.name}
                      </span>
                      <span className="tabular text-text-secondary">
                        {row.wins} of {row.total}
                      </span>
                    </div>
                    <span
                      className="block h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                      aria-hidden="true"
                    >
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${row.percent}%` }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-3.5 text-xs leading-relaxed text-text-secondary sm:text-[13.5px]">
            Select a network to see the cities where it&apos;s fastest.
          </p>
        </aside>

        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {showTabs ? (
            <div
              className="inline-flex rounded-md bg-muted p-1"
              role="tablist"
              aria-label="Speed data source"
            >
              <button
                type="button"
                role="tab"
                aria-selected={sourceTab === "analytics"}
                onClick={() => {
                  setSourceTab("analytics");
                  setHighlightedNetwork(null);
                }}
                className={cn(
                  "rounded-md px-4 py-2 text-xs font-bold transition-colors sm:text-sm",
                  sourceTab === "analytics"
                    ? "bg-card text-foreground shadow-subtle dark:text-white"
                    : "text-text-secondary hover:text-foreground",
                )}
              >
                Network analytics
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={sourceTab === "user"}
                onClick={() => {
                  setSourceTab("user");
                  setHighlightedNetwork(null);
                }}
                className={cn(
                  "rounded-md px-4 py-2 text-xs font-bold transition-colors sm:text-sm",
                  sourceTab === "user"
                    ? "bg-card text-foreground shadow-subtle dark:text-white"
                    : "text-text-secondary hover:text-foreground",
                )}
              >
                User speed tests
              </button>
            </div>
          ) : (
            <p className="text-xs font-bold text-text-secondary sm:text-sm">
              {sourceTab === "user" ? "User speed tests" : "Network analytics"}
            </p>
          )}

          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your city"
              className="pl-9"
              aria-label="Find your city"
            />
          </div>
        </div>

        <p className="mb-4 text-xs text-text-secondary sm:mb-5 sm:text-[13.5px]">
          Showing {filteredCards.length} of {tabCards.length} cities and regions
          {highlightedNetwork ? ` · fastest on ${highlightedNetwork}` : ""}
          , A–Z
        </p>

        {filteredCards.length > 0 ? (
          <div className="mb-8 grid grid-cols-1 gap-3 sm:mb-10 sm:gap-3.5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCards.map((card) => (
              <CityNetworkCardView
                key={card.id}
                card={card}
                highlightedNetwork={highlightedNetwork}
              />
            ))}
          </div>
        ) : (
          <p className="mb-8 rounded-2xl border border-slate-200/80 bg-muted px-4 py-8 text-center text-xs text-text-secondary sm:mb-10 sm:text-[13.5px] dark:border-slate-800">
            No cities match your search
            {highlightedNetwork ? ` for ${highlightedNetwork}` : ""}.
          </p>
        )}

        <CityNetworkFaqTip
          country={data.country}
          faq={data.faq}
          tip={data.tip}
        />

        <footer className="mt-8 flex flex-col gap-1.5 border-t border-slate-200/80 pt-5 sm:mt-10 dark:border-slate-800">
          <p className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
            {data.footerDisclaimer}
          </p>
          {data.sources.length > 0 ? (
            <p className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
              Sources:{" "}
              {data.sources.map((source, index) => (
                <span key={`${source.label}-${source.url}`}>
                  {index > 0 ? " · " : null}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener nofollow"
                    className="font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
          ) : null}
        </footer>
      </div>
    </section>
  );
}
