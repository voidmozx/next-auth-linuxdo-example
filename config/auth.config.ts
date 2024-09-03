import type { NextAuthConfig } from "next-auth";
import Linuxdo from "./providers/linuxdo";

export default {
  providers: [
    Linuxdo({
      clientId: process.env.AUTH_LINUXDO_ID,
      clientSecret: process.env.AUTH_LINUXDO_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
