"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { journey, stepIndex } from "@/lib/journey";

/**
 * A fixed rail marking position in the sequence. An unfinished progress
 * indicator is a quietly persuasive thing — it turns "I've seen enough" into
 * "I'm three of seven in", which is a much harder feeling to walk away from.
 */
export function ProgressRail() {
  const pathname = usePathname();
  const active = stepIndex(pathname);

  if (active === -1) return null;

  const pct = (active / (journey.length - 1)) * 100;

  return (
    <>
      {/* Desktop: labelled rail down the left edge. */}
      <nav
        aria-label="Site progress"
        className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ol className="flex flex-col gap-4">
          {journey.map((step, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <li key={step.href} className="pointer-events-auto">
                <Link
                  href={step.href}
                  aria-current={isActive ? "page" : undefined}
                  className="group flex items-center gap-3"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "scale-150 bg-accent"
                          : isDone
                            ? "bg-accent/45"
                            : "bg-border-strong group-hover:bg-muted"
                      }`}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="rail-ring"
                        className="absolute inset-0 rounded-full ring-1 ring-accent/60"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                  </span>
                  <span
                    className={`whitespace-nowrap label transition-all duration-300 ${
                      isActive
                        ? "text-foreground opacity-100"
                        : "text-muted opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {step.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile: a hairline bar across the top. */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-40 h-0.5 bg-border/50 lg:hidden"
      >
        <motion.div
          className="h-full bg-accent"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        />
      </div>
    </>
  );
}
