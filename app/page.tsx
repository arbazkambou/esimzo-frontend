import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TopDestinationsSection from "@/components/sections/TopDestinationsSection";
import CountriesSection from "@/components/sections/CountriesSection";
import RegionsSection from "@/components/sections/RegionsSection";
import GetProviders from "@/components/getters/GetProviders";
import FAQSection from "@/components/sections/FAQSection";
import CompareAndSurf from "@/components/sections/CompareAndSurf";
import StatsBar from "@/components/sections/StatsBar";
import WhyEsimzo from "@/components/sections/WhyEsimzo";

export const metadata: Metadata = {
  title: "Compare Travel eSIM Plans | eSIMzo — Find the Best eSIM Deal",
  description:
    "Compare 30,000+ travel eSIM plans from different providers in 200+ countries. Sort by price per GB, validity, speed rules, and real traveler reviews.",
  alternates: {
    canonical: "https://esimzo.com/",
  },
  openGraph: {
    title: "Compare Travel eSIM Plans Without Sponsored Rankings | eSIMzo",
    description:
      "See real prices, fair-use limits, hotspot rules, and verified reviews — then buy direct from the provider. Land connected.",
    url: "https://esimzo.com/",
    siteName: "eSIMzo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Travel eSIM Plans Without Sponsored Rankings | eSIMzo",
    description:
      "See real prices, fair-use limits, hotspot rules, and verified reviews — then buy direct from the provider. Land connected.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://esimzo.com/#website",
      "url": "https://esimzo.com/",
      "name": "eSIMzo",
      "description":
        "Compare 30,000+ travel eSIM plans from different providers in 200+ countries. Sort by price per GB, validity, speed rules, and real traveler reviews.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://esimzo.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://esimzo.com/#organization",
      "name": "eSIMzo",
      "url": "https://esimzo.com/",
      "logo": "https://esimzo.com/favicon.ico",
    },
  ],
};

const faqs = [
  {
    question: "What is eSIM?",
    answer:
      "eSIM is a virtual SIM card that can be activated and managed remotely. It allows you to use your phone without a physical SIM card, making it easier to travel and switch plans as needed.",
  },
  {
    question: "How does eSIM work?",
    answer:
      "eSIM works by connecting to a mobile network through a remote server. You can activate and manage your eSIM plan through a mobile app or website, and it can be used with any compatible device.",
  },
  {
    question: "What are the benefits of eSIM?",
    answer:
      "The benefits of eSIM include convenience, flexibility, and cost savings. You can activate and manage your eSIM plan remotely, and it can be used with any compatible device.",
  },
  {
    question: "What are the benefits of eSIM?",
    answer:
      "The benefits of eSIM include convenience, flexibility, and cost savings. You can activate and manage your eSIM plan remotely, and it can be used with any compatible device.",
  },
  {
    question: "What are the benefits of eSIM?",
    answer:
      "The benefits of eSIM include convenience, flexibility, and cost savings. You can activate and manage your eSIM plan remotely, and it can be used with any compatible device.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <Hero />
        <GetProviders />
        <StatsBar />
        <TopDestinationsSection />
        <CountriesSection />
        <RegionsSection />
        <CompareAndSurf />
        <WhyEsimzo />
        <FAQSection faqs={faqs} />
      </main>
    </div>
  );
}
