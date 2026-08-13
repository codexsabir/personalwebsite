"use client";

import { useEffect, useRef } from "react";

/**
 * A soft light that trails the pointer. Written straight to a ref with rAF
 * rather than React state — this fires on every mousemove, and re-rendering
 * the tree at that rate would cost far more than the effect is worth.
 * Hidden on touch devices, where there is no pointer to follow.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const tick = () => {
      // Lerp toward the pointer so the light lags slightly — it reads as
      // weight, and stops the glow feeling glued to the cursor.
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.x - 300}px, ${current.y - 300}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[600px] w-[600px] rounded-full opacity-60 blur-[100px] md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(255,106,26,0.10), rgba(255,106,26,0.03) 45%, transparent 70%)",
      }}
    />
  );
}
