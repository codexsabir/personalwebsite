"use client";

import { useEffect, useMemo, useState } from "react";

type Tone = "kw" | "fn" | "str" | "cmt" | "plain";
type Segment = { t: string; tone?: Tone };

const TONE_CLASS: Record<Tone, string> = {
  kw: "text-accent",
  fn: "text-accent-soft",
  str: "text-muted-strong",
  cmt: "text-muted-faint",
  plain: "text-muted",
};

/** The six process steps, compressed into something that reads as real code. */
const LINES: Segment[][] = [
  [{ t: "// the whole method, more or less", tone: "cmt" }],
  [
    { t: "const ", tone: "kw" },
    { t: "system = " },
    { t: "await ", tone: "kw" },
    { t: "map", tone: "fn" },
    { t: "(problem)" },
  ],
  [
    { t: "if ", tone: "kw" },
    { t: "(!system.drawable) " },
    { t: "throw new ", tone: "kw" },
    { t: "Error", tone: "fn" },
    { t: "(" },
    { t: "'not understood yet'", tone: "str" },
    { t: ")" },
  ],
  [
    { t: "const ", tone: "kw" },
    { t: "slice = " },
    { t: "thinnest", tone: "fn" },
    { t: "(system)" },
  ],
  [
    { t: "await ", tone: "kw" },
    { t: "ship", tone: "fn" },
    { t: "(" },
    { t: "boring", tone: "fn" },
    { t: "(slice))" },
  ],
  [
    { t: "observe", tone: "fn" },
    { t: "(production)." },
    { t: "forever", tone: "fn" },
    { t: "()" },
  ],
];

const CHAR_MS = 32;
const LINE_PAUSE_MS = 280;
const HOLD_MS = 5200;

export function TypedCode({ className = "" }: { className?: string }) {
  const { lengths, offsets, total } = useMemo(() => {
    const lengths = LINES.map((line) => line.reduce((n, seg) => n + seg.t.length, 0));
    const offsets: number[] = [];
    let running = 0;
    for (const len of lengths) {
      offsets.push(running);
      running += len;
    }
    return { lengths, offsets, total: running };
  }, []);

  const [typed, setTyped] = useState(0);

  useEffect(() => {
    // Reduced motion still gets the code — it just arrives rather than types.
    // Jumping via a timer (not a bare setState) keeps this off the render path
    // and avoids a hydration mismatch from reading matchMedia during render.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (typed === total) return;
      const id = setTimeout(() => setTyped(total), 0);
      return () => clearTimeout(id);
    }

    if (typed >= total) {
      const id = setTimeout(() => setTyped(0), HOLD_MS);
      return () => clearTimeout(id);
    }

    // Breathe at line breaks, the way someone actually types.
    const atLineStart = typed > 0 && offsets.includes(typed);
    const id = setTimeout(() => setTyped((n) => n + 1), atLineStart ? LINE_PAUSE_MS : CHAR_MS);
    return () => clearTimeout(id);
  }, [typed, total, offsets]);

  // The line the caret currently sits on.
  const activeLine = lengths.findIndex((len, i) => typed < offsets[i] + len);

  return (
    <div
      aria-hidden="true"
      className={`select-none font-mono text-[13px] leading-[1.75] ${className}`}
    >
      {LINES.map((line, i) => {
        // Every line keeps its box whether or not it has content yet, so the
        // block never reflows as it types.
        let remaining = Math.max(0, Math.min(typed - offsets[i], lengths[i]));
        const isActive = i === activeLine || (activeLine === -1 && i === LINES.length - 1);

        return (
          <p key={i} className="min-h-[1.75em] whitespace-pre">
            {line.map((seg, j) => {
              const shown = seg.t.slice(0, remaining);
              remaining = Math.max(0, remaining - seg.t.length);
              if (!shown) return null;
              return (
                <span key={j} className={TONE_CLASS[seg.tone ?? "plain"]}>
                  {shown}
                </span>
              );
            })}
            {isActive && <span className="cursor-blink text-accent">▊</span>}
          </p>
        );
      })}
    </div>
  );
}
