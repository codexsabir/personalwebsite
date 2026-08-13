"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { process } from "@/lib/profile";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The six steps as a vertical spine that draws itself as you scroll. The line
 * filling in behind you is the point: the process is sequential, and the page
 * should feel sequential too.
 */
export function ProcessFlow() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const glowOpacity = useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <ol ref={ref} className="relative ml-3 space-y-14 border-l border-border pl-8 sm:ml-6 sm:pl-12">
      {/* The filled portion of the spine, tied to scroll position. */}
      <motion.span
        aria-hidden="true"
        style={{ scaleY: progress, opacity: glowOpacity }}
        className="absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/20"
      />

      {process.map((item) => (
        <motion.li
          key={item.step}
          initial={{ opacity: 0, x: -18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="relative"
        >
          {/* Node on the spine */}
          <span className="absolute -left-[41px] top-1.5 flex h-3 w-3 items-center justify-center sm:-left-[57px]">
            <span className="h-3 w-3 rounded-full border border-accent/50 bg-background" />
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent"
            />
          </span>

          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-xs text-accent">{item.step}</span>
            <h2 className="font-display text-xl leading-snug text-foreground sm:text-2xl">
              {item.title}
            </h2>
          </div>

          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{item.detail}</p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3 py-1.5 font-mono text-[11px] text-muted-strong">
            <span className="text-accent">?</span>
            {item.signal}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
