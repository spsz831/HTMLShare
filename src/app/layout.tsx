import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
});

export const metadata: Metadata = {
  title: "HTMLShare - 快速代码分享平台",
  description: "HTMLShare是一个基于Next.js构建的现代代码分享平台，支持多种编程语言的语法高亮，提供快速、安全、便捷的代码片段分享服务。",
  keywords: ["代码分享", "代码片段", "程序员工具", "在线编程", "语法高亮"],
  authors: [{ name: "四知" }],
  creator: "四知",
  publisher: "HTMLShare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://htmlshare.vercel.app",
    siteName: "HTMLShare",
    title: "HTMLShare - 快速代码分享平台",
    description: "快速、安全、便捷的代码片段分享平台",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTMLShare - 快速代码分享平台",
    description: "快速、安全、便捷的代码片段分享平台",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
