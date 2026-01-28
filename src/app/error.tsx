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
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-50 px-6 overflow-hidden">
      <div className="absolute top-[-15%] left-[-10%] w-120 md:w-200 h-120 md:h-200 rounded-full bg-red-500/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-10%] w-100 md:w-180 h-100 md:h-180 rounded-full bg-primary/15 blur-[120px]" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
              <svg
                className="w-12 h-12 text-red-600"
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

        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
          Oops! Something <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-primary">
            Went Wrong
          </span>
        </h1>

        <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-10">
          We apologize for the inconvenience. An unexpected error occurred. Our
          team has been notified and we are working to fix it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="group relative w-full sm:w-auto px-10 py-4 bg-primary text-white font-semibold rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Try Again</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-10 py-4 text-gray-600 font-semibold border-2 border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-12 text-gray-400 text-[10px] font-mono tracking-widest uppercase">
            Error Digest:{" "}
            <span className="text-primary/60">{error.digest}</span>
          </p>
        )}
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
