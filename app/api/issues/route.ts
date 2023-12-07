import { NextRequest } from "next/server";
import { formSchema, PaginationSchema } from "./schema";
import { BadRequest, NotAuthorized, ResponseOK } from "@http";
import prisma from "@/prisma/client";
import { z } from "zod";
import { auth } from "@/auth";
import { Status } from "@prisma/client";
type IssueForm = z.infer<typeof formSchema>;
type QueryType = z.infer<typeof PaginationSchema>;
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

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const obj = Object.fromEntries(searchParams.entries());
  const validation = PaginationSchema.safeParse(obj);
  if (!validation.success) {
    return BadRequest(validation.error.errors);
  }
  const list = await prisma.issue.findMany({
    where: {
      status: validation.data.status,
    },
    orderBy: validation.data.sorter
      ? {
          [validation.data.sorter]: validation.data.sortBy,
        }
      : {},
    take: validation.data.pageSize,
    skip: validation.data.pageIndex * validation.data.pageSize,
  });
  const count = await prisma.issue.count({
    where: {
      status: validation.data.status,
    },
  });
  return ResponseOK({
    dataList: list,
    count,
    totalPage: Math.ceil(count / validation.data.pageSize),
  });
};
