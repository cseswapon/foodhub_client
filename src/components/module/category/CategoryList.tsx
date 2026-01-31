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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  HiOutlineTag,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlineClock,
} from "react-icons/hi2";

export default function CategoryList() {
  // --- ফেক ডাটা ---
  const categories = [
    {
      id: "bc56b6a0-4127-47f2-b533-0f96526f5522",
      name: "fats & oils",
      created_at: "2026-01-28T12:40:59.137Z",
    },
  ];

  return (
    <main className="p-6 md:p-10 space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">
            Meal <span className="text-[#a3a380]">Categories</span>
          </h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            Organize your menu items
          </p>
        </div>

        {/* Add Category Modal */}
        <CategoryModal mode="add" />
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card/40 backdrop-blur-sm overflow-hidden shadow">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 uppercase tracking-widest text-[10px] font-black">
              <TableHead className="py-5 pl-8 text-muted-foreground">
                Category Name
              </TableHead>
              <TableHead className="text-muted-foreground">
                Created At
              </TableHead>
              <TableHead className="text-right pr-8 text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow
                key={cat.id}
                className="border-white/5 hover:bg-white/2 transition-colors group"
              >
                <TableCell className="py-5 pl-8">
                  <div className="flex items-center gap-3">
                    <HiOutlineTag className="text-[#a3a380]" size={18} />
                    <span className="font-bold text-white uppercase text-sm tracking-tight">
                      {cat.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-gray-500 font-medium italic flex items-center gap-2 py-5">
                  <HiOutlineClock size={14} />{" "}
                  {new Date(cat.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right pr-8">
                  <div className="flex justify-end gap-2">
                    {/* View Modal */}
                    <CategoryModal mode="view" data={cat} />
                    {/* Edit Modal */}
                    <CategoryModal mode="edit" data={cat} />
                    {/* Delete */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500"
                    >
                      <HiOutlineTrash size={16} />
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

function CategoryModal({
  mode,
  data,
}: {
  mode: "add" | "edit" | "view";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}) {
  const isView = mode === "view";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button className="bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-bold rounded-lg uppercase text-[10px] tracking-widest gap-2 h-10 px-6 shadow">
            <HiOutlinePlus size={16} /> Add Category
          </Button>
        ) : mode === "edit" ? (
          <Button
            size="icon"
            variant="ghost"
            className="size-8 rounded-lg hover:bg-[#a3a380]/10 text-gray-400 hover:text-[#a3a380]"
          >
            <HiOutlinePencilSquare size={16} />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="size-8 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <HiOutlineEye size={16} />
          </Button>
        )}
      </DialogTrigger>

      {/* Shadcn DialogContent এর ভেতরে ইন্টারনাল ওভারলেতে 
          নিচের CSS ক্লাসগুলো ব্লার ইফেক্ট নিশ্চিত করবে।
      */}
      <DialogContent className="backdrop-blur-xl border-white/10 rounded-lg max-w-sm shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-black uppercase tracking-widest text-sm italic flex items-center gap-2">
            {mode === "add" && <HiOutlinePlus className="text-[#a3a380]" />}
            {mode === "edit" && (
              <HiOutlinePencilSquare className="text-[#a3a380]" />
            )}
            {mode === "view" && <HiOutlineEye className="text-[#a3a380]" />}
            {mode} Category
          </DialogTitle>
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">
            System Classification Entry
          </p>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <HiOutlineTag size={12} className="text-[#a3a380]" />
              Category Name
            </label>
            <Input
              defaultValue={data?.name || ""}
              disabled={isView}
              placeholder="e.g. Fats & Oils"
              className="bg-white/5 border-white/10 h-12 focus:ring-[#a3a380] rounded-lg font-bold placeholder:text-gray-700"
            />
          </div>

          {!isView && (
            <Button className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-12 shadow-lg transition-transform active:scale-95">
              {mode === "add" ? "Create Category" : "Update Entry"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
