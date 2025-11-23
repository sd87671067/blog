import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '48px 20px',
    }}>
      {/* 文章头部 */}
      <header style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 14px',
          borderRadius: '12px',
          backgroundColor: 'rgba(0, 122, 255, 0.1)',
          color: '#007AFF',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '16px',
        }}>
          {post.category}
        </div>

        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '16px',
          color: 'var(--text-primary)',
          letterSpacing: '-0.5px',
        }}>
          {post.title}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '15px',
          color: 'var(--text-secondary)',
        }}>
          <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
          {post.readingTime && (
            <>
              <span>·</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
      </header>

      {/* 文章内容 */}
      <div 
        style={{
          fontSize: '17px',
          lineHeight: '1.7',
          color: 'var(--text-primary)',
        }}
        dangerouslySetInnerHTML={{ __html: post.contentHtml || post.content }}
      />

      {/* 标签 */}
      {post.tags && post.tags.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '48px',
          paddingTop: '48px',
          borderTop: '1px solid var(--border-color)',
        }}>
          {post.tags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: 'var(--tag-bg)',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              #{tag}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
