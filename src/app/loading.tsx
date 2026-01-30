export default function Loading() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0c0d0c] text-white px-6 overflow-hidden">
      <div className="absolute top-[-15%] left-[-10%] w-120 md:w-200 h-120 md:h-200 rounded-full bg-primary/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-10%] w-100 md:w-180 h-100 md:h-180 rounded-full bg-primary-light/15 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

          <div className="absolute w-8 h-8 bg-primary/20 rounded-full animate-ping"></div>
          <div className="absolute w-4 h-4 bg-primary rounded-full"></div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            Loading
            <span className="inline-flex ml-1">
              <span className="animate-[bounce_1s_infinite_100ms]">.</span>
              <span className="animate-[bounce_1s_infinite_200ms]">.</span>
              <span className="animate-[bounce_1s_infinite_300ms]">.</span>
            </span>
          </h2>
          <p className="mt-2 text-white text-sm font-medium tracking-wide">
            ESTABLISHING CONNECTION
          </p>
        </div>

        <div className="mt-6 w-40 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-[pulse_1.5s_ease-in-out_infinite] w-full"></div>
        </div>
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
