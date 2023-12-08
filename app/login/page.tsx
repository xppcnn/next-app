import Link from "next/link";
import React from "react";
import EmailLogin from "./EmailLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <div className="bg-white h-full">
      <EmailLogin />
    </div>
  );
};

export default Login;
