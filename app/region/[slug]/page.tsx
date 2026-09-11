import PlansClientPage from "@/components/plans/PlansClientPage";
import CountriesHeader from "@/components/sections/CountriesHeader";
import NoPackagesState from "@/components/sections/NoPackagesFound";
import {
  getRegionalPackagesBySlug,
  getRegions,
} from "@/lib/services/plans/plans.services";

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

  return (
    <div>
      <CountriesHeader slug={slug} />
      <PlansClientPage slug={slug} initialData={packages.data} scope="region" />
    </div>
  );
}
