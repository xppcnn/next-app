import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
export const IssueSummaryLoading = () => {
  const data: number[] = [1, 2, 3];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {data.map((ele) => (
            <div
              key={ele}
              className="border-blue-200 p-6 border-[1px] rounded-md"
            >
              <Skeleton className="w-[80px] h-[100px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export const ChartLoading = () => {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <Skeleton className="w-full h-[300px]" />
      </CardContent>
    </Card>
  );
};
export const LatestIssuesLoading = () => {
  const data: number[] = [1, 2, 3, 4, 5];
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <Card>
          <CardHeader>
            <CardTitle>Latest Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {data.map((ele) => (
                  <TableRow key={ele}>
                    <TableCell>
                      <Skeleton className="h-8 w-full"></Skeleton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
const DashBoardLoading = () => {
  return (
    <div className="flex gap-x-5">
      <div className="flex-1 flex gap-y-5 flex-col">
        <IssueSummaryLoading />
        <ChartLoading />
      </div>
      <div className="flex-1">
        <LatestIssuesLoading />
      </div>
    </div>
  );
};

export default DashBoardLoading;
