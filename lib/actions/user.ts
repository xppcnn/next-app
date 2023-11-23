"use server";
import prisma from "@/prisma/client";
import { IActionState } from "@/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const RegisterSchema = z.object({
  name: z.string().min(3, "用户名不得少于3个字符"),
  email: z.string().email("请输入正确邮箱格式"),
  password: z.string().min(8, "密码不得少于8个字符"),
});

type RegisterForm = z.infer<typeof RegisterSchema>;

export async function register(prevState: IActionState, formData: FormData) {
  try {
    const obj = Object.fromEntries(formData.entries()) as RegisterForm;
    const validation = RegisterSchema.safeParse(obj);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.flatten().fieldErrors,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        email: obj.email,
      },
    });
    if (user) {
      return {
        success: false,
        error: null,
      };
    }
    const newUser = await prisma.user.create({
      data: {
        name: obj.name,
        password: obj.password,
        email: obj.email,
      },
    });
    revalidatePath("/login");
    redirect("/login");
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
    throw error;
  }
}
