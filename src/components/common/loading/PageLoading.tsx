import { Loader2 } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-6">
      <div className="relative flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary dark:text-blue-400" />

        <Loader2 className="absolute h-12 w-12 opacity-10 text-primary dark:text-white" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <p
          className="text-center text-[10px] font-black uppercase tracking-[0.4em] 
          text-slate-500 dark:text-slate-400 animate-pulse"
        >
          Loading
        </p>

        {/* Animated Loading Dots */}
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/80 dark:bg-blue-500/80 [animation-delay:-0.3s]"></span>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/80 dark:bg-blue-500/80 [animation-delay:-0.15s]"></span>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/80 dark:bg-blue-500/80"></span>
        </div>
      </div>
    </div>
  );
}
