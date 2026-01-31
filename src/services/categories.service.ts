import { env } from "@/env";
import { cookies } from "next/headers";

export class CategoriesService {
  static API_URL = "Categories Service";
  private readonly API_URL;
  constructor() {
    this.API_URL = env.BACKEND_URL;
  }
  getAllCategories = async () => {
    try {
      const cookie = cookies();
      const response = await fetch(`${this.API_URL}/api/categories/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: (await cookie).toString(),
        },
        cache: "no-store",
        next: {
          tags: ["users"],
        },
      });
      const result= await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };

}
