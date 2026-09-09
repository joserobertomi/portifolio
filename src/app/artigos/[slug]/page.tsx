import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { articles } from "@/data/articles";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: PageProps<"/artigos/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = articles.find((item) => item.slug === slug);

  return { title: article ? `${article.title} | José Roberto` : "Artigo" };
}

export default async function ArticlePage(
  props: PageProps<"/artigos/[slug]">,
) {
  const { slug } = await props.params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-2xl px-4 pt-8 pb-24 sm:pt-32">
      <Link
        href="/artigos"
        className="text-xs opacity-50 hover:underline hover:opacity-100"
      >
        ← Artigos
      </Link>

      <h1 className="mt-6 text-3xl font-medium tracking-tight md:text-4xl">
        {article.title}
      </h1>
      <span className="mt-2 block font-mono text-xs opacity-50">
        {dateFormatter.format(new Date(article.date))}
      </span>

      <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed opacity-90">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
