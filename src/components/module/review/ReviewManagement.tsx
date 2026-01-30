"use client";

import React from "react";
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

export default function ReviewManagement() {
  // --- ফেক ডাটা (আপনার API রেসপন্স অনুযায়ী) ---
  const reviews = [
    {
      id: "abcae491-cb36-4a15-aeee-ae1286827c8f",
      meal_id: "2155fb2a-e358-4ae8-8b4e-c8db80d4449e",
      rating: "4.6",
      comment: "Nice Product",
      user_id: "wzPBmBrU5FAnkNieXf3pqsmUd6LOfXKP",
      is_visible: true,
      created_at: "2026-01-30T15:34:26.332Z",
      user: { name: "Csutomer" },
    },
  ];

  return (
    <main className="p-6 md:p-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">
          Customer <span className="text-[#a3a380]">Reviews</span>
        </h1>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
          Monitor and moderate public feedback
        </p>
      </div>

      <div className="rounded-lg border border-white/5 bg-card/40 backdrop-blur-sm overflow-hidden shadow">
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
          <TableBody>
            {reviews.map((rev) => (
              <TableRow
                key={rev.id}
                className="border-white/5 hover:bg-white/2 transition-colors group"
              >
                <TableCell className="py-5 pl-8">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-white/5 flex items-center justify-center text-[#a3a380]">
                      <HiOutlineUserCircle size={22} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold uppercase text-xs tracking-tight">
                        {rev.user.name}
                      </p>
                      <p className="text-[11px] text-gray-500 line-clamp-1 italic">
                        `{rev.comment}`
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 font-black text-[#a3a380] text-sm italic">
                    <HiOutlineStar size={16} fill="currentColor" />
                    {rev.rating}
                  </div>
                </TableCell>
                <TableCell>
                  {rev.is_visible ? (
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

// --- Reusable Review Modal ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReviewModal({ mode, data }: { mode: "edit" | "view"; data: any }) {
  const isView = mode === "view";

  return (
    <Dialog>
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

      <DialogContent className="bg-[#0c0d0c]/90 backdrop-blur-xl border-white/10 rounded-lg max-w-md shadow-2xl">
        <DialogHeader className="border-b border-white/5 pb-4">
          <DialogTitle className="text-white font-black uppercase tracking-widest text-sm italic flex items-center gap-2">
            <HiOutlineChatBubbleLeftRight className="text-[#a3a380]" />
            Review {mode}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-6">
          {/* Status Toggle - High Priority for Admin */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
            <div className="space-y-0.5">
              <Label className="text-[11px] font-black uppercase tracking-widest text-white">
                Public Visibility
              </Label>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">
                Decide if customers see this review
              </p>
            </div>
            <Switch
              defaultChecked={data.is_visible}
              disabled={isView}
              className="data-[state=checked]:bg-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                User
              </label>
              <Input
                defaultValue={data.user.name}
                disabled
                className="bg-white/5 border-white/10 text-white rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Rating
              </label>
              <Input
                defaultValue={data.rating}
                disabled={isView}
                className="bg-white/5 border-white/10 text-white rounded-lg font-black italic"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Customer Comment
            </label>
            <Textarea
              defaultValue={data.comment}
              disabled={isView}
              className="bg-white/5 border-white/10 min-h-25 rounded-lg text-white italic"
            />
          </div>

          {!isView && (
            <Button className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-12 shadow-lg">
              Apply Moderation
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
