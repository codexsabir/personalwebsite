"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Magnetic } from "./magnetic";
import { profile } from "@/lib/profile";

export function ContactActions() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked by permissions or an insecure origin. The
      // mailto link beside this is the fallback, so failing quietly is fine.
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Magnetic strength={12}>
        <a
          href={`mailto:${profile.email}`}
          className="group flex items-center justify-between gap-6 rounded-full bg-accent py-4 pl-7 pr-3 text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          <span className="font-display text-base">{profile.email}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-foreground/15 transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </Magnetic>

      <button
        type="button"
        onClick={copy}
        className="relative rounded-full border border-border-strong px-5 py-4 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-foreground"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="block"
          >
            {copied ? "✓ copied" : "copy address"}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
