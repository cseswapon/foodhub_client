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
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
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
      <Card className="border-muted-foreground/15 shadow">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Create an account
            </CardTitle>
            <CardDescription>
              Join us today! Enter your details to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid mt-7">
            <FieldGroup className="gap-1">
              {/* Name */}
              <form.Field name="name">
                {(field) => (
                  <Field className="space-y-0 gap-1 mb-2">
                    <FieldLabel className="text-sm font-semibold">
                      Full Name
                    </FieldLabel>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={16}
                      />
                      <Input
                        className="pl-10"
                        placeholder="John Doe"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-[10px] text-destructive"
                    />
                  </Field>
                )}
              </form.Field>

              {/* Phone */}
              <form.Field name="phone">
                {(field) => (
                  <Field className="space-y-0 gap-1 mb-2">
                    <FieldLabel className="text-sm font-semibold">
                      Phone Number
                    </FieldLabel>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={16}
                      />
                      <Input
                        className="pl-10"
                        placeholder="017XXXXXXXX"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-[10px] text-destructive"
                    />
                  </Field>
                )}
              </form.Field>

              {/* Email - Full Width */}
              <div className="md:col-span-2">
                <form.Field name="email">
                  {(field) => (
                    <Field className="space-y-0 gap-1 mb-2">
                      <FieldLabel className="text-sm font-semibold">
                        Email
                      </FieldLabel>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          size={16}
                        />
                        <Input
                          className="pl-10"
                          type="email"
                          placeholder="name@example.com"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </div>
                      <FieldError
                        errors={field.state.meta.errors}
                        className="text-[10px] text-destructive"
                      />
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* Password - Full Width */}
              <div className="space-y-0 gap-1 mb-2">
                <form.Field name="password">
                  {(field) => (
                    <Field className="space-y-0 gap-1 mb-2">
                      <FieldLabel className="text-sm font-semibold">
                        Password
                      </FieldLabel>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          size={16}
                        />
                        <Input
                          className="pl-10"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
                        className="text-[10px] text-destructive"
                      />
                    </Field>
                  )}
                </form.Field>
              </div>
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-bold transition-all"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Register Now"
                  )}
                </Button>
              )}
            />
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <p className="px-8 text-center text-xs text-muted-foreground leading-relaxed">
        By clicking register, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
