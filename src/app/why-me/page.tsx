import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PageNav } from "@/components/page-nav";
import { Reveal, RevealItem } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { differentiators } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Why me",
  description: "Six claims about how I work — each one backed by something I've actually shipped.",
};

export default function WhyMePage() {
  return (
    <>
      <PageHeader
        eyebrow="why me"
        title="Six claims, each one I can"
        accent="back with receipts."
        lede="Everybody's portfolio says passionate, detail-oriented, fast learner. None of that is checkable. Here is what I'd actually argue makes me worth hiring — with the evidence attached to each line."
      />

      <section className="mx-auto w-full max-w-4xl px-6 pt-16">
        <Reveal group className="space-y-5">
          {differentiators.map((item, i) => (
            <RevealItem key={item.title}>
              <SpotlightCard className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8">
                <span
                  aria-hidden="true"
                  className="font-display text-4xl leading-none text-border-strong sm:text-5xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1">
                  <h2 className="font-display text-xl leading-snug text-foreground">{item.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{item.claim}</p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1.5 font-mono text-[11px] text-accent-soft">
                    <span aria-hidden="true">✓</span>
                    {item.proof}
                  </p>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pt-16">
        <Reveal>
          <blockquote className="card p-8 sm:p-10">
            <p className="font-display text-xl leading-relaxed text-foreground sm:text-2xl">
              The engineers worth keeping aren&apos;t the ones who know the most frameworks. They&apos;re
              the ones who can look at a mess of a business process and see{" "}
              <span className="text-accent">the system underneath it.</span>
            </p>
            <footer className="mt-6 font-mono text-xs text-muted">
              — what I&apos;m actually selling
            </footer>
          </blockquote>
        </Reveal>
      </section>

      <PageNav />
    </>
  );
}
