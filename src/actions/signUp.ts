"use server";
import { SignUpSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/data/user";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if(!validatedFields.success) {
    return {error: "Invalid fields!"}
  }

  const {email, password, name} = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use!"}
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })

  // TODO: send verification token email

  return { success: "Registered successfully! Verification email sent."};
};
