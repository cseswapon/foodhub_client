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

export async function createOrderAction(payload: any[]) {
  try {
    const result = await orderService.createOrder(payload);

    if (result.success) {
      updateTag("orders");

      return {
        success: true,
        message: "Order placed successfully!",
      };
    }

    return {
      success: false,
      message: result.message || "Failed to create order",
    };
  } catch (error: any) {
    console.error("Create Order Action Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}

export async function cancelOrderAction(orderId: string) {
  const result = await orderService.updateOrderStatus(orderId, "cancelled");

  if (result?.success) {
    updateTag("orders");
    return { success: true, message: "Order cancelled successfully" };
  }

  return {
    success: false,
    message:
      result?.message ||
      "Failed to cancel order. It might be in a stage where cancellation is not allowed.",
  };
}

export async function updateOrderOrderStatus(id: string, status: string) {
  const result = await orderService.updateOrderStatus(id, status);
  updateTag("orders");
  return result;
}
