import type {
  CountryFaqItem,
  CountryPlansHeroContent,
  HowToChooseEsimContent,
  PlansHeroStats,
} from "@/lib/content/countries";
import type { Plan } from "@/lib/types/plans.types";
import { formatPrice } from "@/lib/utils";

const SITE_URL = "https://esimzo.com";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template
    .replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] ?? "")
    .replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

function formatLastUpdated(value: PlansHeroStats["lastUpdated"]): string {
  if (value == null || value === "") return "daily";
  if (value instanceof Date) {
    return value.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return String(value);
}

export type CountryPlansJsonLdInput = {
  slug: string;
  countryName: string;
  heroContent: CountryPlansHeroContent;
  stats: PlansHeroStats;
  plans: Plan[];
  faqs?: CountryFaqItem[];
  howToChoose?: HowToChooseEsimContent | null;
};

/** Build Schema.org @graph for a country plans page. */
export function buildCountryPlansJsonLd({
  slug,
  countryName,
  heroContent,
  stats,
  plans,
  faqs = [],
  howToChoose = null,
}: CountryPlansJsonLdInput): Record<string, unknown> {
  const pageUrl = `${SITE_URL}/${slug}/`;
  const pageId = `${pageUrl}#webpage`;
  const values = {
    countryName,
    planCount: String(stats.planCount),
    providerCount: String(stats.providerCount),
    startingPrice: formatPrice(stats.startingPrice),
    lastUpdated: formatLastUpdated(stats.lastUpdated),
  };

  const title = fillTemplate(heroContent.titleTemplate, values);
  const description = fillTemplate(heroContent.description, values);
  const prices = plans.map((p) => p.usdPrice).filter((n) => Number.isFinite(n));
  const lowPrice = prices.length ? Math.min(...prices) : stats.startingPrice;
  const highPrice = prices.length ? Math.max(...prices) : stats.startingPrice;

  const hasPart: { "@id": string }[] = [];
  const graph: Record<string, unknown>[] = [];

  const collectionPage: Record<string, unknown> = {
    "@type": "CollectionPage",
    "@id": pageId,
    url: pageUrl,
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: {
      "@type": "Country",
      name: countryName,
    },
    inLanguage: "en-US",
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    mainEntity: { "@id": `${pageUrl}#offers` },
  };

  graph.push(
    collectionPage,
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${countryName} eSIM Plans`,
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Product",
      "@id": `${pageUrl}#offers`,
      name: `Travel eSIM plans for ${countryName}`,
      description,
      category: "Travel eSIM",
      brand: {
        "@type": "Brand",
        name: "eSIMzo",
      },
      audience: {
        "@type": "Audience",
        audienceType: "Travelers",
      },
      offers: {
        "@type": "AggregateOffer",
        url: pageUrl,
        priceCurrency: "USD",
        lowPrice: Number(lowPrice.toFixed(2)),
        highPrice: Number(highPrice.toFixed(2)),
        offerCount: stats.planCount,
        availability: "https://schema.org/InStock",
        seller: { "@id": ORGANIZATION_ID },
      },
    },
  );

  if (faqs.length > 0) {
    hasPart.push({ "@id": `${pageUrl}#faq` });
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: `${pageUrl}#faq`,
      isPartOf: { "@id": pageId },
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  if (howToChoose) {
    const howToName = fillTemplate(howToChoose.headingTemplate, values);
    const howToDescription = fillTemplate(howToChoose.intro, values);
    const steps = howToChoose.criteria
      .filter(
        (c) =>
          c.heading.trim().length > 0 &&
          c.paragraphs.some((p) => p.trim().length > 0),
      )
      .map((criterion, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: criterion.heading,
        text: criterion.paragraphs
          .map((p) => fillTemplate(p, values).trim())
          .filter(Boolean)
          .join(" "),
      }));

    if (steps.length > 0) {
      hasPart.push({ "@id": `${pageUrl}#how-to-choose` });
      graph.push({
        "@type": "HowTo",
        "@id": `${pageUrl}#how-to-choose`,
        url: `${pageUrl}#how-to-choose`,
        name: howToName,
        description: howToDescription,
        inLanguage: "en-US",
        isPartOf: { "@id": pageId },
        step: steps,
      });
    }
  }

  if (hasPart.length > 0) {
    collectionPage.hasPart = hasPart;
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildCountryPlansMetadataFields({
  slug,
  countryName,
  heroContent,
  stats,
}: {
  slug: string;
  countryName: string;
  heroContent: CountryPlansHeroContent;
  stats: PlansHeroStats;
}) {
  const pageUrl = `${SITE_URL}/${slug}/`;
  const values = {
    countryName,
    planCount: String(stats.planCount),
    providerCount: String(stats.providerCount),
    startingPrice: formatPrice(stats.startingPrice),
    lastUpdated: formatLastUpdated(stats.lastUpdated),
  };

  const title = fillTemplate(heroContent.titleTemplate, values);
  const description = fillTemplate(heroContent.description, values);

  return {
    title,
    description,
    pageUrl,
  };
}
