import { FlipWords } from "@/components/ui/flip-words";
import { LinkPreview } from "@/components/ui/link-preview";
import TimelineSection from "@/components/timeline-section";

const roles = ["engenheiro", "builder", "curioso", "empreendedor"];

const bioLinkClass =
  "underline decoration-dotted underline-offset-4 opacity-100 transition-opacity hover:opacity-70";

export default function Home() {
  return (
    <>
      <section className="flex min-h-svh w-full items-center justify-center overflow-x-clip px-4 pt-12 pb-20 sm:pt-24 sm:pb-12 lg:h-screen lg:pt-20 lg:pb-0">
        <div className="flex max-w-3xl flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/profile-placeholder.svg"
            alt="José Roberto"
            className="h-32 w-32 shrink-0 rounded-full object-cover sm:h-40 sm:w-40"
          />
          <div className="flex flex-col gap-4">
            <h1 className="flex flex-col items-center gap-1 text-4xl font-semibold tracking-tight sm:flex-row sm:items-center sm:gap-2 sm:whitespace-nowrap md:text-5xl">
              <span>José Roberto,</span>
              <FlipWords
                words={roles}
                sizeMode="stable"
                className="text-4xl font-semibold md:text-5xl"
              />
            </h1>
            <p className="max-w-md text-base opacity-80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua — veja
              meus{" "}
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
              , ut enim ad minim veniam.
            </p>
          </div>
        </div>
      </section>

      <TimelineSection />
    </>
  );
}
