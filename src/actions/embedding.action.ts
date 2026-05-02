"use server";

import { EmbeddingService } from "@/services/embedding.service";

const embeddingService = new EmbeddingService();

export async function getEmbeddingStatsAction() {
  try {
    const result = await embeddingService.getStats();

    if (!result) {
      return {
        success: false,
        message: "Failed to fetch embedding stats or unauthorized",
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error("Embedding Stats Action Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching embedding stats",
      data: null,
    };
  }
}

export async function ingestEmbeddingProductsAction() {
  try {
    const result = await embeddingService.ingestProducts();

    if (!result) {
      return {
        success: false,
        message: "Failed to ingest products or unauthorized",
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error("Embedding Ingest Action Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while ingesting products",
      data: null,
    };
  }
}
