"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { CityNetworksViewModel } from "@/lib/city-networks/types";

type Props = {
  country: string;
  placeLabelSingular: string;
  faq: CityNetworksViewModel["faq"];
  tip: CityNetworksViewModel["tip"];
};

export default function CityNetworkFaqTip({
  country,
  placeLabelSingular,
  faq,
  tip,
}: Props) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-bold leading-snug text-foreground sm:text-[17px] dark:text-white">
          Best network by {placeLabelSingular} in {country}: common questions
        </h3>
        {faq.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem
                key={`${index}-${item.question}`}
                value={`city-faq-${index}`}
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
        aria-label="Multi-city eSIM tip"
      >
        <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary select-none dark:bg-card dark:text-primary">
          Visiting more than one city?
        </span>
        <p className="text-base font-bold leading-snug text-foreground sm:text-[17px] dark:text-white">
          {tip.title}
        </p>
        <p className="text-xs leading-relaxed font-normal text-text-secondary sm:text-[13.5px]">
          {tip.text}
        </p>
        <Button asChild size="lg" className="mt-1 w-full">
          <Link href={tip.ctaHref}>{tip.ctaLabel}</Link>
        </Button>
        <Link
          href={tip.secondaryHref}
          className="text-center text-xs font-bold text-primary underline-offset-2 hover:underline sm:text-sm"
        >
          {tip.secondaryLabel}
        </Link>
      </aside>
    </div>
  );
}
