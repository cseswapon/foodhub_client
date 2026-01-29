"use client";

import { useState } from "react";
import {
  HiOutlineMapPin,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <main className="bg-[#0c0d0c] md:py-[5%] py-[25%] px-4 min-h-screen text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Final <span className="text-[#a3a380]">Step</span>
          </h1>
          <p className="text-gray-500 mt-2 uppercase tracking-[0.2em] text-xs font-bold">
            Complete your order to enjoy the meal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Shipping Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#a3a380] flex items-center justify-center text-[#1f2120]">
                  <HiOutlineMapPin size={18} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  Shipping Address
                </h3>
              </div>

              <Card className="bg-[#1f2120] border-white/5 p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                      Full Name
                    </Label>
                    <Input
                      className="bg-[#0c0d0c] border-white/10 focus:ring-[#a3a380]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                      Phone Number
                    </Label>
                    <Input
                      className="bg-[#0c0d0c] border-white/10 focus:ring-[#a3a380]"
                      placeholder="017XXXXXXXX"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                      Detailed Address
                    </Label>
                    <Input
                      className="bg-[#0c0d0c] border-white/10 focus:ring-[#a3a380]"
                      placeholder="House No, Road No, Area"
                    />
                  </div>
                </div>
              </Card>
            </section>

            {/* 2. Payment Method */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#a3a380] flex items-center justify-center text-[#1f2120]">
                  <HiOutlineCreditCard size={18} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  Payment Method
                </h3>
              </div>

              <RadioGroup
                defaultValue="cod"
                onValueChange={setPaymentMethod}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="cod"
                  className={cn(
                    "flex items-center justify-between p-6 rounded-lg border cursor-pointer transition-all",
                    paymentMethod === "cod"
                      ? "bg-[#a3a380]/10 border-[#a3a380]"
                      : "bg-[#1f2120] border-white/5",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <HiOutlineBanknotes
                      size={24}
                      className={
                        paymentMethod === "cod"
                          ? "text-[#a3a380]"
                          : "text-gray-500"
                      }
                    />
                    <span className="font-bold uppercase tracking-tighter">
                      Cash on Delivery
                    </span>
                  </div>
                  <RadioGroupItem
                    value="cod"
                    id="cod"
                    className="border-[#a3a380]"
                  />
                </Label>

                {/*  <Label
                  htmlFor="online"
                  className={cn(
                    "flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all opacity-50",
                    paymentMethod === "online"
                      ? "bg-[#a3a380]/10 border-[#a3a380]"
                      : "bg-[#1f2120] border-white/5",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <HiOutlineCreditCard
                      size={24}
                      className={
                        paymentMethod === "online"
                          ? "text-[#a3a380]"
                          : "text-gray-500"
                      }
                    />
                    <span className="font-bold uppercase tracking-tighter">
                      Online Payment
                    </span>
                  </div>
                  <RadioGroupItem
                    value="online"
                    id="online"
                    className="border-[#a3a380]"
                  />
                </Label> */}
              </RadioGroup>
            </section>
          </div>

          {/* Right Side: Order Summary Card */}
          <div className="lg:col-span-4">
            <Card className="bg-[#1f2120] border-white/5 rounded-lg p-8 sticky top-24">
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">
                Review Order
              </h4>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400">
                  <span className="text-xs uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="text-white font-bold tracking-tighter">
                    ৳1350
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="text-xs uppercase tracking-widest">
                    Delivery
                  </span>
                  <span className="text-white font-bold tracking-tighter">
                    ৳60
                  </span>
                </div>
                <Separator className="bg-white/5" />
                <div className="flex justify-between items-end pt-2">
                  <span className="text-[#a3a380] text-xs font-black uppercase tracking-widest">
                    Total Payable
                  </span>
                  <span className="text-4xl font-black text-white tracking-tighter">
                    ৳1410
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#0c0d0c] p-4 rounded-lg border border-white/5 flex items-start gap-3">
                  <HiOutlineTruck
                    className="text-[#a3a380] shrink-0"
                    size={20}
                  />
                  <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tighter">
                    Estimated delivery time{" "}
                    <span className="text-white font-bold">35-45 mins</span> to
                    your location.
                  </p>
                </div>

                <Link href="/order">
                  <Button className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase tracking-widest h-16 rounded-lg shadow-xl transition-all active:scale-95 text-lg cursor-pointer">
                    Place Order Now
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-gray-600 text-[10px] uppercase font-bold tracking-widest pt-2">
                  <HiOutlineShieldCheck size={14} className="text-green-500" />
                  Secure Checkout Guaranteed
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper function for conditional classes
function cn(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}
