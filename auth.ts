import NextAuth from "next-auth";
import type { NextAuthConfig, DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { authConfig as config } from "./auth.config";
import prisma from "./prisma/client";


export const authConfig = {
  ...config,
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const userCredentials = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/login`, {
          method: "POST",
          body: JSON.stringify(userCredentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { data } = await res.json();
        if (res.ok && data) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.userId as string;
      return await session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return await token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
