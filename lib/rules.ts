import { z } from "zod";

export const LoginFormSchema = z.object({
  id_number: z.string().min(8, "ID Number must be 8 characters long").trim(),
  password: z.string().min(1, "Password is required ").trim(),
  remember_me: z.boolean().optional(),
});

export const RegisterFormSchema = z
  .object({
    id_number: z
      .string()
      .min(8, "ID Number must be at least 8 characters long")
      .trim(),
    password: z.string().min(1, "Password is required").trim(),
    confirm_password: z
      .string()
      .min(1, "Password confirmation is required")
      .trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
