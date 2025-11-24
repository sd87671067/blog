import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const allPostsData = await getAllPosts()
  const recentPosts = allPostsData.slice(0, 6) // 只取前 6 篇

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '16px 16px 4px',
    }}>
      {/* 双列网格布局 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        maxWidth: '800px',
        margin: '0 auto 6px',
      }}>
        {recentPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* 查看更多链接 + 文章数 */}
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
  )
}
