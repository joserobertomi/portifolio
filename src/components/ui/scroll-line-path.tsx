"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface ScrollLinePathProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const ScrollLinePath = ({
  eyebrow,
  title,
  subtitle,
  className,
}: ScrollLinePathProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      ref={ref}
      className={cn(
        // Kept under 2x viewport: past that, the sticky child unpins while
        // already fully scrolled out of view, leaving a blank gap before
        // the next section (position: sticky has no "hold" past that point).
        "relative flex h-[185vh] w-full flex-col items-center bg-background px-4 text-foreground",
        className,
      )}
    >
      <div className="sticky top-0 flex h-screen w-full max-w-4xl flex-col items-center justify-center gap-4 text-center">
        {eyebrow && (
          <span className="text-xs font-medium tracking-[0.3em] uppercase opacity-60">
            {eyebrow}
          </span>
        )}
        <h1 className="relative z-10 text-5xl font-medium tracking-tight md:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="relative z-10 max-w-xl text-base opacity-70 md:text-lg">
            {subtitle}
          </p>
        )}

        <svg
          viewBox="0 0 800 600"
          fill="none"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.path
            d="M 60 40
               C 220 40, 260 160, 140 210
               C 20 260, 60 380, 220 360
               C 380 340, 360 200, 500 190
               C 640 180, 660 320, 540 380
               C 420 440, 460 540, 620 520
               C 740 505, 760 420, 700 340"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              pathLength,
              opacity: pathOpacity,
            }}
          />
        </svg>
      </div>
    </section>
  );
};

export { ScrollLinePath };
