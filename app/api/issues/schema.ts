import { Status } from "@prisma/client";
import * as z from "zod";
export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  description: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
});

export const assignedUserSchema = z.object({
  assignedToUserId: z
    .string()
    .min(1, { message: "用户信息错误" })
    .optional()
    .nullable(),
});

export const PaginationSchema = z.object({
  status: z.enum([Status.OPEN, Status.CLOSE, Status.IN_PROGRESS]).optional(),
  pageIndex: z.coerce.number().min(0).default(0),
  pageSize: z.coerce.number().min(1).default(10),
  sorter: z.string().optional(),
  sortBy: z.enum(["desc", "asc"]).optional(),
});
