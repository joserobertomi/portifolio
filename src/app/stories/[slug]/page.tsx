import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { stories } from "@/data/stories";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata(
  props: PageProps<"/stories/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const story = stories.find((item) => item.slug === slug);

  return { title: story ? `${story.title} | José Roberto` : "Story" };
}

export default async function StoryPage(props: PageProps<"/stories/[slug]">) {
  const { slug } = await props.params;
  const story = stories.find((item) => item.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-2xl px-4 pt-32 pb-24">
      <Link
        href="/stories"
        className="text-xs opacity-50 hover:underline hover:opacity-100"
      >
        ← Stories
      </Link>

      <h1 className="mt-6 text-3xl font-medium tracking-tight md:text-4xl">
        {story.title}
      </h1>
      <span className="mt-2 block font-mono text-xs opacity-50">
        {dateFormatter.format(new Date(story.date))}
      </span>

      <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed opacity-90">
        {story.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
