"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface CardData {
  id: number | string;
  image: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface StickyCardsProps {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const StickyCards = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCardsProps) => {
  const container = useRef(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastWidthRef = useRef<number | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const imageElements = imageRefs.current;
      const totalCards = imageElements.length;

      if (!imageElements[0]) return;

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      // Pause (in transition-duration units) between cards so each one has
      // time to be read before the next slides over it.
      const READ_PAUSE = 0.6;
      const timelineDuration = (totalCards - 1) * (1 + READ_PAUSE);

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * timelineDuration}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        const position = i * (1 + READ_PAUSE);
        if (!currentImage || !nextImage) continue;

        scrollTimeline.to(
          currentImage,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      // Mobile browsers resize the viewport (and this pinned container)
      // just from the URL bar showing/hiding while scrolling. Refreshing
      // ScrollTrigger on every one of those height-only blips causes the
      // pin to jump; only a real width change (rotation, real resize)
      // warrants a refresh.
      const resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect.width;
        if (width === undefined) return;
        if (
          lastWidthRef.current !== null &&
          Math.abs(width - lastWidthRef.current) < 1
        ) {
          return;
        }
        lastWidthRef.current = width;
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        // Killing the timeline also kills the ScrollTrigger it owns
        // (they were created together via the `scrollTrigger` config
        // above) — ScrollTrigger.getAll().forEach(kill) would instead
        // tear down every trigger on the page, including ones owned by
        // other components.
        scrollTimeline.kill();
      };
    },
    { scope: container },
  );

  return (
    <div className={cn("relative w-full", className)} ref={container}>
      <div
        // h-svh (not h-screen/100vh) so the pinned box uses the stable,
        // URL-bar-visible viewport height instead of one that grows and
        // shrinks as the address bar animates. The extra bottom padding
        // below sm reserves room for the fixed mobile nav (~4.5rem) plus
        // its safe-area inset, so the card and its caption clear it.
        className="sticky-cards relative flex h-svh w-full items-center justify-center overflow-hidden p-3 max-sm:pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:p-8"
      >
        <div
          className={cn(
            "relative h-[90%] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="rounded-4xl absolute h-full w-full overflow-hidden"
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={card.alt || card.title || ""}
                className={cn(
                  "h-full w-full object-cover",
                  imageClassName,
                )}
              />
              {(card.title || card.description) && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16 text-white">
                  {card.title && (
                    <h3 className="text-xl font-semibold md:text-2xl">
                      {card.title}
                    </h3>
                  )}
                  {card.description && (
                    <p className="mt-1 max-w-md text-sm text-white/80">
                      {card.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { StickyCards };
export type { CardData };
