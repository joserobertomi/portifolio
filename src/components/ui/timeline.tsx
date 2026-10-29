"use client";
import { useScroll, useReducedMotion, useMotionValueEvent, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { getTimelineStep } from "@/lib/timeline-progress";

interface TimelineEntry {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  heading?: string;
  description?: string;
  controls?: React.ReactNode;
}

export const Timeline = ({ data, heading, description, controls }: TimelineProps) => {
  const ref = useRef<HTMLOListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markerPositions = useRef<number[]>([]);
  const [height, setHeight] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActiveStep(getTimelineStep(progress, markerPositions.current, height));
  });

  // Filtering can move markers without changing the list's total height.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const bounds = el.getBoundingClientRect();
      markerPositions.current = Array.from(
        el.querySelectorAll<HTMLElement>("[data-timeline-marker]"),
        (marker) => {
          const rect = marker.getBoundingClientRect();
          return rect.top - bounds.top + rect.height / 2;
        },
      );
      setHeight(bounds.height);
      setActiveStep(
        getTimelineStep(scrollYProgress.get(), markerPositions.current, bounds.height),
      );
    };

    measure();

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(el);

    // Webfonts loading in can reflow the text after the initial mount
    // (more noticeable on mobile, where lines wrap more), so re-measure
    // once they're ready too.
    document.fonts?.ready.then(measure);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data, scrollYProgress]);

  return (
    <div className="w-full bg-background text-foreground" ref={containerRef}>
      {(heading || description || controls) && (
        <div className="mx-auto max-w-5xl px-5 pt-16 pb-12 sm:px-8 md:pt-20 md:pb-16">
          {heading && (
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">
              {description}
            </p>
          )}
          {controls && <div className="mt-8">{controls}</div>}
        </div>
      )}

      <div className="relative mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        <ol ref={ref} className="relative space-y-12 md:space-y-16">
          {data.map((item, index) => {
            const reached = reducedMotion || index <= activeStep;
            const current = !reducedMotion && index === activeStep;

            return (
              <li
                key={item.id}
                aria-current={current ? "step" : undefined}
                className="relative flex items-start gap-5 md:gap-10"
              >
                <div
                  aria-hidden="true"
                  data-timeline-marker=""
                  data-state={current ? "active" : reached ? "complete" : "pending"}
                  className="absolute top-0 left-0 z-10 flex h-8 w-8 items-center justify-center bg-background"
                >
                  <div className="relative h-3 w-3 rounded-full border border-foreground/30 bg-background">
                    <span
                      style={{
                        opacity: reached ? 1 : 0,
                        transform: current ? "scale(1.25)" : "scale(1)",
                      }}
                      className="absolute inset-0 rounded-full bg-foreground shadow-[0_0_10px_var(--foreground)] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
                    />
                  </div>
                </div>
                <div className="relative z-10 w-8 shrink-0 self-start md:w-52">
                  <p className="hidden pl-14 text-2xl font-medium whitespace-nowrap text-foreground/70 md:block">
                    {item.title}
                  </p>
                </div>
                <div className="relative min-w-0 flex-1">
                  <p className="mb-3 text-sm font-medium text-foreground/70 md:hidden">
                    {item.title}
                  </p>
                  {item.content}
                </div>
              </li>
            );
          })}
        </ol>
        <div
          aria-hidden="true"
          style={{
            height: height + "px",
          }}
          className="pointer-events-none absolute top-0 left-9 w-0.5 -translate-x-1/2 bg-foreground/15 sm:left-12"
        >
          <motion.div
            style={{
              scaleY: reducedMotion ? 1 : scrollYProgress,
            }}
            className="absolute inset-0 origin-top bg-foreground shadow-[0_0_12px_var(--foreground)]"
          />
        </div>
      </div>
    </div>
  );
};
