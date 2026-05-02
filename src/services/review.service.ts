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

interface PublicReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
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

  getCookieData = async () => {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore.toString();

      if (!cookieHeader) return null;

      return cookieHeader;
    } catch {
      return null;
    }
  };

  getAllReviews = async (): Promise<AllReviewsResponse | undefined> => {
    try {
      const cookieStore = await this.getCookieData();
      if (!cookieStore) {
        return undefined;
      }
      const response = await fetch(`${this.API_URL}/api/review/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore,
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

  getPublicReviews = async (
    limit = 8,
  ): Promise<PublicReviewsResponse | undefined> => {
    try {
      const response = await fetch(
        `${this.API_URL}/api/review/public?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            revalidate: 60,
            tags: ["reviews"],
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch public reviews");

      return await response.json();
    } catch (e) {
      return undefined;
    }
  };

  createReview = async (
    payload: CreateReviewPayload,
  ): Promise<CreateReviewResponse | undefined> => {
    try {
      const cookieStore = await this.getCookieData();
      if (!cookieStore) {
        return undefined;
      }
      const response = await fetch(`${this.API_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore,
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

  updateReview = async (id: string, payload: Partial<CreateReviewPayload>) => {
    try {
      const cookieStore = await this.getCookieData();
      if (!cookieStore) {
        return undefined;
      }
      const response = await fetch(`${this.API_URL}/api/review/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to updated review");
      }

      return result;
    } catch (e) {
      console.error("Error in updated:", e);
      return undefined;
    }
  };

  deleteReview = async (id: string) => {
    try {
      const cookieStore = await this.getCookieData();
      if (!cookieStore) {
        return undefined;
      }
      const response = await fetch(`${this.API_URL}/api/review/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore,
        },
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to Delete review");
      }

      return result;
    } catch (e) {
      console.error("Error in delete:", e);
      return undefined;
    }
  };
}
