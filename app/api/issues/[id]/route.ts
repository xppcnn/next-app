import { IDParams } from "@/types";
import { NextRequest } from "next/server";
import { formSchema } from "../schema";
import { BadRequest, ResponseOK } from "@/lib/utils";
import prisma from "@/prisma/client";
import { z } from "zod";

type IssueFormData = z.infer<typeof formSchema>;

export async function PUT(request: NextRequest, { params }: IDParams) {
  const body: IssueFormData = await request.json();
  const validation = formSchema.safeParse(body);
  if (!validation.success) {
    return BadRequest(validation.error.format());
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issue) {
    return BadRequest("the issue not exist");
  }
  const newIssue = await prisma.issue.update({
    where: {
      id: params.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return ResponseOK(newIssue);
}

export async function DELETE(request: NextRequest, { params }: IDParams) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issue) {
    return BadRequest("the issue not exist");
  }
  await prisma.issue.delete({
    where: {
      id: params.id,
    },
  });
  return ResponseOK(null);
}
