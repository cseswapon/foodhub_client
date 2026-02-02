"use client";

import Image from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

interface Meal {
  id: string;
  name: string;
  description: string;
  price: string;
  dietary_type: string;
  provider_id: string;
}

export function MealCard({ meal }: { meal: Meal }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: meal.id,
      name: meal.name,
      price: Number(meal.price),
      provider_id: meal.provider_id,
      quantity: 1,
    });
  };

  return (
    <Card className="group bg-[#1f2120] border-white/5 overflow-hidden transition-all hover:border-[#a3a380]/50 hover:cursor-default py-0 gap-0">
      <div className="relative">
        <Image src="/no-image.png" alt={meal.name} width={500} height={500} />
        <Badge className="absolute top-3 right-3 bg-[#a3a380] text-[#1f2120] hover:bg-[#a3a380]">
          {meal.dietary_type === "non_veg" ? "Non-Veg" : "Veg"}
        </Badge>
      </div>

      <CardContent className="p-4 relative">
        <Link
          href={`/meal/${meal.id}`}
          className="group/meal-link block space-y-2 outline-none"
        >
          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover/meal-link:text-[#a3a380] line-clamp-1 group-hover/meal-link:underline">
            {meal.name}
          </h3>

          <p className="text-gray-400 text-xs line-clamp-1 leading-relaxed transition-opacity duration-300 group-hover/meal-link:opacity-80">
            {meal.description}
          </p>

          {/* Hover CTA */}
          <div className="pt-3 opacity-0 translate-y-2 transition-all duration-300 group-hover/meal-link:opacity-100 group-hover/meal-link:translate-y-0">
            <span className="inline-block text-sm font-semibold text-[#a3a380]">
              View details →
            </span>
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-xl font-black text-[#a3a380]">৳{meal.price}</span>
        <button
          onClick={handleAdd}
          className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#a3a380] hover:text-[#1f2120] transition-colors"
        >
          <HiOutlineShoppingBag className="cursor-pointer" size={20} />
        </button>
      </CardFooter>
    </Card>
  );
}
