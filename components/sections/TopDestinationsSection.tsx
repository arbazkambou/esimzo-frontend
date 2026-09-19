import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Globe } from "lucide-react";

interface CuratedDestination {
  title: string;
  blurb: string;
  href: string;
  flagUrl?: string;
  isGlobal?: boolean;
}

const curatedDestinations: CuratedDestination[] = [
  {
    title: "Europe eSIM (multi-country)",
    blurb: "Best for multi-stop trips",
    href: "/region/europe",
    flagUrl: "https://flagcdn.com/w40/eu.png",
  },
  {
    title: "Japan eSIM",
    blurb: "Strong city coverage, lots of 5G options",
    href: "/japan",
    flagUrl: "https://flagcdn.com/w40/jp.png",
  },
  {
    title: "USA eSIM",
    blurb: "Avoid expensive carrier roaming packs",
    href: "/united-states",
    flagUrl: "https://flagcdn.com/w40/us.png",
  },
  {
    title: "Thailand eSIM",
    blurb: "Great value for short trips",
    href: "/thailand",
    flagUrl: "https://flagcdn.com/w40/th.png",
  },
  {
    title: "UK eSIM",
    blurb: "Reliable coverage, easy setup",
    href: "/united-kingdom",
    flagUrl: "https://flagcdn.com/w40/gb.png",
  },
  {
    title: "UAE eSIM",
    blurb: "Useful for Dubai stopovers",
    href: "/united-arab-emirates",
    flagUrl: "https://flagcdn.com/w40/ae.png",
  },
  {
    title: "Turkey eSIM",
    blurb: "Popular for short stays",
    href: "/turkey",
    flagUrl: "https://flagcdn.com/w40/tr.png",
  },
  {
    title: "Global eSIM",
    blurb: "Best for frequent flyers",
    href: "/global",
    isGlobal: true,
  },
];

export default function TopDestinationsSection() {
  return (
    <section id="destinations" className="py-14 sm:py-20 bg-background relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-[#EBF5FE] dark:bg-[#0EA5E9]/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] mb-3.5 select-none">
            TOP DESTINATIONS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E48] dark:text-white tracking-tight leading-tight mb-3">
            Popular Travel eSIM Destinations{" "}
            <span className="text-[#FF5A22] block">
              (Today’s Best-Value Picks)
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Browse handpicked country and regional eSIM plans sorted by what travelers care about most: cheap data, reliable carrier activation, good speeds, and fair validity.
          </p>
        </div>

        {/* 8 Curated Best-Value Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
          {curatedDestinations.map((dest) => (
            <Link
              key={dest.title}
              href={dest.href}
              className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white dark:bg-card dark:border-slate-800 p-3.5 sm:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:-translate-y-[2.5px] hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md hover:shadow-sky-500/5 hover:bg-[#F8FBFE] dark:hover:bg-slate-800/90 active:scale-[0.985] transition-all duration-[240ms] ease-out"
            >
              {/* Flag / Globe icon */}
              {dest.isGlobal ? (
                <div className="flex h-7 w-10 shrink-0 items-center justify-center rounded-[5px] bg-[#EBF5FE] text-[#0284C7] border border-sky-100 dark:border-sky-900 group-hover:scale-[1.04] transition-transform duration-[240ms] ease-out">
                  <Globe className="h-4 w-4" />
                </div>
              ) : (
                <div className="relative h-7 w-10 shrink-0 overflow-hidden rounded-[5px] border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                  <Image
                    src={dest.flagUrl!}
                    alt={dest.title}
                    fill
                    sizes="40px"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-[240ms] ease-out"
                  />
                </div>
              )}

              {/* Destination info */}
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-[13px] font-bold text-[#0B1E48] dark:text-white truncate group-hover:text-[#0284C7] transition-colors duration-[240ms] ease-out">
                  {dest.title}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-400 truncate font-normal mt-0.5">
                  {dest.blurb}
                </div>
              </div>

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F0F7FE] dark:bg-sky-950/40 text-[#0284C7] dark:text-sky-400 group-hover:bg-[#0284C7] group-hover:text-white transition-all duration-[240ms] ease-out ml-1">
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-[240ms] ease-out group-hover:translate-x-[3px]" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick jump to all countries */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2">
          <Link
            href="#countries"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-card px-5 py-2 text-xs sm:text-[13px] font-semibold text-[#0B1E48] dark:text-slate-200 hover:text-[#0284C7] hover:border-sky-300 shadow-2xs hover:shadow-xs transition-all group"
          >
            <span>Looking for a specific destination?</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#0284C7] group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <span className="text-[11.5px] sm:text-xs text-slate-400 dark:text-slate-400 font-normal">
            Browse all countries below
          </span>
        </div>
      </div>
    </section>
  );
}
