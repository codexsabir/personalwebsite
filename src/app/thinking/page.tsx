import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PageNav } from "@/components/page-nav";
import { Reveal, RevealItem } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { models } from "@/lib/profile";

export const metadata: Metadata = {
  title: "How I think",
  description: "The six mental models I bring to every system I build.",
};

export default function ThinkingPage() {
  return (
    <>
      <PageHeader
        eyebrow="how i think"
        title="Six models I bring to"
        accent="every system."
        lede="Anyone can list technologies. What actually decides how a project turns out is the set of defaults an engineer reaches for before the first line is written. These are mine."
      />

      <section className="mx-auto w-full max-w-4xl px-6 pt-16">
        <Reveal group className="grid gap-5 sm:grid-cols-2">
          {models.map((model) => (
            <RevealItem key={model.id}>
              <SpotlightCard className="flex h-full flex-col p-6">
                <span className="label text-accent">{model.id}</span>

                <h2 className="mt-4 font-display text-xl leading-snug text-foreground">
                  {model.title}
                </h2>

                <p className="mt-3 border-l border-accent/40 pl-3 prose-body italic text-muted-strong">
                  {model.principle}
                </p>

                <p className="mt-4 prose-body text-muted">{model.body}</p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <PageNav />
    </>
  );
}
