"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  SignInFormValues,
  SignInSchema,
} from "@/app/features/auth/sign-in/schemas/sign-in-schema";

export function useSignInForm(defaultAccountType: "personal" | "business") {
  return useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      accountType: defaultAccountType,
      email: "",
      password: "",
    },
  });
}
