import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import zhCN from "date-fns/locale/zh-CN";
// import { zhCN } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export function DateFormat(time: Date, formatText = "yyyy-MM-dd HH:mm:ss") {
  return format(new Date(time), formatText, { locale: zhCN });
}

export const formatDateToLocal = (
  dateStr: string | Date,
  locale: string = "zh-CN"
) => {
  let date = dateStr;
  if (!(dateStr instanceof Date)) {
    date = new Date(dateStr);
  }
  return formatInTimeZone(date, "Asia/Shanghai", "yyyy-MM-dd HH:mm:ss");
};
