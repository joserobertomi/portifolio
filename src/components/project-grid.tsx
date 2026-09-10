import type { Project } from "@/data/projects";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-8 gap-y-14 px-5 pb-24 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-20 lg:px-8">
      {projects.map((project) => (
        <article key={project.id}>
          <div className="overflow-hidden bg-foreground/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`Prévia do projeto ${project.title}`}
              className="aspect-video w-full object-cover"
            />
          </div>
          <h2 className="mt-5 text-2xl font-medium tracking-tight sm:text-3xl">
            {project.title}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed opacity-70 sm:text-base">
            {project.description}
          </p>
        </article>
      ))}
    </div>
  );
}
