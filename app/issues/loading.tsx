import React from "react";
import AddIssue from "./AddIssue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import SelectIssue from "./SelectIssue";
const IssueLoading = ({ showOperation = true }: { showOperation?: boolean }) => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div>
      {showOperation && (
        <div className="mb-3 flex justify-between">
          <SelectIssue />
          <AddIssue />
        </div>
      )}
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
            <TableRow key={issue}>
              <TableCell className="font-medium w-1/5">
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
              <TableCell className="w-[100px]">
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
              <TableCell className="w-1/3">
                <Skeleton className="w-full h-[20px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssueLoading;
