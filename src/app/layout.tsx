import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raahi | Your Journey, Your Way",
  description: "Book bikes, autos, cars and rentals with Raahi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
