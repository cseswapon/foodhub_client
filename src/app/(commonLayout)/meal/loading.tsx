import { Button } from "@/components/ui/button";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export default function MealPageLoading() {
  return (
    <>
      <div className="bg-[#0c0d0c] pt-30 pb-15 px-4 min-h-screen">
        <div className="container mx-auto">
          <div className="md:mb-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                Our <span className="text-[#a3a380]">All Menu</span>
              </h1>
            </div>

            <div className="lg:hidden flex justify-center">
              <Button
                variant="outline"
                className="border-[#a3a380] text-[#a3a380] hover:bg-[#a3a380] hover:text-[#1f2120] rounded-full gap-2"
              >
                <HiOutlineAdjustmentsHorizontal size={20} />
                Filter Options
              </Button>
            </div>
          </div>

          {/* Loading Skeleton for Meals Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-2xl border border-border/60 bg-muted/60"
              />
            ))}
          </div>

          <div className="h-56 animate-pulse rounded-2xl border border-border/60 bg-muted/60 mt-8" />

          <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-[#a3a380] mt-6">
            Loading your menu
          </p>
        </div>
      </div>
    </>
  );
}
