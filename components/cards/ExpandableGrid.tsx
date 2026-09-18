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
        <div className="mt-4 flex justify-center">
          <PrimaryButton
            onClick={() => void toggleExpanded()}
            disabled={isLoading}
            className="group flex"
          >
            {isLoading ? (
              <>
                <Spinner />
                Loading {regionName}…
              </>
            ) : expanded ? (
              <>
                Show Less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                {error ? "Try Again" : `See All ${totalCount} Countries`}
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </PrimaryButton>
        </div>
      )}
    </>
  );
}
