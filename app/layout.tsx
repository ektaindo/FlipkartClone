import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flipkart Clone Starter",
  description: "E-commerce starter built with Next.js, React and TypeScript"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
