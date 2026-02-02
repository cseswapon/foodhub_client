"use server";

import { MealsService } from "@/services/meal.service";
import { updateTag } from "next/cache";

const mealService = new MealsService();

export async function createMealAction(data: any) {
  try {
    const result = await mealService.createMeal(data);

    if (result?.success) {
      updateTag("meal");
      return result;
    }

    return result;
  } catch (error) {
    console.error("CREATE_MEAL_ACTION_ERROR:", error);
    return { success: false, message: "Failed to create meal" };
  }
}

export async function updateMealAction(id: string, data: any) {
  try {
    const result = await mealService.updateMeal(id, data);

    if (result?.success) {
      updateTag("meal");
      updateTag(`meal-${id}`);
      return result;
    }

    return result;
  } catch (error) {
    console.error("UPDATE_MEAL_ACTION_ERROR:", error);
    return { success: false, message: "Failed to update meal" };
  }
}

export async function deleteMealAction(id: string) {
  try {
    const result = await mealService.deleteMeal(id);

    if (result?.success) {
      updateTag("meal");
      return result;
    }

    return result;
  } catch (error) {
    console.error("DELETE_MEAL_ACTION_ERROR:", error);
    return { success: false, message: "Failed to delete meal" };
  }
}

export async function getMealDetailsAction(id: string) {
  return await mealService.getMealDetails(id);
}
