import { NextRequest } from "next/server";
import { LoginForm, LoginSchema } from "./schema";
import { BadRequest, ResponseError, ResponseOK } from "@/lib/utils";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body: LoginForm = await request.json();
  const validation = LoginSchema.safeParse(body);
  if (!validation.success) {
    return BadRequest(validation.error.errors);
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  console.log("🚀 ~ file: route.ts:17 ~ POST ~ user:", user);
  if (!user) {
    return ResponseError(null, "该用户不存在");
  }
  if (user.password !== body.password) {
    return ResponseError(null, "密码不正确");
  }
  return ResponseOK({
    name: user.name,
    email: user.email,
    id: user.id,
  });
}
