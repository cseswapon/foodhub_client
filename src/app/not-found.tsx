import Link from "next/link";

export default function NotFound() {
  const brandColor = "#a3a380";

  return (
    // bg-[#0c0d0c] এবং text-white ফিক্সড রাখা হয়েছে
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0c0d0c] text-white px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-15%] left-[-10%] w-120 md:w-200 h-120 md:h-200 rounded-full bg-[#a3a380]/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-10%] w-100 md:w-180 h-100 md:h-180 rounded-full bg-[#a3a380]/15 blur-[120px]" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="relative inline-block">
          {/* Main 404 Text - Gradient Fixed */}
          <h1
            className="text-[8rem] md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${brandColor}, #d4d4b8, ${brandColor})`,
            }}
          >
            404
          </h1>

          {/* Badge */}
          <div className="absolute top-[15%] -right-4 md:-right-8 bg-[#a3a380] text-[#0c0d0c] text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg rotate-12 animate-bounce">
            Page Not Found
          </div>
        </div>

        <div className="mt-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Lost in Space?
          </h2>
          <p className="mt-4 text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
            The page {`you're`} looking for {`doesn't`} exist or has been moved.{" "}
            {`Don't`} worry, even the best explorers get lost sometimes.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/"
            className="group relative w-full sm:w-auto px-10 py-4 bg-[#a3a380] text-[#0c0d0c] font-bold rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95"
          >
            Go Back Home
            <span className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-10 py-4 text-[#a3a380] font-bold border-2 border-[#a3a380]/20 rounded-xl hover:bg-[#a3a380]/5 hover:border-[#a3a380] transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>

        <p className="mt-16 text-white/30 text-sm font-medium">
          Error Code:{" "}
          <span className="text-[#a3a380]/50 font-mono">#NS-404</span>
        </p>
      </div>

      {/* Background Dots - White dots on Dark background */}
      <div
        className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>
    </div>
  );
}
