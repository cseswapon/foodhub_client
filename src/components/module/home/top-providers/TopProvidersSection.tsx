import Link from "next/link";
import { ProvidersService } from "@/services/provider.service";
import { ProviderCard } from "@/components/common/card/ProviderCard";
import { ArrowRight } from "lucide-react";

const providersService = new ProvidersService();

export default async function TopProvidersSection() {
  const result = await providersService.getAllProviders();
  const providers = result?.data?.slice(0, 4) ?? [];

  if (!providers.length) return null;

  return (
    <section className="md:py-24 py-12 bg-[#0d0d0b] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs tracking-widest text-[#a3a380] uppercase font-semibold">
              Trusted Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              Top Providers
            </h2>
            <p className="text-gray-400 mt-3 text-sm max-w-md">
              Discover the best local restaurants and food providers on our
              platform.
            </p>
          </div>
          <Link
            href="/provider"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#a3a380] hover:text-white transition-colors"
          >
            All providers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider: any, index: number) => (
            <ProviderCard key={provider.id} provider={provider} index={index} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/provider"
            className="inline-flex items-center gap-1.5 text-sm text-[#a3a380] border border-[#a3a380]/30 hover:bg-[#a3a380]/10 px-5 py-2.5 rounded-full transition-colors"
          >
            All providers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
