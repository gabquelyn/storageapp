import type { Metadata } from "next";
import { Nunito_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const nuni = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(nuni.className, "text-[.9rem]")}>{children}</body>
    </html>
  );
}
