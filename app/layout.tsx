import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="vi" className={`${inter.variable} h-full bg-[#141720] antialiased`}>
      <body className="flex min-h-full min-w-[320px] flex-col bg-[#141720] text-[#f6f7fb] [font-family:var(--font-inter),Inter,ui-sans-serif,system-ui,sans-serif]">
        {children}
      </body>
    </html>
  );
}
