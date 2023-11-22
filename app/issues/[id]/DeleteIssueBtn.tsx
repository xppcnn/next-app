"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteIssueBtn = ({ issueId }: { issueId: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    const response = await fetch("/api/issues/" + issueId, {
      method: "Delete",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });

    const { code } = await response.json();
    setLoading(false);
    if (code === 200) {
      router.push("/issues");
      router.refresh();
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Issue</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you delete issue sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteIssueBtn;
