import Link from "next/link";
import { Send, X, Instagram, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Global eSIMs", href: "/global" },
    { label: "Popular Destinations", href: "/#destinations" },
  ],
  Company: [
    { label: "Why eSIMzo", href: "/#why-esimzo" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Reviews", href: "/#reviews" },
  ],
  Support: [
    { label: "FAQ", href: "/#faq" },
    { label: "Countries", href: "/#countries" },
    { label: "Regions", href: "/#regions" },
    { label: "Contact Us", href: "mailto:hello@esimzo.com" },
  ],
  Destinations: [
    { label: "Europe", href: "/europe" },
    { label: "Japan", href: "/japan" },
    { label: "USA", href: "/united-states" },
    { label: "Thailand", href: "/thailand" },
  ],
};

const socialLinks = [
  { icon: X, href: "https://x.com", label: "X" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@esimzo.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-navy-foreground">
      <div className="container py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-8 md:grid-cols-5 md:gap-8 lg:gap-10">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2"
              id="footer-logo"
            >
              <Send
                className="size-5 text-primary"
                strokeWidth={2.25}
                aria-hidden
              />
              <span className="text-xl font-semibold tracking-tight text-white">
                eSIM<span className="text-primary">zo</span>
              </span>
            </Link>

            <p className="max-w-[17rem] text-body-sm leading-relaxed !text-white/85">
              The smartest way to compare and buy eSIM plans for travel — no
              roaming, no hassle, no overpaying.
            </p>

            <div className="mt-1 flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  id={`footer-social-${label.toLowerCase()}`}
                  className="flex size-10 items-center justify-center rounded-md border border-white/20 text-white/85 transition-colors hover:border-white/45 hover:bg-brand-navy-soft hover:text-white"
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-3.5">
              <h3 className="text-label font-semibold text-white">{group}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      id={`footer-link-${link.label
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="text-body-sm !text-white/65 transition-colors hover:!text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/15 pt-7">
          <p className="max-w-2xl text-caption leading-relaxed !text-white/75">
            eSIMzo is an independent travel eSIM comparison engine. Providers
            cannot pay to rank higher. Listings are ranked by measurable
            traveler criteria. Affiliate commissions may apply when you buy
            through our links.
          </p>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container flex flex-col items-start justify-between gap-2 py-5 text-caption !text-white/75 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} eSIMzo. All rights reserved.</p>
          <p>Made for travellers worldwide</p>
        </div>
      </div>
    </footer>
  );
}
