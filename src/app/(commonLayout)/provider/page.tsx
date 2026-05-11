import { ProviderCard } from "@/components/common/card/ProviderCard";
import { ProvidersService } from "@/services/provider.service";

export default async function ProvidersPage() {
  const providerService = new ProvidersService();
  const providers = await providerService.getAllProviders();
  return (
    <div className="bg-[#0c0d0c] pt-30 pb-15 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Parent Header Text */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Meet <span className="text-[#a3a380] italic">Kitchen Masters</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Explore local providers who bring authentic flavors right to your
            doorstep. Each kitchen tells a unique story.
          </p>
        </div>

        {/* Provider List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {providers?.data && providers?.data.length > 0 ? (
            providers?.data.map((provider: any, index: number) => (
              <ProviderCard
                key={provider?.id}
                provider={provider}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
              <p className="text-gray-500 italic uppercase tracking-widest font-black">
                No providers available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
