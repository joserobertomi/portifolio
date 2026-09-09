"use client";

import { useEffect, useRef } from "react";
import ReactLenis, { type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Drives Lenis off GSAP's ticker instead of its own rAF loop, so smooth
// scroll stays in lockstep with GSAP-driven scroll animations (e.g. the
// pinned ScrollTrigger cards) instead of fighting them for frames.
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    // Without this, ScrollTrigger only recalculates on the browser's own
    // (throttled) scroll events, which Lenis's rAF-driven scrolling can
    // outrun — pinned sections (e.g. the sticky project cards) can end up
    // reading a stale scroll position. Telling ScrollTrigger to update
    // every time Lenis actually moves the scroll keeps them in sync.
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis?.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
      {children}
    </ReactLenis>
  );
};

export { SmoothScroll };
