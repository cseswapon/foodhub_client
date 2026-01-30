"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HiOutlineStar,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlinePlus,
  HiOutlineInbox,
  HiOutlineCake,
} from "react-icons/hi2";

export default function ReviewPage() {
  // --- ফেক ডাটা (রিভিউ না থাকলে খালি অ্যারে দিয়ে চেক করতে পারেন) ---
  const myReviews = [
    {
      id: "rev-1",
      mealName: "Chicken Biryani",
      rating: 4.5,
      comment: "Nice Product",
      created_at: "2026-01-30",
    },
  ];

  // --- ফেক মিলস ডাটা (সিলেক্ট এর জন্য) ---
  const availableMeals = [
    { id: "2155fb2a-e358-4ae8-8b4e-c8db80d4449e", name: "Chicken Biryani" },
    { id: "meal-2", name: "Pizza Margherita" },
  ];

  const hasReviews = myReviews.length > 0;

  return (
    <main className="min-h-screen bg-[#0c0d0c] text-white pt-30 pb-15">
      <div className="container mx-auto px-4 md:px-0">
        <section className="relative mb-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 border-b border-white/5 pb-8">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
                My <span className="text-[#a3a380]">Feedbacks</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
                Manage and share your dining experiences
              </p>
            </div>

            {/* Create Review Modal Trigger */}
            <AddReviewModal meals={availableMeals} />
          </div>

          {/* Conditional Rendering: Table or Empty State */}
          {!hasReviews ? (
            <div className="flex flex-col items-center justify-center py-24 rounded-lg border border-dashed border-white/10 bg-white/2">
              <HiOutlineInbox size={48} className="text-gray-700 mb-4" />
              <p className="text-gray-500 uppercase font-black tracking-widest text-xs">
                No reviews found yet
              </p>
              <p className="text-[10px] text-gray-600 mt-1 uppercase font-bold">
                Share your first experience with us
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-white/5 bg-card/20 backdrop-blur-md overflow-hidden shadow">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5 uppercase tracking-widest text-[10px] font-black hover:bg-transparent">
                    <TableHead className="py-6 pl-8 text-muted-foreground">
                      Meal Name
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Rating
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Comment
                    </TableHead>
                    <TableHead className="text-right pr-8 text-muted-foreground">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myReviews.map((review) => (
                    <TableRow
                      key={review.id}
                      className="border-white/5 hover:bg-white/3 transition-colors"
                    >
                      <TableCell className="py-5 pl-8 font-bold text-sm uppercase tracking-tight text-white/90">
                        {review.mealName}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-[#a3a380] font-black text-xs italic">
                          <HiOutlineStar fill="currentColor" size={14} />
                          {review.rating}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-gray-400 italic max-w-xs truncate">
                        `{review.comment}`
                      </TableCell>
                      <TableCell className="text-right pr-8 text-[10px] font-bold text-gray-600 uppercase">
                        {review.created_at}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

// --- Add Review Modal Component ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AddReviewModal({ meals }: { meals: any[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg px-8 h-12 shadow tracking-widest text-[11px] gap-2">
          <HiOutlinePlus size={18} strokeWidth={3} /> Write a Review
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#0c0d0c]/95 backdrop-blur-2xl border-white/10 rounded-lg max-w-md shadow">
        <DialogHeader className="border-b border-white/5 pb-4">
          <DialogTitle className="text-white font-black uppercase tracking-widest text-base italic flex items-center gap-2">
            <HiOutlineChatBubbleBottomCenterText className="text-[#a3a380]" />
            Post New <span className="text-[#a3a380]">Review</span>
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6 pt-6">
          {/* Meal Selection (w-full) */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <HiOutlineCake size={14} /> Select Your Meal
            </label>
            <Select>
              <SelectTrigger className="w-full bg-white/5 border-white/10 h-12 rounded-lg text-white">
                <SelectValue placeholder="Which dish did you try?" />
              </SelectTrigger>
              <SelectContent className="bg-[#141514] border-white/10 text-white uppercase font-bold text-xs">
                {meals.map((meal) => (
                  <SelectItem key={meal.id} value={meal.id}>
                    {meal.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <HiOutlineStar size={14} /> Rating (0.0 - 5.0)
            </label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="4.5"
              className="bg-white/5 border-white/10 h-12 rounded-lg text-white font-black italic focus:ring-[#a3a380]"
            />
          </div>

          {/* Comment Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Your Thoughts
            </label>
            <Textarea
              placeholder="How was the taste? Write something nice..."
              className="bg-white/5 border-white/10 min-h-30 rounded-lg text-white italic resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-14 shadow-lg text-[12px] tracking-widest transition-transform active:scale-95"
          >
            Submit Feedback
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
