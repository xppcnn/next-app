import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./NavBar";
import Providers from "./providers";
import AuthProvider from "./auth/provider";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: {
    template: "%s | next-app",
    default: "xppcnn",
  },
  description: "xppcnn learn next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  // if (session?.user)
  //   session.user = {
  //     name: session.user.name,
  //     email: session.user.email,
  //     id: session.user.id,
  //   };
  return (
    <html lang="en" className="light">
      <body>
        <AuthProvider>
          <Providers>
            <NavBar />
            <main className="p-5 main-height">{children}</main>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
