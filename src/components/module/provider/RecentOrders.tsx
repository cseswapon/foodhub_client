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
import { HiOutlineEye, HiOutlineCalendar } from "react-icons/hi2";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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

export function RecentOrders({ orders }: { orders: any[] }) {
  return (
    <Card className=" border-white/5 overflow-hidden">
      <CardHeader className="p-8 py-0 border-b border-white/5">
        <CardTitle className="text-xl font-black uppercase tracking-tight">
          Recent <span className="text-[#a3a380]">Orders</span>
        </CardTitle>
      </CardHeader>
      <Table>
        <TableHeader className="bg-white/2">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="text-[10px] uppercase font-black py-4 pl-8">
              Customer / Meal
            </TableHead>
            <TableHead className="text-[10px] uppercase font-black">
              Date
            </TableHead>
            <TableHead className="text-[10px] uppercase font-black">
              Total
            </TableHead>
            <TableHead className="text-[10px] uppercase font-black">
              Status
            </TableHead>
            <TableHead className="text-right pr-8">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order?.id}
              className="border-white/5 hover:bg-white/2 group transition-colors"
            >
              <TableCell className="py-6 pl-8">
                <p className="font-bold text-white uppercase text-sm tracking-tight">
                  {order?.user?.name}
                </p>
                <p className="text-[10px] text-gray-500">
                  {order?.orderItems[0]?.meal?.name} (x
                  {order?.orderItems[0]?.quantity})
                </p>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase">
                  <HiOutlineCalendar className="text-[#a3a380]" />
                  {new Date(order?.created_at).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>
                <p className="font-black text-white italic">
                  ৳{order?.total_price}
                </p>
                <p className="text-[9px] uppercase font-bold text-gray-600 tracking-tighter">
                  {order?.payment_method}
                </p>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-3 py-0.5 text-[9px] uppercase font-black tracking-widest border",
                    statusConfig[order?.status as keyof typeof statusConfig]
                      ?.className,
                  )}
                >
                  {
                    statusConfig[order?.status as keyof typeof statusConfig]
                      ?.label
                  }
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-8">
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="rounded-full hover:bg-[#a3a380] hover:text-[#1f2120]"
                >
                  <Link href={`/provider/orders/${order?.id}`}>
                    <HiOutlineEye size={16} />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
