import { z } from "zod";

export const SignInSchema = z.object({
  accountType: z.enum(["personal", "business"]),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password too short"),
});
export type SignInFormValues = z.infer<typeof SignInSchema>;
