import * as z from "zod";
export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  description: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
});
