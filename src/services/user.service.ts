import { env } from "@/env";
import { IUserResponse } from "@/types";
import { cookies } from "next/headers";

export class UserService {
  static API_URL = "User Service";
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
  currentUser = async () => {
    try {
      const cookieStore = await this.getCookieData();
      if (!cookieStore) {
        return undefined;
      }
      const response = await fetch(`${this.API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore,
        },
        cache: "no-store",
        next: {
          tags: ["users"],
        },
      });
      const result: Partial<IUserResponse> = await response.json();
      return result;
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };
  getSession = async () => {
    try {
      const cookieStore = await this.getCookieData();
      if (!cookieStore) {
        return undefined;
      }
      const res = await fetch(`${this.API_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore,
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      console.log(error);
      return undefined;
    }
  };
  updateUser = async (
    data: Partial<{ name: string; address: string; phone: string }>,
  ) => {
    try {
      const cookie = cookies();
      const response = await fetch(`${this.API_URL}/api/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: (await cookie).toString(),
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
}
