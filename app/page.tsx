import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import CountriesSection from "@/components/sections/CountriesSection";
import RegionsSection from "@/components/sections/RegionsSection";
import GetProviders from "@/components/getters/GetProviders";
import CompareAndSurf from "@/components/sections/CompareAndSurf";
import WhyEsimzo from "@/components/sections/WhyEsimzo";
import FAQSection from "@/components/sections/FAQSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import CtaBanner from "@/components/sections/CtaBanner";

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
    {
      "@type": "FAQPage",
      "@id": "https://esimzo.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an eSIM and how does it work for international travel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An eSIM (embedded SIM) is a digital microchip built directly into modern smartphones that replaces physical plastic SIM cards. Instead of searching for SIM booths at foreign airports, you purchase a prepaid data profile online, scan a QR code, and download the carrier profile directly to your device. When you arrive at your destination, your phone connects to local 4G/5G networks instantly."
          }
        },
        {
          "@type": "Question",
          "name": "When should I purchase and install my travel eSIM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The ideal time to install your eSIM is 1 to 2 days before departure while connected to stable home Wi-Fi. Most travel eSIM validity periods do not begin until the eSIM actually latches onto a supported cellular tower abroad. Installing at home ensures your phone is pre-configured so you simply toggle on Data Roaming the moment your flight lands."
          }
        },
        {
          "@type": "Question",
          "name": "How do I check if my phone is compatible and carrier-unlocked?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To use any travel eSIM, your phone must be carrier-unlocked and have eSIM hardware. Almost all iPhones from the XS/XR (2018) onwards, Google Pixels from Pixel 3 onwards, and Samsung Galaxy S20/Fold/Flip devices support eSIM."
          }
        },
        {
          "@type": "Question",
          "name": "Can I keep my WhatsApp, iMessage, and primary phone number active?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Modern smartphones support Dual SIM Dual Standby. You can keep your primary physical SIM active to receive SMS verification codes and keep your existing WhatsApp or iMessage active, while routing cellular data exclusively through your travel eSIM."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'Fair-Use Policy' (FUP) mean on unlimited plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In international travel eSIMs, 'Unlimited' rarely means unmetered full-speed gigabytes. Most providers enforce a Fair-Use Policy (FUP) that caps high-speed 5G/4G data at 1GB to 3GB per day. Once reached, connection speeds throttle to 128kbps–512kbps until midnight. eSIMzo explicitly surfaces these throttle caps."
          }
        },
        {
          "@type": "Question",
          "name": "Can I share my data via mobile hotspot / tethering?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most travel eSIMs permit mobile hotspot sharing with laptops, tablets, or travel companions. However, some unlimited plans and discount operators disable tethering in their APN carrier profile. eSIMzo checks and flags hotspot permissions for every plan."
          }
        },
        {
          "@type": "Question",
          "name": "How do top-ups work if I run low on data while abroad?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If you run out of data abroad, top-up options vary by brand. Leading providers let you add more GB or extra days directly through their app or website without needing to scan a new QR code. eSIMzo indicates which plans support seamless in-profile top-ups."
          }
        },
        {
          "@type": "Question",
          "name": "Why compare on eSIMzo instead of buying from the first provider on Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Search results and travel blogs are heavily influenced by affiliate commissions, often promoting the highest-paying brands rather than the best deals. eSIMzo independently compares 30,000+ plans across 50+ providers with unbiased sorting by price-per-GB."
          }
        }
      ]
    },
  ],
};

const faqs = [
  {
    question: "What is an eSIM and how does it work for international travel?",
    answer:
      "An eSIM (embedded SIM) is a digital microchip built directly into modern smartphones that replaces physical plastic SIM cards. Instead of searching for SIM booths at foreign airports, you purchase a prepaid data profile online, scan a QR code, and download the carrier profile directly to your device. When you arrive at your destination, your phone connects to local 4G/5G networks instantly.",
  },
  {
    question: "When should I purchase and install my travel eSIM?",
    answer:
      "The ideal time to install your eSIM is 1 to 2 days before departure while connected to stable home Wi-Fi. Most travel eSIM validity periods do not begin until the eSIM actually latches onto a supported cellular tower abroad. Installing at home ensures your phone is pre-configured so you simply toggle on Data Roaming the moment your flight lands.",
  },
  {
    question: "How do I check if my phone is compatible and carrier-unlocked?",
    answer:
      "To use any travel eSIM, your phone must be carrier-unlocked (not tied to an active cellular payment contract) and have eSIM hardware. Almost all iPhones from the XS/XR (2018) onwards, Google Pixels from Pixel 3 onwards, and Samsung Galaxy S20/Fold/Flip devices support eSIM. You can check unlock status in iOS Settings > General > About > 'Carrier Lock' (should display 'No SIM restrictions') or under SIM Manager on Android.",
  },
  {
    question: "Can I keep my WhatsApp, iMessage, and primary phone number active?",
    answer:
      "Yes! Modern smartphones support Dual SIM Dual Standby. You can keep your primary physical SIM active to receive SMS verification codes (2FA, banking) and keep your existing WhatsApp or iMessage active, while routing cellular data exclusively through your travel eSIM. Just ensure data roaming is switched off on your domestic carrier line to prevent roaming fees.",
  },
  {
    question: "What does 'Fair-Use Policy' (FUP) mean on unlimited plans?",
    answer:
      "In international travel eSIMs, 'Unlimited' rarely means unmetered full-speed gigabytes. Most providers enforce a Fair-Use Policy (FUP) that caps high-speed 5G/4G data at 1GB to 3GB per day. Once reached, connection speeds throttle to 128kbps–512kbps until midnight. eSIMzo explicitly surfaces these throttle caps so you can choose whether a fixed-data bundle is faster and better value.",
  },
  {
    question: "Can I share my data via mobile hotspot / tethering?",
    answer:
      "Most travel eSIMs permit mobile hotspot sharing with laptops, tablets, or travel companions. However, some unlimited plans and discount operators disable tethering in their APN carrier profile. eSIMzo checks and flags hotspot permissions for every plan so you never get stuck unable to work or share your data.",
  },
  {
    question: "How do top-ups work if I run low on data while abroad?",
    answer:
      "If you run out of data abroad, top-up options vary by brand. Leading providers (such as Airalo, Nomad, and Saily) let you add more GB or extra days directly through their app or website without needing to scan a new QR code. Other discount providers require installing a fresh profile. eSIMzo indicates which plans support seamless in-profile top-ups.",
  },
  {
    question: "Why compare on eSIMzo instead of buying from the first provider on Google?",
    answer:
      "Search results and travel blogs are heavily influenced by affiliate commissions, often promoting the highest-paying brands rather than the best deals. eSIMzo independently compares 30,000+ plans across 50+ providers. We uncover real cost-per-GB, verify local carrier roaming partners, highlight speed rules, and never sell top spots to sponsors.",
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
        <StatsBar />
        <CountriesSection />
        <RegionsSection />
        <CompareAndSurf />
        <WhyEsimzo />
        <GetProviders />
        <ReviewsSection />
        <FAQSection faqs={faqs} />
        <CtaBanner />
      </main>
    </div>
  );
}
