"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import { useSignInForm } from "../hooks/use-sign-in-form";
import { SignInFormValues } from "../schemas/sign-in-schema";

import { useAuthStore } from "@/app/features/auth/store/auth-store";

const CREDENTIALS = {
  personal: { email: "member@valid.email", password: "Member123!" },
  business: { email: "partner@valid.email", password: "Partner123!" },
};

export function SignInForm({ type }: { type: "personal" | "business" }) {
  const router = useRouter();
  const form = useSignInForm(type);
  const loginWithCreds = useAuthStore((s) => s.loginWithCreds);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: SignInFormValues) => {
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const creds = CREDENTIALS[type];

      if (data.email === creds.email && data.password === creds.password) {
        loginWithCreds(data.email, data.password, type);

        router.push(`/sign-in/otp?type=${encodeURIComponent(type)}`);
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <input type="hidden" value={type} {...form.register("accountType")} />

      <Input
        label="Email"
        placeholder="you@example.com"
        {...form.register("email")}
        disabled={loading}
        errorMessage={form.formState.errors.email?.message}
        isInvalid={!!form.formState.errors.email}
      />

      <Input
        label="Password"
        placeholder="••••••••"
        type="password"
        {...form.register("password")}
        disabled={loading}
        errorMessage={form.formState.errors.password?.message}
        isInvalid={!!form.formState.errors.password}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        color="primary"
        disabled={loading}
        isLoading={loading}
        type="submit"
      >
        Next
      </Button>
    </form>
  );
}
