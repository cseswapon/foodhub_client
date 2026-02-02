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
import {
  HiOutlineCake,
  HiOutlineCurrencyBangladeshi,
  HiOutlineTag,
  HiOutlineBuildingStorefront,
  HiOutlineArrowPath,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { createMealAction } from "@/actions/meal.action";

type DietaryType = "veg" | "non_veg" | "vegan";

export default function AddMenuForm({
  providers,
  categories,
}: {
  providers: any;
  categories: any;
}) {
  // console.log(providers, categories);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      provider_id: "",
      category_id: "",
      name: "",
      description: "",
      price: 0,
      dietary_type: "non_veg" as DietaryType,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // console.log("menu DATA:", value);
        await createMealAction(value);
        toast.success("menu successful!", { id: toastId });
        form.reset();
        router.push("/provider/menu");
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="border-white/5 bg-card/40 backdrop-blur-md max-w-2xl mx-auto rounded-lg shadow-xl">
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-3 text-white">
          <HiOutlineCake className="text-[#a3a380]" />
          Add New <span className="text-[#a3a380]">Menu Item</span>
        </CardTitle>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
          Create a fresh entry for your kitchen
        </p>
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
          <div className="grid grid-cols-1 gap-6">
            {/* Provider Select */}
            <form.Field
              name="provider_id"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <HiOutlineBuildingStorefront size={14} /> Select Provider
                  </label>
                  <Select
                    onValueChange={field.handleChange}
                    defaultValue={field.state.value}
                  >
                    <SelectTrigger className="bg-background/50 border-white/10 w-full h-12 rounded-lg">
                      <SelectValue placeholder="Choose Kitchen" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers?.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p?.restaurant_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* Category Select */}
            <form.Field
              name="category_id"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <HiOutlineTag size={14} /> Category
                  </label>
                  <Select
                    onValueChange={field.handleChange}
                    defaultValue={field.state.value}
                  >
                    <SelectTrigger className="bg-background/50 border-white/10 h-12 w-full rounded-lg">
                      <SelectValue placeholder="Choose Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c: any) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>

          {/* Item Name */}
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
                  placeholder="e.g. Chicken Biryani"
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
                  placeholder="Tell them what's special about this dish..."
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
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="bg-background/50 border-white/10 h-12 rounded-lg"
                  />
                </div>
              )}
            />

            {/* Dietary Type Enum */}
            <form.Field
              name="dietary_type"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <HiOutlineSparkles size={14} /> Dietary Type
                  </label>
                  <Select
                    onValueChange={(v) => field.handleChange(v as DietaryType)}
                    defaultValue={field.state.value}
                  >
                    <SelectTrigger className="bg-background/50 border-white/10 h-12 w-full rounded-lg capitalize">
                      <SelectValue placeholder="Dietary Info" />
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
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-14 shadow-lg transition-all gap-2"
                >
                  {isSubmitting ? (
                    <HiOutlineArrowPath className="animate-spin size-5" />
                  ) : (
                    "Add to Kitchen Menu"
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
