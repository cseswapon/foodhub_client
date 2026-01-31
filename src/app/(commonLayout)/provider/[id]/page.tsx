import Link from "next/link";
import {
  HiOutlinePhone,
  HiOutlineUserCircle,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import { FaFacebookF } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { MealCard } from "@/components/common/card/MealCard";

// API Fetching (Server Component logic)
async function getProviderDetails(id: string) {
  // const res = await fetch(`YOUR_API_URL/provider/${id}`);
  // return res.json();

  // আপনার দেওয়া লেটেস্ট অবজেক্ট রেসপন্স সিমুলেশন:
  return {
    id: "1ea33618-d7c7-4ac2-8ef9-aa0915bcacd4",
    restaurant_name: "Pizza Point - 9",
    description: "ফ্রেশ পিজ্জা ও বার্গার পাওয়া যায়",
    address: "গুলশান ১, ঢাকা",
    is_open: true,
    fb_link: "https://facebook.com/pizzapointbd",
    created_at: "2026-01-28T12:41:10.289Z",
    user: {
      name: "Abcd",
      email: "swaponsaha20@gmail.com",
      phone: "01829930827",
    },
    meals: [
      {
        id: "ef5a7cb9-b218-490d-a224-684d3124d154",
        provider_id: "762b9ef3-37be-4e7a-aafc-0c0960ca5f67",
        category_id: "7153229c-d3d2-4157-a65f-ffb878bdc528",
        name: "Chicken Biryani",
        description: "স্পেশাল কাচ্চি স্টাইল চিকেন বিরিয়ানি",
        price: "500",
        dietary_type: "veg",
        is_available: true,
        created_at: "2026-01-31T05:20:11.522Z",
        updated_at: "2026-01-31T05:20:11.522Z",
      },
    ],
  };
}

export default async function ProviderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = await getProviderDetails(id);

  return (
    <section className="bg-[#0c0d0c] text-white pb-15">
      {/* 1. Hero / Header Section */}
      <section className="relative h-[50vh] md:h-[40vh] bg-[#1f2120] flex items-end pb-12 overflow-hidden border-b border-white/5">
        {/* Abstract Background pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#a3a380]/5 blur-[120px] rounded-full -mr-20 -mt-20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge
                  className={cn(
                    "px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full",
                    provider.is_open
                      ? "bg-[#a3a380] text-[#1f2120]"
                      : "bg-red-500 text-white",
                  )}
                >
                  {provider.is_open ? "● Accepting Orders" : "○ Closed Now"}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                {provider.restaurant_name}
              </h1>
              <p className="flex items-center gap-2 text-[#a3a380] font-medium tracking-wide">
                <HiOutlineLocationMarker className="size-5" />
                {provider.address}
              </p>
            </div>

            {provider.fb_link && (
              <Button
                asChild
                size="lg"
                className="bg-white/5 hover:bg-[#a3a380] hover:text-[#1f2120] text-gray-400 border border-white/10 rounded-full px-8 transition-all duration-500"
              >
                <Link href={provider.fb_link} target="_blank">
                  <FaFacebookF className="mr-2" /> Follow on Facebook
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Description & Menu Info */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <h3 className="text-[#a3a380] text-sm font-black uppercase tracking-[0.4em]">
                Our Philosophy
              </h3>
              <p className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed italic">
                &quot;{provider.description}&quot;
              </p>
            </div>

            <Separator className="bg-white/5" />

            <div className="space-y-8">
              <h3 className="text-2xl font-black uppercase tracking-tight text-gray-400">
                Browse our <span className="text-[#a3a380]">Collection</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-8 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center space-y-3 opacity-50">
                  <HiOutlineGlobeAlt className="size-8 text-[#a3a380]" />
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Menu items loading...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact & Owner Info Card */}
          <div className="lg:col-span-5">
            <Card className="bg-[#1f2120] border-white/5 rounded-lg p-10 sticky top-24 shadow-2xl">
              <CardContent className="p-0 space-y-10">
                {/* User / Owner Info */}
                <div className="flex items-center gap-6">
                  <div className="size-16 rounded-xl bg-linear-to-br from-[#a3a380] to-[#8e8e6f] flex items-center justify-center text-[#1f2120]">
                    <HiOutlineUserCircle size={32} />
                  </div>
                  <div>
                    <p className="text-[#a3a380] text-[10px] font-black uppercase tracking-widest">
                      Kitchen Manager
                    </p>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                      {provider.user.name}
                    </h4>
                  </div>
                </div>

                <Separator className="bg-white/5" />

                {/* Contact Details */}
                <div className="space-y-8">
                  <div className="group flex items-center gap-5">
                    <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-[#a3a380] group-hover:bg-[#a3a380] group-hover:text-[#1f2120] transition-all">
                      <HiOutlinePhone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">
                        Direct Call
                      </p>
                      <p className="text-gray-200 font-medium">
                        {provider.user.phone}
                      </p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-5">
                    <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-[#a3a380] group-hover:bg-[#a3a380] group-hover:text-[#1f2120] transition-all">
                      <HiOutlineMail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">
                        Email Inquiry
                      </p>
                      <p className="text-gray-200 font-medium truncate max-w-50">
                        {provider.user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Join Date */}
                <div className="pt-6 text-center">
                  <p className="text-[9px] text-gray-700 uppercase tracking-[0.2em]">
                    Partnering since{" "}
                    {new Date(provider.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Signature Menu Section - লার্জার এবং স্পেসড আউট গ্রিড */}
      <section className="container mx-auto px-6 py-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-4">
            <h3 className="text-[#a3a380] text-xs font-black uppercase tracking-[0.5em] flex items-center gap-4">
              <span className="h-px w-12 bg-[#a3a380]" /> The Collection
            </h3>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter italic">
              Signature <span className="text-[#a3a380]">Menu</span>
            </h2>
          </div>

          <div className="bg-white/5 px-8 py-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
              Available Items:{" "}
              <span className="text-[#a3a380] text-lg ml-2">
                {provider.meals?.length || 0}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {provider.meals && provider.meals.length > 0 ? (
            provider?.meals?.map((meal) => (
              <div
                key={meal?.id}
                className="group animate-in fade-in zoom-in duration-700"
              >
                <MealCard meal={meal} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-40 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[3rem] bg-white/1">
              <div className="size-24 rounded-full bg-white/5 flex items-center justify-center text-gray-800 mb-8 border border-white/5">
                <HiOutlineGlobeAlt size={48} />
              </div>
              <h4 className="text-gray-500 uppercase font-black tracking-[0.3em] text-sm">
                No Delicacies Found
              </h4>
              <p className="text-[10px] text-gray-700 font-bold uppercase mt-4">
                The chef is preparing something special
              </p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
