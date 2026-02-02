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
import { toast } from "sonner";
import { useState } from "react";
import {
  addCategories,
  deleteCategories,
  updateCategories,
} from "@/actions/categories.action";

export default function CategoryList({ categories }: { categories: any[] }) {
  const handleDelete = async (id: string, name: string) => {
    const deleteData = confirm(`Are you sure you want to delete ${name}?`);
    if (!deleteData) return;

    const toastId = "delete-category";
    toast.loading(`Deleting ${name}...`, {
      id: toastId,
      position: "top-center",
    });

    try {
      const result = await deleteCategories(id);
      if (result) {
        toast.success(`${name} deleted successfully`, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }

    /* setTimeout(() => {
      console.log("Deleted Category ID:", id);
      toast.success(`${name} deleted successfully`, { id: toastId });
    }, 1500); */
  };

  return (
    <main className="p-6 md:p-10 space-y-6 bg-[#0c0d0c] min-h-screen text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">
            Meal <span className="text-[#a3a380]">Categories</span>
          </h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            Organize your menu items
          </p>
        </div>

        <CategoryModal mode="add" />
      </div>

      <div className="rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden shadow">
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
            {categories?.length > 0 ? (
              categories.map((cat) => (
                <TableRow
                  key={cat.id}
                  className="border-white/5 hover:bg-white/2 transition-colors"
                >
                  <TableCell className="py-5 pl-8">
                    <div className="flex items-center gap-3">
                      <HiOutlineTag className="text-[#a3a380]" size={18} />
                      <span className="font-bold text-white uppercase text-sm tracking-tight">
                        {cat.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500 font-medium italic py-5">
                    <div className="flex items-center gap-2">
                      <HiOutlineClock size={14} />
                      {new Date(cat.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <CategoryModal mode="view" data={cat} />
                      <CategoryModal mode="edit" data={cat} />
                      <Button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        size="icon"
                        variant="ghost"
                        className="size-8 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500"
                      >
                        <HiOutlineTrash size={16} />
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
                  No categories found
                </TableCell>
              </TableRow>
            )}
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
  data?: any;
}) {
  const [open, setOpen] = useState(false);
  const isView = mode === "view";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const toastId = "category-modal-action";
    toast.loading("Processing...", { id: toastId, position: "top-center" });

    try {
      if (mode === "add") {
        await addCategories(formValues);
      } else if (mode === "edit") {
        await updateCategories(data?.id, formValues);
      }
      toast.success(`${mode === "add" ? "created" : "updated"}`, {
        id: toastId,
      });
      setOpen(false);
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      toast.error(error, { id: toastId });
    }

    /* console.log(
      `${mode === "add" ? "Creating" : "Updating"} Category Data:`,
      formValues,
      data?.id,
    );
 */
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

      <DialogContent className="bg-[#0c0d0c] backdrop-blur-xl border-white/10 rounded-lg max-w-sm shadow-2xl text-white">
        <DialogHeader>
          <DialogTitle className="font-black uppercase tracking-widest text-sm italic flex items-center gap-2">
            {mode === "add" && <HiOutlinePlus className="text-[#a3a380]" />}
            {mode === "edit" && (
              <HiOutlinePencilSquare className="text-[#a3a380]" />
            )}
            {mode === "view" && <HiOutlineEye className="text-[#a3a380]" />}
            <span className="text-white">{mode} Category</span>
          </DialogTitle>
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">
            System Classification Entry
          </p>
        </DialogHeader>

        {/* ফর্ম র‍্যাপার */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <HiOutlineTag size={12} className="text-[#a3a380]" />
              Category Name
            </label>
            <Input
              name="name" // FormData-র জন্য name প্রপার্টি জরুরি
              defaultValue={data?.name || ""}
              disabled={isView}
              required
              placeholder="e.g. Fats & Oils"
              className="bg-white/5 border-white/10 h-12 text-white focus:ring-[#a3a380] rounded-lg font-bold placeholder:text-gray-700"
            />
          </div>

          {!isView && (
            <Button
              type="submit"
              className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-12 shadow-lg transition-transform active:scale-95"
            >
              {mode === "add" ? "Create Category" : "Update Entry"}
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
