import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      id?: string;
      firstName?: string | null;
      lastName?: string | null;
      accessToken?: string;
      isCompletedAccount: boolean;
    } & DefaultSession["user"]; // Keeps default fields
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    lName?: string | null;
    fName?: string | null;
    ica: boolean; // is completed account
  }
}
