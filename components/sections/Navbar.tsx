"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/assets/svgs/logo.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "eSIM Plans", href: "/plans" },
  { label: "Global eSIMs", href: "/global" },
  { label: "Regional eSIMs", href: "/region" },
];
interface NavbarProps {
  searchSlot: React.ReactNode;
  mobileMenuSlot: React.ReactNode;
}

export default function Navbar({ searchSlot, mobileMenuSlot }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Threshold set to 2px for an "instant" feel as soon as the finger moves
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routeBg = useMemo(() => {
    if (pathname === "/") return "bg-secondary/80";
    if (pathname === "/global") return "bg-secondary/40";
    if (pathname === "/region") return "bg-secondary/10";
    if (pathname.split("/").filter(Boolean).length === 1) {
      return "bg-secondary/40";
    }

    return "";
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        // Transitions only the background-color and backdrop-filter for smoothness
        "transition-[background-color,backdrop-filter] duration-150 ease-out",
        isScrolled
          ? "bg-background/30 shadow-xs backdrop-blur-md border-b border-background/20"
          : routeBg,
      )}
    >
      <div className="container flex h-16 items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          id="navbar-logo"
        >
          <div className="transition-transform group-hover:scale-105">
            <Image src={logo} alt="Logo" height={130} width={130} />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative group px-4 py-2 text-sm font-medium text-foreground rounded-lg transition-colors"
            >
              {link.label}
              <span className="absolute inset-x-2 -bottom-px h-0.5 bg-primary scale-x-0 transition-transform group-hover:scale-x-100 origin-left" />
            </Link>
          ))}
          <div className="hidden md:flex items-center gap-2">{searchSlot}</div>
        </nav>

        {/* Desktop CTA — SearchList is a server component so Navbar must be a server component too */}

        {/* Mobile Menu */}
        {mobileMenuSlot}
      </div>
    </header>
  );
}
