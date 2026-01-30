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

export default function ProviderMenu() {
  const meals = [
    {
      id: "5e0af171-f951-48b3-b02c-2770d6fb0dfb",
      provider_id: "1ea33618-d7c7-4ac2-8ef9-aa0915bcacd4",
      category_id: "bc56b6a0-4127-47f2-b533-0f96526f5522",
      name: "Chicken Biryani",
      description: "স্পেশাল কাচ্চি স্টাইল চিকেন বিরিয়ানি",
      price: "500",
      dietary_type: "non_veg",
      is_available: true,
      created_at: "2026-01-28T12:42:03.605Z",
    },
    {
      id: "2155fb2a-e358-4ae8-8b4e-c8db80d4449e",
      provider_id: "0dd55798-1b64-4ecd-bb47-be82951d7d06",
      category_id: "bc56b6a0-4127-47f2-b533-0f96526f5522",
      name: "Chicken Biryani",
      description: "স্পেশাল কাচ্চি স্টাইল চিকেন বিরিয়ানি",
      price: "500",
      dietary_type: "veg",
      is_available: true,
      created_at: "2026-01-30T10:27:51.302Z",
    },
  ];

  return (
    <main className="p-6 md:p-10 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight italic">
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
      <div className="rounded-lg border border-white/5 bg-card/40  overflow-hidden shadow">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
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
            {meals.map((meal) => (
              <TableRow
                key={meal.id}
                className="border-white/5 hover:bg-white/2 transition-colors group"
              >
                {/* Name & Description */}
                <TableCell className="py-5 pl-8 max-w-75">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-[#a3a380] shrink-0">
                      <HiOutlineCake size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold  uppercase text-sm tracking-tight group-hover:text-[#a3a380]  transition-colors">
                        {meal.name}
                      </p>
                      <p className="text-[11px] text-gray-500 line-clamp-1 italic">
                        {meal.description}
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
                      meal.dietary_type === "veg"
                        ? "text-green-500 border-green-500/20 bg-green-500/5"
                        : meal.dietary_type === "non_veg"
                          ? "text-red-400 border-red-400/20 bg-red-400/5"
                          : "text-amber-400 border-amber-400/20 bg-amber-400/5",
                    )}
                  >
                    {meal.dietary_type.replace("_", " ")}
                  </Badge>
                </TableCell>

                {/* Price */}
                <TableCell>
                  <div className="flex items-center gap-1 font-black text-white italic">
                    <HiOutlineCurrencyBangladeshi className="text-[#a3a380]" />
                    {meal.price}
                  </div>
                </TableCell>

                {/* Availability */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "size-2 rounded-full",
                        meal.is_available
                          ? "bg-green-500 animate-pulse"
                          : "bg-gray-600",
                      )}
                    />
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                      {meal.is_available ? "In Stock" : "Out of Stock"}
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
                      <Link href={`/provider/menu/update/${meal.id}`}>
                        <HiOutlinePencilSquare size={18} />
                      </Link>
                    </Button>

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

// Simple CN utility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
