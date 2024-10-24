import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export const SignUpSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  })
});

export const ResetPasswordSchema = z.object({
  password: z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be more than 8 characters"),
});