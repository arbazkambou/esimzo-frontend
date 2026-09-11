"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "What's an eSIM?", href: "#" },
  { label: "eSIM Plans", href: "#plans" },
  { label: "Destinations", href: "#destinations" },
  { label: "Providers", href: "#" },
];

export function NavbarMobileMenu({ searchSlot }: { searchSlot: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        id="navbar-mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 pt-2 shadow-lg absolute top-full left-0 right-0 z-50">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-border flex flex-col gap-2">
              {searchSlot}
              <Link
                href="#"
                id="navbar-mobile-explore-btn"
                className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Explore Plans
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

