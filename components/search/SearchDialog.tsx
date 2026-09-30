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
      className="flex min-h-48 flex-col items-center justify-center gap-5 px-6 py-8"
      role="status"
      aria-live="polite"
      aria-label="Loading destinations"
    >
      <div className="relative flex size-14 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary-soft" />
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/20 [animation-duration:1.4s]" />
        <span className="absolute inset-1.5 rounded-full border border-primary/25" />
        <Spinner className="relative size-6 text-primary" />
      </div>
      <div className="space-y-1.5 text-center">
        <p className="text-sm font-semibold text-brand-navy">
          Loading destinations
        </p>
        <p className="text-caption text-text-muted">
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
          className="group flex min-h-11 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-left transition-colors hover:border-primary hover:bg-primary-soft focus-visible:border-primary focus-visible:bg-primary-soft outline-none focus-visible:shadow-none"
        >
          <span className="relative h-4 w-6 shrink-0 overflow-hidden rounded-[2px] border border-border">
            <Image
              src={country.flag}
              alt=""
              fill
              className="object-cover"
              aria-hidden
            />
          </span>
          <span className="text-xs font-semibold text-brand-navy group-hover:text-primary">
            {country.name}
          </span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => navigate(`/${country.slug}`)}
        className="group flex w-full min-h-12 items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-primary-soft/70 focus-visible:bg-primary-soft outline-none focus-visible:shadow-none"
      >
        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
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
            <p className="truncate text-sm font-semibold text-brand-navy">
              {country.name}
            </p>
            <span className="text-[10px] font-medium uppercase tracking-wide text-text-muted">
              {country.code}
            </span>
          </div>
          {country.region?.name && (
            <p className="truncate text-caption text-text-muted">
              {country.region.name}
            </p>
          )}
        </div>
        <ChevronRight
          className="h-4 w-4 shrink-0 text-text-muted/0 transition-all group-hover:text-text-muted group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      </button>
    );
  }

  function RegionResult({ region }: { region: Region }) {
    return (
      <button
        type="button"
        onClick={() => navigate(`/${region.slug}`)}
        className="group flex w-full min-h-12 items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-primary-soft/70 focus-visible:bg-primary-soft outline-none focus-visible:shadow-none"
      >
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
          <Image
            src={region.flag}
            alt=""
            fill
            className="object-cover"
            aria-hidden
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-brand-navy">
            {region.name}
          </p>
          <p className="text-caption text-text-muted">
            Region · {region.countries.length} countries
          </p>
        </div>
        <ChevronRight
          className="h-4 w-4 shrink-0 text-text-muted/0 transition-all group-hover:text-text-muted group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      </button>
    );
  }

  const showEscHint = !isMobile && !query && !isInputFocused;

  const searchField = (
    <div className="relative">
      <Search
        className={cn(
          "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
          isInputFocused ? "text-primary" : "text-text-muted",
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
          "h-11 w-full rounded-xl border bg-white pl-10 text-base text-brand-navy placeholder:text-text-muted outline-none transition-[border-color,box-shadow] duration-150",
          query || isInputFocused ? "pr-10" : "pr-12",
          isInputFocused
            ? "border-primary shadow-[0_0_0_3px_rgb(255_107_53/0.15)]"
            : "border-border hover:border-border-strong shadow-none",
          "focus-visible:shadow-[0_0_0_3px_rgb(255_107_53/0.15)]",
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
          className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-text-muted hover:bg-muted hover:text-brand-navy transition-colors outline-none focus-visible:shadow-none"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      ) : showEscHint ? (
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border bg-muted/80 px-1.5 py-0.5 text-[10px] font-medium text-text-muted sm:inline-block">
          Esc
        </kbd>
      ) : null}
    </div>
  );

  const searchContent = (
    <>
      <div className="shrink-0 px-5 pb-3">
        {searchField}
        {hasQuery && loadState === "loaded" && !noResults && (
          <p className="mt-2 text-caption text-text-muted" aria-live="polite">
            {[
              matchedCountries.length > 0 &&
                `${matchedCountries.length} ${matchedCountries.length === 1 ? "country" : "countries"}`,
              directMatchedRegions.length > 0 &&
                `${directMatchedRegions.length} ${directMatchedRegions.length === 1 ? "region" : "regions"}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>

      <div className="mx-5 h-px shrink-0 bg-border-subtle" />

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
        {loadState === "loading" && <SearchLoadingState />}

        {loadState === "error" && (
          <div className="flex h-44 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive-soft text-destructive">
              <Ban className="h-5 w-5" strokeWidth={1.75} />
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
          <div className="flex h-36 flex-col items-center justify-center gap-2 px-6 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-text-muted">
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-semibold text-brand-navy">
              Nothing matches your search
            </p>
            <p className="text-caption text-text-muted">
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
          <div className="px-2">
            <div className="mb-3 flex items-center gap-2 px-1">
              <MapPin
                className="h-3.5 w-3.5 text-primary"
                strokeWidth={1.75}
                aria-hidden
              />
              <p className="text-label font-semibold text-text-secondary">
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
          <div className="mt-4 px-2">
            <p className="mb-2 px-1 text-caption font-medium text-text-muted">
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
            <DrawerHeader className="shrink-0 space-y-0.5 px-5 pb-2 pt-1 text-left">
              <DrawerTitle className="text-xl font-semibold text-brand-navy">
                Where?
              </DrawerTitle>
              <DrawerDescription className="text-sm text-text-muted">
                Search countries and regions to compare eSIM plans
              </DrawerDescription>
            </DrawerHeader>
            {searchContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="sm:max-w-[480px] md:max-w-[520px]! h-[min(580px,82dvh)] p-0 gap-0 flex flex-col overflow-hidden rounded-xl border-border bg-surface shadow-modal">
            <DialogHeader className="space-y-0.5 px-5 pb-2 pt-5 text-left">
              <DialogTitle className="text-xl font-semibold text-brand-navy">
                Where?
              </DialogTitle>
              <DialogDescription className="text-sm text-text-muted">
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
    <section className="mb-2 last:mb-0">
      <div className="sticky top-0 z-1 mb-0.5 flex items-center gap-2 bg-surface px-3 py-1.5">
        <p className="text-label font-semibold text-text-secondary">{label}</p>
        {typeof count === "number" && (
          <span className="text-caption tabular text-text-muted">{count}</span>
        )}
      </div>
      <div className="divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle bg-white">
        {children}
      </div>
    </section>
  );
}
