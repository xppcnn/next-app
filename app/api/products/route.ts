import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { Product } from "@/types/product";

export async function GET(request: NextRequest) {
  const data = await prisma.product.findMany();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body: Product = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(product);
}
