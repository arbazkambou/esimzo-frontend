import Hero from "@/components/sections/Hero";
import CountriesSection from "@/components/sections/CountriesSection";
import RegionsSection from "@/components/sections/RegionsSection";
import GetProviders from "@/components/getters/GetProviders";
import FAQSection from "@/components/sections/FAQSection";
import CompareAndSurf from "@/components/sections/CompareAndSurf";

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
      <main className="flex-1">
        <Hero />
        <GetProviders />
        <CountriesSection />
        <RegionsSection />
        <CompareAndSurf />
        <FAQSection faqs={faqs} />
      </main>
    </div>
  );
}
