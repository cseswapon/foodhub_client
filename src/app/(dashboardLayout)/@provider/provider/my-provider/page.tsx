import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineBuildingStorefront,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import Link from "next/link";

export default function MyProvider() {
  // --- ফেক ডাটা ---
  const providers = [
    {
      id: "1ea33618-d7c7-4ac2-8ef9-aa0915bcacd4",
      restaurant_name: "Pizza Point - 9",
      address: "গুলশান ১, ঢাকা",
      is_open: true,
      fb_link: "https://facebook.com/pizzapointbd",
    },
    {
      id: "0dd55798-1b64-4ecd-bb47-be82951d7d06",
      restaurant_name: "Pizza Point - 10",
      address: "গুলশান ১, ঢাকা",
      is_open: false,
      fb_link: "https://facebook.com/pizzapointbd",
    },
  ];

  return (
    <main className="p-6 md:p-10 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight italic">
            My <span className="text-[#a3a380]">Providers</span>
          </h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            Manage your kitchen profiles and listings
          </p>
        </div>

        {/* Add Provider Button - /my-provider/add */}
        <Button
          asChild
          className="bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-bold rounded-lg uppercase text-[10px] tracking-widest gap-2 h-11 px-6 shadow"
        >
          <Link href="/provider/my-provider/add">
            <HiOutlinePlus size={16} /> Add Provider
          </Link>
        </Button>
      </div>

      {/* Provider List Table */}
      <div className="rounded-lg border border-white/5 bg-card/40 backdrop-blur-sm overflow-hidden shadow">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
              <TableHead className="py-5 pl-8 text-muted-foreground">
                Provider Info
              </TableHead>
              <TableHead className="text-muted-foreground">Location</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Social</TableHead>
              <TableHead className="text-right pr-8 text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider) => (
              <TableRow
                key={provider.id}
                className="border-white/5 hover:bg-white/2 transition-colors group"
              >
                {/* Info */}
                <TableCell className="py-5 pl-8">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-[#a3a380]">
                      <HiOutlineBuildingStorefront size={20} />
                    </div>
                    <span className="font-bold text-gray-500 uppercase text-sm tracking-tight">
                      {provider.restaurant_name}
                    </span>
                  </div>
                </TableCell>

                {/* Address */}
                <TableCell className="text-xs text-gray-400 font-medium">
                  {provider.address}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full px-3 py-0.5 text-[9px] font-black border uppercase",
                      provider.is_open
                        ? "text-green-500 border-green-500/20 bg-green-500/5"
                        : "text-red-500 border-red-500/20 bg-red-500/5",
                    )}
                  >
                    {provider.is_open ? "Active" : "Closed"}
                  </Badge>
                </TableCell>

                {/* FB Link */}
                <TableCell>
                  <a
                    href={provider.fb_link}
                    target="_blank"
                    className="text-muted-foreground hover:text-[#a3a380] transition-colors"
                  >
                    <HiOutlineGlobeAlt size={18} />
                  </a>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right pr-8">
                  <div className="flex justify-end gap-2">
                    {/* Update Link - /my-provider/update/[id] */}
                    <Button
                      asChild
                      size="icon"
                      variant="ghost"
                      className="size-9 rounded-lg hover:bg-[#a3a380]/10 hover:text-[#a3a380] text-gray-400"
                    >
                      <Link href={`/provider/my-provider/update/${provider.id}`}>
                        <HiOutlinePencilSquare size={18} />
                      </Link>
                    </Button>

                    {/* Delete Action */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-9 rounded-lg hover:bg-red-500/10 hover:text-red-500 text-gray-400"
                    >
                      <HiOutlineTrash size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

// Utility for classes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
