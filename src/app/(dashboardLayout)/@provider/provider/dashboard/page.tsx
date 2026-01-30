import { DashboardStats } from "@/components/common/DashboardStats/DashboardStats";
import { RecentOrders } from "@/components/module/provider/RecentOrders";

const statsData = {
  activeUser: 1,
  suspendUser: 0,
  customer: 1,
  provider: 0,
  completeOrder: 0,
  cancelOrder: 0,
  totalMeals: 12,
  totalCategories: 1,
};

const recentOrders = [
  {
    id: "bbc0db56-6225-41da-b021-86d940705a96",
    total_price: "1500",
    payment_method: "cod",
    status: "placed",
    created_at: "2026-01-30T09:41:40.026Z",
    orderItems: [
      {
        quantity: 3,
        meal: { name: "Chicken Biryani" },
      },
    ],
    user: { name: "Customer", email: "customer@gmail.com" },
  },
];

export default function ProviderDashboard() {
  return (
    <main className="p-6 md:p-10 space-y-10">
      {/* Welcome Header */}
      {/* <div className="space-y-1">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
          Provider <span className="text-[#a3a380]">Console</span>
        </h1>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.3em]">
          Operational insights & real-time analytics
        </p>
      </div> */}

      <DashboardStats stats={statsData} />

      <RecentOrders orders={recentOrders} />
    </main>
  );
}
