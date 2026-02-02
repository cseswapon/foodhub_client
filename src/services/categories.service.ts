import { env } from "@/env";
import { cookies } from "next/headers";

export class CategoriesService {
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
  getAllCategories = async () => {
    try {
      const response = await fetch(`${this.API_URL}/api/categories/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // cache: "force-cache",
        next: {
          revalidate: 60,
          tags: ["categories"],
        },
      });
      const result = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };

  addCategories = async (data: any) => {
    const cookieHeader = await this.getCookieData();
    if (!cookieHeader) {
      return undefined;
    }
    try {
      const response = await fetch(`${this.API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };
  updateCategories = async (id: string, data: any) => {
    const cookieHeader = await this.getCookieData();
    if (!cookieHeader) {
      return undefined;
    }
    try {
      const response = await fetch(`${this.API_URL}/api/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };
  deleteCategories = async (id: string) => {
    const cookieHeader = await this.getCookieData();
    if (!cookieHeader) {
      return undefined;
    }
    try {
      const response = await fetch(`${this.API_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
      });
      const result = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };
}
