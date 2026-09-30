import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/sections/Footer";
import QueryProvider from "@/components/providers/QueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import NavWrapper from "@/components/getters/NavWrapper";
import NextTopLoader from "nextjs-toploader";
import { SearchDialogProvider } from "@/components/search/SearchDialogProvider";
import { SearchDialog } from "@/components/search/SearchDialog";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esimzo.com"),
  title: {
    default: "Compare Travel eSIM Plans | eSIMzo — Find the Best eSIM Deal",
    template: "%s | eSIMzo",
  },
  description:
    "Compare 30,000+ travel eSIM plans from different providers in 200+ countries. Sort by price per GB, validity, speed rules, and real traveler reviews.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Compare Travel eSIM Plans Without Sponsored Rankings | eSIMzo",
    description:
      "See real prices, fair-use limits, hotspot rules, and verified reviews — then buy direct from the provider. Land connected.",
    url: "https://esimzo.com/",
    siteName: "eSIMzo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Travel eSIM Plans Without Sponsored Rankings | eSIMzo",
    description:
      "See real prices, fair-use limits, hotspot rules, and verified reviews — then buy direct from the provider. Land connected.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
        className={`${poppins.className} font-sans antialiased flex min-h-screen flex-col`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-text-primary focus:shadow-elevated"
        >
          Skip to content
        </a>
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <QueryProvider>
          <NuqsAdapter>
            <SearchDialogProvider>
              <NavWrapper />
              <main id="main-content" className="grow">
                {children}
              </main>
              <Footer />
              <SearchDialog />
            </SearchDialogProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
