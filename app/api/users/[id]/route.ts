import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { User } from "@/types/user";
import { IDParams } from "@/types/common";

export async function GET(request: NextRequest, { params }: IDParams) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  if (!user) {
    return NextResponse.json(
      {
        error: "not found user",
      },
      { status: 404 }
    );
  }
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: IDParams) {
  const body: User = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  if (!user) {
    return NextResponse.json("not found user", { status: 400 });
  }
  await prisma.user.update({
    data: {
      email: body.email,
      name: body.name,
      followers: body.followers,
      isActive: body.isActive,
    },
    where: {
      id: user.id,
    },
  });
  return NextResponse.json("");
}

export async function DELETE(request: NextRequest, { params }: IDParams) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  if (!user) {
    return NextResponse.json("not found user", { status: 400 });
  }
  await prisma.user.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json("");
}
