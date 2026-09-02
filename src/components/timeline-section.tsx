import { Timeline } from "@/components/ui/timeline";
import { timeline } from "@/data/timeline";

export default function TimelineSection() {
  const data = timeline.map((yearGroup) => ({
    title: String(yearGroup.year),
    content: (
      <div key={yearGroup.year} className="flex flex-col gap-6">
        {yearGroup.events.map((event) => (
          <div key={event.title}>
            <h3 className="text-lg font-medium">{event.title}</h3>
            <p className="mt-1 text-sm text-foreground/70">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <Timeline
      data={data}
      heading="Minha trajetória"
      description="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
    />
  );
}
