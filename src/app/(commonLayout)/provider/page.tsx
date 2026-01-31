import { ProviderCard } from "@/components/common/card/ProviderCard";

const PROVIDERS_DATA = [
  {
    id: "762b9ef3-37be-4e7a-aafc-0c0960ca5f67",
    restaurant_name: "Pizza Point",
    description: "ফ্রেশ পিজ্জা ও বার্গার পাওয়া যায়",
    address: "গুলশান ১, ঢাকা",
    is_open: true,
    fb_link: "https://facebook.com/pizzapointbd",
  },
  {
    id: "0aed8401-dcc2-44da-94e9-a952acf68d18",
    restaurant_name: "Pizza Point - 2",
    description: "ফ্রেশ পিজ্জা ও বার্গার পাওয়া যায়",
    address: "গুলশান ১, ঢাকা",
    is_open: true,
    fb_link: "https://facebook.com/pizzapointbd",
  },
];

export default function ProvidersPage() {
  return (
    <div className="bg-[#0c0d0c] pt-30 pb-15 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Parent Header Text */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Meet{" "}
            <span className="text-[#a3a380] italic">Kitchen Masters</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Explore local providers who bring authentic flavors right to your
            doorstep. Each kitchen tells a unique story.
          </p>
        </div>

        {/* Provider List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {PROVIDERS_DATA.length > 0 ? (
            PROVIDERS_DATA.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
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
