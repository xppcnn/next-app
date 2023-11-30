"use client";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { FaGithub } from "react-icons/fa";
import { authenticate, signInByEmail } from "@/lib/actions/user";
import { IActionState } from "@/types";
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";

const EmailLogin = () => {
  const [formState, action] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();
  return (
    <div className="w-[500px]  m-auto   px-6">
      <header className="text-3xl text-center mt-10">邮箱密码登录</header>
      <form className="space-y-3 " action={action} noValidate>
        <div className="flex-1 rounded-lg bg-gray-50 pb-4 pt-8">
          <div className="w-full">
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                邮箱
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 p-[8px] text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="请输入邮箱"
                  required
                />
              </div>
              {/* {formState?.error?.email ? (
                <div
                  id="email-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {formState.error.email.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null} */}
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                密码
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 p-[8px] text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="请输入密码"
                />
              </div>
              {/* {formState?.error?.password ? (
                <div
                  id="password-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {formState.error.password.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null} */}
            </div>
          </div>
        </div>
        <Button type="submit" variant="default" className="w-full">
          登录
        </Button>
        <div className="flex justify-between">
          <Link href="/">忘记密码</Link>
          <Link href="/register" className="text-blue-600 hover:text-blue-500">
            免费注册
          </Link>
        </div>
      </form>
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            其他方式
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={pending}
        className="flex justify-center items-center w-full"
        onClick={() =>
          signIn("github")
        }
      >
        {pending ? (
          <Spinner className="mr-2" />
        ) : (
          <FaGithub size="20" className="mr-2" />
        )}
        Github
      </Button>
    </div>
  );
};

export default EmailLogin;
