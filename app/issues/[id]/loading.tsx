import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const IssueDetailLoading = () => {
  return (
    <div>
      <Skeleton className="w-[200px] h-[20px]" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="w-[100px] h-[20px]" />
        <Skeleton className="w-[200px] h-[20px]" />
      </div>
      <Card className="mt-2">
        <CardContent>
          <div className="space-y-2 mt-2">
            <Skeleton className="w-[200px] h-[30px]" />
            <Skeleton className="w-[200px] h-[30px]" />
            <Skeleton className="w-[200px] h-[30px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueDetailLoading;
