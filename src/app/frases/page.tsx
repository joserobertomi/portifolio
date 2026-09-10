import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { quotes } from "@/data/quotes";

export const metadata: Metadata = {
  title: "Frases | José Roberto",
};

export default function FrasesPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 pt-8 pb-24 sm:pt-32">
      <PageHeader
        title="Frases"
        description="Algumas frases que gosto de revisitar de vez em quando."
      />

      <ul className="mt-12 flex flex-col divide-y divide-foreground/10">
        {quotes.map((quote) => (
          <li key={quote.text} className="py-6">
            <blockquote className="text-lg leading-relaxed md:text-xl">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            {quote.author && (
              <p className="mt-3 text-sm opacity-50">— {quote.author}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
