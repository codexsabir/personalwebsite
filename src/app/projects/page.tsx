import type { Metadata } from "next";
import { CountUp } from "@/components/count-up";
import { PageHeader } from "@/components/page-header";
import { PageNav } from "@/components/page-nav";
import { Reveal, RevealItem } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { projects } from "@/lib/profile";

export const metadata: Metadata = {
  title: "What I've built",
  description:
    "Selected projects — contract review, patient intake, RAG tutoring, and enterprise automation.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="what i've built"
        title="Systems with a problem behind them, and a"
        accent="number in front."
        lede="Each of these started as work someone was doing by hand. What follows is the problem, what I built, and what actually changed — because a project without a measurable outcome is just a screenshot."
      />

      <section className="mx-auto w-full max-w-4xl px-6 pt-16">
        <Reveal group className="space-y-6">
          {projects.map((project) => (
            <RevealItem key={project.name}>
              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="font-display text-2xl text-foreground">{project.name}</h2>
                  <span className="font-mono text-xs text-accent">{project.kind}</span>
                </div>

                <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted/70">
                      The problem
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted/70">
                      What I built
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-strong">
                      {project.solution}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-7 flex flex-wrap gap-x-10 gap-y-5 border-t border-border pt-6">
                  {project.metrics.map((metric) => (
                    <li key={metric.label}>
                      <p className="font-display text-2xl text-accent sm:text-3xl">
                        {typeof metric.value === "number" ? (
                          <CountUp value={metric.value} suffix={metric.suffix ?? ""} />
                        ) : (
                          metric.value
                        )}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-muted">{metric.label}</p>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <PageNav />
    </>
  );
}
