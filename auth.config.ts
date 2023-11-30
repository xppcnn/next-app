import type { NextAuthConfig } from "next-auth";
import { match } from "path-to-regexp";

const permPaths = ["/issues/add", "/issues/:id/edit"];

const urlMatch = match(permPaths);

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl, url } }) {
      const needLogin = urlMatch(nextUrl.pathname);
      if (!needLogin) {
        return true;
      }
      const isLoggedIn = !!auth?.user;
      return isLoggedIn;
    },
  },
} as NextAuthConfig;
