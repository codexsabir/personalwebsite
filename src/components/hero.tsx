"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Magnetic } from "./magnetic";
import { PortraitBackdrop } from "./portrait-backdrop";
import { TypedCode } from "./typed-code";
import { journey } from "@/lib/journey";

const words = ["An", "engineer", "who", "thinks", "in"];
const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const word = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease } },
};

const next = journey[1];

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      <PortraitBackdrop />
      <div aria-hidden="true" className="aurora pointer-events-none absolute inset-0" />

      {/* Code left, face right, message centre. Both flanks stay well under
          the headline's contrast so the sentence still lands first. */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 0.55, x: 0 }}
        transition={{ delay: 1.9, duration: 1.1, ease }}
        className="pointer-events-none absolute bottom-16 left-10 z-10 hidden xl:block"
      >
        <TypedCode />
      </motion.div>

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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease }}
        className="relative z-10 mt-16"
      >
        <Magnetic strength={16}>
          <Link
            href={next.href}
            className="group flex items-center gap-4 rounded-full border border-border-strong bg-background-elevated/70 py-2 pl-6 pr-2 backdrop-blur transition-colors hover:border-accent/60"
          >
            <span className="label text-muted transition-colors group-hover:text-foreground">
              Start here
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </Magnetic>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="label absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 text-muted-faint lg:block"
      >
        move your cursor · press → to go on
      </motion.p>
    </section>
  );
}
