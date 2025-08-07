"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import { SignUpFormValues } from "@/app/features/auth/sign-up/schemas/sign-up-schema";
import { useSignUpForm } from "@/app/features/auth/sign-up/hooks/use-sign-up-form";
import { createAccount } from "@/app/features/auth/sign-up/api/create-account";

export function SignUpForm({ type }: { type: "personal" | "business" }) {
  const form = useSignUpForm(type);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormValues) => {
    setLoading(true);
    setApiError(null);

    try {
      await createAccount({
        email: data.email,
        password: data.password,
        accountType: data.accountType,
      });
      toast.success("Account created! Please sign in.");
      router.push(`/sign-in?type=${encodeURIComponent(type)}`);
    } catch (err: any) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input type="hidden" value={type} {...form.register("accountType")} />

      <Input
        label="Email"
        {...form.register("email")}
        disabled={loading}
        errorMessage={form.formState.errors.email?.message}
        isInvalid={!!form.formState.errors.email}
      />

      <Input
        label="Password"
        type="password"
        {...form.register("password")}
        disabled={loading}
        errorMessage={form.formState.errors.password?.message}
        isInvalid={!!form.formState.errors.password}
      />

      <Input
        label="Confirm Password"
        type="password"
        {...form.register("confirmPassword")}
        disabled={loading}
        errorMessage={form.formState.errors.confirmPassword?.message}
        isInvalid={!!form.formState.errors.confirmPassword}
      />

      <Button
        color="primary"
        disabled={loading}
        isLoading={loading}
        type="submit"
      >
        Sign Up
      </Button>

      {apiError && <div className="text-sm text-red-600">{apiError}</div>}
    </form>
  );
}
