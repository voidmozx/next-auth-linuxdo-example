import NextAuth, { DefaultSession, User } from "next-auth";
import Linuxdo from "@/config/providers/linuxdo";

declare module "next-auth" {

  interface User {
    username: string;
    avatar_url: string;
    active: boolean;
    trust_level: number;
    silenced: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      avatar_url: string;
      active: boolean;
      trust_level: number;
      silenced: boolean;
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // debug: process.env.NODE_ENV !== "production" ? true : false,
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn() {
        return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        token.user = {
          id: user.id,
          username: user.username,
          name: user.name,
          avatar_url: user.avatar_url,
          active: user.active,
          trust_level: user.trust_level,
          silenced: user.silenced
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: (token.user as any).id,
          username: (token.user as any).username,
          name: (token.user as any).name,
          avatar_url: (token.user as any).avatar_url,
          active: (token.user as any).active,
          trust_level: (token.user as any).trust_level,
          silenced: (token.user as any).silenced
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin"
  },
  providers: [
    Linuxdo({
      clientId: process.env.AUTH_LINUXDO_ID,
      clientSecret: process.env.AUTH_LINUXDO_SECRET,
    }),
  ],
});
