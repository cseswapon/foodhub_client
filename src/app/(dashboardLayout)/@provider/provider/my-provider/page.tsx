import { Button } from "@/components/ui/button";
import { HiOutlinePlus } from "react-icons/hi2";
import Link from "next/link";
import { ProvidersService } from "@/services/provider.service";
import ProviderTable from "@/components/module/provider/ProviderTable";
const providerService = new ProvidersService();
export default async function MyProvider() {
  const data = await providerService.getAllProvidersMe();
  const providers = data?.data || ([] as any);
  return (
    <main className="p-6 md:p-10 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter  italic">
            My <span className="text-[#a3a380]">Providers</span>
          </h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            Manage your kitchen profiles and listings
          </p>
        </div>

        {/* Add Provider Button - /my-provider/add */}
        <Button
          asChild
          className="bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-bold rounded-lg uppercase text-[10px] tracking-widest gap-2 h-11 px-6 shadow"
        >
          <Link href="/provider/my-provider/add">
            <HiOutlinePlus size={16} /> Add Provider
          </Link>
        </Button>
      </div>

      {/* Provider List Table */}
      <ProviderTable providers={providers as any} />
    </main>
  );
}
