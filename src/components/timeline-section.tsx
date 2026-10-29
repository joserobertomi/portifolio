"use client";

import { useState } from "react";

import { Timeline } from "@/components/ui/timeline";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { filterTimeline, timelineCategories } from "@/data/timeline";

export default function TimelineSection() {
  const [category, setCategory] = useState("Tudo");
  const data = filterTimeline(category).map((event) => ({
    id: `${event.date}-${event.title}`,
    title: event.date,
    content: (
      <article key={`${event.date}-${event.title}`}>
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
        controls={
          <>
            <ToggleGroup
              type="single"
              value={category}
              onValueChange={(value) => {
                if (value) setCategory(value);
              }}
              aria-label="Filtrar trajetória por categoria"
            >
              {["Tudo", ...timelineCategories].map((item) => (
                <ToggleGroupItem key={item} value={item}>
                  {item}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <p role="status" className="sr-only">
              Total de eventos: {data.length}.
            </p>
          </>
        }
      />
    </section>
  );
}
