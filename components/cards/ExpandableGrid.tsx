"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PrimaryButton from "../common/PrimaryButton";
import CountryCard from "./CountryCard";
import type { Country } from "@/lib/types/plans.types";
import { getRegionCountries } from "@/lib/services/plans/plans.services";
import { Spinner } from "../ui/spinner";

type Props = {
  regionSlug: string;
  regionName: string;
  initialCountries: Country[];
  totalCount: number;
};

export default function ExpandableGrid({
  regionSlug,
  regionName,
  initialCountries,
  totalCount,
}: Props) {
  const [countries, setCountries] = useState(initialCountries);
  const [expanded, setExpanded] = useState(false);
  const [hasLoadedAll, setHasLoadedAll] = useState(
    initialCountries.length >= totalCount,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const hasMore = totalCount > initialCountries.length;
  const visibleCountries = expanded ? countries : initialCountries;

  async function toggleExpanded() {
    if (expanded) {
      setExpanded(false);
      return;
    }

    if (!hasLoadedAll) {
      setIsLoading(true);
      setError("");
      const result = await getRegionCountries(regionSlug);
      setIsLoading(false);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setCountries(result.data);
      setHasLoadedAll(true);
    }

    setExpanded(true);
  }

  return (
    <>
      <div className="-mt-2 grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCountries.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>

      {error && (
        <p className="mt-3 text-center text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => void toggleExpanded()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-full border border-[#BCD8F6] dark:border-sky-800 bg-white dark:bg-card px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#0B1E48] dark:text-slate-200 hover:text-[#0284C7] hover:border-sky-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer group disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <>
                <Spinner />
                <span>Loading {regionName}…</span>
              </>
            ) : expanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="h-4 w-4 text-[#0284C7] transition-transform group-hover:-translate-y-0.5" />
              </>
            ) : (
              <>
                <span>{error ? "Try Again" : `See All ${totalCount} Countries`}</span>
                <ChevronDown className="h-4 w-4 text-[#0284C7] transition-transform group-hover:translate-y-0.5" />
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
