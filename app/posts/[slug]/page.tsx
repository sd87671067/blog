import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import PostContent from '@/components/PostContent'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  const description = post.description || post.content.slice(0, 160).replace(/<[^>]*>/g, '')

  return {
    title: post.title,
    description,
    keywords: [
      ...post.tags,
      post.category,
      '外汇交易',
      'K线分析',
      '交易复盘',
      '技术分析'
    ],
    authors: [{ name: '孤独的交易员' }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      authors: ['孤独的交易员'],
      tags: post.tags,
      images: post.cover ? [{ url: post.cover }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.cover ? [post.cover] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || '',
    author: {
      '@type': 'Person',
      name: '孤独的交易员',
      url: 'https://dlmn.lol',
    },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      '@type': 'Organization',
      name: '孤独的交易员',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dlmn.lol/logo.png',
      },
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '48px 20px',
      }}>
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
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </time>
            {post.readingTime && (
              <>
                <span>·</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>
        </header>

        <PostContent content={post.contentHtml || post.content} />

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
    </>
  )
}
