import { statsData } from "@/app/(dashboardLayout)/@admin/admin/page";
import { DashboardStats } from "@/components/common/DashboardStats/DashboardStats";
import { RecentOrders } from "@/components/module/provider/RecentOrders";
import { OrderService } from "@/services/order.service";
import { UserService } from "@/services/user.service";

const userService = new UserService();
const orderService = new OrderService();
export default async function ProviderDashboard() {
  const [user, order] = await Promise.all([
    userService.dashboard(),
    orderService.getAllOrders("placed"),
  ]);
  // console.log(order);
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

      <DashboardStats stats={user?.data as statsData} role="provider" />

      {order?.data && order?.data?.length > 0 && (
        <RecentOrders orders={order?.data as any} />
      )}
    </main>
  );
}
