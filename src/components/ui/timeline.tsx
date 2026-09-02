import type { TimelineYear } from "@/data/timeline";

interface TimelineProps {
  years: TimelineYear[];
}

const Timeline = ({ years }: TimelineProps) => {
  return (
    <div className="relative mx-auto max-w-3xl px-4 py-24">
      <div className="absolute top-0 bottom-0 left-[1.6rem] w-px bg-foreground/15 md:left-1/2" />
      <div className="flex flex-col gap-16">
        {years.map((yearGroup) => (
          <div
            key={yearGroup.year}
            className="relative flex flex-col gap-6 md:flex-row md:gap-12"
          >
            <div className="relative flex items-start md:w-1/2 md:justify-end md:pr-12">
              <span className="absolute top-0 left-[1.1rem] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-foreground md:left-auto md:-right-[0.375rem] md:translate-x-1/2" />
              <h2 className="pl-12 text-3xl font-semibold tracking-tight md:pl-0 md:text-4xl">
                {yearGroup.year}
              </h2>
            </div>
            <div className="flex flex-col gap-6 pl-12 md:w-1/2 md:pl-0">
              {yearGroup.events.map((event) => (
                <div key={event.title}>
                  <h3 className="text-lg font-medium">{event.title}</h3>
                  <p className="mt-1 text-sm opacity-70">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Timeline };
