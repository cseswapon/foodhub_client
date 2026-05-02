import Link from "next/link";
import { MealsService } from "@/services/meal.service";
import { MealCard } from "@/components/common/card/MealCard";
import { ArrowRight } from "lucide-react";

const mealsService = new MealsService();

export default async function PopularMealsSection() {
  const result = await mealsService.getAllMeal();
  const meals = result?.data?.slice(0, 8) ?? [];

  if (!meals.length) return null;

  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs tracking-widest text-[#a3a380] uppercase font-semibold">
              Top Picks
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              Popular Meals
            </h2>
            <p className="text-gray-400 mt-3 text-sm max-w-md">
              Handpicked favorites loved by our customers — fresh, delicious,
              and ready to order.
            </p>
          </div>
          <Link
            href="/meal"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#a3a380] hover:text-white transition-colors"
          >
            View all meals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/meal"
            className="inline-flex items-center gap-1.5 text-sm text-[#a3a380] border border-[#a3a380]/30 hover:bg-[#a3a380]/10 px-5 py-2.5 rounded-full transition-colors"
          >
            View all meals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
