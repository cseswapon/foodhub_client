"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiOutlineArrowPath } from "react-icons/hi2";

type OrderStatus = "placed" | "preparing" | "ready" | "delivered" | "cancelled";

interface OrderUpdateProps {
  order: {
    id: string;
    status: OrderStatus;
  };
}

export default function OrderUpdateForm({ order }: OrderUpdateProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      status: order.status,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Update in...");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("UPDATE DATA:", value);
        toast.success("update successful!", { id: toastId });
        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="border-white/5 bg-card/40 backdrop-blur-md max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-black uppercase tracking-tight">
          Update Order <span className="text-[#a3a380]">Status</span>
        </CardTitle>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
          ID: #{order.id.slice(0, 8)}
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Status Field Only */}
          <form.Field
            name="status"
            children={(field) => (
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  Current Progress
                </label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as OrderStatus)
                  }
                >
                  <SelectTrigger className="bg-background/50 border-white/10 h-12 rounded-lg w-full focus:ring-[#a3a380]">
                    <SelectValue placeholder="Set Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="placed">Placed</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled" className="text-red-500">
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-lg   h-12 uppercase font-bold text-[10px]"
            >
              Back
            </Button>

            <form.Subscribe
              selector={(state) => [
                state.canSubmit,
                state.isSubmitting,
                state.isDirty,
              ]}
              children={([canSubmit, isSubmitting, isDirty]) => (
                <Button
                  type="submit"
                  disabled={!isDirty || !canSubmit}
                  className="flex-2 bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-12 shadow-lg"
                >
                  {isSubmitting ? (
                    <HiOutlineArrowPath className="animate-spin size-5" />
                  ) : (
                    "Confirm Update"
                  )}
                </Button>
              )}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
