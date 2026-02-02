import { env } from "@/env";
import { MealDataRes } from "./meal.service";
import { cookies } from "next/headers";
export interface ProviderData {
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

export interface ProviderDetails extends ProviderData {
  meals: MealDataRes[];
  user: {
    name: string;
    email: string;
    phone: string;
    address: string | null;
  };
}

interface AllProvidersResponse {
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
  data: ProviderData[];
}

export interface SingleProviderResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProviderDetails;
}

export class ProvidersService {
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

  getAllProvidersMe = async (): Promise<AllProvidersResponse | undefined> => {
    try {
      const cookieHeader = await this.getCookieData();
      if (!cookieHeader) {
        return undefined;
      }
      const response = await fetch(`${this.API_URL}/api/provider/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader || "",
        },
        next: {
          revalidate: 60,
          tags: ["providers"],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch providers");
      }

      return await response.json();
    } catch (e) {
      console.error(
        "Error in getAllProviders:",
        e instanceof Error ? e.message : e,
      );
      return undefined;
    }
  };
  // some thing went wrong handel backend use provider using user table
  getAllProviders = async () => {
    try {
      const response = await fetch(`${this.API_URL}/api/provider`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["providers"],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch providers");
      }

      return await response.json();
    } catch (e) {
      console.error(
        "Error in getAllProviders:",
        e instanceof Error ? e.message : e,
      );
      return undefined;
    }
  };

  getProviderDetails = async (id: string) => {
    try {
      const response = await fetch(`${this.API_URL}/api/provider/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch provider with id: ${id}`);
      }

      return await response.json();
    } catch (e) {
      console.error(
        "Error in getProviderDetails:",
        e instanceof Error ? e.message : e,
      );
      return undefined;
    }
  };

  createProvider = async (data: any) => {
    try {
      const cookieHeader = await this.getCookieData();
      if (!cookieHeader) {
        return undefined;
      }
      const response = await fetch(`${this.API_URL}/api/provider`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader || "",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create provider");
      }

      return result;
    } catch (e: any) {
      console.error("Error in createProvider:", e.message);
      return { success: false, message: e.message };
    }
  };
  updateProviderDetails = async (name: string, data: any) => {
    try {
      const cookieHeader = await this.getCookieData();

      const response = await fetch(
        `${this.API_URL}/api/provider?name=${name}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader || "",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update provider");
      }

      return result;
    } catch (e: any) {
      console.error("Error in updateProviderDetails:", e.message);
      return { success: false, message: e.message };
    }
  };

  deleteProviderDetails = async (id: string) => {
    try {
      const cookieHeader = await this.getCookieData();

      const response = await fetch(`${this.API_URL}/api/provider/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader || "",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update provider");
      }

      return result;
    } catch (e: any) {
      console.error("Error in updateProviderDetails:", e.message);
      return { success: false, message: e.message };
    }
  };
}
