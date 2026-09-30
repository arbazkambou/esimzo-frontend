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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 2);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routeBg = useMemo(() => {
    if (pathname === "/") return "bg-transparent";
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
        "relative w-full",
        "transition-[background-color,backdrop-filter,box-shadow,border-color] duration-150 ease-out",
        isScrolled
          ? "bg-white/90 shadow-xs backdrop-blur-md border-b border-black/8"
          : routeBg,
      )}
    >
      <div className="container flex h-16 items-center justify-between relative">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          id="navbar-logo"
        >
          <div className="transition-transform group-hover:scale-105">
            <Image src={logo} alt="eSIMzo" height={130} width={130} />
          </div>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative group px-3.5 py-2 text-sm transition-colors",
                  isActive
                    ? "text-slate-950 font-bold"
                    : "text-slate-700 hover:text-slate-950 font-semibold",
                )}
              >
                {link.label}
                {isActive ? (
                  <span className="absolute inset-x-2 -bottom-1 h-[2.5px] bg-primary rounded-full" />
                ) : (
                  <span className="absolute inset-x-2 -bottom-1 h-[2px] bg-primary/50 scale-x-0 transition-transform group-hover:scale-x-100 origin-left rounded-full" />
                )}
              </Link>
            );
          })}
          <div className="hidden md:flex items-center gap-2 ml-2">
            {searchSlot}
          </div>
        </nav>

        {mobileMenuSlot}
      </div>
    </header>
  );
}
