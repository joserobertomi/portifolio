import type { Metadata } from "next";

import { StickyCards } from "@/components/ui/sticky-cards";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | José Roberto",
};

export default function ProjectsPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-8 text-center sm:pt-32">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          Projects
        </h1>
        <p className="mt-4 text-sm opacity-70 md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <section className="w-full">
        <StickyCards cards={projects} />
      </section>
    </>
  );
}
