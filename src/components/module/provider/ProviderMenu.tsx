"use client";
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
  HiOutlineCake,
  HiOutlineCurrencyBangladeshi,
} from "react-icons/hi2";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import { deleteProviderAction } from "@/actions/provider.action";
import { toast } from "sonner";
import { deleteMealAction } from "@/actions/meal.action";

export default function ProviderMenu({ meals }: { meals: any[] }) {
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) {
      return;
    }
    const tostId = toast.loading("Deleting user...", { id: id });
    try {
      const result = await deleteMealAction(id);
      // console.log(result);
      if (result) {
        toast.success("User deleted", { id: tostId });
      }
    } catch {
      toast.error("Something went wrong", { id: tostId });
    }
  };
  return (
    <main className="p-6 md:p-10 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter  italic">
            Kitchen <span className="text-[#a3a380]">Menu</span>
          </h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            Manage your meal offerings and availability
          </p>
        </div>

        <Button
          asChild
          className="bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-bold rounded-lg uppercase text-[10px] tracking-widest gap-2 h-11 px-6 shadow transition-all"
        >
          <Link href="/provider/menu/add">
            <HiOutlinePlus size={16} /> Add New Meal
          </Link>
        </Button>
      </div>

      {/* Meals Table */}
      <div className="overflow-hidden rounded-lg border border-border/60 bg-card/80 shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="border-border/60 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
              <TableHead className="py-5 pl-8 text-muted-foreground">
                Meal Details
              </TableHead>
              <TableHead className="text-muted-foreground">Dietary</TableHead>
              <TableHead className="text-muted-foreground">Price</TableHead>
              <TableHead className="text-muted-foreground">
                Availability
              </TableHead>
              <TableHead className="text-right pr-8 text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meals?.length > 0 ? (
              meals?.map((meal) => (
                <TableRow
                  key={meal?.id}
                  className="group border-border/60 transition-colors hover:bg-muted/40"
                >
                  {/* Name & Description */}
                  <TableCell className="py-5 pl-8 max-w-75">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-[#a3a380]">
                        <HiOutlineCake size={20} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold  uppercase text-sm tracking-tight group-hover:text-[#a3a380]  transition-colors">
                          {meal?.name}
                        </p>
                        <p className="text-[11px] text-gray-500 line-clamp-1 italic">
                          {meal?.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Dietary Type */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-0.5 text-[9px] font-black border uppercase tracking-tighter",
                        meal?.dietary_type === "veg"
                          ? "text-green-500 border-green-500/20 bg-green-500/5"
                          : meal.dietary_type === "non_veg"
                            ? "text-red-400 border-red-400/20 bg-red-400/5"
                            : "text-amber-400 border-amber-400/20 bg-amber-400/5",
                      )}
                    >
                      {meal?.dietary_type?.replace("_", " ")}
                    </Badge>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <div className="flex items-center gap-1 font-black italic text-foreground">
                      <HiOutlineCurrencyBangladeshi className="text-[#a3a380]" />
                      {meal?.price}
                    </div>
                  </TableCell>

                  {/* Availability */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "size-2 rounded-full",
                          meal?.is_available
                            ? "bg-green-500 animate-pulse"
                            : "bg-gray-600",
                        )}
                      />
                      <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                        {meal?.is_available ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
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
                        <Link href={`/provider/menu/update/${meal?.id}`}>
                          <HiOutlinePencilSquare size={18} />
                        </Link>
                      </Button>

                      <Button
                        onClick={() => handleDelete(meal?.id)}
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
                  No meals found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
