"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Ban, ChevronRight, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCountries, getRegions } from "@/lib/services/plans/plans.services";
import type { Country, Region } from "@/lib/types/plans.types";
import { useSearchDialog } from "./SearchDialogProvider";

type LoadState = "idle" | "loading" | "loaded" | "error";

export function SearchDialog() {
  const { isOpen, openSearch, closeSearch } = useSearchDialog();
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
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

  }, [isOpen]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 200);
    return () => window.clearTimeout(timer);
  }, [query]);

  const popularCountries = useMemo(
    () =>
      [...countries]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10),
    [countries],
  );

  const regionBySlug = useMemo(
    () => new Map(regions.map((region) => [region.slug, region])),
    [regions],
  );

  const { matchedCountries, directMatchedRegions, alsoInRegions } = useMemo(() => {
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
      if (normalizedCode.startsWith(q) || normalizedName.startsWith(q)) return 1;
      return 2;
    };

    const directRegions = regions
      .filter(
        (region) =>
          region.name.toLowerCase().includes(q) ||
          region.code.toLowerCase().includes(q),
      )
      .sort(
        (a, b) => rank(a.name, a.code) - rank(b.name, b.code),
      );
    const directRegionSlugs = new Set(directRegions.map((region) => region.slug));

    const matched = countries
      .filter(
        (country) =>
          country.name.toLowerCase().includes(q) ||
          country.code.toLowerCase().includes(q),
      )
      .sort(
        (a, b) => rank(a.name, a.code) - rank(b.name, b.code),
      );

    const alsoInMap = new Map<string, Region>();
    for (const country of matched) {
      const slug = country.region?.slug;
      if (!slug || directRegionSlugs.has(slug) || alsoInMap.has(slug)) continue;
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
    closeSearch();
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) openSearch();
    else closeAndReset();
  }

  function CountryResult({ country }: { country: Country }) {
    return (
      <button
        type="button"
        onClick={() => navigate(`/${country.slug}`)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-muted group transition-colors"
      >
        <Image
          src={country.flag}
          alt={country.name}
          width={32}
          height={32}
          className="h-6 w-8 shrink-0 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{country.name}</p>
          {country.region?.name && (
            <p className="text-[11px] text-muted-foreground">
              {country.region.name}
            </p>
          )}
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </button>
    );
  }

  function RegionResult({ region }: { region: Region }) {
    return (
      <button
        type="button"
        onClick={() => navigate(`/region/${region.slug}`)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-muted group transition-colors"
      >
        <div className="relative h-6 w-8 shrink-0 overflow-hidden rounded">
          <Image src={region.flag} alt={region.name} fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{region.name}</p>
          <p className="text-[11px] text-muted-foreground">
            Region · {region.countries.length} countries
          </p>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </button>
    );
  }

  const searchContent = (
    <>
      <div className="shrink-0 px-5 pb-2 pt-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Country, region or code…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {loadState === "loading" && (
          <div className="flex h-40 items-center justify-center gap-2 text-sm text-muted-foreground">
            <Spinner />
            Loading destinations…
          </div>
        )}

        {loadState === "error" && (
          <div className="flex h-40 flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm text-muted-foreground">{loadError}</p>
            <button
              type="button"
              onClick={() => void loadDestinations()}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Try again
            </button>
          </div>
        )}

        {loadState === "loaded" && noResults && (
          <p className="mt-3 flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
            <Ban className="h-4 w-4" /> Nothing matches your search
          </p>
        )}

        {loadState === "loaded" && hasQuery && matchedCountries.length > 0 && (
          <ResultSection label="Countries">
            {matchedCountries.map((country) => (
              <CountryResult key={country.id} country={country} />
            ))}
          </ResultSection>
        )}

        {loadState === "loaded" && hasQuery && directMatchedRegions.length > 0 && (
          <ResultSection label="Regions">
            {directMatchedRegions.map((region) => (
              <RegionResult key={region.id} region={region} />
            ))}
          </ResultSection>
        )}

        {loadState === "loaded" && hasQuery && alsoInRegions.length > 0 && (
          <ResultSection label="Also available in…">
            {alsoInRegions.map((region) => (
              <RegionResult key={region.id} region={region} />
            ))}
          </ResultSection>
        )}

        {loadState === "loaded" && (!hasQuery || noResults) && (
          <ResultSection label="Most popular destinations">
            {popularCountries.map((country) => (
              <CountryResult key={country.id} country={country} />
            ))}
          </ResultSection>
        )}
      </div>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          <SheetContent
            side="bottom"
            showCloseButton
            className="h-[98dvh] rounded-t-4xl border-border p-0 gap-0 flex flex-col overflow-hidden"
          >
            <SheetHeader className="px-5 pb-0 pt-5">
              <SheetTitle className="pb-8 text-lg font-bold text-foreground">
                Where?
              </SheetTitle>
            </SheetHeader>
            {searchContent}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="sm:max-w-[540px] h-[540px] md:max-w-[640px]! p-0 gap-0 flex flex-col overflow-hidden rounded-2xl border-border shadow-2xl">
            <DialogHeader className="px-5 pb-0 pt-5">
              <DialogTitle className="text-lg font-bold text-foreground">
                Where?
              </DialogTitle>
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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div>{children}</div>
    </section>
  );
}
