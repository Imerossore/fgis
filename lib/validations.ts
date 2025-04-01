import { z } from "zod";

// Define the schema for the login form
export const LoginFormSchema = z.object({
  idNumber: z.string().trim().min(1, "Id number is required"),
  password: z.string().trim().min(1, "Password is required"),
});

// Define the schema for the register form
export const RegisterFormSchema = z
  .object({
    idNumber: z.string().min(1, { message: "Id number is required" }).trim(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
        message: "Password must contain at least one special character",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" })
      .trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
// Define the AuthState type
export type AuthState = {
  error?: {
    idNumber?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  success?: boolean;
  message?: string;
  idNumber?: string;
};

export const ProfileFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  avatarUrl: z.string().url().optional(),
});

export type ProfileState = {
  error?: {
    firstName?: string[];
    lastName?: string[];
    avatarUrl?: string[];
  };
  success?: boolean;
  message?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
};
