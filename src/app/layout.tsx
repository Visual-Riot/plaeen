import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";

export const metadata: Metadata = {
  title: "Plaeen",
  description:
    "A streamlined and intuitive scheduler tailored for busy gamers, by gamers. Estimate completion dates, share your calendars and conquer levels together!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sofia">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/qor3xoj.css" />
      </head>
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
