"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const AuthProvider = ({
  children,
  session,
}: React.PropsWithChildren<{ session: Session | null }>) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
