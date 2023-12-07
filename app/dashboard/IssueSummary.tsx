import { Status } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const data: { label: string; value: number; status: Status }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In  Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Close Issues",
      value: closed,
      status: "CLOSE",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {data.map((ele) => (
            <div
              key={ele.status}
              className="border-blue-200 p-6 border-[1px] rounded-md"
            >
              <div className="font-medium">
                <Link href={`/issues?status=${ele.status}`}>{ele.label}</Link>
              </div>
              <div className="font-bold text-lg">{ele.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueSummary;
