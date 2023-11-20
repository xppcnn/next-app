import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function BadRequest(msg: any) {
  return NextResponse.json(
    {
      message: msg,
    },
    { status: 400 }
  );
}

export function ResponseOK<T>(data: T, message = "success", code = 200) {
  return NextResponse.json(
    {
      code,
      message,
      data,
    },
    { status: 200 }
  );
}

export function DateFormat(time: Date, formatText = "yyyy-MM-dd HH:mm:ss") {
  return format(new Date(time), formatText, { locale: zhCN });
}
