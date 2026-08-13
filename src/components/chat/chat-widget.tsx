"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { matchIntent, starters, type Intent } from "@/lib/chat-knowledge";

type Message = {
  id: number;
  from: "them" | "me";
  text: string;
};

const greeting: Message = {
  id: 0,
  from: "them",
  text: "Ask me anything about Sabir — his experience, how he works, what he's shipped, or how to reach him.",
};

const ease = [0.16, 1, 0.3, 1] as const;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [nudged, setNudged] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear any in-flight reply timers if the component goes away mid-answer.
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // A single, gentle nudge once someone has been reading for a while. One
  // prompt is an offer; a second would be pestering.
  useEffect(() => {
    const timer = setTimeout(() => setNudged(true), 12000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /**
   * `known` short-circuits the matcher for starter chips: the chip already
   * names its intent, so there's no reason to re-derive it from the label and
   * risk landing somewhere else.
   */
  const send = (text: string, known?: Intent) => {
    const question = text.trim();
    if (!question) return;

    setMessages((prev) => [...prev, { id: nextId.current++, from: "me", text: question }]);
    setDraft("");
    setTyping(true);

    const answer = known ? known.answer : matchIntent(question).answer;

    // A beat of "typing" before the reply. Instant answers read as a lookup
    // table; a short pause reads as someone considering the question.
    const timer = setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [...prev, { id: nextId.current++, from: "them", text: answer }]);
      },
      450 + Math.min(answer.length * 4, 700),
    );
    timers.current.push(timer);
  };

  const showStarters = messages.length === 1;

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {nudged && !open && (
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ duration: 0.5, ease }}
              className="hidden rounded-full border border-border-strong bg-background-elevated px-4 py-2 font-mono text-xs text-muted-strong shadow-lg transition-colors hover:text-foreground sm:block"
            >
              Questions? Ask away.
            </motion.button>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Close chat" : "Open chat"}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_8px_30px_rgba(255,106,26,0.35)] transition-transform hover:scale-105 active:scale-95"
        >
          {!open && (
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-20" />
          )}
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative text-xl leading-none"
          >
            {open ? "✕" : "✳"}
          </motion.span>
        </button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Chat with Sabir's assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100vh-8rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border-strong bg-background-elevated shadow-2xl sm:right-6"
          >
            <header className="flex items-center gap-3 border-b border-border px-5 py-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-sm text-foreground">Ask about Sabir</span>
                <span className="font-mono text-[10px] text-muted">
                  scripted answers · no model, no guessing
                </span>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className={message.from === "me" ? "flex justify-end" : "flex justify-start"}
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      message.from === "me"
                        ? "rounded-br-sm bg-accent text-accent-foreground"
                        : "rounded-bl-sm border border-border bg-surface text-muted-strong"
                    }`}
                  >
                    {message.text}
                  </p>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <span className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="typing-dot h-1.5 w-1.5 rounded-full bg-muted"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                </div>
              )}

              {showStarters && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {starters.map((intent) => (
                    <li key={intent.id}>
                      <button
                        type="button"
                        onClick={() => send(intent.suggestion!, intent)}
                        className="rounded-full border border-border px-3 py-1.5 text-left font-mono text-[11px] text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                      >
                        {intent.suggestion}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type a question…"
                aria-label="Your question"
                className="min-w-0 flex-1 rounded-full bg-surface px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/70 focus:ring-1 focus:ring-accent/50"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity disabled:opacity-30"
              >
                ↑
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
