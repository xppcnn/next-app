import React from "react";
import IssueForm from "../../_components/IssueForm";
import { IDParams } from "@/types";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const EditIssue = async ({ params }: IDParams) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssue;
