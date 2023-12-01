import { auth } from "@/auth";
import { NextRequest } from "next/server";
import { NotAuthorized, BadRequest, ResponseOK } from "@/lib/http";
import prisma from "@/prisma/client";
import { assignedUserSchema } from "../../schema";
import { IDParams, authFn } from "@/types";
import { z } from "zod";
type AssignedUserForm = z.infer<typeof assignedUserSchema>;

const putFn = (async (request: NextRequest, { params }: IDParams) => {
  if (!request.auth) {
    return NotAuthorized();
  }
  const body: AssignedUserForm = await request.json();
  const validation = assignedUserSchema.safeParse(body);
  if (!validation.success) {
    return BadRequest(validation.error.errors);
  }
  const { assignedToUserId } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user) {
      return BadRequest("该用户不存在");
    }
  }

  const updateIssues = await prisma.issue.update({
    where: {
      id: params.id,
    },
    data: {
      assignedToUserId: assignedToUserId,
    },
  });
  return ResponseOK(updateIssues);
}) as authFn;
export const PUT = auth(putFn);
