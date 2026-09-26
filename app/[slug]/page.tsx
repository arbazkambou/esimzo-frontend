import GetCountryProvidersAndTopDestinations from "@/components/getters/GetCountryProviders";
import PlansClientPage from "@/components/plans/PlansClientPage";
import CountriesHeader from "@/components/sections/CountriesHeader";
import CountryVsRegionalSection from "@/components/sections/CountryVsRegionalSection";
import DataNeedsSection from "@/components/sections/DataNeedsSection";
import EsimVsLocalSection from "@/components/sections/EsimVsLocalSection";
import FAQSection from "@/components/sections/FAQSection";
import HowToChooseEsimSection from "@/components/sections/HowToChooseEsimSection";
import NetworkCoverageSection from "@/components/sections/NetworkCoverageSection";
import NoPackagesState from "@/components/sections/NoPackagesFound";
import PhoneCompatibilitySection from "@/components/sections/PhoneCompatibilitySection";
import TravelerTipsSection from "@/components/sections/TravelerTipsSection";
import UnlimitedPlansSection from "@/components/sections/UnlimitedPlansSection";
import {
  getCountryDataNeedsContent,
  getCountryEsimVsLocalContent,
  getCountryFaqsContent,
  getCountryHowToChooseContent,
  getCountryNetworkCoverageContent,
  getCountryPhoneCompatibilityContent,
  getCountryPlansHeroContent,
  getCountryTravelerTipsContent,
  getCountryUnlimitedPlansContent,
  getCountryVsRegionalContent,
  resolveCountryFaqs,
} from "@/lib/content/countries";
import { displayNameFromSlug } from "@/lib/display-name";
import { derivePlansHeroStats } from "@/lib/plans/derive-plans-hero-stats";
import {
  buildCountryPlansJsonLd,
  buildCountryPlansMetadataFields,
} from "@/lib/seo/country-plans-jsonld";
import { getCountryPackagesBySlug } from "@/lib/services/plans/plans.services";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "eSIMzo — Compare travel eSIM plans",
} as const;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const packages = await getCountryPackagesBySlug(slug);
  const hasPlans = packages.success && packages.data.length > 0;
  const countryName = displayNameFromSlug(slug);
  const heroContent = getCountryPlansHeroContent(slug);
  const stats = hasPlans
    ? derivePlansHeroStats(packages.data)
    : {
        planCount: 0,
        providerCount: 0,
        startingPrice: 0,
        lastUpdated: "daily" as const,
      };

  const { title, description, pageUrl } = buildCountryPlansMetadataFields({
    slug,
    countryName,
    heroContent,
    stats,
  });

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    robots: hasPlans
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "eSIMzo",
      locale: "en_US",
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

// export async function generateStaticParams() {
//   const countries = await getCountries();
//   return countries.map((country) => ({
//     slug: country.slug,
//   }));
// }

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const packages = await getCountryPackagesBySlug(slug);

  if (!packages.success) return <NoPackagesState />;
  if (packages.data.length === 0) return <NoPackagesState />;

  const countryName = displayNameFromSlug(slug);

  const content = getCountryPlansHeroContent(slug);
  const howToChooseContent = getCountryHowToChooseContent(slug);
  const dataNeedsContent = getCountryDataNeedsContent(slug);
  const networkCoverageContent = getCountryNetworkCoverageContent(slug);
  const unlimitedPlansContent = getCountryUnlimitedPlansContent(slug);
  const esimVsLocalContent = getCountryEsimVsLocalContent(slug);
  const countryVsRegionalContent = getCountryVsRegionalContent(slug);
  const phoneCompatibilityContent = getCountryPhoneCompatibilityContent(slug);
  const travelerTipsContent = getCountryTravelerTipsContent(slug);
  const faqsContent = getCountryFaqsContent(slug);
  const stats = derivePlansHeroStats(packages.data);
  const resolvedFaqs = faqsContent
    ? resolveCountryFaqs(faqsContent, countryName, stats)
    : null;

  const jsonLd = buildCountryPlansJsonLd({
    slug,
    countryName,
    heroContent: content,
    stats,
    plans: packages.data,
    faqs: resolvedFaqs?.faqs,
    howToChoose: howToChooseContent,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountriesHeader
        countryName={countryName}
        content={content}
        stats={stats}
      />
      <div className="container">
        <PlansClientPage slug={slug} initialData={packages.data} />
        {howToChooseContent ? (
          <HowToChooseEsimSection
            countryName={countryName}
            content={howToChooseContent}
          />
        ) : null}
        {dataNeedsContent ? (
          <DataNeedsSection
            countryName={countryName}
            content={dataNeedsContent}
          />
        ) : null}
        {networkCoverageContent ? (
          <NetworkCoverageSection
            countryName={countryName}
            content={networkCoverageContent}
          />
        ) : null}
        {unlimitedPlansContent ? (
          <UnlimitedPlansSection
            countryName={countryName}
            content={unlimitedPlansContent}
          />
        ) : null}
        {esimVsLocalContent ? (
          <EsimVsLocalSection
            countryName={countryName}
            content={esimVsLocalContent}
          />
        ) : null}
        {countryVsRegionalContent ? (
          <CountryVsRegionalSection
            countryName={countryName}
            content={countryVsRegionalContent}
          />
        ) : null}
        {phoneCompatibilityContent ? (
          <PhoneCompatibilitySection
            countryName={countryName}
            content={phoneCompatibilityContent}
          />
        ) : null}
        {travelerTipsContent ? (
          <TravelerTipsSection
            countryName={countryName}
            content={travelerTipsContent}
          />
        ) : null}
        <GetCountryProvidersAndTopDestinations slug={slug} />
        {resolvedFaqs && resolvedFaqs.faqs.length > 0 ? (
          <FAQSection faqs={resolvedFaqs.faqs} heading={resolvedFaqs.heading} />
        ) : null}
      </div>
    </>
  );
}
