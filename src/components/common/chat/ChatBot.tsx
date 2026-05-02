"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Match {
  sourceId: string;
  sourceLabel: string | null;
  similarity: number;
  metadata: {
    name?: string;
    price?: string | number;
    category?: string;
    description?: string;
  };
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const SUGGESTED_QUERIES = [
  "Show me vegan meals",
  "What are the cheapest options?",
  "Recommend something spicy",
  "Any chicken dishes?",
];

async function queryRag(
  query: string,
): Promise<{ answer: string; matches: Match[] }> {
  const res = await fetch(`${BACKEND_URL}/api/embedding/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, limit: 5, threshold: 0.3 }),
  });

  if (!res.ok) throw new Error("Query failed");

  const data = await res.json();
  const matches: Match[] = data?.data?.matches ?? [];

  if (matches.length === 0) {
    return {
      answer: `I couldn't find any meals matching "${query}". Try a different search!`,
      matches: [],
    };
  }

  const top = matches.slice(0, 3);
  const lines = top.map((m, i) => {
    const meta = m.metadata ?? {};
    const name = meta.name ?? m.sourceLabel ?? "Unknown Meal";
    const price = meta.price
      ? `৳${parseFloat(String(meta.price)).toFixed(0)}`
      : "";
    const cat = meta.category ? ` · ${meta.category}` : "";
    return `${i + 1}. **${name}**${price ? ` — ${price}` : ""}${cat}`;
  });

  return {
    answer: `Here are some meals I found for "${query}":\n\n${lines.join("\n")}\n\nWould you like to know more about any of these?`,
    matches,
  };
}

function renderMarkdown(text: string) {
  return text
    .split("\n")
    .map((line, i) => {
      const bold = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      return `<span key="${i}">${bold}</span>`;
    })
    .join("<br/>");
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm FoodBot 🍽️ Ask me anything about our menu — I'll find the best meals for you!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const query = (text ?? input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { answer } = await queryRag(query);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: answer,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, I ran into an issue. Please try again!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        className={cn(
          "fixed bottom-6 right-6 z-200 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300",
          "bg-[#a3a380] hover:bg-[#8e8e6d] text-black",
          open && "rotate-90 opacity-0 pointer-events-none scale-75",
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Close button when open */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          aria-label="Close chat"
          className="fixed bottom-6 right-6 z-201 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-200 w-90 max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-300 md:max-h-130",
          "bg-[#111] text-white",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#a3a380]/20 border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-[#a3a380] flex items-center justify-center">
            <Bot className="w-5 h-5 text-black" />
          </div>
          <div>
            <p className="font-semibold text-sm">FoodBot</p>
            <p className="text-[10px] text-gray-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-Powered Meal Finder
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          style={{ maxHeight: "310px" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2",
                msg.role === "user" ? "flex-row-reverse" : "flex-row",
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                  msg.role === "user" ? "bg-[#a3a380]" : "bg-white/10",
                )}
              >
                {msg.role === "user" ? (
                  <User className="w-4 h-4 text-black" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-[#a3a380] text-black rounded-br-sm"
                    : "bg-white/10 text-white rounded-bl-sm",
                )}
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(msg.content),
                }}
              />
            </div>
          ))}

          {loading && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2 text-sm flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-gray-400 text-xs">Finding meals…</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {SUGGESTED_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-[11px] bg-white/5 hover:bg-[#a3a380]/30 text-gray-300 hover:text-white px-2.5 py-1 rounded-full border border-white/10 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-3 py-3 border-t border-white/10 flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about any meal…"
            className="flex-1 bg-white/5 text-white placeholder-gray-500 text-sm px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#a3a380] transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#a3a380] hover:bg-[#8e8e6d] text-black disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
