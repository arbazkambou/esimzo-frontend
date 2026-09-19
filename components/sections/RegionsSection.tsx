import { getRegions } from "@/lib/services/plans/plans.services";
import ExpandableGrid from "../cards/ExpandableGrid";
import RegionCard from "../cards/RegionCard";
import GlobalRegionCard from "../cards/GlobalRegionCard";
import Image from "next/image";

const VISIBLE_COUNT = 12;

export default async function RegionsSection() {
  const result = await getRegions();
  const regions = result.success ? result.data : [];

  return (
    <section id="regions" className="pt-6 sm:pt-8 pb-14 sm:pb-20 bg-background relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-[#EBF5FE] dark:bg-[#0EA5E9]/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] mb-3.5 select-none">
            REGIONAL DESTINATIONS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E48] dark:text-white tracking-tight leading-tight mb-3">
            Explore Regional eSIM Plans{" "}
            <span className="text-[#0EA5E9] block">
              (Multi-Country Bundles)
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Traveling across multiple countries? Save time and stay connected with flexible regional eSIM packages that work seamlessly across borders.
          </p>
        </div>

        {/* All Regions Grid */}
        <div className="grid grid-cols-1 gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {regions.slice(0, 14).map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
          <GlobalRegionCard />
        </div>

        {/* Region Breakdown Subsections */}
        <div className="flex flex-col gap-12 mt-12 sm:mt-16">
          {regions.map((region) => (
            <div key={region.id} className="pt-4">
              {/* Region heading */}
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="relative h-7 w-10 sm:h-8 sm:w-11 shrink-0 overflow-hidden rounded-[5px] border border-slate-200/80 dark:border-slate-700 bg-slate-50 shadow-2xs">
                  <Image
                    src={region.flag}
                    alt={region.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0B1E48] dark:text-white">
                  {region.name}
                </h3>
              </div>

              <ExpandableGrid
                regionSlug={region.slug}
                regionName={region.name}
                initialCountries={region.countries.slice(0, VISIBLE_COUNT)}
                totalCount={region.countries.length}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
