import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import StarsBackground from "@/components/StarsBackground";

export const metadata: Metadata = {
  title: "Next Auth Linuxdo Example",
  description: "Linux do Connect next-auth online demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <StarsBackground className="h-dvh overflow-y-hidden" starDensity="high">{children}</StarsBackground>
        </body>
      </SessionProvider>
    </html>
  );
}
