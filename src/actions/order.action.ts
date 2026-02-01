"use server";

import { updateTag } from "next/cache";
import { OrderService } from "@/services/order.service";

const orderService = new OrderService();

export async function getMyOrdersAction() {
  try {
    const result = await orderService.myOrdersmeal();

    if (!result) {
      return {
        success: false,
        data: result,
        message: "Failed to fetch orders or unauthorized",
      };
    }
    updateTag("orders");
    return result;
  } catch (error) {
    console.error("Order Action Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching orders",
    };
  }
}
