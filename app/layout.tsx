import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "我的博客 - Next.js 全栈博客系统",
    template: "%s | 我的博客",
  },
  description: "一个基于 Next.js 的现代化博客系统，专注于内容创作。",
  keywords: ["博客", "Next.js", "技术博客", "前端开发"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://yourdomain.com",
    title: "我的博客",
    description: "一个基于 Next.js 的现代化博客系统",
    siteName: "我的博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "我的博客",
    description: "一个基于 Next.js 的现代化博客系统",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
