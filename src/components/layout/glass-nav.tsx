"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Início" },
  { href: "/projects", label: "Projetos" },
  { href: "/artigos", label: "Artigos" },
  { href: "/frases", label: "Frases" },
  { href: "/contato", label: "Contato" },
];

const GlassNav = () => {
  const pathname = usePathname();

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 hidden justify-center px-4 sm:flex">
        <nav className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-foreground/10 bg-background/70 px-2 py-2 shadow-lg shadow-black/5 backdrop-blur-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                isLinkActive(link.href)
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 flex justify-around border-t border-foreground/10 bg-background/80 px-1 pt-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md sm:hidden"
        style={{
          paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center rounded-full px-1 py-2 text-[11px] font-medium whitespace-nowrap transition-colors",
              isLinkActive(link.href)
                ? "bg-foreground text-background"
                : "text-foreground/70 hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export { GlassNav };
