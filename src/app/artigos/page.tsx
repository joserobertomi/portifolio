import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Artigos | José Roberto",
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function ArtigosPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pt-8 pb-24 sm:pt-32">
      <PageHeader
        title="Artigos"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />

      <ul className="mt-12 flex flex-col divide-y divide-foreground/10">
        {sorted.map((article) => (
          <li key={article.slug} className="py-3">
            <Link
              href={`/artigos/${article.slug}`}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <span className="sm:w-32 shrink-0 font-mono text-xs opacity-50">
                {dateFormatter.format(new Date(article.date))}
              </span>
              <span className="text-base font-medium hover:underline">
                {article.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
