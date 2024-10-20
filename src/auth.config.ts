import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Twitch from "next-auth/providers/twitch"
import Discord from "next-auth/providers/discord"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/data/user";

export const options: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Twitch,
    Discord,
    Credentials({
      async authorize(credentials) {
        //* test user code *//
        // const user = {
        //   id: "42",
        //   email: "test@gmail.com",
        //   password: "plaeen2024",
        // };
        // if (
        //   credentials?.email === user.email &&
        //   credentials?.password === user.password
        // ) {
        //   console.log(user);
        //   return user;
        // } else {
        //   return null;
        // }
        //* end of user code *//

        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
