import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PageNav } from "@/components/page-nav";
import { Reveal, RevealItem } from "@/components/reveal";
import { SpotlightCard } from "@/components/spotlight-card";
import { education, experience, languages, skills } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Where I've done it",
  description: "Four years of professional engineering across SaaS, education, legal, and healthcare.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="where i've done it"
        title="Four years, five roles, one"
        accent="throughline."
        lede="Different companies, different industries, the same job underneath: take something a business does painfully by hand and turn it into a system that runs."
      />

      <section className="mx-auto w-full max-w-4xl px-6 pt-16">
        <Reveal group className="space-y-5">
          {experience.map((role) => (
            <RevealItem key={`${role.company}-${role.period}`}>
              <SpotlightCard className="p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div>
                    <h2 className="font-display text-xl text-foreground sm:text-2xl">{role.role}</h2>
                    <p className="mt-1 text-sm text-accent">{role.company}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-mono text-xs text-muted-strong">{role.period}</p>
                    <p className="mt-1 font-mono text-[11px] text-muted">{role.place}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent/50" />
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
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

      <section className="mx-auto w-full max-w-4xl px-6 pt-20">
        <Reveal>
          <h2 className="font-display text-2xl text-foreground">The toolkit</h2>
          <div className="mt-2 h-px w-16 rule-accent" />
        </Reveal>

        <Reveal group className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((set) => (
            <RevealItem key={set.group}>
              <div className="card h-full p-5">
                <h3 className="font-mono text-xs text-accent">{set.group}</h3>
                <ul className="mt-3 space-y-1.5">
                  {set.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pt-16">
        <Reveal>
          <div className="card flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 p-6">
            <div>
              <h2 className="font-display text-lg text-foreground">{education.degree}</h2>
              <p className="mt-1 text-sm text-muted">
                {education.school} · {education.place}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-mono text-xs text-muted-strong">{education.period}</p>
              <p className="mt-1 font-mono text-[11px] text-muted">{languages.join(" · ")}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <PageNav />
    </>
  );
}
