"use client";

import { motion } from "framer-motion";
import { SystemsField } from "./systems-field";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-88px)] items-center overflow-hidden px-6 sm:px-10">
      <div className="pointer-events-none absolute inset-0">
        <SystemsField />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-6"
      >
        <motion.p
          variants={item}
          className="font-mono text-sm text-accent"
        >
          <span className="text-muted">{"// "}</span>
          senior software engineer · ai integration
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-6xl"
        >
          An engineer who
          <br />
          thinks in <span className="text-accent">systems.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-lg leading-relaxed text-muted"
        >
          I design and ship backend services, AI agents, and automation
          pipelines — the parts that have to work when nobody&apos;s watching.
        </motion.p>

        <motion.p
          variants={item}
          className="font-mono text-xs text-muted"
        >
          Senior SWE @ Bit and Bytes LLC — Lahore, Pakistan
        </motion.p>

        <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-4">
          <a
            href="mailto:codexsabir@gmail.com"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/c0dexs4bir/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Connect on LinkedIn ↗
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
