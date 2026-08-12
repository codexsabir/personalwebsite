"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

export function PageHeader({
  eyebrow,
  title,
  accent,
  lede,
}: {
  eyebrow: string;
  title: string;
  /** Trailing fragment of the title, rendered in the accent colour. */
  accent?: string;
  lede: string;
}) {
  return (
    <motion.header
      variants={group}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-4xl px-6 pt-24 sm:pt-28"
    >
      <motion.p variants={item} className="font-mono text-xs tracking-wide text-accent">
        <span className="text-muted">{"// "}</span>
        {eyebrow}
      </motion.p>

      <motion.h1
        variants={item}
        className="mt-5 font-display text-3xl leading-[1.12] font-medium tracking-tight text-foreground sm:text-5xl"
      >
        {title}
        {accent && <span className="text-accent"> {accent}</span>}
      </motion.h1>

      <motion.div variants={item} className="mt-6 h-px w-24 rule-accent" />

      <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-strong">
        {lede}
      </motion.p>
    </motion.header>
  );
}
