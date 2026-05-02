export default function PageLoading() {
  return (
    <div className="relative min-h-[60vh] w-full p-6 text-foreground">
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col justify-center gap-6 py-8">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-[#a3a380]" />
          <div className="h-2 w-28 rounded-full bg-muted" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-28 animate-pulse rounded-2xl border border-border/60 bg-muted/60" />
          <div className="h-28 animate-pulse rounded-2xl border border-border/60 bg-muted/70" />
          <div className="h-28 animate-pulse rounded-2xl border border-border/60 bg-muted/60" />
        </div>

        <div className="h-56 animate-pulse rounded-2xl border border-border/60 bg-muted/60" />

        <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-[#a3a380]">
          Loading your experience
        </p>
      </div>
    </div>
  );
}
