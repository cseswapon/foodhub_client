"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HiOutlineBuildingStorefront,
  HiOutlineGlobeAlt,
  HiOutlineMapPin,
  HiOutlineDocumentText,
  HiOutlineArrowPath,
} from "react-icons/hi2";

export default function AddProviderForm() {
  //   const router = useRouter();

  const form = useForm({
    defaultValues: {
      restaurant_name: "",
      description: "",
      address: "",
      fb_link: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("add provider DATA:", value);
        toast.success("add provider successful!", { id: toastId });
        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="border-white/5 bg-card/40 backdrop-blur-md max-w-2xl my-10 mx-auto rounded-lg shadow">
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-3">
          <HiOutlineBuildingStorefront className="text-[#a3a380]" />
          Setup <span className="text-[#a3a380]">Provider</span> Profile
        </CardTitle>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
          Fill in your restaurant details to start selling
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
          {/* Restaurant Name */}
          <form.Field
            name="restaurant_name"
            children={(field) => (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <HiOutlineBuildingStorefront size={14} /> Restaurant Name
                </label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-background/50 border-white/10 h-12 focus:ring-[#a3a380] rounded-lg"
                  placeholder="e.g. Pizza Point - 10"
                />
              </div>
            )}
          />

          {/* Description */}
          <form.Field
            name="description"
            children={(field) => (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <HiOutlineDocumentText size={14} /> Description
                </label>
                <Textarea
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-background/50 border-white/10 min-h-25 focus:ring-[#a3a380] rounded-lg resize-none"
                  placeholder="Tell customers about your kitchen..."
                />
              </div>
            )}
          />

          {/* Address */}
          <form.Field
            name="address"
            children={(field) => (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <HiOutlineMapPin size={14} /> Address
                </label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-background/50 border-white/10 h-12 focus:ring-[#a3a380] rounded-lg"
                  placeholder="e.g. Gulshan 1, Dhaka"
                />
              </div>
            )}
          />

          {/* Facebook Link */}
          <form.Field
            name="fb_link"
            children={(field) => (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <HiOutlineGlobeAlt size={14} /> Facebook Page Link
                </label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-background/50 border-white/10 h-12 focus:ring-[#a3a380] rounded-lg"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
            )}
          />

          <div className="pt-4">
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
                    "Create Provider Profile"
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
