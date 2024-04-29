import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/composed/TopNav";
import { Toaster } from "sonner";
import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/nextAuthOptions";
export const dynamic = "force-dynamic";
const raleway = Raleway({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Regina & Gael Studio Beta",
  description: "Fase Beta",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(OPTIONS);
  return (
    <html lang="en">
      <body className={raleway.className}>
        <TopNav session={session} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
