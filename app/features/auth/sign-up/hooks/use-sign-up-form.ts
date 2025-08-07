import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpFormValues, SignUpSchema } from "../schemas/sign-up-schema";

export function useSignUpForm(defaultType: "personal" | "business") {
  return useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { accountType: defaultType },
  });
}
