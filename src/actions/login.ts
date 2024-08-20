"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid email or password."}
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)
    return {success: "Verification email sent!"}
  }

  let errorOccurred = false;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { error: "", success: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      errorOccurred = true;
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Invalid Email or Password" };
        case "CredentialsSignin":
          return { error: "Invalid Email or Password" };
        default:
          return { error: "Something went wrong!" };
      }
    }
  } finally {
    if (!errorOccurred) {
      redirect(DEFAULT_LOGIN_REDIRECT);
    }
  }
};
