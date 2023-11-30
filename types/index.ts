import { DefaultSession, Session } from "next-auth/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next/server" {
  interface NextRequest {
    auth?: Session;
  }
}

export interface IDParams {
  params: {
    id: string;
  };
}

export interface IActionState {
  success?: boolean;
  error?: any;
}
