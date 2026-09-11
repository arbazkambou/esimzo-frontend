"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PrimaryButton from "../common/PrimaryButton";

type Props = {
  visibleCount: number;
  totalCount: number;
  children: React.ReactNode;
};

export default function ExpandableGrid({
  visibleCount,
  totalCount,
  children,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = totalCount > visibleCount;

  return (
    <>
      {/* Wrapper adds the fade-out mask when collapsed */}
      <div className="relative">
        <div
          className="-mt-2 grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            /* All cards stay in the DOM for SEO — just clip the overflow */
            maxHeight: expanded
              ? "none"
              : `${(Math.ceil(visibleCount) / 3) * 100}px`,
            overflow: "hidden",
            transition: "max-height 0.4s ease-in-out",
          }}
        >
          {children}
        </div>

        {/* Fade gradient — only shown when collapsed and there is more content */}
        {hasMore && !expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent" />
        )}
      </div>

      {hasMore && (
        <div className="mt-4 flex justify-center">
          <PrimaryButton
            onClick={() => setExpanded((prev) => !prev)}
            className="group flex "
          >
            {expanded ? "Show Less" : `See All ${totalCount} Countries`}
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </PrimaryButton>
        </div>
      )}
    </>
  );
}
