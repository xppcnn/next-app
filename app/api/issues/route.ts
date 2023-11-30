import { NextRequest } from "next/server";
import { formSchema } from "./schema";
import { BadRequest, NotAuthorized, ResponseOK } from "@/lib/utils";
import prisma from "@/prisma/client";
import { z } from "zod";
import { auth } from "@/auth";
type IssueForm = z.infer<typeof formSchema>;
/**
 * add issue
 * @param request
 * @returns
 */
export const POST = auth(async (request) => {
  if (!request.auth) {
    return NotAuthorized();
  }
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
}) as any;
