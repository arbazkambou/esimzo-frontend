"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Provider } from "@/lib/types/plans.types";
import { cn } from "@/lib/utils";

function linkLabel(name: string) {
  return name.includes("Plans") ? name : `${name} Plans`;
}

type OfficialWebsiteCtaProps = {
  links: Provider["providerLinks"];
  /** Compact dock style (opens menu upward). */
  compact?: boolean;
  /** Trigger label. */
  label?: string;
  className?: string;
  /** Prefer opening the menu upward (drawer/dialog footers). */
  menuSide?: "top" | "bottom";
};

export function OfficialWebsiteCta({
  links,
  compact = false,
  label = "Official Website",
  className,
  menuSide,
}: OfficialWebsiteCtaProps) {
  if (links.length === 0) return null;

  const side = menuSide ?? (compact ? "top" : "bottom");

  const btnClass = cn(
    "shadow-subtle",
    compact
      ? "h-10 w-full"
      : "h-10 w-full sm:h-[var(--btn-h-md)] sm:w-auto sm:px-5",
    className,
  );

  if (links.length === 1) {
    return (
      <Button asChild size="default" className={btnClass}>
        <Link
          href={links[0].link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
          <ExternalLink className="size-3.5" strokeWidth={1.75} />
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="default" className={btnClass}>
          {label}
          {side === "top" ? (
            <ChevronUp className="size-3.5 opacity-90" strokeWidth={1.75} />
          ) : (
            <ChevronDown className="size-3.5 opacity-90" strokeWidth={1.75} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side={side}
        sideOffset={8}
        collisionPadding={16}
        className="w-(--radix-dropdown-menu-trigger-width) overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-modal"
      >
        <div className="border-b border-border bg-primary-soft/60 px-4 py-3">
          <p className="text-caption font-bold uppercase tracking-wider text-primary-text">
            Choose a destination
          </p>
          <p className="mt-0.5 text-caption text-text-secondary">
            Continues on {links.length} official pages
          </p>
        </div>
        <ul className="flex flex-col gap-1.5 p-2.5">
          {links.map((item, index) => (
            <li key={`${item.link}-${index}`}>
              <DropdownMenuItem
                asChild
                className="rounded-lg p-0 focus:bg-transparent"
              >
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-transparent bg-primary-soft px-3.5 py-2.5 text-body-sm font-semibold text-primary-text transition-[background-color,border-color] hover:border-primary/20 hover:bg-primary-muted focus-visible:outline-none focus-visible:shadow-(--focus-ring)"
                >
                  <span className="truncate">{linkLabel(item.name)}</span>
                  <ExternalLink
                    className="size-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </DropdownMenuItem>
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
