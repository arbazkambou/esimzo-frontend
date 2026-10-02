import type {
  CountryFaqItem,
  CountryPlansHeroContent,
  HowToChooseEsimContent,
  PlansHeroStats,
} from "@/lib/content/countries";
import { fillCountryTemplate, withDefiniteArticle } from "@/lib/display-name";
import type { Plan } from "@/lib/types/plans.types";
import { formatPrice, getEffectiveUsdPrice } from "@/lib/utils";

const SITE_URL = "https://esimzo.com";
const WEBSITE_ID = `${SITE_URL}/#website`;
/** Cap offer list size so JSON-LD stays reasonable on large plan pages. */
const JSON_LD_OFFER_LIMIT = 50;

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
  const extra = {
    planCount: String(stats.planCount),
    providerCount: String(stats.providerCount),
    startingPrice: formatPrice(stats.startingPrice),
    lastUpdated: formatLastUpdated(stats.lastUpdated),
  };

  const title = fillCountryTemplate(
    heroContent.titleTemplate,
    countryName,
    extra,
  );
  const description = fillCountryTemplate(
    heroContent.description,
    countryName,
    extra,
  );
  const hasPart: { "@id": string }[] = [];
  const graph: Record<string, unknown>[] = [];

  const offerPlans = [...plans]
    .sort((a, b) => getEffectiveUsdPrice(a) - getEffectiveUsdPrice(b))
    .slice(0, JSON_LD_OFFER_LIMIT);

  const offerListElements = offerPlans.map((plan, index) => {
    const price = Number(getEffectiveUsdPrice(plan).toFixed(2));
    const providerName = plan.provider.name;
    const providerUrl = `${SITE_URL}/${slug}/${plan.provider.slug}-provider/`;

    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: `${providerName} — ${plan.name}`,
        url: providerUrl,
        priceCurrency: "USD",
        price,
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: providerName,
        },
        itemOffered: {
          "@type": "Product",
          name: plan.name,
          category: "Travel eSIM",
          brand: {
            "@type": "Brand",
            name: providerName,
          },
        },
      },
    };
  });

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
      "@type": "ItemList",
      "@id": `${pageUrl}#offers`,
      name: `Travel eSIM plans for ${withDefiniteArticle(countryName)}`,
      description,
      numberOfItems: stats.planCount,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: offerListElements,
    },
  );

  if (faqs.length > 0) {
    const seenQuestions = new Set<string>();
    const dedupedFaqs = faqs.filter((faq) => {
      const key = faq.question.trim().toLowerCase();
      if (!key || seenQuestions.has(key)) return false;
      seenQuestions.add(key);
      return true;
    });

    hasPart.push({ "@id": `${pageUrl}#faq` });
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: `${pageUrl}#faq`,
      isPartOf: { "@id": pageId },
      mainEntity: dedupedFaqs.map((faq) => ({
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
    const howToName = fillCountryTemplate(
      howToChoose.headingTemplate,
      countryName,
      extra,
    );
    const howToDescription = fillCountryTemplate(
      howToChoose.intro,
      countryName,
      extra,
    );
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
          .map((p) => fillCountryTemplate(p, countryName, extra).trim())
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
  speedHighlight,
  includeCityCue = false,
}: {
  slug: string;
  countryName: string;
  heroContent: CountryPlansHeroContent;
  stats: PlansHeroStats;
  /** Structured speed highlight — merged into the description, not a full replace */
  speedHighlight?: {
    fastest: string;
    fastestDl: number;
  } | null;
  /** Append city-networks cue when city data exists */
  includeCityCue?: boolean;
}) {
  const pageUrl = `${SITE_URL}/${slug}/`;
  const searchName = heroContent.searchName?.trim() || countryName;
  const year = String(new Date().getFullYear());
  const extra = {
    searchName,
    planCount: String(stats.planCount),
    providerCount: String(stats.providerCount),
    startingPrice: formatPrice(stats.startingPrice),
    lastUpdated: formatLastUpdated(stats.lastUpdated),
    year,
  };

  const title = fillCountryTemplate(
    heroContent.metaTitleTemplate ?? heroContent.titleTemplate,
    countryName,
    extra,
  );

  let description: string;
  if (speedHighlight?.fastest && Number.isFinite(speedHighlight.fastestDl)) {
    const mbps = Math.round(speedHighlight.fastestDl);
    const parts = [
      `Compare ${extra.planCount} ${searchName} eSIM plans from ${extra.startingPrice}.`,
      `${speedHighlight.fastest} is fastest (${mbps} Mbps).`,
    ];
    if (includeCityCue) {
      parts.push("See speeds by network and city.");
    } else {
      parts.push("See speeds by network.");
    }
    description = parts.join(" ");
  } else {
    description = fillCountryTemplate(
      heroContent.description,
      countryName,
      extra,
    );
  }

  return {
    title,
    description,
    pageUrl,
  };
}
