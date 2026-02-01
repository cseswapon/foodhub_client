import { DashboardStats } from "@/components/common/DashboardStats/DashboardStats";
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
    <>
      <DashboardStats stats={user?.data as statsData} role="admin" />
    </>
  );
}
