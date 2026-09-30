import React from "react";
import { ExternalLink, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Provider } from "@/lib/types/plans.types";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PromoCodeCard } from "./PromoCodeCard";

export const ProviderDetails = ({ provider }: { provider: Provider }) => {
  return (
    <div className="flex flex-col gap-4">
      <section className="w-full rounded-xl border border-border bg-card p-[var(--card-pad-lg)] shadow-card">
        <div className="flex flex-col items-start gap-6">
          {/* Logo and Title Group */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-border bg-muted p-1.5">
              {provider.image && (
                <Image
                  src={provider.image}
                  alt={provider.name}
                  width={100}
                  height={100}
                  className="h-full w-full object-contain rounded-md"
                />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-h1">
                  {provider.name}
                </h1>
                <BadgeCheck className="text-primary h-6 w-6 fill-primary/10" />
              </div>
              <p className="text-label text-primary-text uppercase tracking-[0.06em]">
                {provider.certified ? "Verified Provider" : ""}
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <p className="text-body-lg text-text-secondary">
              {provider.info}
            </p>
          </div>

          {provider.providerLinks.length === 0 ? (
            <></>
          ) : provider.providerLinks.length === 1 ? (
            <Button asChild size="lg" className="w-full">
              <Link
                href={provider.providerLinks[0].link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Official Website
                <ExternalLink size={18} />
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" className="w-full">
                  <span className="flex items-center gap-2">
                    Official Website
                  </span>
                  <ExternalLink size={18} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="w-(--radix-dropdown-menu-trigger-width) p-2 rounded-lg border border-border bg-popover shadow-elevated flex flex-col gap-1.5"
              >
                {provider.providerLinks.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    asChild
                    className="rounded-md p-0 bg-primary-soft! hover:bg-primary-muted! hover:text-primary-text!"
                  >
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-md bg-primary-soft cursor-pointer hover:bg-primary-muted text-primary-text font-semibold text-body-sm transition-colors min-h-11"
                    >
                      {item.name.includes("Plans")
                        ? item.name
                        : item.name + " Plans"}
                      <ExternalLink
                        size={15}
                        className="text-primary shrink-0"
                      />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </section>

      <div>
        {provider.promoCode && (
          <PromoCodeCard
            code={provider.promoCode}
            title={provider.promoTitle}
            discount={provider.promoDiscount}
            isPercentage={provider.promoPercentage}
          />
        )}
      </div>
    </div>
  );
};
