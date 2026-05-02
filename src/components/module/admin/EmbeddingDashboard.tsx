"use client";

import { useState, useTransition } from "react";
import {
  getEmbeddingStatsAction,
  ingestEmbeddingProductsAction,
} from "@/actions/embedding.action";
import {
  Database,
  RefreshCw,
  Trash2,
  BarChart2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Brain,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import type {
  EmbeddingIngestData,
  EmbeddingStats,
} from "@/services/embedding.service";

export default function EmbeddingDashboard() {
  const [stats, setStats] = useState<EmbeddingStats | null>(null);
  const [ingestResult, setIngestResult] = useState<EmbeddingIngestData | null>(null);
  const [statsLoading, startStatsTransition] = useTransition();
  const [ingestLoading, startIngestTransition] = useTransition();

  const loadStats = () => {
    startStatsTransition(async () => {
      try {
        const result = await getEmbeddingStatsAction();
        if (!result?.success || !result.data) {
          toast.error(result?.message || "Failed to load stats");
          return;
        }
        setStats(result.data);
      } catch {
        toast.error("Failed to load stats");
      }
    });
  };

  const handleIngest = () => {
    startIngestTransition(async () => {
      try {
        toast.loading("Ingesting products...", { id: "ingest" });
        const result = await ingestEmbeddingProductsAction();
        if (!result?.success || !result.data) {
          toast.error(result?.message || "Ingest failed", { id: "ingest" });
          return;
        }

        const data = result.data;
        setIngestResult(data);
        toast.success(`Indexed ${data.indexedCount} meals!`, { id: "ingest" });
        // Refresh stats
        const fresh = await getEmbeddingStatsAction();
        if (fresh?.success && fresh.data) {
          setStats(fresh.data);
        }
      } catch {
        toast.error("Ingest failed", { id: "ingest" });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#a3a380]/20 flex items-center justify-center">
          <Brain className="w-5 h-5 text-[#a3a380]" />
        </div>
        <div>
          <h1 className="text-xl font-bold">AI Embedding</h1>
          <p className="text-sm text-muted-foreground">
            Manage vector embeddings for AI-powered search
          </p>
        </div>
      </div>

      {/* Stats card */}
      <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#a3a380]" />
            <h2 className="font-semibold">Embedding Stats</h2>
          </div>
          <button
            onClick={loadStats}
            disabled={statsLoading}
            className="flex items-center gap-1.5 text-xs bg-[#a3a380] hover:bg-[#8e8e6d] text-black px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {statsLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
            Refresh Stats
          </button>
        </div>

        {stats ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-white/5 p-4 text-center">
              <Database className="w-5 h-5 mx-auto mb-1 text-blue-400" />
              <p className="text-2xl font-bold">{stats.totalDocuments}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Total Documents
              </p>
            </div>
            <div className="rounded-xl bg-white/5 p-4 text-center">
              <FileText className="w-5 h-5 mx-auto mb-1 text-green-400" />
              <p className="text-2xl font-bold">{stats.mealDocuments}</p>
              <p className="text-xs text-muted-foreground mt-1">Active Meals</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4 text-center">
              <Trash2 className="w-5 h-5 mx-auto mb-1 text-red-400" />
              <p className="text-2xl font-bold">{stats.deletedDocuments}</p>
              <p className="text-xs text-muted-foreground mt-1">Deleted</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-6">
            Click "Refresh Stats" to load embedding statistics.
          </p>
        )}
      </div>

      {/* Ingest card */}
      <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#a3a380]" />
          <h2 className="font-semibold">Ingest Products</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Re-index all available meals into the vector database. This allows the
          AI chatbot to search and recommend meals using semantic similarity.
        </p>

        <button
          onClick={handleIngest}
          disabled={ingestLoading}
          className="flex items-center gap-2 bg-[#a3a380] hover:bg-[#8e8e6d] text-black font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
        >
          {ingestLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Indexing meals…
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Start Ingest
            </>
          )}
        </button>

        {ingestResult && (
          <div
            className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
              ingestResult.success
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {ingestResult.success ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">
                {ingestResult.success ? "Success!" : "Failed"}
              </p>
              <p>{ingestResult.message}</p>
              {ingestResult.indexedCount > 0 && (
                <p className="mt-1 text-xs opacity-70">
                  {ingestResult.indexedCount} meal embeddings created/updated
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="rounded-2xl border border-white/10 bg-card p-6 space-y-3">
        <h2 className="font-semibold flex items-center gap-2">
          <Brain className="w-4 h-4 text-[#a3a380]" /> How it works
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>
            Click <strong>Start Ingest</strong> to generate vector embeddings
            for all meals.
          </li>
          <li>
            The AI chatbot on the public site uses these embeddings to find
            relevant meals.
          </li>
          <li>
            Re-ingest whenever you add or update meals to keep search results
            fresh.
          </li>
        </ol>
      </div>
    </div>
  );
}
