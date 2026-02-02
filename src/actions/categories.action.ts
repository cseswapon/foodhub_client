"use server";
import { CategoriesService } from "@/services/categories.service";
import { updateTag } from "next/cache";

const categoriesService = new CategoriesService();
export async function updateCategories(id: string, body: any) {
  const result = categoriesService.updateCategories(id, body);
  updateTag("categories");
  return result;
}

export async function deleteCategories(id: string) {
  const result = await categoriesService.deleteCategories(id);
  //   console.log(result);
  updateTag("categories");
  return result;
}

export async function addCategories(body: any) {
  const result = await categoriesService.addCategories(body);
  updateTag("categories");
  return result;
}
