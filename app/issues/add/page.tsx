import React from "react";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

const Component = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const IssueForm = React.forwardRef((props: { issue?: Issue }, ref) => (
  <Component {...props} />
));
IssueForm.displayName = "IssueForm";

const AddIssuePage = () => {
  return <IssueForm />;
};

export default AddIssuePage;
