import { getRegions } from "@/lib/services/plans/plans.services";
import RegionsCards from "./RegionsCards";

export default async function RegionGrid() {
  const result = await getRegions();
  const regions = result.success ? result.data : [];

  return (
    <div className="grid grid-cols-2 gap-8">
      {regions.map((region) => (
        <RegionsCards key={region.id} region={region} />
      ))}
    </div>
  );
}
