import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineShoppingBag,
  HiOutlineMapPin,
  HiOutlineClock,
} from "react-icons/hi2";
import { cn } from "@/lib/utils";

// API Response Simulation for Single Order
async function getOrderDetails(id: string) {
  return {
    id: "ORD-7234",
    total_price: "1410.00",
    delivery_address: "House 24, Road 7, Dhanmondi, Dhaka",
    payment_method: "cash_on_delivery",
    status: "preparing", // placed, preparing, ready, delivered, cancelled
    created_at: "2026-01-29T10:00:00Z",
    provider: {
      restaurant_name: "Pizza Point - 9",
      address: "গুলশান ১, ঢাকা",
    },
    orderItems: [
      {
        id: "1",
        meal: { name: "Chicken Biryani" },
        quantity: 2,
        price: "500.00",
      },
      { id: "2", meal: { name: "Beef Tehari" }, quantity: 1, price: "350.00" },
    ],
  };
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderDetails(id);

  const steps = ["placed", "preparing", "ready", "delivered"];
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <main className="min-h-screen bg-[#0c0d0c] text-white pt-30 pb-15">
      <div className="container mx-auto px-4 ">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Order <span className="text-[#a3a380]">#{order.id}</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <HiOutlineClock className="text-[#a3a380]" />
              Placed on {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
          <Badge className="bg-[#a3a380] text-[#1f2120] px-6 py-2 rounded-full font-black uppercase tracking-widest">
            {order.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Tracking & Items */}
          <div className="lg:col-span-8 space-y-8">
            {/* Live Tracking Stepper */}
            <Card className="bg-[#1f2120] border-white/5 rounded-lg p-8 md:p-12">
              <div className="relative flex flex-col md:flex-row justify-between gap-8">
                {steps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div
                      key={step}
                      className="flex md:flex-col items-center gap-4 flex-1 relative z-10"
                    >
                      <div
                        className={cn(
                          "h-12 w-12 rounded-full flex items-center justify-center border-4 transition-all duration-500",
                          isCompleted
                            ? "bg-[#a3a380] border-[#a3a380] text-[#1f2120]"
                            : "bg-[#0c0d0c] border-white/10 text-gray-600",
                        )}
                      >
                        {isCompleted ? (
                          <HiOutlineCheckCircle size={24} />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div className="text-left md:text-center">
                        <p
                          className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            isCompleted ? "text-[#a3a380]" : "text-gray-600",
                          )}
                        >
                          {step}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {/* Connecting Line (Desktop) */}
                <div className="absolute top-6 left-0 w-full h-[2px] bg-white/5 -z-0 hidden md:block" />
              </div>
            </Card>

            {/* Items Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                <HiOutlineShoppingBag className="text-[#a3a380]" /> Order
                Summary
              </h3>
              <Card className="bg-[#1f2120] border-white/5 rounded-lg overflow-hidden">
                <CardContent className="p-0">
                  {order.orderItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className={cn(
                        "p-6 flex justify-between items-center",
                        idx !== order.orderItems.length - 1 &&
                          "border-b border-white/5",
                      )}
                    >
                      <div>
                        <p className="font-bold text-lg text-white">{item.meal.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity} x ৳{item.price}
                        </p>
                      </div>
                      <p className="font-black text-[#a3a380]">
                        ৳{Number(item.price) * item.quantity}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right: Delivery & Payment Details */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-[#1f2120] border-white/5 rounded-lg p-8 shadow-2xl">
              <div className="space-y-8">
                {/* Delivery Address */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#a3a380] text-[10px] font-black uppercase tracking-[0.2em]">
                    <HiOutlineMapPin /> Delivery Address
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed italic">
                    {order.delivery_address}
                  </p>
                </div>

                <Separator className="bg-white/5" />

                {/* Restaurant Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#a3a380] text-[10px] font-black uppercase tracking-[0.2em]">
                    <HiOutlineTruck /> Restaurant Info
                  </div>
                  <h4 className="font-bold text-white uppercase">
                    {order.provider.restaurant_name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {order.provider.address}
                  </p>
                </div>

                <Separator className="bg-white/5" />

                {/* Total Bill */}
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 uppercase font-bold">
                      Total Bill
                    </span>
                    <span className="text-3xl font-black text-white tracking-tighter">
                      ৳{order.total_price}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-full justify-center py-2 border-white/10 text-gray-400 text-[10px] uppercase font-bold"
                  >
                    Paid via {order.payment_method.replace(/_/g, " ")}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
