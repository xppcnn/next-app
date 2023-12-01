import { DefaultSession, Session } from "next-auth/types";
import { NextRequest } from "next/server";
import { AppRouteHandlerFn } from "next/dist/server/future/route-modules/app-route/module";

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
    auth?: Session | null;
  }
}

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

export type authFn = (req: NextAuthRequest) => ReturnType<AppRouteHandlerFn>;

export interface IDParams {
  params: {
    id: string;
  };
}

export interface IActionState {
  success?: boolean;
  error?: any;
}
