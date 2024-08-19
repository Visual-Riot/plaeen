import NextAuth from "next-auth";
import { options } from "./auth.config";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { auth, handlers, signIn, signOut } = NextAuth({
    // TODO decide on session strategy
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...options
  });
  