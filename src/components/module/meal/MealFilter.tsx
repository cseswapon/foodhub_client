"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { MealDataRes } from "@/services/meal.service";
import { useCallback, useState } from "react";

export function MealFilter({ meals }: { meals: MealDataRes[] }) {
  // console.log(meals);
  const categories = Array.from(new Set(meals?.map((m) => m?.dietary_type)));
  const price = Array.from(
    new Set(meals?.map((m) => parseInt(m?.price))),
  ) as number[];
  const maxPrice = Math.max(...price);
  // const minPrice = Math.min(...price)
  const minPrice = 0;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  const handleCategoryChange = useCallback((cat: string, checked: boolean) => {
   /*  if (checked) {
      setSelectedCategories((prev) => [...prev, cat]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== cat));
    } */
    setSelectedCategories((prev) =>
      checked ? [...prev, cat] : prev.filter((c) => c !== cat),
    );
  },[]);
  
  const handlePriceChange = useCallback((value: number[]) => {
    setPriceRange(value);
  },[]);

  console.log(priceRange,selectedCategories);
  return (
    <div className="space-y-8 p-6 bg-[#1f2120] rounded-2xl border border-white/5">
      <div>
        <h4 className="text-[#a3a380] text-xs font-bold uppercase tracking-widest mb-4">
          Categories
        </h4>
        <div className="space-y-3">
          {categories?.map((cat) => (
            <div
              key={cat}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <Checkbox
                onCheckedChange={(checked: boolean) =>
                  handleCategoryChange(cat, checked)
                }
                id={cat}
                className="border-[#a3a380] data-[state=checked]:bg-[#a3a380]"
              />
              <label
                htmlFor={cat}
                className="text-sm text-gray-300 group-hover:text-white cursor-pointer transition-colors"
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
          defaultValue={[minPrice, maxPrice]}
          max={maxPrice}
          min={minPrice}
          step={1}
          onValueChange={handlePriceChange}

          className="py-4"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>৳{priceRange[0]}</span>
          <span>৳{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
