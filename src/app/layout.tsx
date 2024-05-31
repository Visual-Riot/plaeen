import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: "Plaeen",
  description: "A streamlined and intuitive scheduler tailored for busy gamers, by gamers. Estimate completion dates, share your calendars and conquer levels together!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
