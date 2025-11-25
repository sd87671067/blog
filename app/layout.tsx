import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: '孤独的交易员 - 外汇交易笔记与实战策略',
    template: '%s | 孤独的交易员',
  },
  description: '专注外汇交易实战分享，包括K线分析技巧、原油黄金信号、MT5教程、技术指标解读。每日更新交易复盘与市场分析。',
  keywords: [
    '外汇交易', 'K线分析', '交易策略', '技术分析', '原油信号',
    'MT5教程', '黄金交易', '外汇入门', '交易复盘', '趋势分析',
    'MACD指标', '均线策略', '支撑阻力', '外汇信号', '日内交易'
  ],
  authors: [{ name: '孤独的交易员', url: 'https://dlmn.lol' }],
  creator: '孤独的交易员',
  publisher: '孤独的交易员',
  metadataBase: new URL('https://dlmn.lol'),
  alternates: {
    canonical: 'https://dlmn.lol',
  },
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
    title: '孤独的交易员 - 外汇交易笔记与实战策略',
    description: '专注外汇交易实战分享，包括K线分析技巧、原油黄金信号、MT5教程、技术指标解读。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '孤独的交易员 - 外汇交易笔记',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '孤独的交易员 - 外汇交易笔记',
    description: '专注外汇交易实战分享，包括K线分析技巧、原油黄金信号、MT5教程。',
    images: ['/og-image.png'],
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
    // 添加你的验证码
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '孤独的交易员',
    description: '专注外汇交易实战分享，包括K线分析技巧、原油黄金信号、MT5教程。',
    url: 'https://dlmn.lol',
    author: {
      '@type': 'Person',
      name: '孤独的交易员',
      url: 'https://dlmn.lol',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://dlmn.lol/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
        <link rel="canonical" href="https://dlmn.lol" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
