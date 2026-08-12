"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up once it scrolls into view. A number that climbs gets read;
 * the same number sitting static gets skimmed past.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Reduced motion collapses the animation to zero duration rather than
    // taking a separate branch, so the value still arrives via the callback
    // and never lands as a synchronous setState inside the effect.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const controls = animate(0, value, {
      duration: reduced ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
