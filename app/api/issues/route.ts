import { NextRequest } from "next/server";
import { formSchema } from "./schema";
import { BadRequest, ResponseOK } from "@/lib/utils";
import prisma from "@/prisma/client";
import { z } from "zod";
type IssueForm = z.infer<typeof formSchema>;
/**
 * add issue
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  const body: IssueForm = await request.json();
  const validation = formSchema.safeParse(body);
  if (!validation.success) {
    return BadRequest(validation.error.errors);
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return ResponseOK(newIssue);
}
