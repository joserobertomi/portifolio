import type { Metadata } from "next";

import { ScrollLinePath } from "@/components/ui/scroll-line-path";
import { Timeline } from "@/components/ui/timeline";
import { timeline } from "@/data/timeline";

export const metadata: Metadata = {
  title: "Trajetória | José Roberto",
};

export default function TrajetoriaPage() {
  return (
    <>
      <ScrollLinePath
        eyebrow="Minha trajetória"
        title="Lorem ipsum dolor sit amet"
        subtitle="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
      />
      <Timeline years={timeline} />
    </>
  );
}
