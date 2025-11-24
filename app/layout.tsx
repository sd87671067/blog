import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: '孤独的交易员 - 外汇交易笔记',
    template: '%s | 孤独的交易员',
  },
  description: '分享外汇交易经验、K线分析技巧和实战策略',
  keywords: ['外汇交易', 'K线分析', '交易策略', '技术分析', '原油信号'],
  authors: [{ name: '孤独的交易员' }],
  creator: '孤独的交易员',
  metadataBase: new URL('https://dlmn.lol'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://dlmn.lol',
    siteName: '孤独的交易员',
    title: '孤独的交易员 - 外汇交易笔记',
    description: '分享外汇交易经验、K线分析技巧和实战策略',
  },
  twitter: {
    card: 'summary_large_image',
    title: '孤独的交易员 - 外汇交易笔记',
    description: '分享外汇交易经验、K线分析技巧和实战策略',
  },
  robots: {
    index: true,
    follow: true,
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#667eea" />
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
