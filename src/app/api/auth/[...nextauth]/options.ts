import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
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
        Credentials({
            async authorize(credentials) {
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
        // signIn: '/login'
    }
}