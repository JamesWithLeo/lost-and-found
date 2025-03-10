import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// declare module "next-auth" {
//   interface Session {
//     user?: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role?: string;
//       accessToken?: string;
//     };
//   }
//   interface JWT{

//   }
// }
const option: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user:", user);
      console.log("account", account);
      console.log("profile", profile);
      console.log("email", email);
      console.log("credential", credentials);

      if (account?.provider === "google") {
        return true;
      }
      return false;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.role = "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signup",
    signOut: "/discovery",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(option);

export { handler as GET, handler as POST };
