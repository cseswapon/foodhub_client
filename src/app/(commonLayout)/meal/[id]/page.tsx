import Image from "next/image";
import {
  HiOutlineShoppingBag,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Dummy fetching function (আপনার API logic এখানে বসবে)
async function getSingleMeal(id: string) {
  // const res = await fetch(`your-api-url/meals/${id}`);
  // return res.json();

  return {
    id: "5e0af171-f951-48b3-b02c-2770d6fb0dfb",
    provider_id: "1ea33618-d7c7-4ac2-8ef9-aa0915bcacd4",
    category_id: "bc56b6a0-4127-47f2-b533-0f96526f5522",
    name: "Chicken Biryani",
    description: "স্পেশাল কাচ্চি স্টাইল চিকেন বিরিয়ানি",
    price: "500",
    dietary_type: "non_veg",
    is_available: true,
    created_at: "2026-01-28T12:42:03.605Z",
    updated_at: "2026-01-28T12:42:03.605Z",
    category: {
      id: "bc56b6a0-4127-47f2-b533-0f96526f5522",
      name: "fats & oils",
      created_at: "2026-01-28T12:40:59.137Z",
      updated_at: "2026-01-28T12:40:59.137Z",
    },
    provider: {
      id: "1ea33618-d7c7-4ac2-8ef9-aa0915bcacd4",
      user_id: "eebCTSpTw7lnWacx6hmwvzOszvD9gQ80",
      restaurant_name: "Pizza Point - 9",
      description: "ফ্রেশ পিজ্জা ও বার্গার পাওয়া যায়",
      address: "গুলশান ১, ঢাকা",
      is_open: true,
      fb_link: "https://facebook.com/pizzapointbd",
      created_at: "2026-01-28T12:41:10.289Z",
      updated_at: "2026-01-28T12:41:10.289Z",
    },
  };
}

export default async function MealDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meal = await getSingleMeal(id);

  return (
    <div className="bg-[#0c0d0c] md:py-[5%] py-[25%] px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side: Product Image */}
          <div className="relative  rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src="/no-image.png"
              alt={meal.name}
              width={500}
              height={500}
              className="w-full"
            />
            <div className="absolute top-6 left-6">
              <Badge className="bg-[#a3a380] text-[#1f2120] hover:bg-[#a3a380] px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                {meal.dietary_type.replace("_", "-")}
              </Badge>
            </div>
          </div>

          {/* Right Side: Details Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#a3a380] text-sm font-bold uppercase tracking-[0.2em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a3a380]" />
                {meal.category.name}
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-gray-100">
                {meal.name}
              </h1>
              <p className="text-2xl md:text-3xl font-black text-[#a3a380]">
                ৳{meal.price}
              </p>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed">
              {meal.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase px-10 h-14 rounded-full gap-3 shadow-xl"
              >
                <HiOutlineShoppingBag size={22} />
                Add to Cart
              </Button>
            </div>

            <Separator className="bg-white/10" />

            {/* Provider/Restaurant Info Card */}
            <Card className="bg-[#1f2120] border-white/5 rounded-2xl overflow-hidden mt-10">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[#a3a380] text-xs font-black uppercase tracking-widest">
                    Prepared By
                  </h3>
                  {meal.provider.is_open ? (
                    <Badge
                      variant="outline"
                      className="text-green-500 border-green-500/30 text-[10px] uppercase font-bold"
                    >
                      Open Now
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-red-500 border-red-500/30 text-[10px] uppercase font-bold"
                    >
                      Closed
                    </Badge>
                  )}
                </div>

                <div>
                  {/* Provider Link with custom group name */}
                  <Link
                    href={`/provider/${meal.provider_id}`}
                    className="group/provider block w-fit"
                  >
                    <h2 className="text-xl font-bold text-white mb-1 transition-colors duration-300 group-hover/provider:text-[#a3a380]">
                      {meal.provider.restaurant_name}
                    </h2>
                    {/* Sub-line effect */}
                    <div className="h-px w-0 bg-[#a3a380] transition-all duration-300 group-hover/provider:w-full" />
                  </Link>

                  <p className="text-gray-500 text-sm flex items-center gap-2 mt-2">
                    <HiOutlineLocationMarker className="text-[#a3a380]" />
                    {meal.provider.address}
                  </p>
                </div>

                <p className="text-xs text-gray-400 italic leading-relaxed border-l-2 border-[#a3a380]/30 pl-3">
                  &quot;{meal.provider.description}&quot;
                </p>
              </CardContent>
            </Card>

            {/* Additional Features */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-[#a3a380]">
                  <HiOutlineClock size={20} />
                </div>
                <span>30-40 min Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-[#a3a380]">
                  <HiOutlineShoppingBag size={20} />
                </div>
                <span>Free Pick-up</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
