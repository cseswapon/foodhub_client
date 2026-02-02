import OrdersTable from "@/components/module/order/OrderTable";
import { OrderService } from "@/services/order.service";
const orderService = new OrderService();
export default async function AdminOrders() {
  const orders = await orderService.getAllOrders();
  // console.log("Orders", orders?.data);
  return (
    <main className="p-6 md:p-10 space-y-8">
      {/* Table Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter  italic">
            Order <span className="text-[#a3a380]">Logistics</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
            Real-time incoming orders & management
          </p>
        </div>
      </div>

      {/* Orders Table Component */}
      <OrdersTable orders={orders?.data as any} role="admin" />
    </main>
  );
}
