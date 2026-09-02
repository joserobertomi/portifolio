import { FlipWords } from "@/components/ui/flip-words";
import TimelineSection from "@/components/timeline-section";

const roles = ["engenheiro", "builder", "curioso", "empreendedor"];
const longestRole = roles.reduce((a, b) => (b.length > a.length ? b : a));

const bio =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.";

export default function Home() {
  return (
    <>
      <section className="flex min-h-screen w-full items-center justify-center px-4 pt-24 pb-12 lg:h-screen lg:pt-20 lg:pb-0">
        <div className="flex max-w-3xl flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/profile-placeholder.svg"
            alt="José Roberto"
            className="h-32 w-32 shrink-0 rounded-full object-cover sm:h-40 sm:w-40"
          />
          <div className="flex flex-col gap-4">
            <h1 className="flex items-center whitespace-nowrap text-4xl font-semibold tracking-tight md:text-5xl">
              José Roberto,
              <span className="relative inline-block">
                <span className="invisible" aria-hidden="true">
                  {longestRole}
                </span>
                <span className="absolute inset-0 flex items-center">
                  <FlipWords
                    words={roles}
                    className="text-4xl font-semibold md:text-5xl"
                  />
                </span>
              </span>
            </h1>
            <p className="max-w-md text-base opacity-80">{bio}</p>
          </div>
        </div>
      </section>

      <TimelineSection />
    </>
  );
}
