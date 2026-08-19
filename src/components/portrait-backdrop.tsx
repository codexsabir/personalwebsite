/**
 * The portrait, used as a decorative backdrop.
 *
 * Deliberately a CSS background rather than `next/image`: it is decoration,
 * not content (no alt text to give, not the LCP element), and a missing file
 * then degrades to nothing at all instead of a broken-image box. The cost is
 * losing automatic format conversion — see README for the export size to use.
 *
 * The source photo has a solid mustard studio background. At 20% opacity on a
 * near-black page that rectangle would read as a grey block, so the layer is
 * desaturated and edge-masked into an ellipse — the face survives, the box
 * dissolves.
 */
export function PortraitBackdrop({
  className = "",
  side = "right",
}: {
  className?: string;
  /** Which edge the portrait bleeds off. */
  side?: "right" | "center";
}) {
  const position =
    side === "right"
      ? "right-0 top-0 h-full w-[62%] sm:w-[52%] lg:w-[42%]"
      : "left-1/2 top-0 h-full w-[80%] -translate-x-1/2 sm:w-[55%]";

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className={`portrait absolute ${position}`} />
    </div>
  );
}
