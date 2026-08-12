export function SiteNav() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
      <span className="font-display text-sm tracking-tight text-foreground">
        Sabir<span className="text-accent">.</span>
      </span>
      <div className="flex items-center gap-2 rounded-full border border-border bg-background-elevated/60 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-warm opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-warm" />
        </span>
        Available for select work
      </div>
    </header>
  );
}
