import type { Metadata } from "next";
import { ContactActions } from "@/components/contact-actions";
import { PageHeader } from "@/components/page-header";
import { PageNav } from "@/components/page-nav";
import { Reveal, RevealItem } from "@/components/reveal";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Talk to me",
  description: "Get in touch with Sabir Ud Din — email, phone, LinkedIn, and GitHub.",
};

const channels = [
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", value: "/in/c0dexs4bir", href: profile.linkedin },
  { label: "GitHub", value: "/codexsabir", href: profile.github },
  { label: "Based in", value: `${profile.location} · UTC+5`, href: undefined },
];

/** Lowering the cost of the first message is most of the job of a contact page. */
const helpful = [
  "What you're trying to build, in a sentence or two.",
  "What's painful about how it works today.",
  "Roughly when you need it, and who else is involved.",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="talk to me"
        title="If any of that sounded like the person you need,"
        accent="say hello."
        lede="I'm open to selective work — most often where an AI or backend system has to genuinely hold up in production, or where a business is buried in manual steps that should have been a pipeline years ago."
      />

      <section className="mx-auto w-full max-w-4xl px-6 pt-14">
        <Reveal>
          <ContactActions />
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pt-16">
        <Reveal group className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {channels.map((channel) => (
            <RevealItem key={channel.label}>
              <div className="h-full bg-background-elevated p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted/70">
                  {channel.label}
                </p>
                {channel.href ? (
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-2 inline-block text-foreground transition-colors hover:text-accent"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <p className="mt-2 text-foreground">{channel.value}</p>
                )}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 pt-16">
        <Reveal>
          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-lg text-foreground">
              Three lines that get you a much better reply
            </h2>
            <ul className="mt-5 space-y-3">
              {helpful.map((line, i) => (
                <li key={line} className="flex gap-4 text-sm leading-relaxed text-muted">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-strong">
              I read everything, and I&apos;ll tell you honestly if I&apos;m not the right person for
              it — usually with a suggestion of who might be.
            </p>
          </div>
        </Reveal>
      </section>

      <footer className="mx-auto w-full max-w-4xl px-6 pt-16">
        <Reveal>
          <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
            An engineer who thinks in <span className="glow-word text-accent">systems.</span>
          </p>
          <p className="mt-3 font-mono text-xs text-muted">
            {profile.name} · {profile.location}
          </p>
        </Reveal>
      </footer>

      <PageNav />
    </>
  );
}
