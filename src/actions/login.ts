"use server";

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import * as z from "zod";

export const login =  async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!"};
  }

  const { email, password } = validatedFields.data
  let errorOccurred = false;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    return {error: "", success: ""}
  } catch (error) {
    if (error instanceof AuthError) {
      errorOccurred = true
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Invalid Email or Password"}
        case "CredentialsSignin":
          return { error: "Invalid Email or Password"}
        default:
          return { error: "Something went wrong!"}
      }
    }
  } finally {
    if (!errorOccurred) {
      redirect('/calendar')
    }
  }
};
