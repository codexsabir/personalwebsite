"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Templates remount on every navigation, which makes this the right place for
 * the transition: each page fades and lifts in rather than snapping, so moving
 * through the sequence feels continuous instead of like seven separate sites.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
