import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { CartProvider } from "@/features/cart/CartProvider";

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
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
