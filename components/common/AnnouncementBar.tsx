"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="w-full bg-[#0B1528] text-white text-xs md:text-sm font-medium transition-all"
    >
      <div className="container flex items-center justify-between py-1.5 sm:py-2 px-3 sm:px-4">
        <Link
          href="/#destinations"
          className="group mx-auto flex items-center gap-1.5 text-white/95 hover:text-white transition-opacity text-center min-w-0"
        >
          <span className="text-[11px] sm:text-xs md:text-sm truncate sm:overflow-visible">
            ✈️ Traveling soon? Compare today’s cheapest eSIM data plans — updated daily
          </span>
          <ArrowRight className="h-3.5 w-3.5 inline-block transition-transform duration-200 group-hover:translate-x-1 shrink-0 text-white/80" />
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="ml-1 sm:ml-2 -mr-1 p-1 rounded-sm text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer shrink-0"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
