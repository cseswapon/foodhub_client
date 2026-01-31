"use server";

import { UserService } from "@/services/user.service";
import { updateTag } from "next/cache";

const userService = new UserService();
export async function getCurrentUser() {
  return await userService.currentUser();
}

export async function updateCurrentUser(data: {
  name: string;
  address: string;
  phone: string;
}) {
  const result = await userService.updateUser(data);
  // revalidateTag("users","max");
  updateTag("users");
  return result;
}
