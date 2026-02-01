"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const brandColor = "#a3a380";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    // bg-[#0c0d0c] এবং text-white ফিক্সড রাখা হয়েছে
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0c0d0c] text-white px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-15%] left-[-10%] w-120 md:w-200 h-120 md:h-200 rounded-full bg-white/5 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-10%] w-100 md:w-180 h-100 md:h-180 rounded-full bg-[#a3a380]/10 blur-[120px]" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Error Icon - Red accents for warning but on dark base */}
            <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center animate-bounce">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading with Brand Gradient */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">
          <span className="text-white">Oops! Something</span> <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(to right, #ef4444, ${brandColor})`,
            }}
          >
            Went Wrong
          </span>
        </h1>

        <p className="text-white/50 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10">
          We apologize for the inconvenience. An unexpected error occurred. Our
          team has been notified and we are working to fix it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Try Again Button */}
          <button
            onClick={() => reset()}
            className="group relative w-full sm:w-auto px-10 py-4 bg-[#a3a380] text-[#0c0d0c] font-bold rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Try Again</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="w-full sm:w-auto px-10 py-4 text-white font-bold border-2 border-white/10 rounded-xl hover:bg-white/5 hover:border-[#a3a380]/50 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>

        {/* Error Digest */}
        {error.digest && (
          <p className="mt-12 text-white/30 text-[10px] font-mono tracking-widest uppercase">
            Error Digest:{" "}
            <span className="text-[#a3a380]/60">{error.digest}</span>
          </p>
        )}
      </div>

      {/* Background Dots */}
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
