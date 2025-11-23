import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export default async function Home() {
  const allPosts = await getAllPosts()
  const featuredPosts = allPosts.slice(0, 3) // 只取最新3篇

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 20px',
    }}>
      <section style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 600,
            margin: 0,
            letterSpacing: '-0.5px',
          }}>
            最新文章
          </h2>
          <Link
            href="/posts"
            style={{
              color: '#007AFF',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
          >
            查看全部 →
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        }}>
          {featuredPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}
