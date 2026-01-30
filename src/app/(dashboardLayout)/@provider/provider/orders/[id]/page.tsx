import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineBuildingStorefront,
  HiOutlineClock,
  HiOutlineCurrencyBangladeshi,
} from "react-icons/hi2";
import { cn } from "@/lib/utils";

// Status Configuration
const statusConfig = {
  placed: { label: "Placed", color: "text-blue-500", bg: "bg-blue-500/10" },
  preparing: {
    label: "Preparing",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  ready: { label: "Ready", color: "text-purple-500", bg: "bg-purple-500/10" },
  delivered: {
    label: "Delivered",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  cancelled: { label: "Cancelled", color: "text-red-500", bg: "bg-red-500/10" },
};

export default function OrderDetails() {
  // --- ফেক ডাটা (আপনার API রেসপন্স অনুযায়ী) ---
  const order = {
    id: "ec809d49-317e-4c6a-9c73-70688aa87260",
    total_price: "1500",
    delivery_address: "ধানমন্ডি, ঢাকা",
    payment_method: "cod",
    status: "delivered",
    created_at: "2026-01-30T10:29:32.454Z",
    updated_at: "2026-01-30T11:00:34.647Z",
    provider: {
      restaurant_name: "Pizza Point - 10",
      description: "ফ্রেশ পিজ্জা ও বার্গার পাওয়া যায়",
      address: "গুলশান ১, ঢাকা",
    },
    user: {
      name: "Csutomer",
      email: "cusomter@gmail.com",
      phone: "01829930827",
    },
    orderItems: [
      {
        meal_id: "2155fb2a-e358-4ae8-8b4e-c8db80d4449e",
        quantity: 3,
        price: "500",
        meal_name: "Chicken Biryani", // ফেক হিসেবে অ্যাড করলাম
      },
    ],
  };

  const statusInfo = statusConfig[order.status as keyof typeof statusConfig];

  return (
    <main className="p-6 md:p-10  min-h-screen space-y-8">
      {/* Header with Order ID and Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
            Order <span className="text-[#a3a380]">Summary</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
            Reference: {order.id}
          </p>
        </div>
        <Badge
          className={cn(
            "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border",
            statusInfo?.bg,
            statusInfo?.color,
          )}
        >
          {statusInfo?.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Order Items & Pricing */}
        <div className="lg:col-span-2 space-y-6">
          <Card className=" border rounded-lg overflow-hidden py-0">
            <CardHeader className="p-8 border-b border-white/5">
              <CardTitle className="text-lg font-black uppercase tracking-widest text-[#a3a380]">
                Items Ordered
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center group"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center font-black">
                      {item.quantity}x
                    </div>
                    <div>
                      <p className="font-bold group-hover:text-[#a3a380] transition-colors uppercase">
                        {item.meal_name}
                      </p>
                      <p className="text-xs text-gray-500 tracking-widest">
                        UNIT PRICE: ৳{item.price}
                      </p>
                    </div>
                  </div>
                  <p className="font-black text-white italic">
                    ৳{Number(item.price) * item.quantity}
                  </p>
                </div>
              ))}

              <Separator className="bg-white/5 my-6" />

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-gray-400 text-sm font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>৳{order.total_price}</span>
                </div>
                <div className="flex justify-between text-[#a3a380] text-xl font-black uppercase tracking-tighter pt-2 border-t border-white/5">
                  <span>Grand Total</span>
                  <span>৳{order.total_price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logistics Tracking Card */}
          <Card className="rounded-lg p-8">
            <div className="flex items-center gap-4 text-gray-400 mb-6">
              <HiOutlineClock size={24} className="text-[#a3a380]" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Order Placed On
                </p>
                <p className="text-sm font-bold text-white uppercase">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <HiOutlineCurrencyBangladeshi
                size={24}
                className="text-[#a3a380]"
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Payment Strategy
                </p>
                <p className="text-sm font-bold text-white uppercase">
                  {order.payment_method === "cod"
                    ? "Cash On Delivery"
                    : "Online Payment"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Stakeholders Info */}
        <div className="space-y-6">
          {/* Customer Card */}
          <Card className="rounded-lg overflow-hidden">
            <CardHeader className="bg-white/5 p-6 border-b border-white/5">
              <div className="flex items-center gap-2 text-[#a3a380]">
                <HiOutlineUser size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Customer Data
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-xl font-black text-white uppercase italic">
                  {order.user.name}
                </p>
                <p className="text-xs text-gray-500 font-bold">
                  {order.user.email}
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <HiOutlinePhone className="text-[#a3a380]" />
                  <span className="font-bold">{order.user.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <HiOutlineMapPin className="text-[#a3a380] mt-1 shrink-0" />
                  <span className="font-medium leading-relaxed italic">
                    &quot;{order.delivery_address}&quot;
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Restaurant/Provider Card */}
          <Card className=" rounded-lg overflow-hidden  border-l-4 border-l-[#a3a380]">
            <CardHeader className="p-6 pb-2">
              <div className="flex items-center gap-2 text-[#a3a380]">
                <HiOutlineBuildingStorefront size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Kitchen Info
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
              <p className="text-lg font-black text-white uppercase tracking-tight">
                {order.provider.restaurant_name}
              </p>
              <p className="text-xs text-gray-500 italic leading-relaxed border-l border-white/10 pl-3">
                {order.provider.description}
              </p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-2">
                LOC: {order.provider.address}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
