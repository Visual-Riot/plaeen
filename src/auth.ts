import NextAuth from "next-auth";
import { options } from "@/auth.config";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/lib/data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // TODO decide on session strategy
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
    error: '/auth-error'
  },  
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async signIn({ user, account}) {
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id as string)
      if (!existingUser?.emailVerified) return false 

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...options,
});
