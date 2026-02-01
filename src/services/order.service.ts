import { env } from "@/env";
import { cookies } from "next/headers";

export interface OrderMealItem {
  id: string;
  orderId: string;
  meal_id: string;
  quantity: number;
  price: string;
  meal: {
    name: string;
  };
  order: {
    user_id: string;
  };
}

interface OrdersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: OrderMealItem[];
}

export class OrderService {
  private readonly API_URL: string;

  constructor() {
    this.API_URL = env.BACKEND_URL;
  }
  myOrdersmeal = async (): Promise<OrdersResponse | undefined> => {
    try {
      const cookieStore = await cookies();

      const response = await fetch(`${this.API_URL}/api/order/meal`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Cookie: cookieStore.toString(),
        },
        next: {
          revalidate: 30,
          tags: ["orders"],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const result: OrdersResponse = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.error("Error in myOrdersmeal:", error);
      return undefined;
    }
  };
}
