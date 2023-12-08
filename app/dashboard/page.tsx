import React, { Suspense } from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import Chart from "./Chart";
import prisma from "@/prisma/client";
import {
  ChartLoading,
  IssueSummaryLoading,
  LatestIssuesLoading,
} from "./loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

const Dashboard = async () => {
  const openCount = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const closeCount = await prisma.issue.count({
    where: {
      status: "CLOSE",
    },
  });
  const inProgressCount = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  return (
    <div className="flex gap-x-5">
      <div className="flex-1 flex gap-y-5 flex-col">
        <Suspense fallback={<IssueSummaryLoading />}>
          <IssueSummary
            open={openCount}
            closed={closeCount}
            inProgress={inProgressCount}
          />
        </Suspense>
        <Suspense fallback={<ChartLoading />}>
          <Chart
            open={openCount}
            closed={closeCount}
            inProgress={inProgressCount}
          />
        </Suspense>
      </div>
      <div className="flex-1">
        <Suspense fallback={<LatestIssuesLoading />}>
          <LatestIssues />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
