"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { NetworkSpeedsViewModel } from "@/lib/network-speeds/types";

type Props = {
  country: string;
  faq: NetworkSpeedsViewModel["faq"];
  tip: NetworkSpeedsViewModel["tip"];
};

export default function NetworkSpeedsFaqTip({ country, faq, tip }: Props) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-bold leading-snug text-foreground sm:text-[17px] dark:text-white">
          {country} mobile internet: common questions
        </h3>
        {faq.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem
                key={`${index}-${item.question}`}
                value={`speed-faq-${index}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : null}
      </div>

      <aside
        className="flex flex-col gap-3.5 rounded-2xl border border-primary/20 bg-primary-soft p-5 sm:p-6 dark:border-primary/30 dark:bg-primary/10"
        aria-label="Choosing a network for your eSIM"
      >
        <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-card dark:text-primary">
          eSIM tip
        </span>
        <p className="text-base font-bold leading-snug text-foreground sm:text-[17px] dark:text-white">
          {tip.title}
        </p>
        <p className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
          {tip.text}
        </p>
        <ul className="flex flex-col gap-2">
          {tip.uses.map((use) => (
            <li
              key={use.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 text-xs text-text-secondary sm:text-[13.5px] dark:border-slate-800 dark:bg-card"
            >
              <span>{use.label}</span>
              <strong className="text-right font-bold text-foreground dark:text-white">
                {use.network}
              </strong>
            </li>
          ))}
        </ul>
        <Button asChild variant="default" size="lg" className="mt-1 w-full">
          <Link href={tip.ctaHref}>{tip.ctaLabel}</Link>
        </Button>
      </aside>
    </div>
  );
}
