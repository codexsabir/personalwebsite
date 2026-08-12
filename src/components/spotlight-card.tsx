"use client";

import type { ReactNode } from "react";

/**
 * A card that lights up under the pointer. Position is pushed into CSS custom
 * properties and the gradient is drawn by `.card-spot` in globals.css, so the
 * per-frame work stays off the React render path entirely.
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div onPointerMove={handleMove} className={`card card-spot ${className}`}>
      {children}
    </div>
  );
}
