"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Início" },
  { href: "/trajetoria", label: "Trajetória" },
  { href: "/projects", label: "Projects" },
  { href: "/artigos", label: "Artigos" },
  { href: "/frases", label: "Frases" },
  { href: "/contato", label: "Contato" },
];

const GlassNav = () => {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-foreground/10 bg-background/70 px-2 py-2 shadow-lg shadow-black/5 backdrop-blur-md">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export { GlassNav };
