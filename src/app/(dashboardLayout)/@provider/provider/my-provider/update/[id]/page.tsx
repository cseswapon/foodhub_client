"use client";

import { useForm } from "@tanstack/react-form";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  HiOutlineBuildingStorefront,
  HiOutlineGlobeAlt,
  HiOutlineMapPin,
  HiOutlineDocumentText,
  HiOutlineArrowPath,
  HiOutlineChevronLeft,
} from "react-icons/hi2";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  providerDetailsAction,
  updateProviderAction,
} from "@/actions/provider.action";
import { SingleProviderResponse } from "@/services/provider.service";
import Loading from "@/components/common/loading/Loading";

export default function UpdateProvider() {
  const [provider, setProvider] =
    useState<Partial<SingleProviderResponse> | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      return router.back();
    }
    (async () => {
      setIsLoading(true);
      const provider = await providerDetailsAction(id as string);
      if (provider?.data) {
        setProvider(provider);
      }
      setIsLoading(false);
    })();
  }, [id, router]);

  const initialData = {
    id: provider?.data?.id,
    restaurant_name: provider?.data?.restaurant_name,
    description: provider?.data?.description,
    address: provider?.data?.address,
    fb_link: provider?.data?.fb_link,
    is_open: provider?.data?.is_open,
  };

  // console.log("provider", provider);
  const form = useForm({
    defaultValues: {
      restaurant_name: initialData.restaurant_name,
      description: initialData.description,
      address: initialData.address,
      fb_link: initialData.fb_link,
      is_open: initialData.is_open,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // console.log("LOGIN DATA:", value);
        const result = await updateProviderAction(
          value?.restaurant_name as string,
          value,
        );
        if (result) {
          toast.success("Update successful!", { id: toastId });
          form.reset();
          router.back();
        } else {
          toast.error("Something went wrong", { id: toastId });
        }
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <main className="container mx-auto py-10 px-4">
        <div className="max-w-2xl mx-auto mb-6">
          <Button
            asChild
            variant="ghost"
            className="hover:bg-white/5 gap-2 text-muted-foreground"
          >
            <Link href="/my-provider">
              <HiOutlineChevronLeft /> Back to List
            </Link>
          </Button>
        </div>

        <Card className="border-white/5 bg-card/40 backdrop-blur-md max-w-2xl mx-auto rounded-lg shadow-xl">
          <CardHeader className="border-b border-white/5 pb-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-3">
                <HiOutlineBuildingStorefront className="text-[#a3a380]" />
                Update <span className="text-[#a3a380]">Provider</span>
              </CardTitle>

              {/* is_open field */}
              <form.Field
                name="is_open"
                children={(field) => (
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    <Label
                      htmlFor="is_open"
                      className="text-[9px] font-black uppercase tracking-widest cursor-pointer"
                    >
                      {field.state.value ? "Store Open" : "Store Closed"}
                    </Label>
                    <Switch
                      id="is_open"
                      checked={field.state.value}
                      onCheckedChange={(checked: boolean) =>
                        field.handleChange(checked)
                      }
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
                      <HiOutlineGlobeAlt size={14} /> Facebook Link
                    </label>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-background/50 border-white/10 h-12 focus:ring-[#a3a380] rounded-lg"
                    />
                  </div>
                )}
              />

              <div className="pt-4">
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
                        "Update Profile"
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
}
