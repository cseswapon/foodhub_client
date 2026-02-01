"use server";

import { ReviewService } from "@/services/review.service";
import { updateTag } from "next/cache";

const reviewService = new ReviewService();

export async function getAllReviewsAction() {
  return await reviewService.getAllReviews();
}

export async function createReviewAction(
  data: {
    mealId: string;
    rating: number;
    comment: string;
  },
) {
    // return console.log(data);
  const result = await reviewService.createReview(data);

  if (result?.success) {
    updateTag("reviews");
    updateTag("meal");
  }

  return result;
}
