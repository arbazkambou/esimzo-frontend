import PlansClientPage from "@/components/plans/PlansClientPage";
import CountriesHeader from "@/components/sections/CountriesHeader";
import NoPackagesState from "@/components/sections/NoPackagesFound";
import { getCountryPlansHeroContent } from "@/lib/content/countries";
import { displayNameFromSlug } from "@/lib/display-name";
import { derivePlansHeroStats } from "@/lib/plans/derive-plans-hero-stats";
import { getRegionalPackagesBySlug } from "@/lib/services/plans/plans.services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// export async function generateStaticParams() {
//   const regions = await getRegions();
//   return regions.map((region) => ({
//     slug: region.slug,
//   }));
// }

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const packages = await getRegionalPackagesBySlug(slug);
  if (!packages.success) return <NoPackagesState />;

  const countryName = displayNameFromSlug(slug);

  const content = getCountryPlansHeroContent(slug);
  const stats = derivePlansHeroStats(packages.data);

  return (
    <div>
      <CountriesHeader
        countryName={countryName}
        content={content}
        stats={stats}
      />
      <PlansClientPage slug={slug} initialData={packages.data} scope="region" />
    </div>
  );
}
