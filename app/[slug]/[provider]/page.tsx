import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProviderDetails } from "@/components/sections/ProviderDetails";
import { ProviderPlansClient } from "@/components/plans/ProviderPlansClient";
import { displayNameFromSlug, withDefiniteArticle } from "@/lib/display-name";
import {
  getCountries,
  getRegionBySlug,
  getRegions,
  loadProviderDestinationPlans,
} from "@/lib/services/plans/plans.services";
import {
  getAdditionalCountryInfo,
  getAdditionalGlobalInfo,
  getAdditionalRegionInfo,
} from "@/lib/services/additional-info/info.services";
import type { Plan, Provider } from "@/lib/types/plans.types";

const SITE_URL = "https://esimzo.com";

type PropType = {
  params: Promise<{ slug: string; provider: string }>;
};

type DestinationKind = "global" | "region" | "country";

async function providersForDestination(
  slug: string,
  kind: DestinationKind,
): Promise<string[]> {
  const info =
    kind === "global"
      ? await getAdditionalGlobalInfo()
      : kind === "region"
        ? await getAdditionalRegionInfo(slug)
        : await getAdditionalCountryInfo(slug);

  if (!info.success || !Array.isArray(info.data.providers)) return [];

  return info.data.providers
    .map((provider) => provider.slug)
    .filter((providerSlug): providerSlug is string => Boolean(providerSlug));
}

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

/**
 * Prerender destination × provider pages that actually have coverage.
 * Uses additional-info (same source as the provider cards on [slug]).
 */
export async function generateStaticParams() {
  const [countries, regions] = await Promise.all([
    getCountries(),
    getRegions(),
  ]);

  const destinations: { slug: string; kind: DestinationKind }[] = [
    { slug: "global", kind: "global" },
  ];

  if (countries.success) {
    for (const country of countries.data) {
      if (country.slug) {
        destinations.push({ slug: country.slug, kind: "country" });
      }
    }
  }

  if (regions.success) {
    for (const region of regions.data) {
      if (region.slug) {
        destinations.push({ slug: region.slug, kind: "region" });
      }
    }
  }

  const params: { slug: string; provider: string }[] = [];
  const concurrency = 8;

  for (let i = 0; i < destinations.length; i += concurrency) {
    const batch = destinations.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(async ({ slug, kind }) => {
        const providerSlugs = await providersForDestination(slug, kind);
        return providerSlugs.map((providerSlug) => ({
          slug,
          provider: `${providerSlug}-provider`,
        }));
      }),
    );
    for (const chunk of batchResults) params.push(...chunk);
  }

  return params;
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
  const destination = withDefiniteArticle(data.locationName);

  return (
    <div className="container overflow-x-clip py-[var(--section-y-tight)] sm:py-[var(--section-y)]">
      <section className="grid grid-cols-1 items-start gap-4 sm:gap-6 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-8">
        <aside className="min-w-0 xl:sticky xl:top-[var(--header-h-lg)] xl:z-10 xl:max-h-[calc(100vh-var(--header-h-lg)-1.5rem)] xl:overflow-y-auto xl:overscroll-contain xl:pr-0.5 xl:[scrollbar-width:thin]">
          <ProviderDetails provider={data.provider} />
        </aside>

        <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
          {/*
            Inline in this Server Component so crawlers / View Source get real
            <h1> HTML. Do not move into ProviderPlansClient ("use client").
          */}
          <header className="flex min-w-0 flex-col gap-1.5">
            <h1 className="wrap-break-word text-h3 text-brand-navy sm:text-h1">
              <span className="text-primary">{providerName}</span> eSIM Data
              Plans for{" "}
              <span className="mt-0.5 block text-primary sm:mt-0 sm:inline">
                {destination}
              </span>
            </h1>
            <p className="max-w-2xl text-pretty text-body-sm text-text-secondary sm:text-body">
              Compare this provider&apos;s country, regional, and global plans
              — then buy direct with referral tracking.
            </p>
          </header>

          <ProviderPlansClient
            plans={data.plans}
            provider={data.provider}
            destinationSlug={data.slug}
            providerSlug={data.cleanProviderSlug}
          />
        </div>
      </section>
    </div>
  );
}
