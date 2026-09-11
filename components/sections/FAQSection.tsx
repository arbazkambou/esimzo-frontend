import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  faqs: FAQ[];
  heading?: string;
};

export default function FAQSection({
  faqs,
  heading = "Frequently asked questions",
}: Props) {
  return (
    <section className="py-16 bg-background">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
          {heading}
        </h2>

        {/* Accordion items — each in its own card */}
        <Accordion type="single" collapsible className="flex flex-col md:max-w-3xl mx-auto gap-3 last:mb-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border last:border-b bg-card px-5 hover:border-foreground data-[state=open]:border-foreground shadow-none transition-colors"
            >
              <AccordionTrigger className="text-sm md:text-base lg:text-xl font-medium text-foreground hover:no-underline py-5 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
