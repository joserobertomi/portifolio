"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);

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

  return (
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
          x: 40,
          filter: "blur(8px)",
          scale: 2,
        }}
        // Both the entering and exiting words are always absolutely
        // positioned (filling the parent's reserved box) so neither one
        // ever occupies document flow — the visible word can't push or
        // escape the box the caller reserved for it.
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
};
