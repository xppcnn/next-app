import React from "react";
// import IssueForm from "../../_components/IssueForm";
import { IDParams } from "@/types";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const Component = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const IssueForm = React.forwardRef((props: { issue: Issue }, ref) => (
  <Component {...props} />
));
IssueForm.displayName = "IssueForm";

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
