"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };
type Ripple = { x: number; y: number; start: number };

const ACCENT = "255, 106, 26";

const LINK_DIST = 128; // particle ↔ particle
const POINTER_DIST = 230; // pointer ↔ particle
const RIPPLE_DIST = 260;
const RIPPLE_MS = 900;

const AREA_PER_PARTICLE = 18500;
const MIN_PARTICLES = 26;
const MAX_PARTICLES = 96;

const MAX_SPEED = 0.75;
const DRIFT = 0.006; // brownian jitter, keeps the field alive
const PULL = 0.007; // how hard the pointer draws particles in

/**
 * The background network — and the point of it: the pointer is a node in the
 * graph, not a spectator. Move and the nearest nodes link to you, brighten,
 * and lean your way; click and the network takes the shock. It is the site's
 * one sentence rendered as behaviour rather than decoration.
 *
 * Canvas rather than SVG/DOM because this draws a few hundred lines per frame,
 * which would be thousands of style recalculations as elements.
 */
export function InteractiveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let frame = 0;

    const pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / AREA_PER_PARTICLE);
      const total = Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, count));

      particles = Array.from({ length: total }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: 1 + Math.random() * 1.6,
      }));
    };

    const drawLinks = () => {
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;

          const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.12;
          ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        let glow = 0.28;
        if (pointer.active) {
          const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (d < POINTER_DIST) glow += (1 - d / POINTER_DIST) * 0.65;
        }
        ctx.fillStyle = `rgba(${ACCENT}, ${glow})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * DRIFT;
        p.vy += (Math.random() - 0.5) * DRIFT;

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap rather than bounce, so the field has no visible walls.
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      drawLinks();

      if (pointer.active) {
        ctx.lineWidth = 1;
        for (const p of particles) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d > POINTER_DIST || d < 1) continue;

          const t = 1 - d / POINTER_DIST;
          ctx.strokeStyle = `rgba(${ACCENT}, ${t * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          p.vx -= (dx / d) * t * PULL;
          p.vy -= (dy / d) * t * PULL;
        }
      }

      drawParticles();

      if (pointer.active) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          110,
        );
        glow.addColorStop(0, `rgba(${ACCENT}, 0.14)`);
        glow.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(pointer.x - 110, pointer.y - 110, 220, 220);

        ctx.fillStyle = `rgba(${ACCENT}, 0.85)`;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      const now = performance.now();
      ripples = ripples.filter((r) => now - r.start < RIPPLE_MS);
      for (const r of ripples) {
        const t = (now - r.start) / RIPPLE_MS;
        ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - t) * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, t * RIPPLE_DIST, 0, Math.PI * 2);
        ctx.stroke();
      }

      frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const onDown = (event: PointerEvent) => {
      ripples.push({ x: event.clientX, y: event.clientY, start: performance.now() });
      for (const p of particles) {
        const dx = p.x - event.clientX;
        const dy = p.y - event.clientY;
        const d = Math.hypot(dx, dy) || 1;
        if (d > RIPPLE_DIST) continue;
        const force = (1 - d / RIPPLE_DIST) * 1.5;
        p.vx += (dx / d) * force;
        p.vy += (dy / d) * force;
      }
    };

    // Stop burning frames on a tab nobody is looking at.
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(step);
    };

    resize();

    if (reduced) {
      // One static frame: the texture stays, the motion doesn't.
      drawLinks();
      drawParticles();
      const onResizeStatic = () => {
        resize();
        drawLinks();
        drawParticles();
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
