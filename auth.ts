import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (!user && !account) return false;
      const existingUser = await db.user.findUnique({
        where: { email: user.email as string },
      });
      if(!existingUser){}
    },
    async jwt() {},
    async session() {},
  },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  ...authConfig,
});
