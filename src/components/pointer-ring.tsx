"use client";

import { useEffect, useRef } from "react";

/**
 * A ring that trails the pointer and opens up over anything clickable.
 *
 * The native cursor is deliberately left visible — a replaced cursor that lags
 * even slightly makes precise clicking feel broken. This rides alongside it as
 * feedback, not as a substitute.
 *
 * Everything is written straight to the DOM in a rAF loop: this updates on
 * every pointer move, and routing that through React state would re-render the
 * tree hundreds of times a second for a purely visual effect.
 */
export function PointerRing() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
      }

      // Open the ring over anything the user can act on.
      const el = event.target as Element | null;
      const interactive = el?.closest?.("a, button, input, [role='button']");
      targetScale = interactive ? 2.1 : 1;
      ring.style.borderColor = interactive
        ? "rgba(255, 106, 26, 0.85)"
        : "rgba(255, 106, 26, 0.35)";
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
    };

    const onDown = () => {
      targetScale = 0.7;
    };

    const onUp = () => {
      targetScale = 1;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      scale += (targetScale - scale) * 0.18;
      ring.style.transform = `translate3d(${current.x - 18}px, ${current.y - 18}px, 0) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-9 w-9 rounded-full border opacity-0 transition-opacity duration-300 md:block"
      style={{ borderColor: "rgba(255, 106, 26, 0.35)" }}
    />
  );
}
