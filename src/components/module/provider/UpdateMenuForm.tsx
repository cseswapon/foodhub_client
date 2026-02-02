"use client";

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
import { updateMealAction } from "@/actions/meal.action";

type DietaryType = "veg" | "non_veg" | "vegan";

export default function UpdateMenuForm({ meal }: { meal: any }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: meal?.name || "",
      description: meal?.description || "",
      price: meal?.price ? Number(meal.price) : 0,
      dietary_type: (meal?.dietary_type as DietaryType) || "non_veg",
      is_available: meal?.is_available ?? true,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating meal...");

      try {
        const updatePayload = {
          name: value.name,
          description: value.description,
          price: Number(value.price),
          dietary_type: value.dietary_type,
          is_available: value.is_available,
        };
        const result = await updateMealAction(meal.id, updatePayload);
        console.log(result);
        toast.success("Meal updated successfully!", { id: toastId });
        router.push("/provider/menu");
      } catch (error) {
        toast.error("Update failed", { id: toastId });
        console.error(error);
      }
    },
  });

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto mb-6">
        <Button
          asChild
          variant="ghost"
          className="hover:bg-white/5 gap-2 text-muted-foreground"
        >
          <Link href="/dashboard/menu">
            <HiOutlineChevronLeft /> Back to Menu
          </Link>
        </Button>
      </div>

      <Card className="border-white/5 bg-[#0c0d0c] backdrop-blur-md max-w-2xl mx-auto rounded-lg shadow-xl text-white">
        <CardHeader className="border-b border-white/5 pb-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-3">
                <HiOutlineCake className="text-[#a3a380]" />
                Update <span className="text-[#a3a380]">Meal</span>
              </CardTitle>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                ID: {meal?.id}
              </p>
            </div>

            <form.Field
              name="is_available"
              children={(field) => (
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  <Label
                    htmlFor="is_available"
                    className="text-[10px] font-black uppercase tracking-widest cursor-pointer text-gray-400"
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

        <CardContent className="pt-2">
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
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Item Name
                  </label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-white/5 border-white/10 h-12 text-white rounded-lg focus:ring-[#a3a380]"
                  />
                </div>
              )}
            />

            {/* Description */}
            <form.Field
              name="description"
              children={(field) => (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Description
                  </label>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-white/5 border-white/10 min-h-25 text-white rounded-lg resize-none focus:ring-[#a3a380]"
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <HiOutlineCurrencyBangladeshi size={14} /> Price
                    </label>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="bg-white/5 border-white/10 h-12 text-white rounded-lg"
                    />
                  </div>
                )}
              />

              {/* Dietary Type */}
              <form.Field
                name="dietary_type"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <HiOutlineSparkles size={14} /> Dietary
                    </label>
                    <Select
                      onValueChange={(v) =>
                        field.handleChange(v as DietaryType)
                      }
                      value={field.state.value}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 h-12 w-full text-white rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0c0d0c] border-white/10 text-white">
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
                      "Update Meal Entry"
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
