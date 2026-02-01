export default function Loading() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0c0d0c] text-white px-6 overflow-hidden">

      <div className="absolute top-[-15%] left-[-10%] w-120 md:w-200 h-120 md:h-200 rounded-full bg-[#a3a380]/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-10%] w-100 md:w-180 h-100 md:h-180 rounded-full bg-[#a3a380]/15 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Spinner Section */}
        <div className="relative flex items-center justify-center">
          {/* Border color and spinner color fixed */}
          <div className="w-20 h-20 border-4 border-[#a3a380]/20 border-t-[#a3a380] rounded-full animate-spin"></div>

          {/* Center dots */}
          <div className="absolute w-8 h-8 bg-[#a3a380]/20 rounded-full animate-ping"></div>
          <div className="absolute w-4 h-4 bg-[#a3a380] rounded-full"></div>
        </div>

        {/* Text Section */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            Loading
            <span className="inline-flex ml-1">
              <span className="animate-[bounce_1s_infinite_100ms]">.</span>
              <span className="animate-[bounce_1s_infinite_200ms]">.</span>
              <span className="animate-[bounce_1s_infinite_300ms]">.</span>
            </span>
          </h2>
          <p className="mt-2 text-white/60 text-sm font-medium tracking-wide uppercase">
            Establishing Connection
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-6 w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#a3a380] animate-[pulse_1.5s_ease-in-out_infinite] w-full"></div>
        </div>
      </div>

      {/* Background Pattern - Fixed color */}
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
