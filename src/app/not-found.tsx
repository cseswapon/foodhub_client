import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0c0d0c] text-white px-6 overflow-hidden">
      <div className="absolute top-[-15%] left-[-10%] w-120 md:w-200 h-120 md:h-200 rounded-full bg-primary/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-10%] w-100 md:w-180 h-100 md:h-180 rounded-full bg-primary-light/15 blur-[120px]" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="relative inline-block">
          <h1 className="text-[8rem] md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-primary via-primary-light to-primary">
            404
          </h1>

          <div className="absolute top-[15%] -right-4 md:-right-8 bg-primary text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg rotate-12 animate-bounce">
            Page Not Found
          </div>
        </div>

        <div className="mt-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-200 tracking-tight">
            Lost in Space?
          </h2>
          <p className="mt-4 text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            The page {`you're`} looking for {`doesn't`} exist or has been moved.{" "}
            {`Don't`}
            worry, even the best explorers get lost sometimes.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/"
            className="group relative w-full sm:w-auto px-10 py-4 bg-primary text-black font-semibold rounded-xl transition-all duration-300 shadow-xl   hover:-translate-y-1 active:scale-95"
          >
            Go Back Home
            <span className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-10 py-4 text-primary font-semibold border-2 border-primary/20 rounded-xl hover:bg-primary/5 hover:border-primary transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>

        <p className="mt-16 text-gray-400 text-sm font-medium">
          Error Code: <span className="text-primary/50">#NS-404</span>
        </p>
      </div>

      <div
        className="absolute inset-0 z-[-1] opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>
    </div>
  );
}
