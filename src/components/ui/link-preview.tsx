"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { encode } from "qss";
import React from "react";

import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  // `quality` and `layout` exist for Aceternity API parity and are only
  // relevant when using dynamic microlink screenshots.
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  // Client-only flag to defer the hidden preload <img> until after hydration,
  // without calling setState inside an effect.
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <>
      {isMounted ? (
        <span className="hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={width} height={height} alt="hidden image" />
        </span>
      ) : null}

      <HoverCardPrimitive.Root openDelay={50} closeDelay={100}>
        <HoverCardPrimitive.Trigger
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className="z-50"
            side="top"
            align="center"
            sideOffset={10}
          >
            <div className="rounded-xl shadow-xl">
              <a
                href={url}
                className="block rounded-xl border-2 border-transparent bg-white p-1 shadow dark:bg-zinc-950"
                style={{ fontSize: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={isStatic ? imageSrc : src}
                  width={width}
                  height={height}
                  className="rounded-lg"
                  alt="preview image"
                />
              </a>
            </div>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};
