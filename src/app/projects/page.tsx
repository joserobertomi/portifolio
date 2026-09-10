import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | José Roberto",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-5 pt-8 sm:pt-32 lg:px-8">
        <PageHeader
          title="Projetos"
          description="Uma seleção de coisas que construí, da infraestrutura aos produtos."
        />
      </section>

      <section aria-label="Projetos selecionados" className="mt-12">
        <ProjectGrid projects={projects} />
      </section>
    </>
  );
}
