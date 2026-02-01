import { env } from "@/env";
// import { cookies } from "next/headers";

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface MealDataRes {
  id: string;
  provider_id: string;
  category_id: string;
  name: string;
  description: string;
  price: string;
  dietary_type: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface MealResponse {
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
  data: Array<MealDataRes>;
}

// meal details interface

interface Meal {
  id: string;
  provider_id: string;
  category_id: string;
  name: string;
  description: string;
  price: string;
  dietary_type: "veg" | "non_veg";
  is_available: boolean;
  created_at: string;
  updated_at: string;
  category: Category;
  provider: Provider;
  reviews: Review[];
}

interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Provider {
  id: string;
  user_id: string;
  restaurant_name: string;
  description: string;
  address: string;
  is_open: boolean;
  fb_link: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: ReviewUser;
}

interface ReviewUser {
  name: string;
}

export class MealsService {
  static API_URL = "Categories Service";
  private readonly API_URL;
  constructor() {
    this.API_URL = env.BACKEND_URL;
  }
  getAllMeal = async () => {
    try {
      const response = await fetch(`${this.API_URL}/api/meal`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["meal"],
        },
      });
      const result: MealResponse = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };
  getMealDetails = async (id: string) => {
    try {
      const response = await fetch(`${this.API_URL}/api/meal/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });
      const result: ApiResponse<Meal> = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };
}
