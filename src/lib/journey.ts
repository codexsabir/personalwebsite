export type JourneyStep = {
  href: string;
  /** Short label for the progress rail and nav buttons. */
  label: string;
  /** The question this page answers, shown as the nav button caption. */
  question: string;
};

/**
 * The site is a guided sequence, not a menu. Order matters: each page answers
 * the question the previous one raises, so a visitor can land on page one and
 * keep pressing Next without ever choosing where to go.
 */
export const journey: JourneyStep[] = [
  { href: "/", label: "Start", question: "Who is this?" },
  { href: "/thinking", label: "How I think", question: "How do you think?" },
  { href: "/process", label: "How I work", question: "How do you actually work?" },
  { href: "/work", label: "Where I've done it", question: "Where have you done it?" },
  { href: "/projects", label: "What I've built", question: "What have you built?" },
  { href: "/why-me", label: "Why me", question: "Why you?" },
  { href: "/contact", label: "Talk to me", question: "How do we start?" },
];

export function stepIndex(pathname: string): number {
  return journey.findIndex((step) => step.href === pathname);
}

export function stepNeighbours(pathname: string) {
  const index = stepIndex(pathname);
  if (index === -1) return { index, prev: undefined, next: undefined };
  return {
    index,
    prev: index > 0 ? journey[index - 1] : undefined,
    next: index < journey.length - 1 ? journey[index + 1] : undefined,
  };
}
