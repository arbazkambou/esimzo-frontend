import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/sections/Footer";
import QueryProvider from "@/components/providers/QueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import NavWrapper from "@/components/getters/NavWrapper";
import NextTopLoader from "nextjs-toploader";
import { SearchDialogProvider } from "@/components/search/SearchDialogProvider";
import { SearchDialog } from "@/components/search/SearchDialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <NextTopLoader color="#F47854" showSpinner={false} />
        <QueryProvider>
          <NuqsAdapter>
            <SearchDialogProvider>
              <NavWrapper />
              <main className="grow">{children}</main>
              <Footer />
              <SearchDialog />
            </SearchDialogProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
