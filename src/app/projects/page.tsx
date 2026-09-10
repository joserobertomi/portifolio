import type { Metadata } from "next";

import { FlipWords } from "@/components/ui/flip-words";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | José Roberto",
};

const disciplines = [
  "backend",
  "plataforma",
  "CLI",
  "agents",
  "data science",
  "AI",
];

export default function ProjectsPage() {
  return (
    <>
      <section className="flex min-h-svh items-center justify-center overflow-x-clip px-4 py-24">
        <div className="max-w-4xl text-center">
          <h1 className="flex flex-wrap items-center justify-center gap-x-3 text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
            <span>Projetos em</span>
            <FlipWords
              words={disciplines}
              autoSize
              className="text-4xl font-semibold sm:text-5xl md:text-7xl"
            />
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed opacity-70 sm:text-lg">
            Uma seleção de coisas que construí — da infraestrutura aos produtos
            que chegam nas mãos de quem usa.
          </p>
        </div>
      </section>

      <section aria-label="Projetos selecionados">
        <StickyScroll content={projects} />
      </section>
    </>
  );
}
