"use client";

import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Globe } from "lucide-react";

const popularDestinations = [
  {
    flagImg: "https://flagcdn.com/w40/us.png",
    name: "USA",
    link: "/united-states",
  },
  {
    flagImg: "https://flagcdn.com/w40/gb.png",
    name: "UK",
    link: "/united-kingdom",
  },
  {
    flagImg: "https://flagcdn.com/w40/ae.png",
    name: "UAE",
    link: "/united-arab-emirates",
  },
  { flagImg: "https://flagcdn.com/w40/jp.png", name: "Japan", link: "/japan" },
  {
    flagImg: "https://flagcdn.com/w40/tr.png",
    name: "Turkey",
    link: "/turkey",
  },
  {
    flagImg: "https://flagcdn.com/w40/th.png",
    name: "Thailand",
    link: "/thailand",
  },
  { isGlobal: true, name: "Global", link: "/global" },
];

function DestinationChip({
  d,
}: {
  d: (typeof popularDestinations)[number];
}) {
  return (
    <Link
      href={d.link}
      className="group mx-1.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-xs font-semibold text-brand-navy shadow-xs transition-all hover:border-primary/50 hover:text-primary shrink-0"
    >
      {d.isGlobal ? (
        <Globe className="h-3.5 w-3.5 text-primary shrink-0" />
      ) : (
        <span className="relative h-3.5 w-5 overflow-hidden rounded-[2px] border border-border shrink-0 block">
          <Image
            src={d.flagImg!}
            alt={d.name}
            fill
            sizes="20px"
            className="object-cover"
          />
        </span>
      )}
      <span>{d.name}</span>
    </Link>
  );
}

export default function PopularDestinationsMarquee() {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs sm:text-sm font-semibold text-text-secondary">
        Popular destinations:
      </span>

      <div className="relative -mx-4 overflow-hidden sm:mx-0 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black/[0.04] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black/[0.04] to-transparent"
          aria-hidden
        />

        <Marquee
          speed={28}
          pauseOnHover
          gradient={false}
          autoFill
          className="py-1"
        >
          {popularDestinations.map((d) => (
            <DestinationChip key={d.name} d={d} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
