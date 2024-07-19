import NextAuth from "next-auth";
import { options } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    // TODO decide on session strategy
    // session: { strategy: "jwt" },
    ...options
  });
  