"use client";

import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section
      id="faq"
      className="py-[var(--section-y-tight)] bg-background relative"
    >
      <div className="container-narrow relative z-10">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-3.5 inline-flex items-center justify-center rounded-full bg-primary-soft px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none">
            FAQ
          </div>
          <h2 className="text-h2 mb-3 text-balance text-brand-navy">
            {heading}
          </h2>
          <p className="mx-auto max-w-prose text-body-sm leading-relaxed text-text-secondary">
            Clear answers about choosing, installing, and traveling with prepaid
            eSIMs.
          </p>
        </div>

        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-lg border border-primary/20 bg-primary-soft p-[var(--card-pad-lg)] text-center">
          <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-lg border border-primary/20 bg-card text-primary">
            <CircleHelp className="size-5" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="text-h4 mb-1.5 text-brand-navy">
            Still have questions about choosing an eSIM?
          </h3>
          <p className="text-body-sm text-text-secondary mb-5 mx-auto max-w-prose">
            Search your destination to compare plans, prices per GB, and
            networks.
          </p>
          <Button asChild>
            <Link href="#destinations">
              Compare destination plans
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
