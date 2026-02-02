/* import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL, // The base URL of your auth server
  credentials: "include",
}); */

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});
