import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProviderPackagesCard } from "@/components/cards/ProviderPackagesCard";
import { ProviderDetails } from "@/components/sections/ProviderDetails";
import ProviderPackageHeader from "@/components/sections/ProviderPackageHeader";
import { displayNameFromSlug } from "@/lib/display-name";
import {
  getGlobalPackagesBySlug,
  getProviderBySearchParams,
  getRegionBySlug,
  getRegionalPackagesByProvider,
} from "@/lib/services/plans/plans.services";
import type { Plan, Provider } from "@/lib/types/plans.types";

const SITE_URL = "https://esimzo.com";

type PropType = {
  params: Promise<{ slug: string; provider: string }>;
};

type ProviderPageData = {
  cleanProviderSlug: string;
  locationName: string;
  pageUrl: string;
  plans: Plan[];
  provider: Provider;
};

async function loadProviderPage(
  slug: string,
  provider: string,
): Promise<ProviderPageData | null> {
  if (!provider.endsWith("-provider")) return null;

  const cleanProviderSlug = provider.replace(/-provider$/, "");
  if (!cleanProviderSlug) return null;

  const isGlobal = slug.toLowerCase() === "global";
  const region = isGlobal ? null : await getRegionBySlug(slug);

  const result = isGlobal
    ? await getGlobalPackagesBySlug(cleanProviderSlug)
    : region
      ? await getRegionalPackagesByProvider(slug, cleanProviderSlug)
      : await getProviderBySearchParams(slug, cleanProviderSlug);

  if (!result.success || result.data.plans.length === 0) return null;

  const locationName = isGlobal
    ? "Global"
    : (region?.name ?? displayNameFromSlug(slug));

  return {
    cleanProviderSlug,
    locationName,
    pageUrl: `${SITE_URL}/${slug}/${provider}/`,
    plans: result.data.plans,
    provider: result.data.provider,
  };
}

function buildProviderMetadataFields(data: ProviderPageData) {
  const providerName = data.provider.name || displayNameFromSlug(data.cleanProviderSlug);
  const title = `${providerName} eSIM Plans for ${data.locationName}`;
  const description = `Compare ${providerName} eSIM data plans for ${data.locationName}. See prices, data allowance, validity, and features — then buy direct from the provider.`;
  return { title, description, pageUrl: data.pageUrl, providerName };
}

export async function generateMetadata({
  params,
}: PropType): Promise<Metadata> {
  const { slug, provider } = await params;
  const data = await loadProviderPage(slug, provider);
  if (!data) {
    return {
      title: "Provider not found",
      robots: { index: false, follow: false },
    };
  }

  const { title, description, pageUrl } = buildProviderMetadataFields(data);

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "eSIMzo",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: PropType) {
  const { slug, provider } = await params;
  const data = await loadProviderPage(slug, provider);
  if (!data) notFound();

  const { providerName } = buildProviderMetadataFields(data);

  return (
    <div className="container py-8 flex flex-col gap-8">
      <ProviderPackageHeader
        providerName={providerName}
        countryName={data.locationName}
      />

      <section className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8 items-start">
        <aside className="xl:sticky xl:top-24">
          <ProviderDetails provider={data.provider} />
        </aside>

        <div className="flex flex-col gap-4 w-full">
          {data.plans.map((item) => (
            <ProviderPackagesCard key={item.id} data={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
