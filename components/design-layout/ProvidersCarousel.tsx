"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Provider } from "@/lib/types/providers.types";
import Image from "next/image";

interface ProvidersCarouselProps {
  providers: Provider[];
}

export default function ProvidersCarousel({
  providers,
}: ProvidersCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const isPaused = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const duplicateProviders = [...providers, ...providers, ...providers];

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused.current && api) {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0); // loop back
        }
      }
    }, 1800);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api, startAutoplay]);

  return (
    <div className="w-full py-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm font-medium">
            A growing directory of{" "}
            <span className="font-semibold text-foreground">120+</span> travel
            eSIM brands
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
          }}
        >
          {/* Gradient fade overlays */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="items-center py-4">
              {duplicateProviders.map((provider, index) => (
                <CarouselItem
                  key={`${provider.id}-${index}`}
                  className="basis-auto pl-8 md:pl-12 flex-shrink-0"
                >
                  <div className="flex items-center gap-3 group cursor-pointer transition-transform duration-300 hover:scale-110">
                    <Image
                      src={provider.image}
                      alt={provider.name}
                      width={50}
                      height={50}
                    />
                    <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground font-medium text-center whitespace-nowrap transition-colors">
                      {provider.name}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
