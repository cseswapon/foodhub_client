import { env } from "@/env";
import { MealDataRes } from "./meal.service"; 
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

interface SingleProviderResponse {
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


  getAllProviders = async (): Promise<AllProvidersResponse | undefined> => {
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


  getProviderDetails = async (
    id: string,
  ): Promise<SingleProviderResponse | undefined> => {
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
}
