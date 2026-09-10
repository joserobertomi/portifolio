import type { Metadata } from "next";

import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | José Roberto",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-5 pt-28 pb-4 lg:px-8 lg:pt-36">
        <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
          Projetos
        </h1>
        <p className="mt-4 text-sm opacity-70">
          Uma seleção de coisas que construí, da infraestrutura aos produtos.
        </p>
      </section>

      <section aria-label="Projetos selecionados">
        <ProjectGrid projects={projects} />
      </section>
    </>
  );
}
