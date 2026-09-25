import PlansClientPage from "@/components/plans/PlansClientPage";
import CountriesHeader from "@/components/sections/CountriesHeader";
import NoPackagesState from "@/components/sections/NoPackagesFound";
import { getCountryPlansHeroContent } from "@/lib/content/countries";
import { derivePlansHeroStats } from "@/lib/plans/derive-plans-hero-stats";
import { getGlobalPackages } from "@/lib/services/plans/plans.services";

export default async function page() {
  const packages = await getGlobalPackages();
  if (!packages.success) return <NoPackagesState />;

  const content = getCountryPlansHeroContent("global");
  const stats = derivePlansHeroStats(packages.data);

  return (
    <div>
      <CountriesHeader
        countryName="Global"
        content={content}
        stats={stats}
      />
      <PlansClientPage slug="global" initialData={packages.data} scope="global" />
    </div>
  );
}
