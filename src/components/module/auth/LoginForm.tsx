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
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z.string().email("Valid email address"),
    password: z.string().min(6, "Password at last 6 character"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const { error } = await authClient.signIn.email({
          ...value,
          callbackURL: "/",
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("Login successful!", { id: toastId });
        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div
      className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)}
      {...props}
    >
      <Card className="bg-[#1f2120] border-white/5 shadow-2xl overflow-hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader className="space-y-2 text-center md:pt-8 pb-5">
            <CardTitle className="text-3xl font-black tracking-tighter text-white uppercase">
              Welcome <span className="text-[#a3a380]">Back</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="grid mt-4 px-8">
            <FieldGroup className="gap-5">
              {/* Email Field */}
              <form.Field
                name="email"
                children={(field) => (
                  <Field className="space-y-2 gap-1">
                    <FieldLabel className="text-xs font-bold uppercase tracking-widest mb-0 pb-0 text-[#a3a380]">
                      Email Address
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
                      <Input
                        id={field.name}
                        type="email"
                        placeholder="name@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={cn(
                          "bg-[#0c0d0c] border-white/10 text-white pl-10 focus-visible:ring-[#a3a380] placeholder:text-gray-600",
                          field.state.meta.errors.length > 0 &&
                            "border-destructive",
                        )}
                      />
                    </div>
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-[10px] text-destructive italic mt-1"
                    />
                  </Field>
                )}
              />

              {/* Password Field */}
              <form.Field
                name="password"
                children={(field) => (
                  <Field className="space-y-1 gap-0">
                    <div className="flex items-center justify-between">
                      <FieldLabel className="text-xs font-bold uppercase tracking-widest mb-0 pb-0 text-[#a3a380]">
                        Password
                      </FieldLabel>
                      <Link
                        href="/auth/forgot"
                        className="text-[10px] text-gray-500 hover:text-[#a3a380] transition-colors uppercase tracking-tighter"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-4" />
                      <Input
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={cn(
                          "bg-[#0c0d0c] border-white/10 text-white pl-10 pr-10 focus-visible:ring-[#a3a380] placeholder:text-gray-600",
                          field.state.meta.errors.length > 0 &&
                            "border-destructive",
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
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
                      className="text-[10px] text-destructive italic mt-1"
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 p-8">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  className="w-full bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase tracking-widest h-12 transition-all active:scale-95 shadow-lg"
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Login to Account"
                  )}
                </Button>
              )}
            />
            <p className="text-center text-xs text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-[#a3a380] font-bold hover:underline underline-offset-4"
              >
                Register Now
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <p className="px-8 text-center text-[10px] text-gray-600 leading-relaxed uppercase tracking-tighter">
        By clicking login, you agree to our{" "}
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
