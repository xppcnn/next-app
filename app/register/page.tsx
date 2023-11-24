"use client";
import React from "react";
import RegisterButton from "./RegisterButton";
import { useFormState } from "react-dom";
import { register } from "@/lib/actions/user";
import { IActionState } from "@/types";

const Register = () => {
  const [formState, action] = useFormState<IActionState, FormData>(
    register,
    {}
  );
  return (
    <form className="space-y-3 w-[500px] m-auto" action={action} noValidate>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">注册新用户</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              姓名
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 p-[8px] text-sm outline-2 placeholder:text-gray-500"
                id="name"
                name="name"
                placeholder="请输入姓名"
              />
            </div>
            {formState?.error?.name ? (
              <div
                id="name-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {formState.error.name.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
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
            {formState?.error?.email ? (
              <div
                id="email-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {formState.error.email.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
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
            {formState?.error?.password ? (
              <div
                id="password-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {formState.error.password.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <RegisterButton />
      </div>
    </form>
  );
};

export default Register;
