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
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineClock,
} from "react-icons/hi2";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
export default function OrdersTable({
  orders,
  role,
}: {
  orders: any[];
  role: string;
}) {
  return (
    <div className="rounded-lg border  backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-[0.2em] text-[10px] font-black">
            <TableHead className="py-6 pl-8">Order & Customer</TableHead>
            <TableHead>Restaurant</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            {role !== "admin" && (
              <TableHead className="text-right pr-8">Manage</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order?.id} className="transition-all group">
              {/* Order ID & Customer Info */}
              <TableCell className="py-6 pl-8">
                <div className="space-y-1">
                  <p className="font-black text-gray-500 transition-colors uppercase tracking-tighter">
                    #{order?.id?.slice(0, 8)}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <HiOutlineUser size={12} />
                    <span className="text-[11px] text-gray-300 font-medium">
                      {order?.user?.name}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* Provider Info */}
              <TableCell>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">
                    {order?.provider?.restaurant_name}
                  </p>
                  <p className="text-[10px] text-gray-300 truncate max-w-37.5">
                    {order?.provider?.address}
                  </p>
                </div>
              </TableCell>

              {/* Items Summary */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-[#a3a380]">
                    <HiOutlineClock size={16} />
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-500 font-bold">
                      {order?.orderItems?.[0]?.meal.name}
                    </p>
                    <p className="text-gray-300 font-medium">
                      Qty: {order?.orderItems?.[0]?.quantity}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Pricing & Method */}
              <TableCell>
                <p className="font-black text-gray-500 italic">
                  ৳{order?.total_price}
                </p>
                <Badge
                  variant="secondary"
                  className="bg-white/5 text-[9px] h-4 uppercase font-bold text-gray-500"
                >
                  {order?.payment_method}
                </Badge>
              </TableCell>

              {/* Status Badge */}
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-3 py-1 text-[9px] uppercase font-black tracking-widest border transition-all",
                    statusConfig[order.status as keyof typeof statusConfig]
                      ?.className,
                  )}
                >
                  {
                    statusConfig[order.status as keyof typeof statusConfig]
                      ?.label
                  }
                </Badge>
              </TableCell>

              {/* Actions */}
              {role !== "admin" && (
                <TableCell className="text-right pr-8">
                  <div className="flex justify-end gap-2">
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-[#a3a380] hover:text-[#1f2120] transition-all"
                    >
                      <Link href={`/provider/orders/${order?.id}`}>
                        <HiOutlineEye size={18} />
                      </Link>
                    </Button>

                    {/* Status Update shortcut link */}
                    {!["delivered", "cancelled"].includes(
                      order?.status as string,
                    ) && (
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                      >
                        <Link href={`/provider/orders/update/${order?.id}`}>
                          <HiOutlineTruck size={18} />
                        </Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
