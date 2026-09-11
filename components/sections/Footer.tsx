import Link from "next/link";
import { Wifi, Twitter, Github, Mail, Globe2, Shield, Zap } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Compare Plans", href: "#" },
    { label: "Popular Destinations", href: "#destinations" },
    { label: "eSIM Providers", href: "#" },
    { label: "Travel Tips", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Report an Issue", href: "#" },
    { label: "Community", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2" id="footer-logo">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/20">
                <Wifi
                  className="h-4 w-4 text-primary-foreground"
                  strokeWidth={2.5}
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                esim<span className="text-primary">zo</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The smartest way to compare and buy eSIM plans for travel — no
              roaming, no hassle, no overpaying.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  id={`footer-social-${label.toLowerCase()}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-ring hover:bg-secondary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {group}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      id={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-muted">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} esimzo. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-destructive">♥</span> for travellers
            worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
