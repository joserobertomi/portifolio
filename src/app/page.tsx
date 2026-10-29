import type { Metadata } from "next";
import Link from "next/link";

import { FlipWords } from "@/components/ui/flip-words";
import TimelineSection from "@/components/timeline-section";

const roles = [
  "engenheiro de software",
  "empreendedor",
  "inovador serial",
  "movido por impacto",
  "orientado a dados",
  "construindo com IA",
  "criando agentes",
];

export const metadata: Metadata = {
  title: "Sobre | José Roberto",
  description:
    "Engenheiro de software em Goiânia. Conheça minha trajetória em inteligência artificial aplicada, engenharia de dados, pesquisa e desenvolvimento de produtos.",
};

const bioLinkClass =
  "inline-flex min-h-11 items-center whitespace-nowrap underline decoration-dotted underline-offset-4 transition-opacity duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-fine:hover:opacity-80 motion-reduce:transition-none";

export default function Home() {
  return (
    <>
      <section
        aria-label="Sobre José Roberto"
        className="flex min-h-svh w-full items-center justify-center overflow-x-clip px-5 pt-12 pb-24 sm:pt-28 sm:pb-16"
      >
        <div className="flex w-full max-w-4xl flex-col items-center gap-8 text-center md:flex-row md:text-left lg:gap-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/jose-roberto.jpg"
            alt="José Roberto Mendonça"
            width={200}
            height={200}
            className="h-32 w-32 shrink-0 rounded-full object-cover sm:h-40 sm:w-40 lg:h-48 lg:w-48"
          />
          <div className="flex min-w-0 flex-col gap-5">
            <h1 className="flex flex-col items-center gap-1 text-4xl font-medium tracking-tight md:items-start md:text-5xl lg:flex-row lg:flex-wrap lg:items-center lg:gap-2">
              <span>José Roberto,</span>
              <FlipWords
                words={roles}
                sizeMode="stable"
                className="text-2xl font-medium sm:text-4xl lg:text-5xl"
              />
            </h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-foreground/80 md:mx-0">
              Sempre gostei de entender como as coisas funcionam e imaginar como
              poderiam funcionar melhor. Na tecnologia, encontrei uma forma de
              transformar essa curiosidade em ferramentas que ajudem pessoas.
            </p>
            <nav
              aria-label="Links do perfil"
              className="flex flex-wrap items-center justify-center gap-x-3 text-sm md:justify-start"
            >
              <a href="#trajetoria" className={bioLinkClass}>
                Trajetória
              </a>
              <span
                aria-hidden="true"
                className="hidden text-foreground/40 sm:inline"
              >
                ·
              </span>
              <Link href="/projects" className={bioLinkClass}>
                Projetos
              </Link>
              <span
                aria-hidden="true"
                className="hidden text-foreground/40 sm:inline"
              >
                ·
              </span>
              <Link href="/artigos" className={bioLinkClass}>
                Artigos
              </Link>
              <span
                aria-hidden="true"
                className="hidden text-foreground/40 sm:inline"
              >
                ·
              </span>
              <a
                href="https://www.linkedin.com/in/joserobertomi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (abre em uma nova aba)"
                className={bioLinkClass}
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
      </section>

      <TimelineSection />
    </>
  );
}
