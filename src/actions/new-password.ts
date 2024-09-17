"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/lib/data/password-reset-token";
import { getUserByEmail } from "@/lib/data/user";
import { db } from "@/lib/db";
import { ResetPasswordSchema } from "@/schemas";

export const newPassword = async (
  token: string | null,
  values: z.infer<typeof ResetPasswordSchema>
) => {
  //check for token in url
  if (!token) {
    return { error: "Missing reset token! Try again with a new reset link" };
  }

  //check input fields
  const validatedFields = ResetPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  //check for token in db
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist! Try again with a new reset link" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      error: "Token has expired! Go to 'forgot password' for a new link",
    };
  }

  //check for existing user in db
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist! Try creating a new account" };
  }

  //update db password with new password
  const { password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated! You can now return to login" };
};
