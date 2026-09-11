import PlansClientPage from "@/components/plans/PlansClientPage";
import CountriesHeader from "@/components/sections/CountriesHeader";
import NoPackagesState from "@/components/sections/NoPackagesFound";
import { getGlobalPackages } from "@/lib/services/plans/plans.services";

export default async function page() {
  const packages = await getGlobalPackages();
  if (!packages.success) return <NoPackagesState />;

  return (
    <div>
      <CountriesHeader slug="global" />
      <PlansClientPage slug="global" initialData={packages.data} scope="global" />
    </div>
  );
}
