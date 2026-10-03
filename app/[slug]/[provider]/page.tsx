import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProviderDetails } from "@/components/sections/ProviderDetails";
import { ProviderPlansClient } from "@/components/plans/ProviderPlansClient";
import { displayNameFromSlug } from "@/lib/display-name";
import {
  getRegionBySlug,
  loadProviderDestinationPlans,
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
  slug: string;
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

  const result = await loadProviderDestinationPlans(slug, cleanProviderSlug);
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
    slug,
  };
}

function buildProviderMetadataFields(data: ProviderPageData) {
  const providerName =
    data.provider.name || displayNameFromSlug(data.cleanProviderSlug);
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
    <div className="container overflow-x-clip py-[var(--section-y-tight)] sm:py-[var(--section-y)]">
      <section className="grid grid-cols-1 items-start gap-4 sm:gap-6 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-8">
        <aside className="min-w-0 xl:sticky xl:top-[var(--header-h-lg)] xl:z-10 xl:max-h-[calc(100vh-var(--header-h-lg)-1.5rem)] xl:overflow-y-auto xl:overscroll-contain xl:pr-0.5 xl:[scrollbar-width:thin]">
          <ProviderDetails provider={data.provider} />
        </aside>

        <Suspense
          fallback={
            <div className="flex w-full min-w-0 flex-col gap-4">
              <div className="h-16 animate-pulse rounded-lg bg-muted" />
              <div className="h-40 animate-pulse rounded-xl border border-border bg-card" />
              <div className="h-12 animate-pulse rounded-lg bg-muted" />
              <div className="h-12 animate-pulse rounded-lg border border-border bg-card" />
            </div>
          }
        >
          <div className="min-w-0">
            <ProviderPlansClient
              plans={data.plans}
              provider={data.provider}
              destinationSlug={data.slug}
              providerSlug={data.cleanProviderSlug}
              providerName={providerName}
              locationName={data.locationName}
            />
          </div>
        </Suspense>
      </section>
    </div>
  );
}
