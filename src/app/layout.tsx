import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ReactLenis from "lenis/react";

import { GlassNav } from "@/components/layout/glass-nav";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "José Roberto",
  description: "Site institucional",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${jakartaSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReactLenis root>
          <GlassNav />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
