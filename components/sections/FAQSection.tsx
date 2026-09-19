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
  heading = "Frequently Asked Questions",
}: Props) {
  return (
    <section className="py-14 sm:py-20 bg-background relative">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-[#EBF5FE] dark:bg-[#0EA5E9]/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0284C7] dark:text-[#38BDF8] mb-3.5 select-none">
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E48] dark:text-white tracking-tight leading-tight mb-3">
            {heading}{" "}
            <span className="text-[#FF5A22] block">
              (Everything You Need To Know)
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto font-normal">
            Clear answers to common questions about choosing, installing, and using prepaid eSIMs with eSIMzo.
          </p>
        </div>

        {/* Accordion items — each in its own refined card */}
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card px-5 sm:px-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-sky-300 dark:hover:border-sky-600 data-[state=open]:border-sky-400 data-[state=open]:shadow-sm transition-all"
            >
              <AccordionTrigger className="text-sm sm:text-base font-bold text-[#0B1E48] dark:text-white hover:text-[#0284C7] dark:hover:text-sky-400 hover:no-underline py-4.5 sm:py-5 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-[13.5px] text-slate-500 dark:text-slate-400 pb-5 leading-relaxed font-normal">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
