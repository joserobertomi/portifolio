import type { Metadata } from "next";

import { FlipWords } from "@/components/ui/flip-words";
import { LinkPreview } from "@/components/ui/link-preview";
import TimelineSection from "@/components/timeline-section";

const roles = ["engenheiro", "builder", "curioso", "empreendedor"];

export const metadata: Metadata = {
  title: "Sobre | José Roberto",
  description:
    "Engenheiro de software em Goiânia. Conheça minha trajetória em inteligência artificial aplicada, engenharia de dados, pesquisa e desenvolvimento de produtos.",
};

const bioLinkClass =
  "underline decoration-dotted underline-offset-4 opacity-100 transition-opacity hover:opacity-70";

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
            <h1 className="flex flex-col items-center gap-1 text-4xl font-medium tracking-tight md:items-start md:text-5xl lg:flex-row lg:items-center lg:gap-2">
              <span>José Roberto,</span>
              <FlipWords
                words={roles}
                sizeMode="stable"
                className="text-4xl font-medium md:text-5xl"
              />
            </h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-foreground/80 md:mx-0">
              Sempre gostei de entender como as coisas funcionam e imaginar como
              poderiam funcionar melhor. Na tecnologia, encontrei uma forma de
              transformar essa curiosidade em ferramentas que ajudem pessoas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 md:justify-start">
              <a
                href="#trajetoria"
                className={`${bioLinkClass} inline-flex min-h-11 items-center text-sm`}
              >
                Conheça minha trajetória
              </a>
              <a
                href="https://www.linkedin.com/in/joserobertomi/"
                className={`${bioLinkClass} inline-flex min-h-11 items-center text-sm`}
              >
                LinkedIn
              </a>
            </div>
            <p className="text-sm text-foreground/70">
              Veja também meus{" "}
              <LinkPreview
                url="/projects"
                isStatic
                imageSrc="/images/preview-projetos.svg"
                className={bioLinkClass}
              >
                projetos
              </LinkPreview>{" "}
              e meus{" "}
              <LinkPreview
                url="/artigos"
                isStatic
                imageSrc="/images/preview-artigos.svg"
                className={bioLinkClass}
              >
                artigos
              </LinkPreview>
              .
            </p>
          </div>
        </div>
      </section>

      <TimelineSection />
    </>
  );
}
