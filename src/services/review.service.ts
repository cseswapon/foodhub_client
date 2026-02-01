import { env } from "@/env";
import { cookies } from "next/headers";

export interface ReviewData {
  id: string;
  meal_id: string;
  rating: string;
  comment: string;
  user_id: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  user?: {
    name: string;
  };
}

interface AllReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: {
    total: number;
    total_page: number;
    current_page: number;
    limit: number;
    skip: number;
  };
  data: ReviewData[];
}

interface CreateReviewPayload {
  mealId: string;
  rating: number;
  comment: string;
}

interface CreateReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ReviewData;
}


export class ReviewService {
  private readonly API_URL: string;

  constructor() {
    this.API_URL = env.BACKEND_URL;
  }

  getAllReviews = async (): Promise<AllReviewsResponse | undefined> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${this.API_URL}/api/review/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        next: {
          revalidate: 60,
          tags: ["reviews"],
        },
      });

      if (!response.ok) throw new Error("Failed to fetch reviews");

      return await response.json();
    } catch (e) {
      console.error("Error in getAllReviews:", e);
      return undefined;
    }
  };

  createReview = async (
    payload: CreateReviewPayload,
  ): Promise<CreateReviewResponse | undefined> => {
    try {
      const cookieStore = await cookies();
      const response = await fetch(`${this.API_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create review");
      }

      return result;
    } catch (e) {
      console.error("Error in createReview:", e);
      return undefined;
    }
  };
}
