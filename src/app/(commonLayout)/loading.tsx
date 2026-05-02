import PageLoading from "@/components/common/loading/PageLoading";

export default function CommonLayoutLoading() {
  return (
    <main className="bg-[#0c0d0c] px-4 pb-12 pt-28 text-white">
      <div className="container mx-auto">
        <PageLoading />
      </div>
    </main>
  );
}
