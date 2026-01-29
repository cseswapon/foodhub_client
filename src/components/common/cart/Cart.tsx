"use client";

import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();

  const [cartItems] = useState([
    {
      id: 1,
      name: "Special Burger",
      price: 12.0,
      qty: 1,
      img: "/hero-img-3.jpg",
    },
    {
      id: 2,
      name: "French Fries",
      price: 5.5,
      qty: 2,
      img: "/hero-img-2.jpg",
    },
  ]);
    
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative -right-5 p-3 bg-[#a3a380] text-black rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 z-50 group">
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-black">
              {cartItems.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="bg-black border-white/10 text-white w-full sm:max-w-md flex flex-col p-0 [&>button]:hidden z-999">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <SheetHeader>
            <SheetTitle className="text-white flex items-center gap-2 text-2xl font-bold">
              <ShoppingCart className="text-[#a3a380]" /> Your Cart
            </SheetTitle>
          </SheetHeader>

          <SheetClose className="rounded-full p-2 hover:bg-white/10 transition-colors">
            <X size={24} className="text-gray-400" />
          </SheetClose>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6 custom-scrollbar">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center group bg-white/5 p-3 rounded-2xl border border-transparent hover:border-white/10 transition-all"
              >
                <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-black shadow-inner">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-base line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[#a3a380] font-bold text-sm mb-2">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-black/40 rounded-full p-1 border border-white/10">
                      <button className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">
                        {item.qty}
                      </span>
                      <button className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-[#a3a380] hover:text-black transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                <button className="text-gray-500 hover:text-red-500 transition-colors p-2 self-start">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
              <div className="p-6 bg-white/5 rounded-full">
                <ShoppingCart size={60} strokeWidth={1} />
              </div>
              <p className="font-medium">Your cart is empty</p>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="border-[#a3a380] text-[#a3a380] hover:bg-[#a3a380] hover:text-black"
                >
                  Start Ordering
                </Button>
              </SheetClose>
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="p-6 bg-white/2 border-t border-white/10 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Items Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Shipping</span>
                <span className="text-green-500 uppercase text-xs font-bold">
                  Free
                </span>
              </div>
              <div className="flex justify-between w-full text-xl pt-2 border-t border-white/5">
                <span className="font-semibold text-white">Total Amount</span>
                <span className="font-black text-[#a3a380]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-[#a3a380] hover:bg-[#8e8e6d] text-black font-extrabold py-7 text-lg rounded-2xl transition-all active:scale-[0.98] group"
            >
              Go To Checkout
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest font-medium">
              Secure Checkout • Fast Delivery
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
