"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Ban, ChevronRight, MapPin, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCountries, getRegions } from "@/lib/services/plans/plans.services";
import type { Country, Region } from "@/lib/types/plans.types";
import { cn } from "@/lib/utils";
import { useSearchDialog } from "./SearchDialogProvider";

type LoadState = "idle" | "loading" | "loaded" | "error";

function SearchLoadingState() {
  return (
    <div
      className="flex min-h-48 flex-col items-center justify-center gap-4 px-6 py-8"
      role="status"
      aria-live="polite"
      aria-label="Loading destinations"
    >
      <div className="flex size-12 items-center justify-center rounded-lg bg-primary-soft">
        <Spinner className="size-5 text-primary" />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-body-sm font-semibold text-brand-navy">
          Loading destinations
        </p>
        <p className="text-caption text-text-secondary">
          Fetching countries and regions…
        </p>
      </div>
      <div className="flex w-full max-w-[220px] flex-col gap-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-9 animate-pulse rounded-md bg-primary-soft/80"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SearchDialog() {
  const { isOpen, openSearch, closeSearch } = useSearchDialog();
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isMobile = useIsMobile();

  const loadDestinations = useCallback(async () => {
    setLoadState("loading");
    setLoadError("");

    try {
      const [countriesRes, regionsRes] = await Promise.all([
        getCountries(),
        getRegions(),
      ]);

      if (!countriesRes.success || !regionsRes.success) {
        const message = !countriesRes.success
          ? countriesRes.message
          : !regionsRes.success
            ? regionsRes.message
            : "Unable to load destinations";
        setLoadError(message);
        setLoadState("error");
        return;
      }

      setCountries(countriesRes.data);
      setRegions(regionsRes.data);
      setLoadState("loaded");
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Unable to load destinations",
      );
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    if (isOpen && loadState === "idle") {
      const timer = window.setTimeout(() => void loadDestinations(), 0);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, loadDestinations, loadState]);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(timer);
    }
    setIsInputFocused(false);
  }, [isOpen]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 200);
    return () => window.clearTimeout(timer);
  }, [query]);

  const popularCountries = useMemo(
    () =>
      [...countries].sort((a, b) => b.popularity - a.popularity).slice(0, 10),
    [countries],
  );

  const regionBySlug = useMemo(
    () => new Map(regions.map((region) => [region.slug, region])),
    [regions],
  );

  const { matchedCountries, directMatchedRegions, alsoInRegions } =
    useMemo(() => {
      const q = debouncedQuery.trim().toLowerCase();
      if (!q) {
        return {
          matchedCountries: [] as Country[],
          directMatchedRegions: [] as Region[],
          alsoInRegions: [] as Region[],
        };
      }

      const rank = (name: string, code: string) => {
        const normalizedName = name.toLowerCase();
        const normalizedCode = code.toLowerCase();
        if (normalizedCode === q || normalizedName === q) return 0;
        if (normalizedCode.startsWith(q) || normalizedName.startsWith(q))
          return 1;
        return 2;
      };

      const directRegions = regions
        .filter(
          (region) =>
            region.name.toLowerCase().includes(q) ||
            region.code.toLowerCase().includes(q),
        )
        .sort((a, b) => rank(a.name, a.code) - rank(b.name, b.code));
      const directRegionSlugs = new Set(
        directRegions.map((region) => region.slug),
      );

      const matched = countries
        .filter(
          (country) =>
            country.name.toLowerCase().includes(q) ||
            country.code.toLowerCase().includes(q),
        )
        .sort((a, b) => rank(a.name, a.code) - rank(b.name, b.code));

      const alsoInMap = new Map<string, Region>();
      for (const country of matched) {
        const slug = country.region?.slug;
        if (!slug || directRegionSlugs.has(slug) || alsoInMap.has(slug))
          continue;
        const region = regionBySlug.get(slug);
        if (region) alsoInMap.set(slug, region);
      }

      return {
        matchedCountries: matched,
        directMatchedRegions: directRegions,
        alsoInRegions: [...alsoInMap.values()],
      };
    }, [countries, debouncedQuery, regionBySlug, regions]);

  const hasQuery = debouncedQuery.trim().length > 0;
  const noResults =
    hasQuery &&
    matchedCountries.length === 0 &&
    directMatchedRegions.length === 0 &&
    alsoInRegions.length === 0;

  function navigate(path: string) {
    router.push(path);
    closeAndReset();
  }

  function closeAndReset() {
    setQuery("");
    setDebouncedQuery("");
    setIsInputFocused(false);
    closeSearch();
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) openSearch();
    else closeAndReset();
  }

  function CountryResult({
    country,
    compact = false,
  }: {
    country: Country;
    compact?: boolean;
  }) {
    if (compact) {
      return (
        <button
          type="button"
          onClick={() => navigate(`/${country.slug}`)}
          className="group flex min-h-10 items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-left outline-none transition-[border-color,background-color] duration-[var(--transition-fast)] hover:border-primary hover:bg-primary-soft focus-visible:border-primary focus-visible:bg-primary-soft focus-visible:shadow-[var(--focus-ring)]"
        >
          <span className="relative h-4 w-6 shrink-0 overflow-hidden rounded-sm border border-border">
            <Image
              src={country.flag}
              alt=""
              fill
              className="object-cover"
              aria-hidden
            />
          </span>
          <span className="text-caption font-semibold text-brand-navy group-hover:text-primary-text">
            {country.name}
          </span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => navigate(`/${country.slug}`)}
        className="group flex w-full min-h-12 items-center gap-3 px-3.5 py-3 text-left outline-none transition-colors duration-[var(--transition-fast)] hover:bg-primary-soft focus-visible:bg-primary-soft focus-visible:shadow-[var(--focus-ring)]"
      >
        <span className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
          <Image
            src={country.flag}
            alt=""
            fill
            className="object-cover"
            aria-hidden
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-body-sm font-semibold text-brand-navy">
              {country.name}
            </p>
            <span className="text-caption font-medium uppercase tracking-wide text-text-secondary">
              {country.code}
            </span>
          </div>
          {country.region?.name ? (
            <p className="truncate text-caption text-text-secondary">
              {country.region.name}
            </p>
          ) : null}
        </div>
        <ChevronRight
          className="size-4 shrink-0 text-transparent transition-all duration-[var(--transition-fast)] group-hover:translate-x-0.5 group-hover:text-text-secondary group-focus-visible:translate-x-0.5 group-focus-visible:text-text-secondary"
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
    );
  }

  function RegionResult({ region }: { region: Region }) {
    return (
      <button
        type="button"
        onClick={() => navigate(`/${region.slug}`)}
        className="group flex w-full min-h-12 items-center gap-3 px-3.5 py-3 text-left outline-none transition-colors duration-[var(--transition-fast)] hover:bg-primary-soft focus-visible:bg-primary-soft focus-visible:shadow-[var(--focus-ring)]"
      >
        <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
          <Image
            src={region.flag}
            alt=""
            fill
            className="object-cover"
            aria-hidden
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-body-sm font-semibold text-brand-navy">
            {region.name}
          </p>
          <p className="text-caption text-text-secondary">
            Region · {region.countries.length} countries
          </p>
        </div>
        <ChevronRight
          className="size-4 shrink-0 text-transparent transition-all duration-[var(--transition-fast)] group-hover:translate-x-0.5 group-hover:text-text-secondary group-focus-visible:translate-x-0.5 group-focus-visible:text-text-secondary"
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
    );
  }

  const showEscHint = !isMobile && !query && !isInputFocused;

  const searchField = (
    <div className="relative">
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 transition-colors",
          isInputFocused ? "text-primary" : "text-text-secondary",
        )}
        strokeWidth={1.75}
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        placeholder="Country, region or code…"
        className={cn(
          "h-11 w-full rounded-md border bg-card pl-10 text-body text-brand-navy placeholder:text-text-secondary outline-none transition-[border-color,box-shadow] duration-[var(--transition-base)]",
          query || isInputFocused ? "pr-10" : "pr-12",
          isInputFocused
            ? "border-primary shadow-[var(--focus-ring)]"
            : "border-border shadow-none hover:border-border-strong",
        )}
        aria-label="Search destinations"
      />
      {query ? (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-text-secondary outline-none transition-colors hover:bg-muted hover:text-brand-navy focus-visible:shadow-[var(--focus-ring)]"
        >
          <X className="size-4" strokeWidth={1.75} />
        </button>
      ) : showEscHint ? (
        <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded-md border border-border bg-muted px-1.5 py-0.5 text-caption font-medium text-text-secondary sm:inline-block">
          Esc
        </kbd>
      ) : null}
    </div>
  );

  const resultSummary =
    hasQuery && loadState === "loaded" && !noResults
      ? [
          matchedCountries.length > 0 &&
            `${matchedCountries.length} ${matchedCountries.length === 1 ? "country" : "countries"}`,
          directMatchedRegions.length > 0 &&
            `${directMatchedRegions.length} ${directMatchedRegions.length === 1 ? "region" : "regions"}`,
          alsoInRegions.length > 0 &&
            `${alsoInRegions.length} related ${alsoInRegions.length === 1 ? "region" : "regions"}`,
        ]
          .filter(Boolean)
          .join(" · ")
      : null;

  const searchContent = (
    <>
      <div className="shrink-0 px-5 pb-3">
        {searchField}
        {resultSummary ? (
          <p className="mt-2.5 text-caption text-text-secondary" aria-live="polite">
            {resultSummary}
          </p>
        ) : null}
      </div>

      <div className="mx-5 h-px shrink-0 bg-border" />

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
        {loadState === "loading" && <SearchLoadingState />}

        {loadState === "error" && (
          <div className="flex h-44 flex-col items-center justify-center gap-3 px-4 text-center">
            <div className="flex size-11 items-center justify-center rounded-lg bg-destructive-soft text-destructive">
              <Ban className="size-5" strokeWidth={1.75} />
            </div>
            <p className="text-body-sm text-text-secondary">{loadError}</p>
            <Button
              type="button"
              size="sm"
              onClick={() => void loadDestinations()}
            >
              Try again
            </Button>
          </div>
        )}

        {loadState === "loaded" && noResults && (
          <div className="flex h-36 flex-col items-center justify-center gap-2 px-4 text-center">
            <div className="flex size-11 items-center justify-center rounded-lg bg-muted text-text-secondary">
              <Search className="size-5" strokeWidth={1.75} />
            </div>
            <p className="text-body-sm font-semibold text-brand-navy">
              Nothing matches your search
            </p>
            <p className="text-caption text-text-secondary">
              Try a country name, region, or country code
            </p>
          </div>
        )}

        {loadState === "loaded" && hasQuery && matchedCountries.length > 0 && (
          <ResultSection label="Countries" count={matchedCountries.length}>
            {matchedCountries.map((country) => (
              <CountryResult key={country.id} country={country} />
            ))}
          </ResultSection>
        )}

        {loadState === "loaded" &&
          hasQuery &&
          directMatchedRegions.length > 0 && (
            <ResultSection label="Regions" count={directMatchedRegions.length}>
              {directMatchedRegions.map((region) => (
                <RegionResult key={region.id} region={region} />
              ))}
            </ResultSection>
          )}

        {loadState === "loaded" && hasQuery && alsoInRegions.length > 0 && (
          <ResultSection
            label="Also available in…"
            count={alsoInRegions.length}
          >
            {alsoInRegions.map((region) => (
              <RegionResult key={region.id} region={region} />
            ))}
          </ResultSection>
        )}

        {loadState === "loaded" && !hasQuery && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-primary-soft text-primary">
                <MapPin className="size-3.5" strokeWidth={2.2} aria-hidden />
              </span>
              <p className="text-caption font-bold uppercase tracking-wider text-text-secondary">
                Most popular destinations
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularCountries.map((country) => (
                <CountryResult key={country.id} country={country} compact />
              ))}
            </div>
          </div>
        )}

        {loadState === "loaded" && noResults && (
          <div className="mt-5">
            <p className="mb-2.5 text-caption font-bold uppercase tracking-wider text-text-secondary">
              Popular destinations
            </p>
            <div className="flex flex-wrap gap-2">
              {popularCountries.slice(0, 6).map((country) => (
                <CountryResult key={country.id} country={country} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
          <DrawerContent className="flex h-[80dvh] max-h-[80vh] flex-col gap-0 overflow-hidden rounded-t-2xl border-border bg-surface p-0 shadow-modal">
            <DrawerHeader className="shrink-0 space-y-1 px-5 pt-1 pb-3 text-left">
              <DrawerTitle className="text-h3 font-bold text-brand-navy">
                Where?
              </DrawerTitle>
              <DrawerDescription className="text-body-sm text-text-secondary">
                Search countries and regions to compare eSIM plans
              </DrawerDescription>
            </DrawerHeader>
            {searchContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="flex h-[min(580px,82dvh)] flex-col gap-0 overflow-hidden rounded-xl border-border bg-surface p-0 shadow-modal sm:max-w-[480px] md:max-w-[520px]!">
            <DialogHeader className="shrink-0 space-y-1 px-5 pt-5 pb-3 text-left">
              <DialogTitle className="text-h3 font-bold text-brand-navy">
                Where?
              </DialogTitle>
              <DialogDescription className="text-body-sm text-text-secondary">
                Search countries and regions to compare eSIM plans
              </DialogDescription>
            </DialogHeader>
            {searchContent}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

function ResultSection({
  label,
  count,
  children,
}: {
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center gap-2 px-0.5">
        <p className="text-caption font-bold uppercase tracking-wider text-text-secondary">
          {label}
        </p>
        {typeof count === "number" ? (
          <span className="inline-flex min-w-5 items-center justify-center rounded-md bg-muted px-1.5 py-0.5 text-caption font-semibold tabular text-text-secondary">
            {count}
          </span>
        ) : null}
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card shadow-subtle">
        {children}
      </div>
    </section>
  );
}
