import { Timeline } from "@/components/ui/timeline";
import { timeline } from "@/data/timeline";

export default function TimelineSection() {
  const data = timeline.map((event) => ({
    title: event.date,
    content: (
      <article>
        <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
          {event.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          {event.institution}
        </p>
        {event.period && (
          <p className="mt-1 text-sm text-foreground/70">{event.period}</p>
        )}
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
          {event.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    ),
  }));

  return (
    <section id="trajetoria" aria-label="Minha trajetória" className="scroll-mt-24">
      <Timeline
        data={data}
        heading="Minha trajetória"
        description="Da robótica à construção de produtos com inteligência artificial. Experiências, pesquisas e aprendizados, do presente aos primeiros passos."
      />
    </section>
  );
}
