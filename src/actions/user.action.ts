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

export async function deleteUserAction(id: string) {
  const result = await userService.deleteUser(id);
  updateTag("users");
  return result;
}

export async function updateUserStatusAction(
  id: string,
  data: { status?: string; role?: string },
) {
  const result = await userService.updateUserStatus(id, data);
  updateTag("users");
  return result;
}

export async function getUserDetailsAction(id: string) {
  const result = await userService.getUserDetails(id);
  updateTag("users");
  return result;
}
