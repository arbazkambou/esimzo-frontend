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
      <section className="w-full rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col items-start gap-6">
          {/* Logo and Title Group */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border bg-muted p-2 shadow-inner">
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
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {provider.name}
                </h1>
                <BadgeCheck className="text-primary h-6 w-6 fill-primary/10" />
              </div>
              <p className="text-sm font-medium text-secondary-foreground uppercase tracking-wide">
                {provider.certified ? "Verified Provider" : ""}
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {provider.info}
            </p>
          </div>

          {provider.providerLinks.length === 0 ? (
            <></>
          ) : provider.providerLinks.length === 1 ? (
            <Button className="w-full px-6 py-6 text-base font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] border-none! cursor-pointer ring-0!">
              <Link
                href={provider.providerLinks[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Visit Official Website
                <ExternalLink size={18} />
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full px-6 py-6 text-base font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] border-none! cursor-pointer ring-0!">
                  <span className="flex items-center gap-2">
                    Official Website
                  </span>
                  <ExternalLink size={18} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="w-(--radix-dropdown-menu-trigger-width) p-2 rounded-2xl border border-border bg-popover shadow-lg flex flex-col gap-1.5"
              >
                {provider.providerLinks.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    asChild
                    className="rounded-full p-0 bg-primary/10! hover:bg-primary/20! hover:text-primary!"
                  >
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-primary/20 cursor-pointer hover:bg-primary/10 text-primary font-semibold text-sm transition-colors"
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
