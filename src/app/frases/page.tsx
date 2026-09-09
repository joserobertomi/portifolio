import type { Metadata } from "next";

import { quotes } from "@/data/quotes";

export const metadata: Metadata = {
  title: "Frases | José Roberto",
};

export default function FrasesPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-8 pb-24 sm:pt-32">
      <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
        Frases
      </h1>
      <p className="mt-4 text-sm opacity-70">
        Algumas frases que gosto de revisitar de vez em quando.
      </p>

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
