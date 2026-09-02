import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Converse comigo | José Roberto",
};

const channels = [
  { label: "E-mail", value: "seu@email.com", href: "mailto:seu@email.com" },
  { label: "LinkedIn", value: "linkedin.com/in/seu-usuario", href: "#" },
  { label: "GitHub", value: "github.com/seu-usuario", href: "#" },
];

export default function ContatoPage() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-2xl flex-col items-center justify-center gap-8 px-4 text-center">
      <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
        Converse comigo
      </h1>
      <p className="max-w-lg text-sm opacity-70 md:text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <ul className="flex flex-col gap-3">
        {channels.map((channel) => (
          <li key={channel.label}>
            <a
              href={channel.href}
              className="flex items-baseline justify-center gap-3 text-sm hover:underline"
            >
              <span className="opacity-50">{channel.label}</span>
              <span className="font-medium">{channel.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
