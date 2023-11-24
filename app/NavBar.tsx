"use client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { WiAlien } from "react-icons/wi";

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
  const { status } = useSession();
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
      {status === "authenticated" && (
        <Link
          href="/api/auth/signout"
          className="text-base font-medium text-zinc-500 transition-colors hover:text-primary"
        >
          Log Out
        </Link>
      )}
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
