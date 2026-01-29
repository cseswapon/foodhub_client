import { MealCard } from "@/components/common/card/MealCard";
import { MealFilter } from "@/components/module/meal/MealFilter";

const MEALS_DATA = [
  {
    id: "5e0af171-f951-48b3-b02c-2770d6fb0dfb",
    name: "Chicken Biryani",
    description: "স্পেশাল কাচ্চি স্টাইল চিকেন বিরিয়ানি",
    price: "500",
    dietary_type: "non_veg",
    is_available: true,
  },
];

export default function MealsPage() {
  return (
    <section className=" bg-[#0c0d0c] md:py-[5%] py-[10%] px-4">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="md:mb-12 mb-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Our <span className="text-[#a3a380]">Menu</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Discover the finest flavors crafted just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 hidden lg:block">
            <div>
              <MealFilter />
            </div>
          </aside>

          {/* Right Side - Meal Cards */}
          <section className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {MEALS_DATA.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
