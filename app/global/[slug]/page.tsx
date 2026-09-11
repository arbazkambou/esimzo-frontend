import { ProviderPackagesCard } from "@/components/cards/ProviderPackagesCard";
import { ProviderDetails } from "@/components/sections/ProviderDetails";
import ProviderPackageHeader from "@/components/sections/ProviderPackageHeader";
import NoPackagesState from "@/components/sections/NoPackagesFound";
import { getGlobalPackagesBySlug } from "@/lib/services/plans/plans.services";

type PropType = {
  params: Promise<{ slug: string }>;
};

export default async function page({ params }: PropType) {
  const { slug } = await params;
  const cleanProviderSlug = slug.replace("-provider", "");

  const result = await getGlobalPackagesBySlug(cleanProviderSlug);
  if (!result.success) return <NoPackagesState />;

  const { plans, provider: providerData } = result.data;

  return (
    <main className="container py-8 flex flex-col gap-8">
      {/* Header spanning full width */}
      <ProviderPackageHeader
        providerName={cleanProviderSlug}
        countryName={"Global"}
      />

      {/* Main Grid Content */}
      <section className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8 items-start">
        {/* Left Side: Sticky Details */}
        <aside className="xl:sticky xl:top-24">
          <ProviderDetails provider={providerData} />
          {/* You can add your Promo Code component here later */}
        </aside>

        {/* Right Side: Packages List */}
        <div className="flex flex-col gap-4 w-full">
          {plans.map((item) => (
            <ProviderPackagesCard key={item.id} data={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
