"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ChevronRight, Ban, Globe } from "lucide-react";
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
import { Country, Region } from "@/lib/types/plans.types";
import Image from "next/image";
import { Button } from "@base-ui/react";
import { useIsMobile } from "@/hooks/use-mobile";

type Variant = "bar" | "icon";

type Props = {
  countries: Country[];
  regions: Region[];
  variant?: Variant;
};

export function SearchDialog({
  countries,
  regions,
  variant = "icon",
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isMobile = useIsMobile();

  // Focus input when dialog/sheet opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
      setDebouncedQuery("");
    }
  }, [open]);

  // Debounce: only update the search query 200ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(timer);
  }, [query]);

  const popularCountries = useMemo(
    () =>
      [...countries]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10),
    [countries],
  );

  const regionBySlug = useMemo(
    () => new Map(regions.map((r) => [r.slug, r])),
    [regions],
  );

  const { matchedCountries, directMatchedRegions, alsoInRegions } =
    useMemo(() => {
      if (!debouncedQuery.trim())
        return {
          matchedCountries: [] as Country[],
          directMatchedRegions: [] as Region[],
          alsoInRegions: [] as Region[],
        };

      const q = debouncedQuery.trim().toLowerCase();

      const directRegions = regions
        .filter((r) => {
          return (
            r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q)
          );
        })
        .sort((a, b) => {
          const score = (r: Region) => {
            const code = r.code.toLowerCase();
            const name = r.name.toLowerCase();
            if (code === q || name === q) return 0;
            if (code.startsWith(q) || name.startsWith(q)) return 1;
            return 2;
          };
          return score(a) - score(b);
        });

      const directRegionSlugs = new Set(directRegions.map((r) => r.slug));

      const matched = countries
        .filter((country) => {
          const nameMatch = country.name.toLowerCase().includes(q);
          const codeMatch = country.code.toLowerCase().includes(q);
          return nameMatch || codeMatch;
        })
        .sort((a, b) => {
          const score = (c: Country) => {
            const code = c.code.toLowerCase();
            const name = c.name.toLowerCase();
            if (code === q) return 0;
            if (code.startsWith(q)) return 1;
            if (name.startsWith(q)) return 2;
            return 3;
          };
          return score(a) - score(b);
        });

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
    }, [debouncedQuery, countries, regions, regionBySlug]);

  const hasQuery = debouncedQuery.trim().length > 0;
  const noResults =
    hasQuery &&
    matchedCountries.length === 0 &&
    directMatchedRegions.length === 0 &&
    alsoInRegions.length === 0;

  function navigate(path: string) {
    router.push(path);
    setOpen(false);
  }

  // ── Region result card (reusable) ─────────────────────────────────────────
  function RegionCard({ region }: { region: Region }) {
    return (
      <button
        onClick={() => navigate(`/region/${region.slug}`)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-muted group transition-colors"
      >
        <div className="relative h-6 w-8 shrink-0 overflow-hidden rounded">
          <Image
            src={region.flag}
            alt={region.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{region.name}</p>
          <p className="text-[11px] text-muted-foreground">
            Region · {region.countries?.length ?? 0} countries
          </p>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </button>
    );
  }

  // ── Shared inner content (same markup for Dialog and Sheet) ───────────────
  const SearchContent = (
    <>
      {/* Search Input */}
      <div className="px-5 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Country, region or code…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {/* ── NO RESULTS ── */}
        {noResults && (
          <div className="flex flex-col items-center gap-1 py-2 text-center">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground mt-3">
              <Ban className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">
                Nothing matches your search
              </span>
            </p>
          </div>
        )}

        {/* ── COUNTRY MATCHES — always shown first ── */}
        {hasQuery && matchedCountries.length > 0 && (
          <div>
            {directMatchedRegions.length > 0 && (
              <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Countries
              </p>
            )}
            <ul>
              {matchedCountries.map((country) => (
                <li key={country.id}>
                  <button
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
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {country.name}
                      </p>
                      {country.region?.name && (
                        <p className="text-[11px] text-muted-foreground">
                          {country.region.name}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── DIRECT REGION MATCHES — shown below countries ── */}
        {hasQuery && directMatchedRegions.length > 0 && (
          <div>
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Regions
            </p>
            <ul>
              {directMatchedRegions.map((region) => (
                <li key={region.id}>
                  <RegionCard region={region} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── "ALSO AVAILABLE IN…" — regions containing matched countries ── */}
        {hasQuery && alsoInRegions.length > 0 && (
          <div className="pt-1">
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Also available in…
            </p>
            <ul>
              {alsoInRegions.map((region) => (
                <li key={region.id}>
                  <RegionCard region={region} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── POPULAR DESTINATIONS (default or after no-results) ── */}
        {(!hasQuery || noResults) && (
          <div>
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Most popular destinations
            </p>
            <ul>
              {popularCountries.map((country) => (
                <li key={country.id}>
                  <button
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
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {country.name}
                      </p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* ── Trigger ─────────────────────────────────────────── */}
      {variant === "bar" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-lg shadow-muted/50 text-left cursor-pointer hover:border-primary/40 hover:ring-2 hover:ring-accent transition-all group"
          aria-label="Open search"
        >
          <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="flex-1 py-2 text-sm text-muted-foreground select-none">
            Search by country or region…
          </span>
          <span className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            Search
          </span>
        </button>
      ) : (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search destinations"
          className="flex items-center gap-2 border border-foreground rounded-full px-4 py-1 text-foreground cursor-pointer hover:bg-foreground hover:text-background transition-colors"
        >
          <Search className="h-4 w-4" />
          <span>Destinations</span>
        </Button>
      )}

      {/* ── Mobile: bottom Sheet (full height) ───────────────── */}
      {isMobile && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            showCloseButton={true}
            className="h-[98dvh] rounded-t-4xl border-border p-0 gap-0 flex flex-col overflow-hidden"
          >
            <SheetHeader className="px-5 pt-5 pb-0">
              <SheetTitle className="text-lg font-bold pb-8 text-foreground">
                Where?
              </SheetTitle>
            </SheetHeader>
            {SearchContent}
          </SheetContent>
        </Sheet>
      )}

      {/* ── Desktop: Dialog (md and above) ───────────────────── */}
      {!isMobile && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[540px] h-[540px] md:max-w-[640px]! p-0 gap-0 flex flex-col overflow-hidden rounded-2xl border-border shadow-2xl">
            <DialogHeader className="px-5 pt-5 pb-0">
              <DialogTitle className="text-lg font-bold text-foreground">
                Where?
              </DialogTitle>
            </DialogHeader>
            {SearchContent}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
