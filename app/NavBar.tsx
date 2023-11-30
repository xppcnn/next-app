"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { WiAlien } from "react-icons/wi";
import { UserNav } from "./UserNav";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Issues",
    href: "/issues",
  },
];
const NavBar = () => {
  const currPath = usePathname();
  const { status, data } = useSession();
  console.log("🚀 ~ file: NavBar.tsx:24 ~ NavBar ~ data:", data);
  if (currPath == "/") {
    redirect("/dashboard");
  }
  return (
    <nav className="flex justify-between border-b px-5 items-center">
      <div className="flex items-center ">
        <Link href="/">
          <WiAlien size={70} />
        </Link>
        <ul className="flex space-x-6 mr-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-base font-medium text-zinc-500 transition-colors hover:text-primary",
                { "text-zinc-900": item.href === currPath }
              )}
            >
              {item.label}
            </Link>
          ))}
        </ul>
      </div>
      {status === "loading" && <Skeleton className="h-12 w-12 rounded-full" />}
      {status === "authenticated" && <UserNav userInfo={data.user} />}
      {status === "unauthenticated" && (
        <Link
          href="/api/auth/signin"
          className="text-base font-medium text-zinc-500 transition-colors hover:text-primary"
        >
          Log In
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
