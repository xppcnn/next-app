import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  searchParams: {
    sortOrder: "name" | "email";
  };
}

const UserPage = async ({ searchParams: { sortOrder = "name" } }: Props) => {
  console.log("🚀 ~ file: page.tsx:11 ~ UserPage ~ sortOrder:", sortOrder);
  return (
    <>
      <h1>User</h1>
      <Link
        href="/users/new"
        className={buttonVariants({ variant: "outline" })}
      >
        Add User
      </Link>
      <Suspense fallback={<div>loading</div>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UserPage;
