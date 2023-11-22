import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-[500px] h-[40px]" />
      <Skeleton className="w-[500px] h-[400px] mt-4" />
    </div>
  );
};

export default IssueFormSkeleton;
