"use client";

import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ChevronDown, ArrowRight, MessageSquareCheck } from "lucide-react";

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
    <section id="faq" className="py-14 sm:py-20 bg-background relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute left-1/4 top-0 -translate-x-1/2 w-96 h-96 rounded-full bg-primary-soft/30 dark:bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary/15 blur-3xl pointer-events-none" />

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center rounded-full bg-primary-soft dark:bg-primary/15 px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary dark:text-primary mb-3.5 select-none">
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground dark:text-white tracking-tight leading-tight mb-3">
            {heading}{" "}
            <span className="text-primary block">
              (Everything You Need To Know)
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
            Clear, honest answers to common questions about choosing, installing, and traveling with prepaid eSIMs — so you land connected without surprises.
          </p>
        </div>

        {/* Styled Accordion */}
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card px-5 sm:px-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-primary/30 dark:hover:border-primary data-[state=open]:border-primary dark:data-[state=open]:border-primary data-[state=open]:shadow-sm transition-all duration-200 overflow-hidden group"
            >
              <AccordionTrigger className="hover:no-underline py-4.5 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 [&>svg]:hidden">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  {/* Number Badge */}
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft dark:bg-primary/20 text-primary dark:text-primary font-extrabold text-xs border border-primary/15 dark:border-primary/20 group-data-[state=open]:bg-primary-soft group-data-[state=open]:text-primary group-data-[state=open]:border-primary/15 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Question Text */}
                  <span className="text-sm sm:text-base font-bold text-foreground dark:text-white group-hover:text-primary group-data-[state=open]:text-primary transition-colors leading-snug">
                    {faq.question}
                  </span>
                </div>

                {/* Animated Chevron Pill */}
                <div className="flex h-7 w-7 sm:h-7.5 sm:w-7.5 shrink-0 items-center justify-center rounded-full bg-primary-soft dark:bg-slate-800 text-primary group-hover:bg-primary group-hover:text-white group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all duration-200">
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </div>
              </AccordionTrigger>

              <AccordionContent className="text-xs sm:text-[13.5px] text-slate-500 dark:text-slate-400 pb-5 sm:pb-6 pl-10 sm:pl-12 pr-2 leading-relaxed font-normal">
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom Helper Support Card */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-primary-soft to-white dark:from-slate-900/50 dark:to-card p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.03)] text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white dark:bg-card border border-primary/15 dark:border-slate-700 text-primary shadow-2xs">
              <MessageSquareCheck className="h-5 w-5 stroke-[2.2]" />
            </div>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-foreground dark:text-white mb-1.5">
            Still have questions about choosing an eSIM?
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mb-5 leading-relaxed max-w-md mx-auto font-normal">
            Search your destination country to view instant plan comparisons, real prices per GB, and verified network partners.
          </p>
          <Link
            href="#destinations"
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 dark:border-primary/30 bg-white dark:bg-card px-6 py-2.5 text-xs sm:text-sm font-semibold text-foreground dark:text-slate-200 hover:text-primary hover:border-primary shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
          >
            <span>Compare Destination Plans</span>
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
