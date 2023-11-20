import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="max-w-xl space-y-8">
      <Skeleton className="w-full h-[20px]" />

      <Skeleton className="h-40 w-full" />
    </div>
  );
};

export default Loading;
