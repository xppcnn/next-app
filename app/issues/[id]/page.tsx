import { Card, CardContent } from "@/components/ui/card";
import { DateFormat } from "@/lib/utils";
import prisma from "@/prisma/client";
import { IDParams } from "@/types";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
import IssueStatusBadge from "../IssueStatusBadge";
const IssueDetailPage = async ({ params }: IDParams) => {
  const detail = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!detail) {
    return notFound();
  }

  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {detail.title}
      </h2>
      <div className="flex gap-2">
        <IssueStatusBadge status={detail.status} />
        <div>{DateFormat(detail.createTime)}</div>
      </div>
      <Card className="mt-2">
        <CardContent>
          <ReactMarkDown className="prose">{detail.description}</ReactMarkDown>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueDetailPage;