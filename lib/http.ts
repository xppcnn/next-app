import { NextResponse } from "next/server";

export interface ResponseData<T> {
  code: number;
  data: T;
  message: any;
}

export function BadRequest(msg: any) {
  return NextResponse.json(
    {
      message: msg,
    },
    { status: 400 }
  );
}

export function ResponseOK<T>(
  data: T,
  message = "success",
  code = 200
): NextResponse<ResponseData<T>> {
  return NextResponse.json(
    {
      code,
      message,
      data,
    },
    { status: 200 }
  );
}

export function ResponseError<T>(
  data: T,
  message = "fail",
  code = 201
): NextResponse<ResponseData<T>> {
  return NextResponse.json(
    {
      code,
      message,
      data,
    },
    { status: 200 }
  );
}
export function NotAuthorized(
  message = "没有权限"
): NextResponse<{ message: string }> {
  return NextResponse.json(
    {
      message,
    },
    { status: 401 }
  );
}

