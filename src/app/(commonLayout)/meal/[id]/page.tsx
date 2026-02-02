import Image from "next/image";
import {
  HiOutlineShoppingBag,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { MealReviews } from "@/components/module/meal/MealReviews";
import { cn } from "@/lib/utils";
import { MealDataRes, MealsService, Review } from "@/services/meal.service";
import AddCartDetails from "@/components/common/cart/AddCartDetails";

export async function generateStaticParams() {
  const mealService = new MealsService();
  try {
    const meals = await mealService.getAllMeal();
    if (!meals || !meals.data) {
      return [];
    }
    return meals.data.map((meal: MealDataRes) => ({
      id: meal.id.toString(),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function MealDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const mealService = new MealsService();

  const { id } = await params;

  const meal = await mealService.getMealDetails(id);

  return (
    <div className="bg-[#0c0d0c] pt-30 pb-20 px-4 min-h-screen">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side: Product Image */}
          <div className="relative rounded-lg overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src="/no-image.png"
              alt={meal?.data?.name || "Product Image"}
              width={600}
              height={600}
              className="w-full object-cover"
            />
            <div className="absolute top-8 left-8">
              <Badge className="bg-[#a3a380] text-[#1f2120] hover:bg-[#a3a380] px-6 py-2 text-xs font-black uppercase tracking-widest rounded-full">
                {meal?.data?.dietary_type.replace("_", "-")}
              </Badge>
            </div>
          </div>

          {/* Right Side: Details Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#a3a380] text-xs font-black uppercase tracking-[0.4em]">
                <span className="h-2 w-2 rounded-full bg-[#a3a380] shadow-[0_0_10px_#a3a380]" />
                {meal?.data?.category.name}
              </div>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white italic">
                {meal?.data?.name}
              </h1>
              <p className="text-3xl md:text-5xl font-black text-[#a3a380] tracking-tighter">
                ৳{meal?.data.price}
              </p>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed font-light italic">
              &quot;{meal?.data?.description}&quot;
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <AddCartDetails meal={meal?.data as any} />
            </div>

            <Separator className="bg-white/5" />

            {/* Provider Card */}
            <Card className="bg-[#1f2120] border-white/5 rounded-lg overflow-hidden mt-10 shadow-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[#a3a380] text-[10px] font-black uppercase tracking-[0.3em]">
                    Kitchen Signature
                  </h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] uppercase font-black px-3 py-1 rounded-full",
                      meal?.data.provider.is_open
                        ? "text-green-500 border-green-500/20 bg-green-500/5"
                        : "text-red-500 border-red-500/20 bg-red-500/5",
                    )}
                  >
                    {meal?.data?.provider?.is_open ? "● Live Now" : "○ Closed"}
                  </Badge>
                </div>

                <div>
                  <Link
                    href={`/provider/${meal?.data?.provider_id}`}
                    className="group/provider block w-fit"
                  >
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight transition-all group-hover/provider:text-[#a3a380]">
                      {meal?.data?.provider?.restaurant_name}
                    </h2>
                    <div className="h-0.5 w-0 bg-[#a3a380] transition-all duration-500 group-hover/provider:w-full" />
                  </Link>
                  <p className="text-gray-500 text-sm flex items-center gap-2 mt-3 font-medium">
                    <HiOutlineLocationMarker className="text-[#a3a380] size-5" />
                    {meal?.data?.provider.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="flex items-center gap-4 group">
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#a3a380] group-hover:bg-[#a3a380] group-hover:text-[#1f2120] transition-all duration-300">
                  <HiOutlineClock size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Delivery
                  </p>
                  <p className="text-sm text-white font-bold uppercase">
                    30-45 MIN
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#a3a380] group-hover:bg-[#a3a380] group-hover:text-[#1f2120] transition-all duration-300">
                  <HiOutlineShoppingBag size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    Status
                  </p>
                  <p className="text-sm text-white font-bold uppercase">
                    Fresh Prepared
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MealReviews reviews={meal?.data?.reviews as Review[]} />
      </div>
    </div>
  );
}
