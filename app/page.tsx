import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: '孤独的交易员 - 外汇交易笔记与实战策略',
  description: '专注外汇交易实战分享，包括K线分析技巧、原油黄金信号、MT5教程、技术指标解读。每日更新交易复盘与市场分析。',
  alternates: {
    canonical: 'https://dlmn.lol',
  },
}

export default async function Home() {
  const allPostsData = await getAllPosts()
  const recentPosts = allPostsData.slice(0, 12)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: '孤独的交易员',
    description: '外汇交易笔记与实战策略分享',
    url: 'https://dlmn.lol',
    blogPost: recentPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `https://dlmn.lol/posts/${post.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 16px 4px',
      }}>
        <h1 className="sr-only">孤独的交易员 - 外汇交易笔记</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          maxWidth: '800px',
          margin: '0 auto 6px',
        }}>
          {recentPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 4px',
          gap: '4px',
        }}>
          <Link
            href="/posts"
            style={{
              fontSize: '15px',
              color: '#06c',
              textDecoration: 'none',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(0, 102, 204, 0.08)',
              transition: 'background 0.2s ease',
            }}
          >
            查看更多文章 →
          </Link>
          <div style={{
            fontSize: '12px',
            color: '#999',
          }}>
            共 {allPostsData.length} 篇文章
          </div>
        </div>
      </div>
    </>
  )
}
