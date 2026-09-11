import { ProviderPackagesCard } from "@/components/cards/ProviderPackagesCard";
import { ProviderDetails } from "@/components/sections/ProviderDetails";
import ProviderPackageHeader from "@/components/sections/ProviderPackageHeader";
import SeoPage from "@/components/seo-content/SeoPage";

import NoPackagesState from "@/components/sections/NoPackagesFound";
import { getProviderBySearchParams } from "@/lib/services/plans/plans.services";
// import { getSeoContentPage } from "@/lib/services/seo/seo.services";

type PropType = {
  params: Promise<{ slug: string; provider: string }>;
};

export default async function Page({ params }: PropType) {
  const { slug, provider } = await params;

  const isProviderPage = provider.endsWith("-provider");

  // CASE 1: Provider page → Call Packages API
  if (isProviderPage) {
    // remove -provider then send the slug into api
    const cleanProviderSlug = provider.replace("-provider", "");
    const result = await getProviderBySearchParams(slug, cleanProviderSlug);
    if (!result.success) return <NoPackagesState />;

    const { plans, provider: providerData } = result.data;

    return (
      <main className="container py-8 flex flex-col gap-8">
        <ProviderPackageHeader
          providerName={cleanProviderSlug}
          countryName={slug}
        />

        <section className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8 items-start">
          <aside className="xl:sticky xl:top-24">
            <ProviderDetails provider={providerData} />
          </aside>

          <div className="flex flex-col gap-4 w-full">
            {plans.map((item) => (
              <ProviderPackagesCard key={item.id} data={item} />
            ))}
          </div>
        </section>
      </main>
    );
  }

  // CASE 2: SEO Content Page → Call SEO API
  // call supabase api with the links slug here for the all seo link pages don not change the above provider logic at any cost
  // const seoData = await getSeoContentPage(slug);

  return <SeoPage data={slug} />;
}
