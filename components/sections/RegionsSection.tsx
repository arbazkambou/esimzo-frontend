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
    <section id="regions" className="bg-background py-10">
      <div className="container">
        <h2 className="text-center text-xl font-bold tracking-tight text-foreground mb-6">
          Explore Regions
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {regions.slice(0, 14).map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
          <GlobalRegionCard />
        </div>
        <div className="flex flex-col gap-12">
          {regions.map((region) => (
            <div key={region.id}>
              {/* Region heading */}
              <div className="my-6 flex items-center justify-center gap-3">
                <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={region.flag}
                    alt={region.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <h2 className="text-center text-xl font-bold tracking-tight text-foreground">
                  {region.name}
                </h2>
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
