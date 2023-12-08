import React from "react";
import AddIssue from "./AddIssue";
import prisma from "@/prisma/client";
import SelectIssue from "./SelectIssue";
import { Status } from "@prisma/client";
import { DataTable, columns } from "./Table";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    status: Status;
  };
}
const Issues = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  // // const issues = await prisma.issue.findMany({
  // //   where: {
  // //     status,
  // //   },
  // // });
  return (
    <div>
      <div className="mb-3 flex justify-between">
        <SelectIssue />
        <AddIssue />
      </div>
      <div>
        <DataTable columns={columns} status={status} />
      </div>
    </div>
  );
};

export default Issues;
