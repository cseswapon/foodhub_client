"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const AddCartDetails: React.FC<{
  meal: { id: string; name: string; price: string; provider_id: string };
}> = ({ meal }) => {
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
    <>
      <Button
        onClick={handleAdd}
        size="lg"
        className="bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase px-12 h-16 rounded-full gap-4 transition-all active:scale-95"
      >
        <HiOutlineShoppingBag size={24} />
        Add to Cart
      </Button>
    </>
  );
};

export default AddCartDetails;
