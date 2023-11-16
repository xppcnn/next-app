"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return null;
  return (
    <div className="h-12 bg-slate-500 flex j items-center gap-5">
      <Link href="/">Next.js</Link>
      <Link href="/users">User</Link>
      {status === "authenticated" && <div>{session.user?.name}</div>}
      {status === "authenticated" && (
        <Link href="/api/auth/signout">Logout</Link>
      )}
      {status === "unauthenticated" && (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default NavBar;
