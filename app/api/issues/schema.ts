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
