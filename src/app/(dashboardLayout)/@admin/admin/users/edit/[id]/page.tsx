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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HiOutlineUserCircle,
  HiOutlineShieldCheck,
  HiOutlineArrowPath,
  HiOutlineChevronLeft,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import Link from "next/link";

type UserStatus = "activate" | "suspend";
type UserRole = "customer" | "provider" | "admin";

export default function UsersUpdate() {
  const router = useRouter();

  // --- ফেক ডাটা (এটি সাধারণত API থেকে আসবে) ---
  const initialUserData = {
    id: "eebCTSpTw7lnWacx6hmwvzOszvD9gQ80",
    name: "Abcd",
    email: "swaponsaha20@gmail.com",
    role: "provider" as UserRole,
    status: "activate" as UserStatus,
  };

  const form = useForm({
    defaultValues: {
      status: initialUserData.status,
      role: initialUserData.role,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("LOGIN DATA:", value);
        toast.success("Login successful!", { id: toastId });
        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <main className="container mx-auto py-10 px-4">
      {/* Back Button */}
      <div className="max-w-xl mx-auto mb-6">
        <Button
          asChild
          variant="ghost"
          className="hover:bg-white/5 gap-2 text-muted-foreground transition-all"
        >
          <Link href="/admin/users">
            <HiOutlineChevronLeft /> Back to Directory
          </Link>
        </Button>
      </div>

      <Card className="border-white/5 bg-card/40 backdrop-blur-md max-w-xl mx-auto rounded-lg shadow overflow-hidden pt-0">
        <CardHeader className="border-b border-white/5 pb-6 bg-white/5 pt-5">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-[#a3a380]/10 flex items-center justify-center text-[#a3a380]">
              <HiOutlineUserCircle size={30} />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-black uppercase tracking-tight italic text-white">
                Update <span className="text-[#a3a380]">Permissions</span>
              </CardTitle>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Editing: {initialUserData.name} ({initialUserData.email})
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-6">
              {/* Status Update */}
              <form.Field
                name="status"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <HiOutlineShieldCheck
                        size={14}
                        className="text-[#a3a380]"
                      />{" "}
                      Account Status
                    </label>
                    <Select
                      onValueChange={(v) => field.handleChange(v as UserStatus)}
                      defaultValue={field.state.value}
                    >
                      <SelectTrigger className="bg-background/50 border-white/10 h-12 w-full rounded-lg">
                        <SelectValue placeholder="Set Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activate">Activate</SelectItem>
                        <SelectItem value="suspend" className="text-red-500">
                          Suspend
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              {/* Role Update */}
              <form.Field
                name="role"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <HiOutlineUserGroup
                        size={14}
                        className="text-[#a3a380]"
                      />{" "}
                      System Role
                    </label>
                    <Select
                      onValueChange={(v) => field.handleChange(v as UserRole)}
                      defaultValue={field.state.value}
                    >
                      <SelectTrigger className="bg-background/50 border-white/10 h-12 w-full rounded-lg capitalize">
                        <SelectValue placeholder="Assign Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="provider">Provider</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>

            <div className="pt-4">
              <form.Subscribe
                selector={(state) => [
                  state.canSubmit,
                  state.isSubmitting,
                  state.isDirty,
                ]}
                children={(
                  [canSubmit, isSubmitting, isDirty], // এখানে isDirty রিসিভ করা হচ্ছে
                ) => (
                  <div className="space-y-4">
                    <Button
                      type="submit"
                      disabled={!canSubmit || !isDirty} // এখন আর এরর দিবে না
                      className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase rounded-lg h-14 shadow-lg transition-all gap-2"
                    >
                      {isSubmitting ? (
                        <HiOutlineArrowPath className="animate-spin size-5" />
                      ) : (
                        "Confirm Changes"
                      )}
                    </Button>

                    {!isDirty && (
                      <p className="text-[9px] text-center text-gray-600 uppercase font-bold tracking-tighter">
                        No changes detected in user profile
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
