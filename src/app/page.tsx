import { ContainerTextFlip } from "@/components/ui/container-text-flip";

const words = ["trajetória", "história", "jornada", "vida"];

export default function Home() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden px-4 text-center">
      <span className="text-lg font-medium md:text-2xl">Eu sou José, e essa é minha</span>
      <ContainerTextFlip words={words} />
      <p className="max-w-xl text-sm opacity-70 md:text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </section>
  );
}
