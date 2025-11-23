import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: '孤独的交易员 - 外汇交易技术分析与复盘',
    template: '%s | 孤独的交易员'
  },
  description: '专注于外汇交易、K线技术分析、实战复盘分享。提供原油、黄金、货币对等品种的交易策略、斐波那契分析、MT5使用教程。跟随职业交易员学习外汇交易技巧，避开平台雷区。',
  keywords: ['外汇交易', 'K线分析', '交易复盘', '原油交易', '黄金交易', 'MT5教程', '斐波那契', '技术分析', '外汇平台', 'Exness', '交易策略', '货币对交易', '外汇避坑'],
  authors: [{ name: '孤独的交易员', url: 'https://dlmn.lol' }],
  creator: '孤独的交易员',
  publisher: '孤独的交易员',
  metadataBase: new URL('https://dlmn.lol'),
  alternates: {
    canonical: 'https://dlmn.lol',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://dlmn.lol',
    title: '孤独的交易员 - 外汇交易技术分析与复盘',
    description: '专注外汇交易、K线技术分析、实战复盘。原油、黄金、货币对交易策略分享。',
    siteName: '孤独的交易员',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: '孤独的交易员 - 外汇交易'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '孤独的交易员 - 外汇交易技术分析',
    description: '专注外汇交易、K线分析、实战复盘',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // 添加你的 Google Search Console 验证码
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#007AFF" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
