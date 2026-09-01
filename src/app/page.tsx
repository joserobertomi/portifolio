"use client";

import ReactLenis from "lenis/react";

import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { StickyCards } from "@/components/ui/sticky-cards";

const words = ["hello", "world"];

const cards = [
  { id: 1, image: "/images/sticky/card-1.svg" },
  { id: 2, image: "/images/sticky/card-2.svg" },
  { id: 3, image: "/images/sticky/card-3.svg" },
  { id: 4, image: "/images/sticky/card-4.svg" },
  { id: 5, image: "/images/sticky/card-5.svg" },
];

export default function Home() {
  return (
    <ReactLenis root>
      <main className="w-full">
        <section className="h-screen w-full flex items-center justify-center overflow-hidden">
          <ContainerTextFlip words={words} />
        </section>
        <section className="h-screen w-full">
          <StickyCards cards={cards} />
        </section>
      </main>
    </ReactLenis>
  );
}
