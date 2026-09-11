"use client"; // Required for useState

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Globe, MapPin, ChevronDown } from "lucide-react";
import { Region } from "@/lib/types/plans.types";
import Image from "next/image";

interface RegionsCardsProps {
  region: Region;
}

export default function RegionsCards({ region }: RegionsCardsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Limit shown countries initially
  const visibleCountries = isExpanded
    ? region.countries
    : region.countries?.slice(0, 5);

  const hasMore = region.countries && region.countries.length > 5;

  return (
    <Link href={`/region/${region.slug}`} className="block h-full">
      <div className="relative overflow-hidden h-full group bg-gradient-to-br from-primary/[0.04] to-secondary/10 border border-primary/10 rounded-3xl p-6 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500 cursor-pointer">
        {/* Decorative Background Blur */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-colors duration-500" />

        {/* Header Section */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              {region.flag ? (
                <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={region.flag}
                    alt={region.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <Globe className="w-7 h-7 text-primary" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {region.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                <MapPin className="w-3 h-3" />
                {region.code || "Regional"}
              </div>
            </div>
          </div>
          <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 mb-6">
          <div className="inline-block px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/20 shadow-sm">
            <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-0.5">
              Network Coverage
            </p>
            <p className="text-2xl font-black text-foreground">
              {region.countries?.length || 0}
              <span className="text-sm font-medium text-muted-foreground ml-1">
                Destinations
              </span>
            </p>
          </div>
        </div>

        {/* Countries Preview */}
        {region.countries && region.countries.length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-2 transition-all duration-500 ease-in-out">
            {visibleCountries?.map((country) => (
              <div
                key={country.id}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/40 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800/40 rounded-lg"
              >
                {country.flag && (
                  <div className="relative w-4 h-3 overflow-hidden rounded-sm shadow-sm">
                    <Image
                      src={country.flag}
                      alt={country.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="text-[11px] font-bold text-foreground/80 whitespace-nowrap">
                  {country.name}
                </span>
              </div>
            ))}

            {/* The Expandable Toggle */}
            {hasMore && (
              <button
                onClick={(e) => {
                  e.preventDefault(); // Stop the Link from firing
                  e.stopPropagation(); // Stop the Card click from firing
                  setIsExpanded(!isExpanded);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary hover:bg-primary hover:text-white transition-all"
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronDown className="w-3 h-3 rotate-180" />
                  </>
                ) : (
                  <>
                    +{region.countries.length - 5} more{" "}
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
