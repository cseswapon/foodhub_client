"use server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HiOutlineEye,
  HiOutlineShoppingBag,
  HiOutlineCalendar,
} from "react-icons/hi2";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OrderService } from "@/services/order.service";
import { CancelOrderButton } from "@/components/module/order/CancelOrderModal";

// export const dynamic = "force-dynamic";

const statusConfig = {
  placed: {
    label: "Placed",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  preparing: {
    label: "Preparing",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  ready: {
    label: "Ready",
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
};

const orderService = new OrderService();
export default async function OrderPage() {
  const orders = await orderService.getAllOrders();
  // console.log(orders?.data);

  return (
    <main className="min-h-screen bg-[#0c0d0c] text-white pt-30 pb-15">
      <div className="container mx-auto px-4 md:px-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Order <span className="text-[#a3a380]">History</span>
            </h1>
            <p className="text-gray-500 text-sm uppercase tracking-widest font-bold flex items-center gap-2">
              <HiOutlineShoppingBag className="text-[#a3a380]" />
              Manage and track your culinary journeys
            </p>
          </div>
          <div className="bg-[#1f2120] px-6 py-3 rounded-lg border border-white/5">
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
              Total Orders
            </p>
            <p className="text-2xl font-black text-[#a3a380]">
              {orders?.data?.length}
            </p>
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-[#1f2120] border border-white/5 rounded-lg overflow-hidden shadow-2xl">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
                <TableHead className="text-gray-400 py-6 pl-8">
                  Order Info
                </TableHead>
                <TableHead className="text-gray-400">Restaurant</TableHead>
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 text-right pr-8">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            {orders?.data && orders?.data?.length > 0 ? (
              <TableBody>
                {orders?.data?.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-white/5 hover:bg-white/2 transition-colors group"
                  >
                    {/* Order ID & Item Preview */}
                    <TableCell className="py-6 pl-8">
                      <p className="font-black text-white group-hover:text-[#a3a380] transition-colors uppercase tracking-tight">
                        {order.orderItems[0]?.meal.name}
                        {order.orderItems.length > 1 &&
                          ` + ${order.orderItems.length - 1} more`}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1">
                        #{order.id}
                      </p>
                    </TableCell>

                    {/* Provider Name */}
                    <TableCell className="font-medium text-gray-300">
                      {order.provider.restaurant_name}
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-gray-400">
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <HiOutlineCalendar className="text-[#a3a380]" />
                        {new Date(order.created_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell>
                      <p className="font-black text-white">
                        ৳{order.total_price}
                      </p>
                      <p className="text-[10px] text-gray-600 uppercase font-bold tracking-tighter italic">
                        {order.payment_method}
                      </p>
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full px-3 py-1 text-[10px] uppercase font-black tracking-widest border",
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ]?.className,
                        )}
                      >
                        {
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ]?.label
                        }
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right pr-8">
                      <div className="flex items-center justify-end gap-3">
                        <CancelOrderButton
                          orderId={order.id}
                          currentStatus={order.status}
                        />
                        <Button
                          asChild
                          variant="ghost"
                          className="h-10 w-10 p-0 rounded-full hover:bg-[#a3a380] hover:text-[#1f2120] transition-all"
                        >
                          <Link href={`/order/${order.id}`}>
                            <HiOutlineEye size={18} />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-500 uppercase text-xs font-bold tracking-widest"
                >
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </Table>

          {orders?.data?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 italic uppercase tracking-widest text-sm">
                No orders found yet.
              </p>
              <Button
                asChild
                className="mt-4 bg-[#a3a380] text-[#1f2120] font-bold uppercase rounded-full"
              >
                <Link href="/meals">Start Ordering</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
