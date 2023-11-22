import { Card, CardContent } from "@/components/ui/card";
import { formatDateToLocal } from "@/lib/utils";
import prisma from "@/prisma/client";
import { IDParams } from "@/types";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
import IssueStatusBadge from "../IssueStatusBadge";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import DeleteIssueBtn from "./DeleteIssueBtn";
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
        <div>{formatDateToLocal(detail.createTime)}</div>
      </div>
      <Card className="mt-2">
        <CardContent>
          <ReactMarkDown className="prose">{detail.description}</ReactMarkDown>
        </CardContent>
      </Card>
      <div className="mt-2 space-x-2">
        <Button asChild>
          <Link href={`/issues/${detail.id}/edit`}>
            <CiEdit className="mr-2" />
            Edit
          </Link>
        </Button>
        <DeleteIssueBtn issueId={detail.id} />
      </div>
    </div>
  );
};

export default IssueDetailPage;
