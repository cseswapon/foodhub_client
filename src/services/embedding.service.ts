import { env } from "@/env";
import { cookies } from "next/headers";

export interface EmbeddingStats {
  totalDocuments: number;
  mealDocuments: number;
  deletedDocuments: number;
}

export interface EmbeddingStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: EmbeddingStats;
}

export interface EmbeddingIngestData {
  success: boolean;
  message: string;
  indexedCount: number;
}

export interface EmbeddingIngestResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: EmbeddingIngestData;
}

export class EmbeddingService {
  private readonly API_URL: string;

  constructor() {
    this.API_URL = env.BACKEND_URL;
  }

  private getCookieData = async () => {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore.toString();
      if (!cookieHeader) return null;
      return cookieHeader;
    } catch {
      return null;
    }
  };

  getStats = async (): Promise<EmbeddingStatsResponse | undefined> => {
    try {
      const cookieHeader = await this.getCookieData();
      if (!cookieHeader) return undefined;

      const response = await fetch(`${this.API_URL}/api/embedding/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || "Failed to fetch embedding stats",
        );
      }

      return await response.json();
    } catch (e) {
      console.error("Error in getStats Service:", e);
      return undefined;
    }
  };

  ingestProducts = async (): Promise<EmbeddingIngestResponse | undefined> => {
    try {
      const cookieHeader = await this.getCookieData();
      if (!cookieHeader) return undefined;

      const response = await fetch(
        `${this.API_URL}/api/embedding/ingest-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader,
          },
          cache: "no-store",
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to ingest products");
      }

      return await response.json();
    } catch (e) {
      console.error("Error in ingestProducts Service:", e);
      return undefined;
    }
  };
}
