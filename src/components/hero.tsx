"use client";

import { motion } from "framer-motion";
import { SystemsField } from "./systems-field";

const words = ["An", "engineer", "who", "thinks", "in"];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.2 },
  },
};

const word = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0">
        <SystemsField />
      </div>

      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl text-center font-display text-4xl leading-[1.15] font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl"
      >
        {words.map((w) => (
          <motion.span key={w} variants={word} className="mr-[0.28em] inline-block">
            {w}
          </motion.span>
        ))}
        <motion.span variants={word} className="glow-word inline-block text-accent">
          systems.
        </motion.span>
        <motion.span
          variants={word}
          aria-hidden="true"
          className="cursor-blink ml-2 inline-block text-accent"
        >
          |
        </motion.span>
      </motion.h1>
    </section>
  );
}
