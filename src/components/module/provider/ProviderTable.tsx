"use client";
import { deleteProviderAction } from "@/actions/provider.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  HiOutlineBuildingStorefront,
  HiOutlineGlobeAlt,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { toast } from "sonner";
const ProviderTable: React.FC<{ providers: any[] }> = ({ providers }) => {
  const handelDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) {
      return;
    }
    const tostId = toast.loading("Deleting user...", { id: id });
    try {
      const result = await deleteProviderAction(id);
      console.log(result);
      if (result) {
        toast.success("User deleted", { id: tostId });
      }
    } catch {
      toast.error("Something went wrong", { id: tostId });
    }
  };
  return (
    <>
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
            {providers && providers?.length > 0 ? (
              providers?.map((provider: any) => (
                <TableRow
                  key={provider?.id}
                  className="border-white/5 hover:bg-white/2 transition-colors group"
                >
                  {/* Info */}
                  <TableCell className="py-5 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-[#a3a380]">
                        <HiOutlineBuildingStorefront size={20} />
                      </div>
                      <span className="font-bold text-gray-500 uppercase text-sm tracking-tight">
                        {provider?.restaurant_name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Address */}
                  <TableCell className="text-xs text-gray-400 font-medium">
                    {provider?.address}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-0.5 text-[9px] font-black border uppercase",
                        provider?.is_open
                          ? "text-green-500 border-green-500/20 bg-green-500/5"
                          : "text-red-500 border-red-500/20 bg-red-500/5",
                      )}
                    >
                      {provider?.is_open ? "Active" : "Closed"}
                    </Badge>
                  </TableCell>

                  {/* FB Link */}
                  <TableCell>
                    <Link
                      href={provider?.fb_link || "#"}
                      target="_blank"
                      className="text-muted-foreground hover:text-[#a3a380] transition-colors"
                    >
                      <HiOutlineGlobeAlt size={18} />
                    </Link>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="size-9 rounded-lg hover:bg-[#a3a380]/10 hover:text-[#a3a380] text-gray-400"
                      >
                        <Link
                          href={`/provider/my-provider/update/${provider?.id}`}
                        >
                          <HiOutlinePencilSquare size={18} />
                        </Link>
                      </Button>

                      {/* Delete Action - toastId সহ */}
                      <Button
                        onClick={() => handelDelete(provider?.id)}
                        size="icon"
                        variant="ghost"
                        className="size-9 rounded-lg hover:bg-red-500/10 hover:text-red-500 text-gray-400"
                      >
                        <HiOutlineTrash size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-500 uppercase text-xs font-bold tracking-widest"
                >
                  No providers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProviderTable;
