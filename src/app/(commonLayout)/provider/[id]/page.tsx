import Link from "next/link";
import {
  HiOutlinePhone,
  HiOutlineUserCircle,
  HiOutlineGlobeAlt,
  HiOutlineChevronLeft,
} from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MealCard } from "@/components/common/card/MealCard";
import { ProvidersService } from "@/services/provider.service";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

export default async function ProviderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const providerService = new ProvidersService();
  const res = await providerService.getProviderDetails(id);

  const provider = res?.data?.provider;
  const meals = res?.data?.meals || [];

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#0c0d0c] flex items-center justify-center text-white">
        <p className="uppercase tracking-widest font-black italic">
          Provider Not Found
        </p>
      </div>
    );
  }

  return (
    <section className="bg-[#0c0d0c] text-white min-h-screen pb-20">
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        <Button
          asChild
          variant="ghost"
          className="text-gray-400 hover:text-[#a3a380] gap-2 p-0 h-auto"
        >
          <Link href="/providers">
            <HiOutlineChevronLeft /> Back to Providers
          </Link>
        </Button>
      </div>

      {/* 2. Hero Section */}
      <section className="relative pt-10 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#a3a380]/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-6 max-w-4xl">
            <Badge className="w-fit px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] bg-[#a3a380] text-[#1f2120] rounded-full">
              {provider.role} Profile
            </Badge>

            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-tight italic">
              {provider.name}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-400 text-sm font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <HiOutlineLocationMarker className="text-[#a3a380] size-5" />
                {provider.address || "Location Not Set"}
              </span>
              <span className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-white/10 text-green-400"
                >
                  ● {provider.status}
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Stats & Meals */}
          <div className="lg:col-span-8 space-y-16">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
                  Total Items
                </p>
                <h4 className="text-2xl font-black italic text-[#a3a380]">
                  {meals.length}
                </h4>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
                  Status
                </p>
                <h4 className="text-2xl font-black italic text-green-500">
                  Active
                </h4>
              </div>
            </div>

            {/* Meals Collection */}
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">
                  Signature <span className="text-[#a3a380]">Menu</span>
                </h2>
                <Separator className="flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {meals.length > 0 ? (
                  meals.map((meal: any) => (
                    <div
                      key={meal.id}
                      className="transition-transform hover:scale-[1.02] duration-500"
                    >
                      <MealCard meal={meal} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center">
                    <HiOutlineGlobeAlt className="size-12 text-gray-800 mb-4" />
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                      No meals available at the moment
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="lg:col-span-4">
            <Card className="bg-[#1f2120] border-white/5 rounded-[2rem] p-8 md:p-10 sticky top-24 shadow-2xl">
              <CardContent className="p-0 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="size-14 rounded-2xl bg-[#a3a380] flex items-center justify-center text-[#1f2120]">
                    <HiOutlineUserCircle size={32} />
                  </div>
                  <div>
                    <p className="text-[#a3a380] text-[9px] font-black uppercase tracking-[0.3em]">
                      Authorized Provider
                    </p>
                    <h4 className="text-lg font-bold text-white uppercase truncate">
                      {provider.name}
                    </h4>
                  </div>
                </div>

                <Separator className="bg-white/5" />

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#a3a380] group-hover:text-[#1f2120] transition-colors">
                      <HiOutlinePhone size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                        Phone
                      </p>
                      <p className="text-sm text-gray-400 font-medium">
                        {provider.phone || "Not available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#a3a380] group-hover:text-[#1f2120] transition-colors">
                      <HiOutlineMail size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                        Email
                      </p>
                      <p className="text-sm font-medium text-gray-400 truncate w-40 md:w-full">
                        {provider.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-white/5 hover:bg-[#a3a380] hover:text-[#1f2120] text-white rounded-xl h-14 font-black uppercase tracking-widest transition-all">
                  Contact Kitchen
                </Button>

                <p className="text-center text-[8px] text-gray-600 uppercase tracking-widest">
                  Joined Since{" "}
                  {new Date(provider.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </section>
  );
}
