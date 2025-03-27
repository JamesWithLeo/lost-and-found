import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/ui/server/footer";
import MainHeader from "@/ui/server/MainHeader";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lost and found",
  description: "Online lost and found created using create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center antialiased`}
      >
        <MainHeader isAuth={!!session} photoUrl={session?.user.image} />
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
