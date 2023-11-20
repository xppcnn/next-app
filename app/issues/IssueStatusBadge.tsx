import { Badge } from "@/components/ui/badge";
import { Status } from "@prisma/client";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "default" | "secondary" | "destructive" }
> = {
  OPEN: { label: "Open", color: "default" },
  IN_PROGRESS: { label: "In Progress", color: "secondary" },
  CLOSE: { label: "close", color: "destructive" },
};
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge variant={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
