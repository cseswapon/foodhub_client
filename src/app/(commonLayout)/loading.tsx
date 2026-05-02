import PageLoading from "@/components/common/loading/PageLoading";

export default function CommonLayoutLoading() {
  return (
    <main
      className=" transition-colors duration-300
      bg-slate-50/50 dark:bg-[#0a0a0a] 
      px-4 pb-12 pt-28"
    >
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="w-full max-w-md rounded-2xl p-8">
          <PageLoading />
        </div>
      </div>
    </main>
  );
}
