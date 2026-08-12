"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export const revealGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger children on entry. Children must use `revealItem`. */
  group?: boolean;
  delay?: number;
};

/** Fades content in the first time it scrolls into view. */
export function Reveal({ children, className, group = false, delay = 0 }: RevealProps) {
  return (
    <motion.div
      variants={group ? revealGroup : revealItem}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child inside a `<Reveal group>`. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={revealItem} className={className}>
      {children}
    </motion.div>
  );
}
