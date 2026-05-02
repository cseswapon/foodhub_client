import { Loader2 } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 p-6">
      <div className="relative flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <Loader2 className="absolute h-10 w-10 text-primary/20" />
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
          Loading
        </p>
        <span className="flex gap-1">
          <span className="h-1 w-1 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></span>
          <span className="h-1 w-1 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></span>
          <span className="h-1 w-1 animate-bounce rounded-full bg-primary"></span>
        </span>
      </div>
    </div>
  );
}
