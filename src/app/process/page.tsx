import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PageNav } from "@/components/page-nav";
import { ProcessFlow } from "@/components/process-flow";

export const metadata: Metadata = {
  title: "How I work",
  description: "The six steps I take a problem through, from business outcome to production.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="how i work"
        title="From a vague request to something"
        accent="running in production."
        lede="Every problem I take on goes through roughly the same six steps. It isn't a methodology I read about — it's what's left after four years of finding out which shortcuts cost more than they save."
      />

      <section className="mx-auto w-full max-w-4xl px-6 pt-16">
        <ProcessFlow />
      </section>

      <PageNav />
    </>
  );
}
