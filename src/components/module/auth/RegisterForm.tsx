"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import Link from "next/link";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, "Name minimum 2 character"),
    email: z.string().email("Valid email address"),
    password: z.string().min(6, "Password at last 6 character"),
    phone: z.string().min(11, "Phone number minimum 11 character"),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("REGISTER DATA:", value);
        toast.success("Account created successfully!", { id: toastId });
        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-2xl mx-auto", className)}
      {...props}
    >
      <Card className="bg-[#1f2120] border-white/5 shadow-2xl overflow-hidden md:mt-0 mt-[20%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader className="space-y-2 text-center md:pt-8 pb-5">
            <CardTitle className="text-3xl font-black tracking-tighter text-white uppercase">
              Join <span className="text-[#a3a380]">Us</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Create your account to start your culinary journey
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-4 px-8">
            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="md:col-span-2">
                <form.Field name="name">
                  {(field) => (
                    <Field className="space-y-2 gap-1">
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest mb-0 pb-0 text-[#a3a380]">
                        Full Name
                      </FieldLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
                        <Input
                          className={cn(
                            "bg-[#0c0d0c] border-white/10 text-white pl-10 focus-visible:ring-[#a3a380] placeholder:text-gray-600",
                            field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                          placeholder="John Doe"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-[10px] text-destructive italic"
                      />
                    </Field>
                  )}
                </form.Field>
              </div>
              <div className="md:col-span-2">
                {/* Phone */}
                <form.Field name="phone">
                  {(field) => (
                    <Field className="space-y-2 gap-1">
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest mb-0 pb-0 text-[#a3a380]">
                        Phone Number
                      </FieldLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
                        <Input
                          className={cn(
                            "bg-[#0c0d0c] border-white/10 text-white pl-10 focus-visible:ring-[#a3a380] placeholder:text-gray-600",
                            field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                          placeholder="017XXXXXXXX"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-[10px] text-destructive italic"
                      />
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* Email - Full Width */}
              <div className="md:col-span-2">
                <form.Field name="email">
                  {(field) => (
                    <Field className="space-y-2 gap-1">
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest mb-0 pb-0 text-[#a3a380]">
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
                        <Input
                          className={cn(
                            "bg-[#0c0d0c] border-white/10 text-white pl-10 focus-visible:ring-[#a3a380] placeholder:text-gray-600",
                            field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                          type="email"
                          placeholder="name@example.com"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-[10px] text-destructive italic"
                      />
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* Password - Full Width */}
              <div className="md:col-span-2">
                <form.Field name="password">
                  {(field) => (
                    <Field className="space-y-2 gap-1">
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest mb-0 pb-0 text-[#a3a380]">
                        Create Password
                      </FieldLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
                        <Input
                          className={cn(
                            "bg-[#0c0d0c] border-white/10 text-white pl-10 pr-10 focus-visible:ring-[#a3a380] placeholder:text-gray-600",
                            field.state.meta.errors.length > 0 &&
                              "border-destructive",
                          )}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-[10px] text-destructive italic"
                      />
                    </Field>
                  )}
                </form.Field>
              </div>
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 p-8">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase tracking-widest h-12 mt-1 transition-all active:scale-95 shadow-lg"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              )}
            />
            <p className="text-center text-xs text-gray-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#a3a380] font-bold hover:underline underline-offset-4"
              >
                Login Instead
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <p className="px-8 text-center text-[10px] text-gray-600 leading-relaxed uppercase tracking-tighter">
        By clicking register, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-[#a3a380]">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-[#a3a380]">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
