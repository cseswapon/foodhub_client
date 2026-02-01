import {
  HiStar,
  HiOutlineUser,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { Card } from "@/components/ui/card";

interface Review {
  id: string;
  rating: number;
  comment?: string;
  created_at: string;
  user: {
    name: string;
  };
}

export function MealReviews({ reviews }: { reviews: Review[] }) {
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  return (
    <section className="mt-24 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 border-b border-white/5 pb-10">
        <div className="space-y-3">
          <h3 className="text-[#a3a380] text-xs font-black uppercase tracking-[0.4em] flex items-center gap-2">
            <HiOutlineChatBubbleLeftRight size={20} /> Customer Feedback
          </h3>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-gray-100">
            Reviews & <span className="text-[#a3a380]">Ratings</span>
          </h2>
        </div>

        {reviews.length > 0 && (
          <div className="flex items-center gap-5 bg-[#1f2120] px-8 py-5 rounded-full border border-white/5 shadow-2xl">
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">
                Total Score
              </p>
              <p className="text-3xl font-black text-white leading-none">
                {averageRating}
                <span className="text-[#a3a380] text-sm">/5.0</span>
              </p>
            </div>
            <div className="flex text-[#a3a380]">
              {[...Array(5)].map((_, i) => (
                <HiStar
                  key={i}
                  size={24}
                  className={
                    i < Math.round(Number(averageRating))
                      ? "text-[#a3a380]"
                      : "text-gray-800"
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="py-20 text-center bg-[#1f2120]/30 rounded-lg border border-dashed border-white/10">
          <p className="text-gray-500 uppercase font-black tracking-[0.3em] text-xs italic">
            No reviews yet for this dish.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="bg-[#1f2120] border-white/5 rounded-lg p-8 transition-all duration-500 hover:border-[#a3a380]/20 group"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-[#0c0d0c] flex items-center justify-center text-[#a3a380] border border-white/5">
                      <HiOutlineUser size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-base tracking-tight">
                        {review.user.name}
                      </h4>
                      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-[#a3a380] bg-[#0c0d0c] px-3 py-1.5 rounded-full border border-white/5">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        size={14}
                        className={
                          i < review.rating ? "text-[#a3a380]" : "text-gray-900"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed italic font-light">
                  &quot;
                  {review.comment ||
                    "The user didn't leave a written review, but gave a high rating!"}
                  &quot;
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
