import ReviewManagement from "@/components/module/review/ReviewManagement";
import { ReviewService } from "@/services/review.service";

const reviewService = new ReviewService();
export default async function ReviewPage() {
  const reviews = await reviewService.getAllReviews();

  return (
    <>
      <ReviewManagement reviews={reviews?.data as any[]} />
    </>
  );
}
