"use client";

import React, { useEffect, useRef, useState } from "react";
import { BadgeCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Provider } from "@/lib/types/plans.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PromoCodeCard } from "./PromoCodeCard";
import { OfficialWebsiteCta } from "./OfficialWebsiteCta";
import { cn } from "@/lib/utils";

function ProviderMobileDock({ provider }: { provider: Provider }) {
  const hasPromo = Boolean(provider.promoCode);
  const hasLinks = provider.providerLinks.length > 0;

  if (!hasLinks && !hasPromo) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 xl:hidden"
      role="navigation"
      aria-label="Provider actions"
    >
      <div className="pointer-events-auto border-t border-border bg-card/95 shadow-elevated backdrop-blur-md supports-backdrop-filter:bg-card/90">
        <div className="container flex items-stretch gap-2 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          {hasPromo && provider.promoCode ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="h-10 shrink-0 gap-1.5 px-3"
                  aria-label="Promo code"
                >
                  <Sparkles className="size-4" strokeWidth={1.75} aria-hidden />
                  Promo
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side="top"
                sideOffset={10}
                collisionPadding={12}
                className="w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-modal"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <PromoCodeCard
                  code={provider.promoCode}
                  title={provider.promoTitle}
                  discount={provider.promoDiscount}
                  isPercentage={provider.promoPercentage}
                  embedded
                />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}

          {hasLinks ? (
            <div className="min-w-0 flex-1">
              <OfficialWebsiteCta links={provider.providerLinks} compact />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export const ProviderDetails = ({ provider }: { provider: Provider }) => {
  const hasPromo = Boolean(provider.promoCode);
  const sectionRef = useRef<HTMLElement>(null);
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const media = window.matchMedia("(max-width: 1279px)");
    const sync = (inView: boolean) => {
      setShowDock(media.matches && !inView);
    };

    const observer = new IntersectionObserver(
      ([entry]) => sync(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -8px 0px" },
    );

    observer.observe(el);

    const onMedia = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      sync(inView);
    };
    media.addEventListener("change", onMedia);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", onMedia);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
      >
        <div className="flex items-center gap-2.5 border-b border-border bg-primary-soft/70 px-3.5 py-3 sm:gap-3.5 sm:px-(--card-pad-lg) sm:py-5">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border bg-card p-1.5 shadow-subtle sm:size-14 sm:rounded-xl sm:p-2">
            {provider.image ? (
              <Image
                src={provider.image}
                alt=""
                width={100}
                height={100}
                className="size-full rounded-md object-contain"
                aria-hidden
              />
            ) : (
              <span className="flex size-full items-center justify-center text-h3 font-bold text-primary-text">
                {provider.name.charAt(0)}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5">
            <h2 className="text-balance text-body font-semibold text-brand-navy sm:text-h3">
              {provider.name}
            </h2>
            {provider.certified ? (
              <Badge
                variant="brand"
                className="gap-1 px-2 py-0.5 font-medium ring-1 ring-primary/15"
              >
                <BadgeCheck
                  className="size-3 sm:size-3.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
                Verified provider
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-3.5 py-3 sm:gap-4 sm:p-(--card-pad-lg)">
          {provider.info ? (
            <p className="line-clamp-3 text-caption leading-snug text-text-secondary sm:line-clamp-none sm:text-body-sm sm:leading-relaxed">
              {provider.info}
            </p>
          ) : null}

          <OfficialWebsiteCta links={provider.providerLinks} />
        </div>

        {hasPromo && provider.promoCode ? (
          <div className="border-t border-border bg-surface-tint/60 px-3.5 py-3 sm:p-(--card-pad-lg) sm:pt-(--card-pad)">
            <PromoCodeCard
              code={provider.promoCode}
              title={provider.promoTitle}
              discount={provider.promoDiscount}
              isPercentage={provider.promoPercentage}
              embedded
            />
          </div>
        ) : null}
      </section>

      {showDock ? <ProviderMobileDock provider={provider} /> : null}
    </>
  );
};
