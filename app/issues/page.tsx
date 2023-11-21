import React from "react";
import AddIssue from "./AddIssue";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/client";
import { formatDateToLocal } from "@/lib/utils";
import IssueStatusBadge from "./IssueStatusBadge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const Issues = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <AddIssue></AddIssue>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CreateTime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium w-1/5">
                <Link href={`/issues/${issue.id}`}>
                  <Button variant="link">{issue.title}</Button>
                </Link>
              </TableCell>
              <TableCell className="w-[100px]">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell>{formatDateToLocal(issue.createTime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Issues;
