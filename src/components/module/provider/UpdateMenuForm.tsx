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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  HiOutlineCake,
  HiOutlineCurrencyBangladeshi,
  HiOutlineArrowPath,
  HiOutlineChevronLeft,
  HiOutlineSparkles,
} from "react-icons/hi2";
import Link from "next/link";

type DietaryType = "veg" | "non_veg" | "vegan";

export default function UpdateMenuForm() {
  const router = useRouter();

  // --- ফেক ডাটা (এটি এপিআই থেকে আসবে) ---
  const initialMealData = {
    id: "5e0af171-f951-48b3-b02c-2770d6fb0dfb",
    provider_id: "1ea33618-d7c7-4ac2-8ef9-aa0915bcacd4",
    category_id: "bc56b6a0-4127-47f2-b533-0f96526f5522",
    name: "Chicken Biryani",
    description: "স্পেশাল কাচ্চি স্টাইল চিকেন বিরিয়ানি",
    price: 500.0,
    dietary_type: "non_veg" as DietaryType,
    is_available: true,
  };

  const form = useForm({
    defaultValues: {
      provider_id: initialMealData.provider_id,
      category_id: initialMealData.category_id,
      name: initialMealData.name,
      description: initialMealData.description,
      price: initialMealData.price,
      dietary_type: initialMealData.dietary_type,
      is_available: initialMealData.is_available,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("menu DATA:", value);
        toast.success("menu successful!", { id: toastId });
        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <main className="container mx-auto py-10 px-4">
      {/* Back Button */}
      <div className="max-w-2xl mx-auto mb-6">
        <Button
          asChild
          variant="ghost"
          className="hover:bg-white/5 gap-2 text-muted-foreground transition-all"
        >
          <Link href="/dashboard/menu">
            <HiOutlineChevronLeft /> Back to Menu
          </Link>
        </Button>
      </div>

      <Card className="border-white/5 bg-card/40 backdrop-blur-md max-w-2xl mx-auto rounded-lg shadow-xl overflow-hidden">
        <CardHeader className="border-b border-white/5 pb-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-3 text-white">
                <HiOutlineCake className="text-[#a3a380]" />
                Update <span className="text-[#a3a380]">Meal</span>
              </CardTitle>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                Edit meal information & status
              </p>
            </div>

            {/* Availability Toggle */}
            <form.Field
              name="is_available"
              children={(field) => (
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  <Label
                    htmlFor="is_available"
                    className="text-[10px] font-black uppercase tracking-widest cursor-pointer"
                  >
                    {field.state.value ? "In Stock" : "Out of Stock"}
                  </Label>
                  <Switch
                    id="is_available"
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(checked)}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
              )}
            />
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Meal Name */}
            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Item Name
                  </label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-background/50 border-white/10 h-12 focus:ring-[#a3a380] rounded-lg"
                  />
                </div>
              )}
            />

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Description
                  </label>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-background/50 border-white/10 min-h-25 rounded-lg resize-none"
                  />
                </div>
              )}
            />

            <div className="grid grid-cols-1 gap-6">
              {/* Price */}
              <form.Field
                name="price"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <HiOutlineCurrencyBangladeshi size={14} /> Price (BDT)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="bg-background/50 border-white/10 h-12 rounded-lg"
                    />
                  </div>
                )}
              />

              {/* Dietary Type */}
              <form.Field
                name="dietary_type"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <HiOutlineSparkles size={14} /> Dietary Type
                    </label>
                    <Select
                      onValueChange={(v) =>
                        field.handleChange(v as DietaryType)
                      }
                      defaultValue={field.state.value}
                    >
                      <SelectTrigger className="bg-background/50 border-white/10 h-12 w-full rounded-lg capitalize">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                        <SelectItem value="non_veg">Non-Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            <div className="pt-6">
              <form.Subscribe
                selector={(state) => [
                  state.canSubmit,
                  state.isSubmitting,
                  state.isDirty,
                ]}
                children={([canSubmit, isSubmitting, isDirty]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || !isDirty}
                    className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-14 shadow-lg transition-all gap-2"
                  >
                    {isSubmitting ? (
                      <HiOutlineArrowPath className="animate-spin size-5" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                )}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
