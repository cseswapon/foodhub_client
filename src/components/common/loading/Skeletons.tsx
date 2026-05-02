export function MealCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border/60 bg-card/80">
      <div className="h-52 w-full bg-muted/60" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 rounded-lg bg-muted/80" />
        <div className="h-3 w-full rounded bg-muted/60" />
        <div className="h-3 w-2/3 rounded bg-muted/60" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-16 rounded bg-muted/80" />
          <div className="h-10 w-10 rounded-full bg-muted/60" />
        </div>
      </div>
    </div>
  );
}

export function MealGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MealCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProviderCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border/60 bg-card/80">
      <div className="h-48 w-full bg-muted/60" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-4/5 rounded bg-muted/80" />
        <div className="h-3 w-full rounded bg-muted/60" />
        <div className="mt-4 h-10 w-full rounded-xl bg-muted/60" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({
  cols = 5,
  rows = 5,
}: {
  cols?: number;
  rows?: number;
}) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-10 flex-1 rounded bg-muted/60" />
          ))}
        </div>
      ))}
    </div>
  );
}
