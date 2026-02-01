"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  HiOutlineMapPin,
  HiOutlineCreditCard,
  HiOutlineBanknotes,
} from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { createOrderAction } from "@/actions/order.action";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
    onSubmit: async ({ value }) => {
      // return console.log(value,cart);
      const toastId = toast.loading("Placing your order...",{
        id: "checkout",
        position: "top-center",
      });
      const groupedOrders = cart.reduce((acc: any, item: any) => {
        const pId = item.provider_id;
        if (!acc[pId]) {
          acc[pId] = [];
        }
        acc[pId].push({
          meal_id: item.id,
          quantity: item.quantity,
          price: item.price,
        });
        return acc;
      }, {});

      const payload = Object.keys(groupedOrders).map((pId) => ({
        provider_id: pId,
        delivery_address: value.address,
        payment_method: paymentMethod,
        items: groupedOrders[pId],
      }));

      try {
        // return console.log(payload);
        const res = await createOrderAction(payload);

        if (res.success) {
          toast.success(res.message, { id: toastId });
          clearCart();
          router.push("/order"); 
        } else {
          toast.error(res.message, { id: toastId });
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
        console.error("Checkout Error:", error);
      }
    },
  });

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = cart.length > 0 ? 60 : 0;
  const total = subtotal + deliveryFee;

  return (
    <main className="bg-[#0c0d0c] pt-30 pb-15 px-4 min-h-screen text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Final <span className="text-[#a3a380]">Step</span>
          </h1>
          <p className="text-gray-500 mt-2 uppercase tracking-[0.2em] text-xs font-bold">
            Complete your order with TanStack Form
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Side: Forms */}
          <div className="lg:col-span-8 space-y-8">
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
                  {/* Full Name Field */}
                  <form.Field
                    name="name"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                          Full Name
                        </Label>
                        <Input
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="bg-[#0c0d0c] border-white/10 focus:ring-[#a3a380]"
                          placeholder="John Doe"
                        />
                      </div>
                    )}
                  />

                  {/* Phone Field */}
                  <form.Field
                    name="phone"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                          Phone Number
                        </Label>
                        <Input
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="bg-[#0c0d0c] border-white/10 focus:ring-[#a3a380]"
                          placeholder="017XXXXXXXX"
                        />
                      </div>
                    )}
                  />

                  {/* Address Field */}
                  <div className="md:col-span-2">
                    <form.Field
                      name="address"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                            Detailed Address
                          </Label>
                          <Input
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="bg-[#0c0d0c] border-white/10 focus:ring-[#a3a380]"
                            placeholder="House No, Road No, Area"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </Card>
            </section>

            {/* Payment Method */}
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
                    "flex items-center justify-between p-6 rounded-lg border cursor-pointer",
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
              </RadioGroup>
            </section>
          </div>

          {/* Right Side Order Summary */}
          <div className="lg:col-span-4">
            <Card className="bg-[#1f2120] border-white/5 rounded-lg p-8 sticky top-24">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400">
                  <span className="text-xs uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="text-white font-bold tracking-tighter">
                    ৳{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span className="text-xs uppercase tracking-widest">
                    Delivery
                  </span>
                  <span className="text-white font-bold tracking-tighter">
                    ৳{deliveryFee}
                  </span>
                </div>
                <Separator className="bg-white/5" />
                <div className="flex justify-between items-end pt-2">
                  <span className="text-[#a3a380] text-xs font-black uppercase tracking-widest">
                    Total Payable
                  </span>
                  <span className="text-4xl font-black text-white tracking-tighter">
                    ৳{total}
                  </span>
                </div>
              </div>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || cart.length === 0}
                    className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase h-16 rounded-lg"
                  >
                    {isSubmitting ? "Processing..." : "Place Order Now"}
                  </Button>
                )}
              />
            </Card>
          </div>
        </form>
      </div>
    </main>
  );
}
