"use client";

import {
  useEffect,
  useState,
  useTransition,
  useCallback,
  useMemo,
} from "react";
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
import {
  getAllReviewsAction,
  createReviewAction,
} from "@/actions/review.action";
import { ReviewData } from "@/services/review.service";
import { toast } from "sonner";
import { OrderMealItem } from "@/services/order.service";
import { getMyOrdersAction } from "@/actions/order.action";

export default function ReviewPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myOrder, setMyOrder] = useState<OrderMealItem[]>([]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await getAllReviewsAction();
      if (res?.success) {
        setReviews(res.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchOrderItem = useCallback(async () => {
    try {
      const res = await getMyOrdersAction();
      if (res?.success) {
        setMyOrder(res.data as OrderMealItem[]);
      }
    } catch (error) {
      console.error("Error fetching order items:", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
    fetchOrderItem();
  }, [fetchReviews, fetchOrderItem]);

  const hasReviews = reviews.length > 0;

  return (
    <main className="min-h-screen bg-[#0c0d0c] text-white pt-30 pb-15">
      <div className="container mx-auto px-4 md:px-0">
        <section className="relative mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 border-b border-white/5 pb-8">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
                My <span className="text-[#a3a380]">Feedbacks</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
                Manage and share your dining experiences
              </p>
            </div>

            <AddReviewModal orders={myOrder} onRefresh={fetchReviews} />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a3a380]"></div>
            </div>
          ) : !hasReviews ? (
            <div className="flex flex-col items-center justify-center md:py-24 py-12 rounded-lg border border-dashed border-white/10 bg-white/2">
              <HiOutlineInbox size={48} className="text-gray-700 mb-4" />
              <p className="text-gray-500 uppercase font-black tracking-widest text-xs">
                No reviews found yet
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-white/5 bg-card/20 backdrop-blur-md overflow-hidden shadow">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5 uppercase tracking-widest text-[10px] font-black hover:bg-transparent">
                    <TableHead className="py-6 pl-8 text-gray-300">
                      Meal
                    </TableHead>
                    <TableHead className="text-gray-300">Rating</TableHead>
                    <TableHead className="text-gray-300">Comment</TableHead>
                    <TableHead className="text-right pr-8 text-gray-300">
                      Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow
                      key={review.id}
                      className="border-white/5 hover:bg-white/3 transition-colors"
                    >
                      <TableCell className="py-5 pl-8 font-bold text-xs uppercase tracking-tight text-white/90">
                        Meal ID: {review.meal_id.slice(0, 8)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 font-black text-xs text-[#a3a380] italic">
                          <HiOutlineStar fill="currentColor" size={14} />
                          {review.rating}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-gray-400 italic max-w-xs truncate">
                        {review.comment}
                      </TableCell>
                      <TableCell className="text-right pr-8 text-[10px] font-bold text-white/90 uppercase">
                        {new Date(review.created_at).toLocaleDateString()}
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
function AddReviewModal({
  orders,
  onRefresh,
}: {
  orders: OrderMealItem[];
  onRefresh: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // ইউনিক খাবার বাছাই করার জন্য useMemo ব্যবহার (অর্ডার লিস্ট বড় হলে অপ্টিমাইজড থাকবে)
  const uniqueMeals = useMemo(() => {
    const mealMap = new Map();
    orders?.forEach((item) => {
      // meal_id ইউনিক কি হিসেবে কাজ করবে, ফলে ডুপ্লিকেট থাকবে না
      if (!mealMap.has(item.meal_id)) {
        mealMap.set(item.meal_id, item.meal?.name || "Unknown Meal");
      }
    });
    // ম্যাপ থেকে অ্যারো হিসেবে রিটার্ন
    return Array.from(mealMap.entries()).map(([id, name]) => ({ id, name }));
  }, [orders]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const mealId = formData.get("mealId") as string;
    const ratingStr = formData.get("rating") as string;
    const comment = formData.get("comment") as string;

    if (!mealId || !ratingStr || !comment) {
      return toast.error("Please fill all fields");
    }

    startTransition(async () => {
      const res = await createReviewAction({
        mealId,
        rating: parseFloat(ratingStr),
        comment,
      });

      if (res?.success) {
        toast.success("Review posted successfully!");
        setIsOpen(false);
        onRefresh();
      } else {
        toast.error(res?.message || "Failed to post review");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <HiOutlineCake size={14} /> Select Your Meal
            </label>
            <Select name="mealId">
              <SelectTrigger className="w-full bg-white/5 border-white/10 h-12 rounded-lg text-white">
                <SelectValue placeholder="Which dish did you try?" />
              </SelectTrigger>
              <SelectContent className="bg-[#141514] border-white/10 text-white uppercase font-bold text-xs">
                {uniqueMeals.length > 0 ? (
                  uniqueMeals.map((meal) => (
                    <SelectItem key={meal.id} value={meal.id}>
                      {meal.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="py-2 px-4 text-gray-500 italic">
                    No meals ordered yet
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <HiOutlineStar size={14} /> Rating (0.0 - 5.0)
            </label>
            <Input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="4.5"
              required
              className="bg-white/5 border-white/10 h-12 rounded-lg text-white font-black italic focus:ring-[#a3a380]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Your Thoughts
            </label>
            <Textarea
              name="comment"
              required
              placeholder="How was the taste? Write something nice..."
              className="bg-white/5 border-white/10 min-h-30 rounded-lg text-white italic resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-14 shadow-lg text-[12px] tracking-widest transition-transform active:scale-95"
          >
            {isPending ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
