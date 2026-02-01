import { MealCard } from "@/components/common/card/MealCard";
import { MealFilter } from "@/components/module/meal/MealFilter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MealDataRes, MealsService } from "@/services/meal.service";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export default async function MealsPage() {
  const mealService = new MealsService();
  const meals = await mealService.getAllMeal();
  // console.log(meals);
  return (
    <div className="bg-[#0c0d0c] pt-30 pb-15 px-4 min-h-screen">
      <div className="container mx-auto">
        <div className="md:mb-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Our <span className="text-[#a3a380]">All Menu</span>
            </h1>
            <p className="text-gray-500 mt-2">
              Discover the finest flavors crafted just for you.
            </p>
          </div>

          <div className="lg:hidden flex justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[#a3a380] text-[#a3a380] hover:bg-[#a3a380] hover:text-[#1f2120] rounded-full gap-2"
                >
                  <HiOutlineAdjustmentsHorizontal size={20} />
                  Filter Options
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-[#1f2120] border-white/10 text-white w-75"
              >
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-[#a3a380] uppercase tracking-widest text-left">
                    Refine Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <MealFilter meals={meals?.data as MealDataRes[]} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-1">
              <MealFilter meals={meals?.data as MealDataRes[]} />
            </div>
          </aside>

          {/* Meal List */}
          <section className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {meals?.data && meals?.data.length > 0 ? (
                meals?.data?.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-gray-500 italic">
                    No meals found matching your filters.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
