import { DashboardStats } from "@/components/common/DashboardStats/DashboardStats";

const statsData = {
  activeUser: 1,
  suspendUser: 2,
  customer: 1,
  provider: 4,
  completeOrder: 0,
  cancelOrder: 0,
  totalMeals: 12,
  totalCategories: 1,
};

export default function AdminPage() {
  return (
    <>
      <DashboardStats stats={statsData} role="admin" />
    </>
  );
}
