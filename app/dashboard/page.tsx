import React from "react";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import Chart from "./Chart";
import prisma from "@/prisma/client";

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
        <IssueSummary
          open={openCount}
          closed={closeCount}
          inProgress={inProgressCount}
        />
        <Chart
          open={openCount}
          closed={closeCount}
          inProgress={inProgressCount}
        />
      </div>
      <div className="flex-1">
        <LatestIssues />
      </div>
    </div>
  );
};

export default Dashboard;
