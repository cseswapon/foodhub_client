import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineTrash,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineArrowLeft,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Dummy Cart Data
const CART_ITEMS = [
  {
    id: "1",
    name: "Chicken Biryani",
    price: 500,
    quantity: 2,
    image: "/no-image.png", // Replace with your image path
    restaurant: "Pizza Point - 9",
  },
  {
    id: "2",
    name: "Special Beef Tehari",
    price: 350,
    quantity: 1,
    image: "/no-image.png",
    restaurant: "Kacchi Bhai",
  },
];

export default function CartPage() {
  const subtotal = CART_ITEMS.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = 60;
  const total = subtotal + deliveryFee;

  return (
    <main className="bg-[#0c0d0c] md:py-[5%] py-[25%] px-4 min-h-screen text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Your <span className="text-[#a3a380]">Cart</span>
            </h1>
            <p className="text-gray-500 mt-2 flex items-center gap-2">
              <HiOutlineShoppingBag className="text-[#a3a380]" />
              You have {CART_ITEMS.length} items in your bag
            </p>
          </div>
          <Button
            asChild
            variant="link"
            className="text-[#a3a380] hover:text-white p-0 gap-2 uppercase font-bold tracking-widest text-xs"
          >
            <Link href="/meal">
              <HiOutlineArrowLeft /> Continue Shopping
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 1. Left Side: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {CART_ITEMS.length > 0 ? (
              CART_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col md:flex-row items-center gap-6 p-6 bg-[#1f2120] border border-white/5 rounded-lg transition-all hover:border-[#a3a380]/20"
                >
                  {/* Item Image */}
                  <div className="relative h-24 w-32 rounded-lg overflow-hidden shrink-0 bg-[#0c0d0c]">
                    <Image
                      src="/no-image.png"
                      alt={item.name}
                      width={500}
                      height={500}
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-[10px] uppercase tracking-widest text-[#a3a380] font-bold mb-1">
                      {item.restaurant}
                    </p>
                    <h3 className="text-xl font-bold uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-[#a3a380] font-black mt-1">
                      ৳{item.price}
                    </p>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-4 bg-[#0c0d0c] px-4 py-2 rounded-full border border-white/5">
                    <button className="text-gray-400 hover:text-[#a3a380] transition-colors">
                      <HiOutlineMinus />
                    </button>
                    <span className="font-bold min-w-5 text-center">
                      {item.quantity}
                    </span>
                    <button className="text-gray-400 hover:text-[#a3a380] transition-colors">
                      <HiOutlinePlus />
                    </button>
                  </div>

                  {/* Total & Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-lg font-black tracking-tighter">
                      ৳{item.price * item.quantity}
                    </p>
                    <button className="text-gray-600 hover:text-red-500 transition-colors">
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-lg">
                <p className="text-gray-500 italic uppercase tracking-widest text-sm">
                  Your cart is empty
                </p>
              </div>
            )}
          </div>

          {/* 2. Right Side: Order Summary */}
          <div className="lg:col-span-4">
            <Card className="bg-[#1f2120] border-white/5 rounded-lg p-8 sticky top-24 shadow-2xl">
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">
                Order Summary
              </h4>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-400">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-white font-bold">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="text-sm">Delivery Fee</span>
                  <span className="text-white font-bold">৳{deliveryFee}</span>
                </div>

                <Separator className="bg-white/5 my-6" />

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs uppercase text-[#a3a380] font-bold tracking-widest">
                      Grand Total
                    </p>
                    <p className="text-4xl font-black tracking-tighter text-white">
                      ৳{total}
                    </p>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase tracking-widest h-14 rounded-lg mt-8 shadow-xl transition-all active:scale-95 hover:cursor-pointer!"
                >
                  <Button className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase tracking-widest h-14 rounded-lg mt-8 shadow-xl transition-all active:scale-95  hover:cursor-pointer!">
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-[10px] text-gray-600 text-center uppercase tracking-tighter mt-4 leading-relaxed">
                  Shipping and taxes calculated at checkout. <br /> Secure
                  payment guaranteed.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
