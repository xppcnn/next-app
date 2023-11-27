"use server";
import prisma from "@/prisma/client";
import { IActionState } from "@/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

const RegisterSchema = z.object({
  name: z.string().min(3, "用户名不得少于3个字符"),
  email: z.string().email("请输入正确邮箱格式"),
  password: z.string().min(8, "密码不得少于8个字符"),
});

const LoginSchema = z.object({
  email: z.string().email("请输入正确邮箱格式"),
  password: z.string().min(8, "密码不得少于8个字符"),
});

type RegisterForm = z.infer<typeof RegisterSchema>;
type LoginForm = z.infer<typeof LoginSchema>;

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

export async function signInByEmail(
  prevState: IActionState,
  formData: FormData
) {
  try {
    const obj = Object.fromEntries(formData.entries()) as LoginForm;
    const validation = LoginSchema.safeParse(obj);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.flatten().fieldErrors,
      };
    }
    const res = await signIn("credentials", {
      callbackUrl: "http://localhost:8866/dashboard",
      // redirect: true,
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (res) {
      return res;
    }
    return {
      success: false,
      error: "",
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).toString(),
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const obj = Object.fromEntries(formData.entries()) as LoginForm;
  const validation = LoginSchema.safeParse(obj);
  if (!validation.success) {
    return '校验错误';
  }
  try {
    const aa = await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: true,
      redirectTo: '/dashboard'
    });
    redirect(aa)
    console.log("🚀 ~ file: user.ts:117 ~ aa:", aa)
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
