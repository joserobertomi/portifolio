"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type StickyScrollItem = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export const StickyScroll = ({ content }: { content: StickyScrollItem[] }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const updateActiveCard = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const bounds = item.getBoundingClientRect();
        const distance = Math.abs(
          bounds.top + bounds.height / 2 - viewportCenter,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveCard((current) =>
        current === closestIndex ? current : closestIndex,
      );
    };

    updateActiveCard();
    window.addEventListener("scroll", updateActiveCard, { passive: true });
    window.addEventListener("resize", updateActiveCard);

    return () => {
      window.removeEventListener("scroll", updateActiveCard);
      window.removeEventListener("resize", updateActiveCard);
    };
  }, [content.length]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.7fr)] lg:gap-24 lg:px-8"
    >
      <div className="min-w-0">
        <div className="mx-auto max-w-xl lg:mx-0">
          {content.map((item, index) => (
            <article
              key={item.id}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              className={`flex min-h-[52svh] flex-col justify-center py-14 first:lg:mb-[calc(3.5rem-19svh)] first:lg:min-h-[calc(100svh-7rem)] lg:min-h-[62svh] lg:py-20 ${
                index === content.length - 1
                  ? "lg:sticky lg:top-24 lg:mt-[calc(19svh-3.5rem)] lg:-translate-y-[calc(19svh-3.5rem)]"
                  : ""
              }`}
            >
              <motion.h2
                animate={{ opacity: activeCard === index ? 1 : 0.28 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{ opacity: activeCard === index ? 0.72 : 0.25 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-5 max-w-md text-base leading-relaxed sm:text-lg"
              >
                {item.description}
              </motion.p>
              <div className="mt-8 overflow-hidden lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={`Prévia do projeto ${item.title}`}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <motion.div
        key={activeCard}
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="hidden h-[calc(100svh-7rem)] items-center lg:sticky lg:top-24 lg:flex"
      >
        <div className="w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content[activeCard].image}
            alt={`Prévia do projeto ${content[activeCard].title}`}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};
