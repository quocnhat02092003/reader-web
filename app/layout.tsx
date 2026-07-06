import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "KệSách | Đọc sách và truyện",
  description: "Dashboard đọc sách, truyện và giới thiệu sách.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}>
      <body className="flex min-h-full min-w-[320px] flex-col bg-transparent [font-family:var(--font-inter),Inter,ui-sans-serif,system-ui,sans-serif]">
        {children}
      </body>
    </html>
  );
}
