import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("请输入正确邮箱格式"),
  password: z.string().min(8, "密码不得少于8个字符"),
});

export type LoginForm = z.infer<typeof LoginSchema>;
