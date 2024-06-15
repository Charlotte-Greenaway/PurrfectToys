import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./_components/globals/nav";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Purrfect Toys",
  description:
    "Toys that are just simply Purrfect!🐱 View the lastest range today and see what your cat or kitten truly deserves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}` }>
        <Nav />
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
