import prisma from "@/prisma/client";
import { IDParams } from "@/types/common";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { Product } from "@/types/product";

export async function GET(request: NextRequest, { params }: IDParams) {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!product) {
    return NextResponse.json("not found product", { status: 400 });
  }
  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: IDParams) {
  const body: Product = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!product) {
    return NextResponse.json("not found product", { status: 400 });
  }
  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json("");
}

export async function DELETE(request: NextRequest, { params }: IDParams) {
  const user = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  if (!user) {
    return NextResponse.json("not found product", { status: 400 });
  }
  await prisma.product.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json("");
}
