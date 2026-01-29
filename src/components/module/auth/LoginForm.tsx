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
import { Loader2, Eye, EyeOff } from "lucide-react"; // Icons add kora hoyeche
import Link from "next/link";

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
        // API call simulation
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
    <div
      className={cn("flex flex-col gap-6 w-full max-w-md mx-auto", className)}
      {...props}
    >
      <Card className="shadow border-muted-foreground/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="grid mt-7">
            <FieldGroup className="gap-1">
              {/* Email Field */}
              <form.Field
                name="email"
                children={(field) => (
                  <Field>
                    <FieldLabel className="font-medium">
                      Email Address
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="name@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(
                        field.state.meta.errors.length > 0 &&
                          "border-destructive",
                      )}
                    />
                    <FieldError
                      errors={field.state.meta.errors}
                      className="text-xs text-destructive mt-1"
                    />
                  </Field>
                )}
              />

              {/* Password Field */}
              <form.Field
                name="password"
                children={(field) => (
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel className="font-medium">Password</FieldLabel>
                      <a
                        href="#"
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={cn(
                          field.state.meta.errors.length > 0 &&
                            "border-destructive",
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                      className="text-xs text-destructive mt-1"
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-3">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  className="w-full font-semibold mt-3"
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login to Account"
                  )}
                </Button>
              )}
            />
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                Register
              </Link>
            </p>

            {/*   <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
                <span className="bg-background px-2">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" type="button" className="w-full">
              Sign in with Google
            </Button> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
