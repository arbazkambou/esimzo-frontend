"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("announcement_dismissed");
    if (isDismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    sessionStorage.setItem("announcement_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="relative z-50 bg-foreground text-background text-xs md:text-sm font-medium transition-all"
    >
      <div className="container flex items-center justify-between py-2 px-4">
        <Link
          href="/#destinations"
          className="group mx-auto flex items-center gap-1.5 hover:opacity-90 transition-opacity text-center"
        >
          <span>
            ✈️ Traveling soon? Compare today’s cheapest eSIM data plans — updated daily
          </span>
          <ArrowRight className="h-3.5 w-3.5 inline-block transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="ml-2 -mr-1 p-1 rounded-sm text-background/70 hover:text-background hover:bg-background/20 transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  );
}
