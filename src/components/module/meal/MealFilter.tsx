"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button"; 
import { useRouter, useSearchParams } from "next/navigation";
import {  useState } from "react";

export function MealFilter({
  categories,
  maxPriceLimit,
}: {
  categories: string[];
  maxPriceLimit: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from existing URL or defaults
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("type")?.split(",") || [],
  );
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || maxPriceLimit,
  ]);

  const handleApplyFilter = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set("type", selectedCategories.join(","));
    }
    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString());
    }
    params.set("maxPrice", priceRange[1].toString());

    router.push(`/meal?${params.toString()}`);
  };

  const handleCategoryChange = (cat: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, cat] : prev.filter((c) => c !== cat),
    );
  };

  return (
    <div className="space-y-8 p-6 bg-[#1f2120] rounded-2xl border border-white/5">
      <div>
        <h4 className="text-[#a3a380] text-xs font-bold uppercase tracking-widest mb-4">
          Categories
        </h4>
        <div className="space-y-3">
          {categories?.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={cat}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={(checked: boolean) =>
                  handleCategoryChange(cat, checked)
                }
                className="border-[#a3a380] data-[state=checked]:bg-[#a3a380]"
              />
              <label
                htmlFor={cat}
                className="text-sm text-gray-300 cursor-pointer"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[#a3a380] text-xs font-bold uppercase tracking-widest mb-4">
          Price Range
        </h4>
        <Slider
          value={priceRange}
          max={maxPriceLimit}
          min={0}
          step={10}
          onValueChange={setPriceRange}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>৳{priceRange[0]}</span>
          <span>৳{priceRange[1]}</span>
        </div>
      </div>

      <Button
        onClick={handleApplyFilter}
        className="w-full bg-[#a3a380] text-black hover:bg-[#8e8e6b] font-bold uppercase text-xs"
      >
        Apply Filters
      </Button>
    </div>
  );
}
