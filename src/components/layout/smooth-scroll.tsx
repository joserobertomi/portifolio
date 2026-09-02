"use client";

import { useEffect, useRef } from "react";
import ReactLenis, { type LenisRef } from "lenis/react";
import gsap from "gsap";

// Drives Lenis off GSAP's ticker instead of its own rAF loop, so smooth
// scroll stays in lockstep with GSAP-driven scroll animations (e.g. the
// pinned ScrollTrigger cards) instead of fighting them for frames.
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
      {children}
    </ReactLenis>
  );
};

export { SmoothScroll };
