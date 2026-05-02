import { DashboardStats } from "@/components/common/DashboardStats/DashboardStats";
import AdminDashboardCharts from "@/components/module/admin/AdminDashboardCharts";
import { UserService } from "@/services/user.service";

export type statsData = {
  activeUser: number;
  suspendUser: number;
  customer: number;
  provider: number;
  completeOrder: number;
  cancelOrder: number;
  totalMeals: number;
  totalCategories: number;
};

const userService = new UserService();
export default async function AdminPage() {
  const user = await userService.dashboard();
  // console.log(user?.data);

  return (
    <main className="space-y-6">
      <DashboardStats stats={user?.data as statsData} role="admin" />
      <AdminDashboardCharts stats={user?.data as statsData} />
    </main>
  );
}
