import { env } from "@/env";
import { cookies } from "next/headers";
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
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    phone: string;
    address: null;
    status: string;
  };
  reviews: Review[];
}

interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

/* interface Provider {
  id: string;
  user_id: string;
  restaurant_name: string;
  description: string;
  address: string;
  is_open: boolean;
  fb_link: string;
  created_at: string;
  updated_at: string;
} */

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
interface MealQueryParams {
  maxPrice?: string;
  minPrice?: string;
  type?: string;
}
export class MealsService {
  static API_URL = "Categories Service";
  private readonly API_URL;
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
  getAllMealMe = async () => {
    const cookieStore = await this.getCookieData();
    if (!cookieStore) {
      return undefined;
    }
    try {
      const response = await fetch(`${this.API_URL}/api/meal/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Cookie: cookieStore },
        next: { revalidate: 60, tags: ["meal"] },
      });

      const result: MealResponse = await response.json();
      return result;
    } catch (e) {
      console.log(e instanceof Error ? e.message : "Something went wrong");
      return undefined;
    }
  };

  getAllMeal = async (params?: MealQueryParams) => {
    try {
      const query = new URLSearchParams();
      if (params?.minPrice) query.append("minPrice", params.minPrice);
      if (params?.maxPrice) query.append("maxPrice", params.maxPrice);
      if (params?.type) query.append("type", params.type);

      const queryString = query.toString();
      const url = `${this.API_URL}/api/meal${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60, tags: ["meal"] },
      });

      const result: MealResponse = await response.json();
      return result;
    } catch (e) {
      console.log(e instanceof Error ? e.message : "Something went wrong");
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
        next: {
          revalidate: 60,
          tags: ["meal"],
        },
      });
      const result: ApiResponse<Meal> = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };
  getMealProviderDetails = async (id: string) => {
    try {
      const cookieStore = await this.getCookieData();
      const response = await fetch(`${this.API_URL}/api/meal/provider/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore || "",
        },
        next: {
          revalidate: 60,
          tags: ["meal"],
        },
      });
      const result: ApiResponse<Meal> = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };

  createMeal = async (data: any): Promise<ApiResponse<Meal> | undefined> => {
    try {
      const cookieStore = await this.getCookieData();
      const response = await fetch(`${this.API_URL}/api/meal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore || "",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<Meal> = await response.json();
      return result;
    } catch (e) {
      console.error("Error in createMeal:", e instanceof Error ? e.message : e);
      return undefined;
    }
  };

  updateMeal = async (
    id: string,
    data: any,
  ): Promise<ApiResponse<Meal> | undefined> => {
    try {
      const cookieStore = await this.getCookieData();
      const response = await fetch(`${this.API_URL}/api/meal/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore || "",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<Meal> = await response.json();
      return result;
    } catch (e) {
      console.error("Error in updateMeal:", e instanceof Error ? e.message : e);
      return undefined;
    }
  };

  deleteMeal = async (id: string): Promise<ApiResponse<null> | undefined> => {
    try {
      const cookieStore = await this.getCookieData();
      const response = await fetch(`${this.API_URL}/api/meal/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore || "",
        },
      });

      const result: ApiResponse<null> = await response.json();
      return result;
    } catch (e) {
      console.error("Error in deleteMeal:", e instanceof Error ? e.message : e);
      return undefined;
    }
  };
}
