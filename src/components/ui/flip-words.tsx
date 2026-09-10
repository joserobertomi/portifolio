"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  sizeMode,
}: {
  words: string[];
  duration?: number;
  className?: string;
  // "hug": the box spring-animates to hug each word as it rotates.
  // "stable": the box permanently reserves the longest word's width, so
  // surrounding content never shifts. Omit to leave sizing to the caller.
  sizeMode?: "hug" | "stable";
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [width, setWidth] = useState<number | null>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Self-rescheduling interval: the cycle no longer depends on
  // AnimatePresence's onExitComplete firing reliably. It just keeps
  // advancing on its own clock and is cleaned up on unmount/prop change,
  // so no timers leak and the rotation can never get stuck.
  useEffect(() => {
    if (words.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentWord((prev) => {
        const nextIndex = (words.indexOf(prev) + 1) % words.length;
        return words[nextIndex];
      });
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  // In "hug" mode the box tracks the current word: the hidden inline copy
  // below reserves the line height, and a ResizeObserver on it feeds the
  // spring-animated width — so the box hugs each word (tracking breakpoint
  // and font-load changes too). The width starts moving the moment the word
  // changes, in sync with the outgoing word's exit.
  useLayoutEffect(() => {
    if (sizeMode !== "hug") return;
    const measurer = measureRef.current;
    if (!measurer) return;

    setWidth(measurer.offsetWidth);
    const observer = new ResizeObserver(() => setWidth(measurer.offsetWidth));
    observer.observe(measurer);
    return () => observer.disconnect();
  }, [sizeMode]);

  const animatedWord = (
    // mode="wait" bounds AnimatePresence to at most one exiting + one
    // queued node: without it, the state can advance every `duration`
    // regardless of whether the previous word's exit animation actually
    // finished (e.g. a backgrounded tab pausing rAF), letting old,
    // never-removed nodes pile up as overlapping ghosts once the tab is
    // foregrounded again.
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          // Alternate the exit side per word so the cycle doesn't fling
          // every word the same way: even-indexed words exit right, odd
          // ones left. The cycle advances one index at a time, so
          // consecutive exits always alternate.
          x: 40 * (words.indexOf(currentWord) % 2 === 0 ? 1 : -1),
          filter: "blur(8px)",
          scale: 2,
        }}
        // Both the entering and exiting words are always absolutely
        // positioned (filling the reserved box) so neither one ever
        // occupies document flow — the visible word can't push or escape
        // the box, whether the caller reserved it or sizeMode built it.
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center text-left text-foreground px-2 sm:justify-start",
          className
        )}
        key={currentWord}
      >
        {/* edit suggested by Sajal: https://x.com/DewanganSajal */}
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );

  if (!sizeMode) return animatedWord;

  // "stable": every word is rendered invisibly in the same grid cell, so
  // the box permanently reserves the width of the longest word (tracking
  // breakpoint and font-load changes automatically, with no JS measuring).
  // The box never resizes as words rotate, so centered or inline
  // surrounding content — bio text, profile image — stays put and the page
  // can't gain horizontal overflow from the rotation.
  if (sizeMode === "stable") {
    return (
      <span className="relative inline-grid">
        {words.map((word) => (
          <span
            key={word}
            aria-hidden="true"
            className={cn(
              "invisible col-start-1 row-start-1 inline-block whitespace-nowrap px-2",
              className
            )}
          >
            {word}
          </span>
        ))}
        {animatedWord}
      </span>
    );
  }

  // "hug": the box spring-animates to the measured width of each word.
  return (
    <motion.span
      initial={false}
      animate={width == null ? undefined : { width }}
      transition={{ type: "spring", stiffness: 170, damping: 26 }}
      className="relative inline-block"
    >
      <span
        ref={measureRef}
        aria-hidden="true"
        className={cn(
          "invisible inline-block whitespace-nowrap px-2",
          className
        )}
      >
        {currentWord}
      </span>
      {animatedWord}
    </motion.span>
  );
};
