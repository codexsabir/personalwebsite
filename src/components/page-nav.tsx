"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { journey, stepNeighbours } from "@/lib/journey";
import { Magnetic } from "./magnetic";

/**
 * Forward/back controls for the guided sequence. The Next button is captioned
 * with the question the following page answers, so pressing it is a choice to
 * hear an answer rather than a blind step deeper into a site.
 */
export function PageNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { index, prev, next } = stepNeighbours(pathname);

  // Arrow keys move through the sequence. Ignored while typing, so the chat
  // input keeps its own cursor behaviour.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === "ArrowRight" && next) router.push(next.href);
      if (event.key === "ArrowLeft" && prev) router.push(prev.href);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, router]);

  if (index === -1) return null;

  return (
    <nav
      aria-label="Page navigation"
      className="mx-auto flex w-full max-w-4xl flex-col-reverse items-stretch gap-4 px-6 pb-20 pt-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            {prev.label}
          </Link>
        ) : (
          <span />
        )}
        <span className="hidden font-mono text-[11px] text-muted/60 sm:inline">
          {String(index + 1).padStart(2, "0")} / {String(journey.length).padStart(2, "0")}
        </span>
      </div>

      {next && (
        <Magnetic strength={10} className="w-full sm:w-auto">
          <Link
            href={next.href}
            className="group flex w-full items-center justify-between gap-6 rounded-full border border-border-strong bg-background-elevated px-6 py-4 transition-colors hover:border-accent/60 sm:w-auto"
          >
            <span className="flex flex-col text-left">
              <span className="font-mono text-[11px] text-muted">{next.question}</span>
              <span className="font-display text-base text-foreground">{next.label}</span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Magnetic>
      )}
    </nav>
  );
}
