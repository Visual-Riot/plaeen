import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                }
            },
            async authorize(credentials) {
                // retrieve real user data here
                // Docs: next-auth.js providers credentials
                const user={id:"42", name: "Kane", password: "plaeen"}
                if (credentials?.username === user.name && credentials?.password === user.password) {
                    console.log(user)
                    return user
                } else {
                    return null
                }
            },
        })
    ]
}