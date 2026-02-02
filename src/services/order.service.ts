import { env } from "@/env";
import { cookies } from "next/headers";

export interface OrderMealDetail {
  id: string;
  orderId: string;
  meal_id: string;
  quantity: number;
  price: string;
  meal: {
    name: string;
    price: string;
  };
}

export interface OrderData {
  id: string;
  user_id: string;
  provider_id: string;
  total_price: string;
  delivery_address: string;
  payment_method: string;
  status: "placed" | "preparing" | "ready" | "delivered" | "cancelled";
  cancelled_by: string | null;
  created_at: string;
  updated_at: string;
  provider: {
    id: string;
    user_id: string;
    restaurant_name: string;
    address: string;
    is_open: boolean;
  };
  orderItems: OrderMealDetail[];
  user: {
    name: string;
    email: string;
  };
}

export interface AllOrdersResponse {
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
  data: OrderData[];
}

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

// --- Order Details Interfaces ---

export interface SingleOrderResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: OrderDetails;
}

export interface OrderDetails {
  id: string;
  user_id: string;
  provider_id: string;
  total_price: string;
  delivery_address: string;
  payment_method: string;
  status: string;
  cancelled_by: string | null;
  created_at: string;
  updated_at: string;
  provider: OrderProvider;
  user: OrderUser;
  orderItems: OrderItem[];
}

interface OrderProvider {
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

interface OrderUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  phone: string;
  address: string | null;
  status: string;
}

interface OrderItem {
  quantity: number;
  meal: {
    name: string;
    price: string;
  };
}

export class OrderService {
  static API_URL = "Order Service";
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
  createOrder = async (payloads: any[]) => {
    try {
      const cookieHeader = await this.getCookieData();
      // console.log(payloads);
      const promises = payloads.map((payload) =>
        fetch(`${this.API_URL}/api/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader || "",
          },
          body: JSON.stringify(payload),
        }),
      );

      const responses = await Promise.all(promises);

      for (const response of responses) {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to create one or more orders",
          );
        }
      }

      return { success: true, message: "Orders created successfully" };
    } catch (e: any) {
      console.error("Error in createOrder Service:", e);
      return { success: false, message: e.message };
    }
  };
  getAllOrders = async (
    status?: string,
  ): Promise<AllOrdersResponse | undefined> => {
    try {
      const cookieHeader = await this.getCookieData();
      if (!cookieHeader) return undefined;
      const url = status
        ? `${this.API_URL}/api/order/all?status=${status}`
        : `${this.API_URL}/api/order/all`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        // cache: 'no-store',
        next: {
          revalidate: 60,
          tags: ["orders"],
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch all orders");
      }

      return await response.json();
    } catch (e) {
      console.error("Error in getAllOrders Service:", e);
      return undefined;
    }
  };
  getOrderDetails = async (
    id: string,
  ): Promise<SingleOrderResponse | undefined> => {
    try {
      const cookieStore = await cookies();

      const response = await fetch(`${this.API_URL}/api/order/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        next: {
          revalidate: 0,
          tags: ["orders"],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      return await response.json();
    } catch (e) {
      console.error("Error in getOrderDetails Service:", e);
      return undefined;
    }
  };
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
  updateOrderStatus = async (id: string, status: string) => {
    try {
      const cookieStore = await cookies();

      const response = await fetch(`${this.API_URL}/api/order/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
        next: {
          tags: ["orders"],
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update order status");
      }

      return result;
    } catch (e) {
      console.error("Error in updateOrderStatus Service:", e);
      return undefined;
    }
  };
}
