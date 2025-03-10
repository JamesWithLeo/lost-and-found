import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      role?: string;
      accessToken?: string;
    } & DefaultSession["user"]; // Keeps default fields
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin";
    accessToken?: string;
  }
}
