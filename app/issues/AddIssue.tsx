"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AddIssue = () => {
  return (
    <Button asChild>
      <Link href="/issues/add">Add Issue</Link>
    </Button>
  );
};

export default AddIssue;
