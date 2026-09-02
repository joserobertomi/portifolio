import type { Metadata } from "next";
import Link from "next/link";

import { stories } from "@/data/stories";

export const metadata: Metadata = {
  title: "Stories | José Roberto",
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function StoriesPage() {
  const sorted = [...stories].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-32 pb-24">
      <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
        Stories
      </h1>
      <p className="mt-4 text-sm opacity-70">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <ul className="mt-12 flex flex-col divide-y divide-foreground/10">
        {sorted.map((story) => (
          <li key={story.slug} className="py-3">
            <Link
              href={`/stories/${story.slug}`}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <span className="w-32 shrink-0 font-mono text-xs opacity-50">
                {dateFormatter.format(new Date(story.date))}
              </span>
              <span className="text-base hover:underline">
                {story.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
