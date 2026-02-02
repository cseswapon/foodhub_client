"use client";

import React, { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  HiOutlineStar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineUserCircle,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { deleteReview, updateReview } from "@/actions/review.action";

export default function ReviewManagement({ reviews }: { reviews: any[] }) {
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?",
    );
    if (!confirmDelete) return;
    const toastId = "delete-review";
    toast.loading("Removing review...", {
      id: toastId,
      position: "top-center",
    });
    try {
      const result = await deleteReview(id);
      // console.log(result);
      if (result) {
        toast.success("Review deleted successfully", { id: toastId });
      }
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      toast.error(error, { id: toastId });
    }
    /* setTimeout(() => {
      console.log("Deleted Review ID:", id);
      toast.success("Review deleted successfully", { id: toastId });
    }, 1500); */
  };

  return (
    <main className="p-6 md:p-10 space-y-6 bg-[#0c0d0c] min-h-screen text-white">
      <div className="space-y-1">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">
          Customer <span className="text-[#a3a380]">Reviews</span>
        </h1>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
          Monitor and moderate public feedback
        </p>
      </div>

      <div className="rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden shadow">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 uppercase tracking-widest text-[10px] font-black">
              <TableHead className="py-5 pl-8 text-muted-foreground">
                User & Comment
              </TableHead>
              <TableHead className="text-muted-foreground">Rating</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right pr-8 text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          {reviews.length > 0 ? (
            <TableBody>
              {reviews?.map((rev) => (
                <TableRow
                  key={rev?.id}
                  className="border-white/5 hover:bg-white/2 transition-colors"
                >
                  <TableCell className="py-5 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-white/5 flex items-center justify-center text-[#a3a380]">
                        <HiOutlineUserCircle size={22} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold uppercase text-xs tracking-tight">
                          {rev?.user.name}
                        </p>
                        <p className="text-[11px] text-gray-500 line-clamp-1 italic">
                          `{rev?.comment}`
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 font-black text-[#a3a380] text-sm italic">
                      <HiOutlineStar size={16} fill="currentColor" />
                      {rev?.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    {rev?.is_visible ? (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 gap-1 rounded-full text-[9px] font-black uppercase">
                        <HiOutlineCheckCircle size={10} /> Public
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/10 text-red-500 border-red-500/20 gap-1 rounded-full text-[9px] font-black uppercase">
                        <HiOutlineXCircle size={10} /> Hidden
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <ReviewModal mode="view" data={rev} />
                      <ReviewModal mode="edit" data={rev} />
                      <Button
                        onClick={() => handleDelete(rev.id)}
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
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-center text-muted-foreground text-sm p-2">
                No reviews found
              </p>
            </div>
          )}
        </Table>
      </div>
    </main>
  );
}

function ReviewModal({ mode, data }: { mode: "edit" | "view"; data: any }) {
  const [open, setOpen] = useState(false);
  const isView = mode === "view";

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedData = {
      ...Object.fromEntries(formData.entries()),
      rating: parseFloat(formData.get("rating") as string),
      is_visible: formData.get("is_visible") === "on",
    };

    const toastId = "update-review";
    toast.loading("Applying changes...", {
      id: toastId,
      position: "top-center",
    });

    try {
      await updateReview(data?.id, updatedData);
      // console.log(result);
      toast.success("Moderation applied successfully!", { id: toastId });
      setOpen(false);
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      toast.error(error, { id: toastId });
    }

    /* console.log("Updated Review Data:", updatedData, data?.id);

    setTimeout(() => {
      toast.success("Moderation applied successfully!", { id: toastId });
      setOpen(false);
    }, 1500); */
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
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

      <DialogContent className="bg-[#0c0d0c] border-white/10 rounded-lg max-w-md shadow text-white">
        <DialogHeader className="border-b border-white/5 pb-4">
          <DialogTitle className="text-white font-black uppercase tracking-widest text-sm italic flex items-center gap-2">
            <HiOutlineChatBubbleLeftRight className="text-[#a3a380]" />
            Review {mode}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-6 pt-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
            <div className="space-y-0.5">
              <Label className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                Public Visibility
              </Label>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">
                Decide if customers see this review
              </p>
            </div>
            {/* name="is_visible" যুক্ত করা হয়েছে যেন FormData পায় */}
            <Switch
              name="is_visible"
              defaultChecked={data.is_visible}
              disabled={isView}
              className="data-[state=checked]:bg-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                User
              </label>
              <Input
                defaultValue={data.user.name}
                disabled
                className="bg-white/5 border-white/10 rounded-lg text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Rating
              </label>
              <Input
                name="rating"
                defaultValue={data.rating}
                disabled={isView}
                className="bg-white/5 border-white/10 rounded-lg font-black italic text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Customer Comment
            </label>
            <Textarea
              name="comment"
              defaultValue={data.comment}
              disabled={isView}
              className="bg-white/5 border-white/10 min-h-25 rounded-lg italic text-white"
            />
          </div>

          {!isView && (
            <Button
              type="submit"
              className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-12 shadow-lg"
            >
              Apply Moderation
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
